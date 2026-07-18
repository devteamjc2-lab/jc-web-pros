const getDbPool = require("../db");

async function initDatabase() {
  try {
    const pool = await getDbPool();

    await pool.execute(`
      CREATE TABLE IF NOT EXISTS jc_web_pros_users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(150) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'User',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    console.log("✅ Users table ready");
  } catch (error) {
    console.error("❌ Database initialization failed:", error);
  }
}

module.exports = initDatabase;