const mysql = require("mysql2/promise");
require("dotenv").config();

let pool = null;

const getDbPool = async () => {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT || 4000,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,

      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,

      // TiDB Cloud SSL
      ssl: {
        rejectUnauthorized: true,
      },
    });

    try {
      const connection = await pool.getConnection();
      console.log("✅ TiDB Connected Successfully");
      connection.release();
    } catch (error) {
      console.error("❌ Database Connection Failed:", error.message);
      process.exit(1);
    }
  }

  return pool;
};

module.exports = getDbPool;