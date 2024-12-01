// database
const mysql = require('mysql2/promise');
require('dotenv').config();

const isCloud = process.env.NODE_ENV === 'production';

const pool = mysql.createPool({
  host: isCloud ? process.env.DB_SOCKET_PATH : process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ...(isCloud && { socketPath: process.env.DB_SOCKET_PATH }),
});

module.exports = pool;
