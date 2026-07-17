const { getDbPool } = require('../db');

async function getAllUsers(req, res) {
  try {
    const pool = await getDbPool();
    const [rows] = await pool.query('SELECT * FROM jc_web_pros_records ORDER BY id DESC');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function createUser(req, res) {
  try {
    const { name, email, message } = req.body;
    const pool = await getDbPool();
    const [result] = await pool.execute(
      'INSERT INTO jc_web_pros_records (name, email, message) VALUES (?, ?, ?)',
      [name, email || '', message || '']
    );

    res.status(201).json({ id: result.insertId, name, email, message });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = { getAllUsers, createUser };
