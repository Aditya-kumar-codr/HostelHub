import {
  getAllExpenses,
  getExpensesByStudent,
  createExpense,
  updateExpensePaidStatus,
  deleteExpense,
} from '../models/expenseModel.js';

export const getExpenses = async (req, res) => {
  try {
    const { studentName } = req.query;
    const expenses = studentName
      ? await getExpensesByStudent(studentName)
      : await getAllExpenses();
    res.status(200).json(expenses);
  } catch (error) {
    console.error('Error fetching expenses:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const addExpense = async (req, res) => {
  try {
    const { studentName, title, amount, dueDate } = req.body;
    if (!studentName || !title || amount === undefined) {
      return res.status(400).json({ error: 'studentName, title, and amount are required' });
    }
    const expense = await createExpense(studentName, title, amount, dueDate);
    res.status(201).json(expense);
  } catch (error) {
    console.error('Error creating expense:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const toggleExpensePaid = async (req, res) => {
  try {
    const { id } = req.params;
    const { isPaid } = req.body;
    const expense = await updateExpensePaidStatus(id, isPaid);
    if (!expense) return res.status(404).json({ error: 'Expense not found' });
    res.status(200).json(expense);
  } catch (error) {
    console.error('Error updating expense paid status:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const removeExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const expense = await deleteExpense(id);
    if (!expense) return res.status(404).json({ error: 'Expense not found' });
    res.status(200).json({ message: 'Expense deleted successfully' });
  } catch (error) {
    console.error('Error deleting expense:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
