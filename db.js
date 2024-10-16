const mysql = require('mysql2/promise');

// MySQL connection pool
const pool = mysql.createPool({
  host: 'srv1508.hstgr.io',
  user: 'u532021302_q',
  password: 'gangstaR551@',
  database: 'u532021302_q',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;
