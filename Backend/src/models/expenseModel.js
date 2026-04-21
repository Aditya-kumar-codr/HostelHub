import { pool } from '../config/db.js';

export const getAllExpenses = async () => {
  const result = await pool.query('SELECT * FROM "Expense" ORDER BY "createdAt" DESC');
  return result.rows;
};

export const getExpensesByStudent = async (studentName) => {
  const result = await pool.query(
    'SELECT * FROM "Expense" WHERE "studentName" = $1 ORDER BY "createdAt" DESC',
    [studentName]
  );
  return result.rows;
};

export const createExpense = async (studentName, title, amount, dueDate) => {
  const result = await pool.query(
    'INSERT INTO "Expense" ("studentName", "title", "amount", "dueDate", "isPaid") VALUES ($1, $2, $3, $4, false) RETURNING *',
    [studentName, title, parseFloat(amount), dueDate || null]
  );
  return result.rows[0];
};

export const updateExpensePaidStatus = async (id, isPaid) => {
  const result = await pool.query(
    'UPDATE "Expense" SET "isPaid" = $1, "updatedAt" = CURRENT_TIMESTAMP WHERE "id" = $2 RETURNING *',
    [isPaid, id]
  );
  return result.rows[0];
};

export const deleteExpense = async (id) => {
  const result = await pool.query('DELETE FROM "Expense" WHERE "id" = $1 RETURNING *', [id]);
  return result.rows[0];
};
