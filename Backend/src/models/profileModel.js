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
  const allFields = [
    'phone', 'course', 'enrollment', 'bloodGroup', 'dob',
    'contactName', 'relation', 'contactNumber',
    'hostelName', 'room', 'roomType', 'joinDate', 'dietPreference'
  ];

  const check = await pool.query('SELECT id FROM "Profile" WHERE "userId" = $1', [userId]);

  if (check.rows.length > 0) {
    // Only update fields that were actually provided (not undefined)
    const setClauses = [];
    const values = [];
    let paramIndex = 1;

    for (const field of allFields) {
      if (profileData[field] !== undefined) {
        setClauses.push(`"${field}" = $${paramIndex}`);
        values.push(profileData[field]);
        paramIndex++;
      }
    }

    // Always update the timestamp
    setClauses.push(`"updatedAt" = CURRENT_TIMESTAMP`);
    values.push(userId);

    const result = await pool.query(
      `UPDATE "Profile" SET ${setClauses.join(', ')} WHERE "userId" = $${paramIndex} RETURNING *`,
      values
    );
    return result.rows[0];
  } else {
    // Insert — use provided values or null for missing fields
    const newId = randomUUID();
    const result = await pool.query(`
      INSERT INTO "Profile" (
        "id", "userId", "phone", "course", "enrollment", "bloodGroup", "dob",
        "contactName", "relation", "contactNumber",
        "hostelName", "room", "roomType", "joinDate", "dietPreference", "updatedAt"
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, CURRENT_TIMESTAMP)
      RETURNING *
    `, [
      newId, userId,
      profileData.phone || null, profileData.course || null, profileData.enrollment || null,
      profileData.bloodGroup || null, profileData.dob || null,
      profileData.contactName || null, profileData.relation || null, profileData.contactNumber || null,
      profileData.hostelName || null, profileData.room || null, profileData.roomType || null,
      profileData.joinDate || null, profileData.dietPreference || null
    ]);
    return result.rows[0];
  }
};
