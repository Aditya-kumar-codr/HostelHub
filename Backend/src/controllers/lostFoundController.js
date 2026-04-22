import {
  getAllLostFoundItems,
  createLostFoundItem,
  updateLostFoundStatus,
  reportItemFound,
  deleteLostFoundItem,
} from '../models/lostFoundModel.js';

export const getLostFoundItems = async (req, res) => {
  try {
    const items = await getAllLostFoundItems();
    res.status(200).json(items);
  } catch (error) {
    console.error('Error fetching lost & found items:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const addLostFoundItem = async (req, res) => {
  try {
    const { itemName, description, reportedBy, location, category } = req.body;
    if (!itemName || !description || !reportedBy) {
      return res.status(400).json({ error: 'itemName, description, and reportedBy are required' });
    }
    const item = await createLostFoundItem(itemName, description, reportedBy, location, category);
    res.status(201).json(item);
  } catch (error) {
    console.error('Error creating lost & found item:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateItemStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!['Lost', 'Found', 'Returned'].includes(status)) {
      return res.status(400).json({ error: 'Status must be Lost, Found, or Returned' });
    }
    const item = await updateLostFoundStatus(id, status);
    if (!item) return res.status(404).json({ error: 'Item not found' });
    res.status(200).json(item);
  } catch (error) {
    console.error('Error updating lost & found status:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Student reports they found a lost item
export const reportFound = async (req, res) => {
  try {
    const { id } = req.params;
    const { foundBy } = req.body;
    if (!foundBy) {
      return res.status(400).json({ error: 'foundBy (student name) is required' });
    }
    const item = await reportItemFound(id, foundBy);
    if (!item) return res.status(404).json({ error: 'Item not found' });
    res.status(200).json(item);
  } catch (error) {
    console.error('Error reporting found item:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const removeItem = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await deleteLostFoundItem(id);
    if (!item) return res.status(404).json({ error: 'Item not found' });
    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error('Error deleting lost & found item:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
