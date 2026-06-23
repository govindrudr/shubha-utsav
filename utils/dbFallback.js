const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, '..', 'db.json');

// Initialize local DB if it doesn't exist
function initDb() {
  if (!fs.existsSync(DB_PATH)) {
    const defaultData = {
      leads: [],
      orders: [],
      otps: []
    };
    fs.writeFileSync(DB_PATH, JSON.stringify(defaultData, null, 2), 'utf-8');
  }
}

function readDb() {
  initDb();
  try {
    const content = fs.readFileSync(DB_PATH, 'utf-8');
    return JSON.parse(content);
  } catch (err) {
    console.error('Error reading fallback JSON database, resetting database.', err);
    return { leads: [], orders: [], otps: [] };
  }
}

function writeDb(data) {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing fallback JSON database.', err);
  }
}

const dbFallback = {
  // Find records in a collection with basic matching
  find: async (collectionName, query = {}, sort = null) => {
    const db = readDb();
    let items = db[collectionName] || [];

    // Filter items based on query fields
    items = items.filter(item => {
      for (const key in query) {
        // Support regex searches for query
        if (query[key] instanceof RegExp) {
          if (!item[key] || !query[key].test(String(item[key]))) {
            return false;
          }
        } else if (typeof query[key] === 'object' && query[key] !== null) {
          // Range queries like $gte or $lte
          const val = item[key];
          const cond = query[key];
          if (cond.$gte !== undefined && val < cond.$gte) return false;
          if (cond.$lte !== undefined && val > cond.$lte) return false;
          if (cond.$gt !== undefined && val <= cond.$gt) return false;
          if (cond.$lt !== undefined && val >= cond.$lt) return false;
        } else {
          // Exact match
          if (item[key] !== query[key]) {
            return false;
          }
        }
      }
      return true;
    });

    // Apply sorting
    if (sort) {
      const keys = Object.keys(sort);
      if (keys.length > 0) {
        const sortKey = keys[0];
        const dir = sort[sortKey]; // 1 or -1
        items.sort((a, b) => {
          let valA = a[sortKey];
          let valB = b[sortKey];
          if (typeof valA === 'string') valA = valA.toLowerCase();
          if (typeof valB === 'string') valB = valB.toLowerCase();
          if (valA < valB) return dir === 1 ? -1 : 1;
          if (valA > valB) return dir === 1 ? 1 : -1;
          return 0;
        });
      }
    }

    return items;
  },

  findOne: async (collectionName, query = {}) => {
    const items = await dbFallback.find(collectionName, query);
    return items.length > 0 ? items[0] : null;
  },

  // Save or update record
  save: async (collectionName, record, idField = '_id') => {
    const db = readDb();
    if (!db[collectionName]) db[collectionName] = [];

    const items = db[collectionName];
    const index = items.findIndex(item => item[idField] === record[idField]);

    if (index !== -1) {
      // Update
      record.lastUpdated = new Date();
      items[index] = { ...items[index], ...record };
    } else {
      // Create new
      if (!record[idField]) {
        record[idField] = Math.random().toString(36).substring(2, 11);
      }
      record.createdDate = new Date();
      record.lastUpdated = new Date();
      items.push(record);
    }

    writeDb(db);
    return record;
  },

  // Count items
  count: async (collectionName, query = {}) => {
    const items = await dbFallback.find(collectionName, query);
    return items.length;
  },

  // Get metrics stats
  getMetrics: async () => {
    const db = readDb();
    const leads = db.leads || [];
    const orders = db.orders || [];

    const totalLeads = leads.length;
    const verifiedLeads = leads.filter(l => l.verificationStatus === 'Verified').length;
    const pendingLeads = leads.filter(l => l.verificationStatus === 'Pending').length;
    const totalOrders = orders.length;

    const revenue = orders
      .filter(o => o.orderStatus !== 'Closed') // sum up pending/active orders
      .reduce((sum, o) => sum + (Number(o.totalAmount) || 0), 0);

    const conversionRate = totalLeads > 0 ? ((verifiedLeads / totalLeads) * 100).toFixed(1) : 0;

    return {
      totalLeads,
      verifiedLeads,
      pendingLeads,
      totalOrders,
      revenue,
      conversionRate
    };
  }
};

module.exports = dbFallback;
