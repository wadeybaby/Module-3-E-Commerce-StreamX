// store/index.js (Vuex store)
import { createStore } from 'vuex';
import axios from 'axios';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default createStore({
  state: {
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('token') || null,
    error: null,
    movies: [],
    users: [],
    comingSoonMovies: [],
    loading: false,
    isAdmin: false,
    cart: [],
    paymentStatus: '',  
    paymentError: '',
    paymentDetails: null,    
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
      localStorage.setItem('user', JSON.stringify(user));
    },
    SET_TOKEN(state, token) {
      state.token = token;
      localStorage.setItem('token', token);
    },
    SET_ERROR(state, error) {
      state.error = error;
    },
    setMovies(state, payload) {
      state.movies = payload;
    },
    setUsers(state, payload) {
      state.users = payload;
    },
    LOGOUT(state) {
      state.user = null;
      state.token = null;
      state.isAdmin = false;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
    SET_COMING_SOON_MOVIES(state, movies) {
      state.comingSoonMovies = movies;
    },
    SET_LOADING(state, isLoading) {
      state.loading = isLoading;
    },
    SET_IS_ADMIN(state, isAdmin) {
      state.isAdmin = isAdmin;
    },
    SET_CART(state, cart) {
      state.cart = cart;
    },
    SET_PAYMENT_STATUS(state, status) {  
      state.paymentStatus = status;
    },
    SET_PAYMENT_ERROR(state, error) {  
      state.paymentError = error;
    },
    SET_PAYMENT_DETAILS(state, details) { 
      state.paymentDetails = details;
    },
  },
  actions: {
    async signUpUser({ commit }, userData) {
      try {
        await axios.post('http://localhost:3001/users', userData);
        toast.success('Signup successful! Please log in.', { position: 'top-center', autoClose: 3000 });
      } catch (error) {
        commit('SET_ERROR', 'Signup failed');
        toast.error('Signup failed. Please try again.', { position: 'top-center', autoClose: 3000 });
        throw error;
      }
    },
    async loginUser({ commit }, loginInfo) {
      try {
        const { data } = await axios.post('http://localhost:3001/users/login', loginInfo);
        commit('SET_USER', data.user);
        commit('SET_TOKEN', data.token);
        commit('SET_IS_ADMIN', data.user.email?.endsWith('@StreamX.com'));
        console.log("Token after login:", data.token);
        toast.success(data.message, { position: 'top-center', autoClose: 1500 });
      } catch (error) {
        toast.error(error.response?.data?.message || 'Login failed');
        commit('SET_ERROR', error.response?.data?.message || 'Login failed');
      }
    },
    async getData({ commit }) {
      try {
        const [moviesResponse, usersResponse] = await Promise.all([
          axios.get('http://localhost:3001/movies'),
          axios.get('http://localhost:3001/users'),
        ]);
        commit('setMovies', moviesResponse.data);
        commit('setUsers', usersResponse.data);
      } catch (error) {
        commit('SET_ERROR', 'Failed to fetch data');
      }
    },
    async deleteMovie({ dispatch }, movie_id) {
      try {
        await axios.delete(`http://localhost:3001/movies/${movie_id}`);
        dispatch('getData');
      } catch {
        toast.error('Failed to delete movie');
      }
    },
    async postMovie({ dispatch }, movieData) {
      try {
        await axios.post('http://localhost:3001/movies', movieData);
        dispatch('getData');
      } catch {
        toast.error('Failed to add movie');
      }
    },
    async patchMovie({ dispatch }, { movie_id, updatedData }) {
      try {
        await axios.patch(`http://localhost:3001/movies/${movie_id}`, updatedData);
        dispatch('getData');
      } catch {
        toast.error('Failed to update movie');
      }
    },
    async deleteUser({ dispatch }, user_id) {
      try {
        await axios.delete(`http://localhost:3001/users/${user_id}`);
        dispatch('getData');
      } catch {
        toast.error('Failed to delete user');
      }
    },
    async patchUser({ dispatch }, { user_id, updatedData }) {
      try {
        await axios.patch(`http://localhost:3001/users/${user_id}`, updatedData);
        dispatch('getData');
      } catch {
        toast.error('Failed to update user');
      }
    },
    async fetchComingSoonMovies({ commit }) {
      commit('SET_LOADING', true);
      try {
        const { data } = await axios.get('http://localhost:3001/coming_soon');
        commit('SET_COMING_SOON_MOVIES', data);
      } catch (error) {
        commit('SET_ERROR', 'Failed to fetch movies');
      } finally {
        commit('SET_LOADING', false);
      }
    },
    logout({ commit }) {
      commit('LOGOUT');
    },
    async addToCart({ commit, state }, movieId) {
      try {
        const response = await axios.post(
          'http://localhost:3001/cart',
          { movie_id: movieId },
          {
            headers: {
              Authorization: `Bearer ${state.token}`,
            },
          }
        );
        commit('SET_CART', response.data);
        console.log("Cart response after add:", response);
        toast.success('Movie added to cart!', { position: 'top-center', autoClose: 1500 });
      } catch (error) {
        console.error('Error in addToCart action:', error);
        toast.error(error.response?.data?.message || 'Failed to add movie to cart.');
      }
    },

    async fetchCart({ commit, state }) {
      try {
        const response = await axios.get('http://localhost:3001/cart', {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        });
        commit('SET_CART', response.data);
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to fetch cart.');
      }
    },
    async deleteFromCart({ commit, state }, movieId) {
      try {
        const response = await axios.delete(`http://localhost:3001/cart/${movieId}`, {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        });
        commit('SET_CART', response.data);
        toast.success('Movie removed from cart.', { position: 'top-center', autoClose: 1500 });
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to remove movie from cart.');
      }
    },
    async processPaymentController({ commit, state, getters }) {
      try {
        // Ensure user ID is available in the state before proceeding
        const userId = state.user?.id;  // Make sure user ID is present in the state

        // if (!userId) {
        //   throw new Error('User ID is required for payment');
        // }

        // Prepare the payment data, including the total amount, user_id, payment_method, and any other relevant details
        const paymentData = {
          user_id: userId,  // Get user ID from the state
          amount: getters.cartTotal,  // Total amount calculated from the cart items
          payment_method: 'credit_card',  // Replace with dynamic method (e.g., 'credit_card', 'paypal', etc.)
        };

        // Make the API call to process the payment
        const response = await axios.post(
          'http://localhost:3001/payments', // Endpoint for processing payments
          paymentData,  // Send the payment data (amount, user_id, payment_method)
          {
            headers: { Authorization: `Bearer ${state.token}` },  // Pass the token for authorization
          }
        );

        // Check if the response is successful
        if (response.data.success) {
          // Commit the payment details to Vuex store
          commit('SET_PAYMENT_STATUS', 'success');
          commit('SET_PAYMENT_DETAILS', response.data.paymentDetails);  // Store the payment details from the response
          commit('SET_CART', []);  // Empty the cart after successful payment

          // Display success toast
          toast.success('Payment successful!', { position: 'top-center', autoClose: 2000 });
        } else {
          // Commit failure status to Vuex store
          commit('SET_PAYMENT_STATUS', 'failed');

          // Show an error toast for payment failure
          toast.error('Payment failed. Please try again.', { position: 'top-center', autoClose: 2000 });
        }
      } catch (error) {
        // Handle errors (e.g., network errors or API issues)
        const errorMessage = error.response?.data?.message || 'Payment failed due to a network error';

        // Commit error details to Vuex store
        commit('SET_PAYMENT_ERROR', errorMessage);

        // Show error toast for API or network failure
        toast.error(errorMessage, { position: 'top-center', autoClose: 2000 });

        // Log the error for debugging purposes
        console.error('Payment error:', error);
      }
    },

    // Fetch payment details for a given payment ID
    async fetchPaymentDetails({ commit, state }, paymentId) {
      try {
        // Log the request to fetch payment details for debugging
        console.log('Fetching payment details for payment ID:', paymentId);

        // Make the API call to fetch payment details
        const response = await axios.get(`http://localhost:3001/payments/${paymentId}`, {
          headers: { Authorization: `Bearer ${state.token}` },  // Include the token for authorization
        });

        // Commit the payment details to the Vuex store
        commit('SET_PAYMENT_DETAILS', response.data);

        // Log the payment details for confirmation
        console.log('Fetched Payment Details:', response.data);

        // Return the payment details to the calling function
        return response.data;
      } catch (error) {
        // Handle errors
        console.error('Error fetching payment details:', error);
        toast.error(error.response?.data?.message || 'Failed to fetch payment details');
      }
    },
  
        
    
  }, // Fixed missing closing bracket
  getters: {
    currentUser: (state) => state.user,
    token: (state) => state.token,
    errorMessage: (state) => state.error,
    movies: (state) => state.movies,
    users: (state) => state.users,
    userId: (state) => state.user?.id || null,
    comingSoonMovies: (state) => state.comingSoonMovies,
    loading: (state) => state.loading,
    isAdmin: (state) => state.isAdmin,
    cartItems: (state, getters) =>
      state.cart
        .map((item) => {
          const movie = getters.movies.find((m) => m.movie_id === item.movie_id);
          return movie ? { ...movie, quantity: item.quantity } : null;
        })
        .filter(Boolean),
    cartTotal: (state, getters) =>
      getters.cartItems.reduce((total, item) => total + (item.rental_price * item.quantity), 0),
    paymentStatus: (state) => state.paymentStatus,
    paymentError: (state) => state.paymentError,
  }
});
