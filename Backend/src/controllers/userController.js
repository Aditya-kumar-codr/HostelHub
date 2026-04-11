import { findUserByFirebaseUid, createUser } from '../models/userModel.js';

export const saveOrFetchUser = async (req, res) => {
  try {
    const { firebaseUid, email, displayName } = req.body;
    
    if (!firebaseUid || !email) {
      return res.status(400).json({ error: 'firebaseUid and email are required' });
    }

    // Check if user already exists
    let user = await findUserByFirebaseUid(firebaseUid);

    if (!user) {
      // Create new user in Postgres
      user = await createUser(firebaseUid, email, displayName || null);
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).json({ error: 'Internal server error while saving user' });
  }
};
