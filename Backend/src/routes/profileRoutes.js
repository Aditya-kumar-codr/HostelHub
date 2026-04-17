import express from 'express';
import { getProfile, updateProfile, getAllProfiles } from '../controllers/profileController.js';

const router = express.Router();

router.get('/all', getAllProfiles);
router.get('/:firebaseUid', getProfile);
router.put('/', updateProfile);

export default router;
