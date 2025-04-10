import { getCart, postCart, deleteCartItem } from '../model/cartModel.js';

export const postCartController = async (req, res) => {
  try {
    const { movie_id } = req.body;
    const user_id = req.user.userId;

    const cart = await postCart(user_id, movie_id);
    res.status(200).json(cart);
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getCartController = async (req, res) => {
  try {
    const user_id = req.user.userId;

    const cart = await getCart(user_id);
    res.status(200).json(cart);
  } catch (error) {
    console.error('Error getting cart:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const deleteCartItemController = async (req, res) => {
  try {
    const { movieId } = req.params;
    const user_id = req.user.userId;

    const cart = await deleteCartItem(user_id, movieId);
    res.status(200).json(cart);
  } catch (error) {
    console.error('Error deleting cart item:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};