import express from 'express';
import { getLostFoundItems, addLostFoundItem, updateItemStatus, reportFound, removeItem } from '../controllers/lostFoundController.js';

const router = express.Router();

router.get('/', getLostFoundItems);
router.post('/', addLostFoundItem);
router.put('/:id/status', updateItemStatus);
router.put('/:id/report-found', reportFound);
router.delete('/:id', removeItem);

export default router;
