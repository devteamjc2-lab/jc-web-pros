const getDbPool = require("../db");

const users = [
  {
    name: "Admin",
    email: "admin@gmail.com",
    password: "123456",
  },
  {
    name: "Keshav",
    email: "keshav@gmail.com",
    password: "123456",
  },
];

async function seedUsers() {
  try {
    const pool = await getDbPool();

    for (const user of users) {
      // Check user already exists
      const [rows] = await pool.execute(
        "SELECT id FROM jc_web_pros_users WHERE email = ?",
        [user.email]
      );

      if (rows.length > 0) {
        console.log(`⏩ ${user.email} already exists. Skipping...`);
        continue;
      }

      // Insert user
      await pool.execute(
        "INSERT INTO jc_web_pros_users (name, email, password) VALUES (?, ?, ?)",
        [user.name, user.email, user.password]
      );

      console.log(`✅ ${user.email} inserted`);
    }

    console.log("🎉 Seeding completed");
    await pool.end();

  } catch (error) {
    console.error("❌ Seeder Error:", error.message);
  }
}

module.exports = seedUsers;