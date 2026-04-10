const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');

// Load environment variables
dotenv.config();

// Initialize PostgreSQL driver adapter for Prisma
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Allow parsing JSON request bodies

// Basic route to test the server
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the HostelHub API' });
});

// Save or fetch user data after Firebase login
app.post('/api/users', async (req, res) => {
  try {
    const { firebaseUid, email, displayName } = req.body;
    
    if (!firebaseUid || !email) {
      return res.status(400).json({ error: 'firebaseUid and email are required' });
    }

    // Check if user already exists
    let user = await prisma.user.findUnique({
      where: { firebaseUid }
    });

    if (!user) {
      // Create new user in Postgres
      user = await prisma.user.create({
        data: {
          firebaseUid,
          email,
          displayName: displayName || null,
        }
      });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).json({ error: 'Internal server error while saving user' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
