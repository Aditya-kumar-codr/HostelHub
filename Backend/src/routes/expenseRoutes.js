import express from 'express';
import { getExpenses, addExpense, toggleExpensePaid, removeExpense } from '../controllers/expenseController.js';

const router = express.Router();

router.get('/', getExpenses);
router.post('/', addExpense);
router.put('/:id/paid', toggleExpensePaid);
router.delete('/:id', removeExpense);

export default router;
