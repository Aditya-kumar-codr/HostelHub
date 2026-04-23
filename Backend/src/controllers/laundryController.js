import {
  getAllLaundryOrders,
  getLaundryByStudent,
  createLaundryOrder,
  updateLaundryStatus,
  deleteLaundryOrder,
} from '../models/laundryModel.js';

export const getLaundryOrders = async (req, res) => {
  try {
    const { studentName } = req.query;
    const orders = studentName
      ? await getLaundryByStudent(studentName)
      : await getAllLaundryOrders();
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching laundry orders:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const addLaundryOrder = async (req, res) => {
  try {
    const { studentName, studentRoom, items } = req.body;
    if (!studentName || !items) {
      return res.status(400).json({ error: 'studentName and items are required' });
    }
    const order = await createLaundryOrder(studentName, studentRoom, items);
    res.status(201).json(order);
  } catch (error) {
    console.error('Error creating laundry order:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!['Received', 'Washing', 'Ready', 'Collected'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }
    const order = await updateLaundryStatus(id, status);
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.status(200).json(order);
  } catch (error) {
    console.error('Error updating laundry status:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const removeOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await deleteLaundryOrder(id);
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    console.error('Error deleting laundry order:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
