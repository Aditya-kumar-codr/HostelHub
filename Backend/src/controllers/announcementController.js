import { getAllAnnouncements, getAnnouncementById, createAnnouncement, updateAnnouncement, deleteAnnouncement } from '../models/announcementModel.js';

export const getAnnouncements = async (req, res) => {
  try {
    const announcements = await getAllAnnouncements();
    res.status(200).json(announcements);
  } catch (error) {
    console.error("Error fetching announcements:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const addAnnouncement = async (req, res) => {
  try {
    const { title, content, importance } = req.body;
    if (!title || !content) return res.status(400).json({ error: 'Title and content are required' });

    const announcement = await createAnnouncement(title, content, importance);
    res.status(201).json(announcement);
  } catch (error) {
    console.error("Error creating announcement:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const editAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, importance } = req.body;
    if (!title || !content) return res.status(400).json({ error: 'Title and content are required' });

    const announcement = await updateAnnouncement(id, title, content, importance);
    if (!announcement) return res.status(404).json({ error: 'Announcement not found' });
    res.status(200).json(announcement);
  } catch (error) {
    console.error("Error updating announcement:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const removeAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;
    const announcement = await deleteAnnouncement(id);
    if (!announcement) return res.status(404).json({ error: 'Announcement not found' });
    res.status(200).json({ message: 'Announcement deleted', announcement });
  } catch (error) {
    console.error("Error deleting announcement:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
