const getDbPool = require("../db");
const bcrypt = require("bcrypt");

const users = [
  {
    name: "Admin",
    email: "admin@gmail.com",
    password: "123456",
    role: "Admin",
  },
  {
    name: "Keshav",
    email: "keshav@gmail.com",
    password: "123456",
    role: "User",
  },
];

async function seedUsers() {
  try {
    const pool = await getDbPool();

    for (const user of users) {
      // Check if user already exists
      const [rows] = await pool.execute(
        "SELECT id FROM jc_web_pros_users WHERE email = ?",
        [user.email]
      );

      if (rows.length > 0) {
        if (user.role) {
          await pool.execute("UPDATE jc_web_pros_users SET role = ? WHERE email = ?", [user.role, user.email]);
        }
        console.log(`⏩ ${user.email} already exists. Skipping...`);
        continue;
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(user.password, 10);

      // Insert user
      await pool.execute(
        `INSERT INTO jc_web_pros_users
        (name, email, password, role)
        VALUES (?, ?, ?, ?)`,
        [user.name, user.email, hashedPassword, user.role || "User"]
      );

      console.log(`✅ ${user.email} inserted`);
    }

    console.log("🎉 Seeding completed");
  } catch (error) {
    console.error("❌ Seeder Error:", error.message);
  }
}

module.exports = seedUsers;