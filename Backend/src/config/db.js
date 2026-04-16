import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

export const initDB = async () => {
  try {
    const client = await pool.connect();
    console.log('Connected to PostgreSQL DataBase');

    // Create User Table
    await client.query(`
      CREATE TABLE IF NOT EXISTS "User" (
        "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        "firebaseUid" VARCHAR(255) UNIQUE NOT NULL,
        "email" VARCHAR(255) UNIQUE NOT NULL,
        "displayName" VARCHAR(255),
        "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create Profile Table
    await client.query(`
      CREATE TABLE IF NOT EXISTS "Profile" (
        "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        "userId" VARCHAR(255) UNIQUE NOT NULL,
        "phone" VARCHAR(50),
        "course" VARCHAR(255),
        "enrollment" VARCHAR(100),
        "bloodGroup" VARCHAR(10),
        "dob" VARCHAR(50),
        "contactName" VARCHAR(255),
        "relation" VARCHAR(100),
        "contactNumber" VARCHAR(50),
        "hostelName" VARCHAR(255),
        "room" VARCHAR(50),
        "roomType" VARCHAR(50),
        "joinDate" VARCHAR(50),
        "dietPreference" VARCHAR(100),
        "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_user
          FOREIGN KEY("userId") 
          REFERENCES "User"("firebaseUid") 
          ON DELETE CASCADE
      );
    `);

    client.release();
    console.log('Database tables initialized securely!');
  } catch (error) {
    console.error('Error initializing database tables:', error);
  }
};
