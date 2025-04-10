import { getAllcomingsoon } from '../model/comingsoonModal.js';

export const getComingsoon = async (req, res) => {
  try {
    const coming_soon = await getAllcomingsoon();
    res.status(200).json(coming_soon);
  } catch (error) {
    console.error('Error fetching coming_soon:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
