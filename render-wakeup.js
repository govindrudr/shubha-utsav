/* ==========================================================================
   SHUBHA UTSAV - RENDER FREE HOSTING AUTO WAKE-UP & COLD-START RESILIENCE
   ========================================================================== */

(function () {
  'use strict';

  // Prevent multiple initializations
  if (window.__renderWakeupInitialized) return;
  window.__renderWakeupInitialized = true;

  const originalFetch = window.fetch;
  let isWakingUp = false;
  let wakeupBannerElement = null;

  // Inject CSS styling for the warm-up banner and pulse animation
  function injectStyles() {
    if (document.getElementById('render-wakeup-styles')) return;
    const style = document.createElement('style');
    style.id = 'render-wakeup-styles';
    style.textContent = `
      #render-warmup-banner {
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%) translateY(-120px);
        background: rgba(20, 20, 25, 0.95);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        color: #ffffff;
        border: 1px solid rgba(255, 184, 0, 0.6);
        box-shadow: 0 12px 35px rgba(0, 0, 0, 0.5), 0 0 20px rgba(255, 184, 0, 0.25);
        padding: 12px 24px;
        border-radius: 50px;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        font-size: 14px;
        font-weight: 500;
        display: flex;
        align-items: center;
        gap: 12px;
        z-index: 999999;
        opacity: 0;
        transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease;
        pointer-events: none;
      }
      #render-warmup-banner.visible {
        transform: translateX(-50%) translateY(0);
        opacity: 1;
      }
      .render-pulse-dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: #FFB800;
        box-shadow: 0 0 10px #FFB800;
        animation: renderPulse 1.4s infinite ease-in-out;
        flex-shrink: 0;
      }
      @keyframes renderPulse {
        0% { transform: scale(0.85); opacity: 0.5; box-shadow: 0 0 0 0 rgba(255, 184, 0, 0.8); }
        50% { transform: scale(1.2); opacity: 1; box-shadow: 0 0 0 8px rgba(255, 184, 0, 0); }
        100% { transform: scale(0.85); opacity: 0.5; box-shadow: 0 0 0 0 rgba(255, 184, 0, 0); }
      }
    `;
    document.head.appendChild(style);
  }

  function getOrCreateBanner() {
    if (!document.body) return null;
    injectStyles();
    if (!wakeupBannerElement) {
      wakeupBannerElement = document.createElement('div');
      wakeupBannerElement.id = 'render-warmup-banner';
      wakeupBannerElement.innerHTML = `
        <div class="render-pulse-dot"></div>
        <span id="render-warmup-text">⚡ Connecting to server (waking up free Render host)... Please wait.</span>
      `;
      document.body.appendChild(wakeupBannerElement);
    }
    return wakeupBannerElement;
  }

  function showWarmupMessage(msg) {
    const banner = getOrCreateBanner();
    if (!banner) return;
    const txtEl = document.getElementById('render-warmup-text');
    if (txtEl && msg) txtEl.textContent = msg;
    banner.classList.add('visible');
    isWakingUp = true;
  }

  function hideWarmupMessage() {
    if (wakeupBannerElement) {
      wakeupBannerElement.classList.remove('visible');
    }
    isWakingUp = false;
  }

  // Intercept window.fetch to automatically retry on cold-start timeouts & 502/503/504 errors
  window.fetch = async function (resource, config = {}) {
    const urlStr = typeof resource === 'string' ? resource : (resource && resource.url ? resource.url : '');
    const isApiCall = urlStr.includes('/api/');

    // Bypass non-API calls or siteverify / external resources
    if (!isApiCall || urlStr.includes('/api/health') || urlStr.includes('recaptcha') || urlStr.includes('google')) {
      return originalFetch.apply(this, arguments);
    }

    const maxRetries = 6;
    let attempt = 0;

    while (attempt < maxRetries) {
      try {
        const response = await originalFetch.apply(this, arguments);

        // Check for Render gateway cold start statuses (502 Bad Gateway, 503 Service Unavailable, 504 Gateway Timeout)
        if ([502, 503, 504].includes(response.status) && attempt < maxRetries - 1) {
          attempt++;
          showWarmupMessage(`⚡ Waking up server from sleep (Render Free Host)... Attempt ${attempt}/${maxRetries}`);
          await new Promise(r => setTimeout(r, Math.min(3000 * attempt, 10000)));
          continue;
        }

        if (isWakingUp) hideWarmupMessage();
        return response;

      } catch (err) {
        attempt++;
        if (attempt >= maxRetries) {
          if (isWakingUp) hideWarmupMessage();
          throw err;
        }

        showWarmupMessage(`⚡ Waking up server from sleep (Render Free Host)... Retrying automatically.`);
        console.warn(`[Render Auto-Wakeup] Network error fetching ${urlStr} (attempt ${attempt}/${maxRetries}):`, err.message);

        // Exponential backoff
        const backoffMs = Math.min(2500 * Math.pow(1.4, attempt), 12000);
        await new Promise(r => setTimeout(r, backoffMs));

        // Background ping attempt to kickstart awake sequence
        try {
          await originalFetch('/api/health', { cache: 'no-store' });
        } catch (_) {}
      }
    }
  };

  // Immediate background warmup on DOM ready
  function initWarmup() {
    originalFetch('/api/health', { cache: 'no-store' })
      .then(res => res.json())
      .then(data => {
        console.log('[Render Wakeup] Server is active & responding. Uptime:', data.uptime, 's');
      })
      .catch(() => {
        console.log('[Render Wakeup] Initial ping sent to wake server.');
      });

    // Periodic ping every 7 minutes to keep Render alive while user tab is open
    setInterval(() => {
      originalFetch('/api/health', { cache: 'no-store' }).catch(() => {});
    }, 7 * 60 * 1000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWarmup);
  } else {
    initWarmup();
  }

  // Global handle to manually ping/check
  window.checkServerWarmup = function () {
    return originalFetch('/api/health', { cache: 'no-store' });
  };
})();
