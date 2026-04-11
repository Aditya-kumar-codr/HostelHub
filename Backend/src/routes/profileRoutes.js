import express from 'express';
import { getProfile, updateProfile } from '../controllers/profileController.js';

const router = express.Router();

router.get('/:firebaseUid', getProfile);
router.put('/', updateProfile);

export default router;
