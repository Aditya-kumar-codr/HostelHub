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

    // Create Meal Table
    await client.query(`
      CREATE TABLE IF NOT EXISTS "Meal" (
        "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        "date" DATE NOT NULL,
        "mealType" VARCHAR(20) NOT NULL CHECK ("mealType" IN ('breakfast', 'lunch', 'dinner')),
        "items" TEXT NOT NULL,
        "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        UNIQUE("date", "mealType")
      );
    `);

    // Create Review Table
    await client.query(`
      CREATE TABLE IF NOT EXISTS "Review" (
        "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        "studentName" VARCHAR(255) NOT NULL,
        "meal" VARCHAR(50) NOT NULL,
        "rating" INTEGER NOT NULL CHECK ("rating" >= 1 AND "rating" <= 5),
        "comment" TEXT NOT NULL,
        "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Ensure foodItems column is added in case table already exists
    await client.query(`
      ALTER TABLE "Review" ADD COLUMN IF NOT EXISTS "foodItems" TEXT DEFAULT '';
    `);

    // Create Announcement Table
    await client.query(`
      CREATE TABLE IF NOT EXISTS "Announcement" (
        "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        "title" VARCHAR(500) NOT NULL,
        "content" TEXT NOT NULL,
        "importance" VARCHAR(20) NOT NULL DEFAULT 'normal' CHECK ("importance" IN ('low', 'normal', 'important', 'urgent')),
        "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create Complaint Table
    await client.query(`
      CREATE TABLE IF NOT EXISTS "Complaint" (
        "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        "studentName" VARCHAR(255) NOT NULL,
        "title" VARCHAR(500) NOT NULL,
        "description" TEXT NOT NULL,
        "status" VARCHAR(20) NOT NULL DEFAULT 'Pending' CHECK ("status" IN ('Pending', 'Received', 'Resolved')),
        "importance" VARCHAR(20) NOT NULL DEFAULT 'normal' CHECK ("importance" IN ('low', 'normal', 'important', 'urgent')),
        "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // In case the Complaint table was already created before we added importance
    await client.query(`
      ALTER TABLE "Complaint" ADD COLUMN IF NOT EXISTS "importance" VARCHAR(20) NOT NULL DEFAULT 'normal' CHECK ("importance" IN ('low', 'normal', 'important', 'urgent'));
    `);

    // Create Expense Table
    await client.query(`
      CREATE TABLE IF NOT EXISTS "Expense" (
        "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        "studentName" VARCHAR(255) NOT NULL,
        "title" VARCHAR(500) NOT NULL,
        "amount" NUMERIC(10, 2) NOT NULL DEFAULT 0,
        "dueDate" VARCHAR(50),
        "isPaid" BOOLEAN NOT NULL DEFAULT false,
        "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create LostFound Table
    await client.query(`
      CREATE TABLE IF NOT EXISTS "LostFound" (
        "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        "itemName" VARCHAR(500) NOT NULL,
        "description" TEXT NOT NULL,
        "reportedBy" VARCHAR(255) NOT NULL,
        "location" VARCHAR(255),
        "category" VARCHAR(50) NOT NULL DEFAULT 'Other',
        "status" VARCHAR(20) NOT NULL DEFAULT 'Lost' CHECK ("status" IN ('Lost', 'Found', 'Returned')),
        "foundBy" VARCHAR(255),
        "foundByPhone" VARCHAR(50),
        "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // In case LostFound table already exists without new columns
    await client.query(`
      ALTER TABLE "LostFound" ADD COLUMN IF NOT EXISTS "foundBy" VARCHAR(255);
    `);
    await client.query(`
      ALTER TABLE "LostFound" ADD COLUMN IF NOT EXISTS "foundByPhone" VARCHAR(50);
    `);

    client.release();
    console.log('Database tables initialized securely!');
  } catch (error) {
    console.error('Error initializing database tables:', error);
  }
};
