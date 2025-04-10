import {pool} from '../config/config.js'; // Ensure this is your MySQL connection pool

export const getAllcomingsoon = async () => {
  try {
    const [rows] = await pool.query('SELECT * FROM coming_soon'); // Assuming your table is 'movies'
    return rows;
  } catch (error) {
    throw error;
  }
};
