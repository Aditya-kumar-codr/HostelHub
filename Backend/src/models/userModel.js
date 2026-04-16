import { pool } from '../config/db.js';

export const findUserByFirebaseUid = async (firebaseUid) => {
  const result = await pool.query('SELECT * FROM "User" WHERE "firebaseUid" = $1', [firebaseUid]);
  return result.rows[0];
};

export const createUser = async (firebaseUid, email, displayName) => {
  const result = await pool.query(
    'INSERT INTO "User" ("firebaseUid", "email", "displayName") VALUES ($1, $2, $3) RETURNING *',
    [firebaseUid, email, displayName]
  );
  return result.rows[0];
};

export const updateUserName = async (firebaseUid, displayName) => {
  const result = await pool.query(
    'UPDATE "User" SET "displayName" = $1 WHERE "firebaseUid" = $2 RETURNING *',
    [displayName, firebaseUid]
  );
  return result.rows[0];
};
