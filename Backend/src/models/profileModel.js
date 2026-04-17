import { randomUUID } from 'crypto';
import { pool } from '../config/db.js';

export const getProfileByUserId = async (userId) => {
  const result = await pool.query('SELECT * FROM "Profile" WHERE "userId" = $1', [userId]);
  return result.rows[0];
};

export const getAllProfilesWithUsers = async () => {
  const result = await pool.query(`
    SELECT 
      u."id" AS "userIdPk", u."firebaseUid", u."email", u."displayName",
      p.*
    FROM "User" u
    LEFT JOIN "Profile" p ON u."firebaseUid" = p."userId"
    ORDER BY u."createdAt" DESC
  `);
  return result.rows;
};

export const upsertProfile = async (userId, profileData) => {
  const {
    phone, course, enrollment, bloodGroup, dob,
    contactName, relation, contactNumber,
    hostelName, room, roomType, joinDate, dietPreference
  } = profileData;

  const check = await pool.query('SELECT id FROM "Profile" WHERE "userId" = $1', [userId]);

  if (check.rows.length > 0) {
    // Update
    const result = await pool.query(`
      UPDATE "Profile" SET
        "phone" = $1, "course" = $2, "enrollment" = $3, "bloodGroup" = $4, "dob" = $5,
        "contactName" = $6, "relation" = $7, "contactNumber" = $8,
        "hostelName" = $9, "room" = $10, "roomType" = $11, "joinDate" = $12, "dietPreference" = $13,
        "updatedAt" = CURRENT_TIMESTAMP
      WHERE "userId" = $14 RETURNING *
    `, [phone, course, enrollment, bloodGroup, dob, contactName, relation, contactNumber, hostelName, room, roomType, joinDate, dietPreference, userId]);
    return result.rows[0];
  } else {
    // Insert
    const newId = randomUUID();
    const result = await pool.query(`
      INSERT INTO "Profile" (
        "id", "userId", "phone", "course", "enrollment", "bloodGroup", "dob",
        "contactName", "relation", "contactNumber",
        "hostelName", "room", "roomType", "joinDate", "dietPreference", "updatedAt"
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, CURRENT_TIMESTAMP)
      RETURNING *
    `, [newId, userId, phone, course, enrollment, bloodGroup, dob, contactName, relation, contactNumber, hostelName, room, roomType, joinDate, dietPreference]);
    return result.rows[0];
  }
};
