import express from 'express';
import { getLaundryOrders, addLaundryOrder, updateOrderStatus, removeOrder } from '../controllers/laundryController.js';

const router = express.Router();

router.get('/', getLaundryOrders);
router.post('/', addLaundryOrder);
router.put('/:id/status', updateOrderStatus);
router.delete('/:id', removeOrder);

export default router;
