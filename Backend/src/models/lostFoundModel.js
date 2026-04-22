import { pool } from '../config/db.js';

export const getAllLostFoundItems = async () => {
  const result = await pool.query('SELECT * FROM "LostFound" ORDER BY "createdAt" DESC');
  return result.rows;
};

export const getLostFoundByStatus = async (status) => {
  const result = await pool.query(
    'SELECT * FROM "LostFound" WHERE "status" = $1 ORDER BY "createdAt" DESC',
    [status]
  );
  return result.rows;
};

export const createLostFoundItem = async (itemName, description, reportedBy, location, category) => {
  const result = await pool.query(
    `INSERT INTO "LostFound" ("itemName", "description", "reportedBy", "location", "category", "status")
     VALUES ($1, $2, $3, $4, $5, 'Lost') RETURNING *`,
    [itemName, description, reportedBy, location || null, category || 'Other']
  );
  return result.rows[0];
};

export const updateLostFoundStatus = async (id, status) => {
  const result = await pool.query(
    `UPDATE "LostFound" SET "status" = $1, "updatedAt" = CURRENT_TIMESTAMP WHERE "id" = $2 RETURNING *`,
    [status, id]
  );
  return result.rows[0];
};

export const reportItemFound = async (id, foundBy) => {
  const result = await pool.query(
    `UPDATE "LostFound" SET "foundBy" = $1, "status" = 'Found', "updatedAt" = CURRENT_TIMESTAMP WHERE "id" = $2 RETURNING *`,
    [foundBy, id]
  );
  return result.rows[0];
};

export const deleteLostFoundItem = async (id) => {
  const result = await pool.query('DELETE FROM "LostFound" WHERE "id" = $1 RETURNING *', [id]);
  return result.rows[0];
};
