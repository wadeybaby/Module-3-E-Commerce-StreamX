import { pool } from '../config/config.js';

export const getCart = async (user_id) => {
  try {
    console.log('getCart called with user_id:', user_id);

    if (!user_id) {
      console.error('Error in getCart: user_id is null or undefined');
      return [];
    }

    const [data] = await pool.query(
      'SELECT cart.movie_id, movies.title, movies.img_link, cart.quantity FROM cart JOIN movies ON cart.movie_id = movies.movie_id WHERE cart.user_id = ?',
      [user_id]
    );
    console.log('getCart result:', data);
    return data;
  } catch (error) {
    console.error('Database error in getCart:', error);
    throw error;
  }
};

export const postCart = async (user_id, movie_id) => {
  try {
    console.log('postCart called with user_id:', user_id, 'movie_id:', movie_id);

    if (!user_id) {
      console.error('Error in postCart: user_id is null or undefined');
      return [];
    }

    await pool.query(
      'INSERT INTO cart (`user_id`, `movie_id`, `quantity`) VALUES (?, ?, 1) ON DUPLICATE KEY UPDATE quantity = quantity + 1',
      [user_id, movie_id]
    );

    const [data] = await pool.query(
      'SELECT cart.movie_id, movies.title, movies.img_link, cart.quantity FROM cart JOIN movies ON cart.movie_id = movies.movie_id WHERE cart.user_id = ?',
      [user_id]
    );
    console.log('postCart result:', data);
    return data;
  } catch (error) {
    console.error('Database error in postCart:', error);
    throw error;
  }

};
export const deleteCartItem = async (user_id, movie_id) => {
    try {
      console.log('deleteCartItem called with user_id:', user_id, 'movie_id:', movie_id);
  
      if (!user_id) {
        console.error('Error in deleteCartItem: user_id is null or undefined');
        return [];
      }
  
      await pool.query('DELETE FROM cart WHERE user_id = ? AND movie_id = ?', [user_id, movie_id]);
  
      const [data] = await pool.query(
        'SELECT cart.movie_id, movies.title, movies.img_link, cart.quantity FROM cart JOIN movies ON cart.movie_id = movies.movie_id WHERE cart.user_id = ?',
        [user_id]
      );
      console.log('deleteCartItem result:', data);
      return data;
    } catch (error) {
      console.error('Database error in deleteCartItem:', error);
      throw error;
    }
  };