import { pool } from '../config/db.js';

export const getAllLaundryOrders = async () => {
  const result = await pool.query('SELECT * FROM "Laundry" ORDER BY "createdAt" DESC');
  return result.rows;
};

export const getLaundryByStudent = async (studentName) => {
  const result = await pool.query(
    'SELECT * FROM "Laundry" WHERE "studentName" = $1 ORDER BY "createdAt" DESC',
    [studentName]
  );
  return result.rows;
};

export const createLaundryOrder = async (studentName, studentRoom, items) => {
  const result = await pool.query(
    `INSERT INTO "Laundry" ("studentName", "studentRoom", "items", "status")
     VALUES ($1, $2, $3, 'Received') RETURNING *`,
    [studentName, studentRoom || null, items]
  );
  return result.rows[0];
};

export const updateLaundryStatus = async (id, status) => {
  const result = await pool.query(
    `UPDATE "Laundry" SET "status" = $1, "updatedAt" = CURRENT_TIMESTAMP WHERE "id" = $2 RETURNING *`,
    [status, id]
  );
  return result.rows[0];
};

export const deleteLaundryOrder = async (id) => {
  const result = await pool.query('DELETE FROM "Laundry" WHERE "id" = $1 RETURNING *', [id]);
  return result.rows[0];
};
