import { pool } from '../config/db.js';

export const getAllAnnouncements = async () => {
  const result = await pool.query('SELECT * FROM "Announcement" ORDER BY "createdAt" DESC');
  return result.rows;
};

export const getAnnouncementById = async (id) => {
  const result = await pool.query('SELECT * FROM "Announcement" WHERE "id" = $1', [id]);
  return result.rows[0];
};

export const createAnnouncement = async (title, content, importance) => {
  const result = await pool.query(
    'INSERT INTO "Announcement" ("title", "content", "importance") VALUES ($1, $2, $3) RETURNING *',
    [title, content, importance || 'normal']
  );
  return result.rows[0];
};

export const updateAnnouncement = async (id, title, content, importance) => {
  const result = await pool.query(
    `UPDATE "Announcement" SET "title" = $1, "content" = $2, "importance" = $3, "updatedAt" = CURRENT_TIMESTAMP WHERE "id" = $4 RETURNING *`,
    [title, content, importance, id]
  );
  return result.rows[0];
};

export const deleteAnnouncement = async (id) => {
  const result = await pool.query('DELETE FROM "Announcement" WHERE "id" = $1 RETURNING *', [id]);
  return result.rows[0];
};
