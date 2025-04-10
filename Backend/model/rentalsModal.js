import {pool} from '../config/config.js'; // Ensure this is your MySQL connection pool

export const getAllrentals = async () => {
  try {
    const [rows] = await pool.query('SELECT * FROM rentals');
    return rows;
  } catch (error) {
    throw error;
  }
};
