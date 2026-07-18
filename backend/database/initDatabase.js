const getDbPool = require("../db");

async function initDatabase() {
  try {
    const pool = await getDbPool();

    // ==========================
    // Users Table
    // ==========================
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

    // ==========================
    // Conversations Table
    // ==========================
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS jc_web_pros_conversations (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) DEFAULT NULL,
        type ENUM('private','group') NOT NULL,
        created_by INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

        CONSTRAINT fk_conversation_creator
        FOREIGN KEY (created_by)
        REFERENCES jc_web_pros_users(id)
        ON DELETE CASCADE
      )
    `);

    console.log("✅ Conversations table ready");

    // ==========================
    // Conversation Members
    // ==========================
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS jc_web_pros_conversation_members (
        id INT AUTO_INCREMENT PRIMARY KEY,
        conversation_id INT NOT NULL,
        user_id INT NOT NULL,
        joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

        CONSTRAINT fk_member_conversation
        FOREIGN KEY (conversation_id)
        REFERENCES jc_web_pros_conversations(id)
        ON DELETE CASCADE,

        CONSTRAINT fk_member_user
        FOREIGN KEY (user_id)
        REFERENCES jc_web_pros_users(id)
        ON DELETE CASCADE,

        UNIQUE(conversation_id, user_id)
      )
    `);

    console.log("✅ Conversation Members table ready");

    // ==========================
    // Messages Table
    // ==========================
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS jc_web_pros_messages (
        id INT AUTO_INCREMENT PRIMARY KEY,
        conversation_id INT NOT NULL,
        sender_id INT NOT NULL,
        message TEXT NOT NULL,
        message_type ENUM('text','image','file') DEFAULT 'text',
        is_seen TINYINT(1) DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

        CONSTRAINT fk_message_conversation
        FOREIGN KEY (conversation_id)
        REFERENCES jc_web_pros_conversations(id)
        ON DELETE CASCADE,

        CONSTRAINT fk_message_sender
        FOREIGN KEY (sender_id)
        REFERENCES jc_web_pros_users(id)
        ON DELETE CASCADE
      )
    `);

    console.log("✅ Messages table ready");

    console.log("🎉 Database initialized successfully");

  } catch (error) {
    console.error("❌ Database initialization failed:", error);
  }
}

module.exports = initDatabase;