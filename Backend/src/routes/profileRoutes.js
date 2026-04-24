import express from 'express';
import { getProfile, updateProfile, getAllProfiles, deleteStudent } from '../controllers/profileController.js';

const router = express.Router();

router.get('/all', getAllProfiles);
router.get('/:firebaseUid', getProfile);
router.put('/', updateProfile);
router.delete('/:firebaseUid', deleteStudent);

export default router;
