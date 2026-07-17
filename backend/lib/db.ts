import mysql, { ResultSetHeader } from "mysql2/promise";

export type DbRecord = {
  id: number;
  name: string;
  email?: string;
  message?: string;
  created_at?: string;
};

export type DbRecordInput = {
  name: string;
  email?: string;
  message?: string;
};

const tableName = "jc_web_pros_records";

function getDbConfig() {
  return {
    host: process.env.DB_HOST ?? "127.0.0.1",
    port: Number(process.env.DB_PORT ?? 3306),
    user: process.env.DB_USER ?? "root",
    password: process.env.DB_PASSWORD ?? "",
    database: process.env.DB_NAME ?? "jc_web_pros",
  };
}

let pool: ReturnType<typeof mysql.createPool> | null = null;

export function getPool() {
  if (!pool) {
    pool = mysql.createPool({
      ...getDbConfig(),
      connectionLimit: 10,
      waitForConnections: true,
      queueLimit: 0,
    });
  }

  return pool;
}

export async function ensureTable() {
  const connection = await getPool().getConnection();

  try {
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS ${tableName} (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) DEFAULT NULL,
        message TEXT DEFAULT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
  } finally {
    connection.release();
  }
}

export async function testConnection() {
  const connection = await getPool().getConnection();

  try {
    const [rows] = await connection.query("SELECT 1 as ok");
    return rows;
  } finally {
    connection.release();
  }
}

export async function readRecords() {
  await ensureTable();
  const [rows] = await getPool().query(`SELECT * FROM ${tableName} ORDER BY id DESC`);
  return rows as DbRecord[];
}

export async function createRecord(payload: DbRecordInput) {
  await ensureTable();

  const [result] = await getPool().execute(
    `INSERT INTO ${tableName} (name, email, message) VALUES (?, ?, ?)` ,
    [payload.name, payload.email ?? "", payload.message ?? ""]
  );

  return {
    id: (result as ResultSetHeader).insertId,
    ...payload,
  };
}

export async function updateRecord(id: number, payload: Partial<DbRecordInput>) {
  await ensureTable();

  const updates: string[] = [];
  const values: Array<string | number> = [];

  if (payload.name !== undefined) {
    updates.push("name = ?");
    values.push(payload.name);
  }

  if (payload.email !== undefined) {
    updates.push("email = ?");
    values.push(payload.email ?? "");
  }

  if (payload.message !== undefined) {
    updates.push("message = ?");
    values.push(payload.message ?? "");
  }

  if (updates.length === 0) {
    return null;
  }

  values.push(id);

  await getPool().execute(`UPDATE ${tableName} SET ${updates.join(", ")} WHERE id = ?`, values);

  return { id, ...payload };
}

export async function deleteRecord(id: number) {
  await ensureTable();
  await getPool().execute(`DELETE FROM ${tableName} WHERE id = ?`, [id]);
}
