import { getProfileByUserId, upsertProfile, getAllProfilesWithUsers } from '../models/profileModel.js';
import { findUserByFirebaseUid, createUser, updateUserName } from '../models/userModel.js';

export const getProfile = async (req, res) => {
  try {
    const { firebaseUid } = req.params;
    if (!firebaseUid) return res.status(400).json({ error: 'firebaseUid is required' });

    let profile = await getProfileByUserId(firebaseUid);
    const user = await findUserByFirebaseUid(firebaseUid);

    if (!profile) profile = {}; // Return empty if not created yet
    res.status(200).json({ ...profile, user });
  } catch (error) {
    console.error("Error getting profile:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getAllProfiles = async (req, res) => {
  try {
    const profiles = await getAllProfilesWithUsers();
    res.status(200).json(profiles);
  } catch (error) {
    console.error("Error getting all profiles:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { firebaseUid, name, email } = req.body;
    if (!firebaseUid) return res.status(400).json({ error: 'firebaseUid is required' });

    // Ensure user exists in User table before updating profile
    let user = await findUserByFirebaseUid(firebaseUid);
    if (!user) {
      // Auto-create the user record if it doesn't exist yet
      user = await createUser(firebaseUid, email || '', name || '');
      console.log('Auto-created user record for:', firebaseUid);
    }

    // Update display name if provided
    if (name) {
      await updateUserName(firebaseUid, name);
    }

    const updatedProfile = await upsertProfile(firebaseUid, req.body);
    res.status(200).json(updatedProfile);
  } catch (error) {
    console.error("Error updating profile:", error.message);
    console.error("Full error:", error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
};
