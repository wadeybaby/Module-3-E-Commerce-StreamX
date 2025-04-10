<template>
  <div class="cart-container">
    <h2 class="cart-title">Your Cart</h2>
    <div v-if="cartItems.length > 0" class="cart-items">
      <div v-for="item in cartItems" :key="item.movie_id" class="cart-item">
        <img v-if="item.image" :src="item.image" alt="Movie Poster" class="cart-item-image" />
        <div class="cart-item-details">
          <h3 class="cart-item-title">{{ item.title }}</h3>
          <p class="cart-item-quantity">Quantity: {{ item.quantity }}</p>
          <p class="cart-item-price">Price: R{{ item.rental_price * item.quantity }}</p>
          <button class="remove-button" @click="removeFromCart(item.movie_id)">Remove</button>
        </div>
      </div>
      <div class="cart-total">
        <strong>Total: R{{ cartTotal }}</strong>
      </div>
      <div class="checkout-button-container">
        <button class="checkout-button" @click="goToPayment">Proceed to Checkout</button>
      </div>
    </div>
    <div v-else class="empty-cart">
      <p>Your cart is empty.</p>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters(['cartItems', 'cartTotal', 'movies']),
  },
  mounted() {
    this.fetchCart();
    if (this.movies.length === 0) {
      this.fetchData();
    }
  },
  methods: {
    ...mapActions(['fetchCart', 'getData', 'deleteFromCart']),
    fetchData() {
      this.getData();
    },
    removeFromCart(movieId) {
      this.deleteFromCart(movieId).then(() => {
        this.fetchCart();
      });
    },
    goToPayment() {
      this.$router.push('/payment'); // Use 'payment' if that's your route name
    },
  },
};
</script>

<style scoped>
.cart-container {
  padding: 20px;
  max-width: 800px;
  margin: 20px auto;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.cart-title {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

.cart-items {
  border-bottom: 1px solid #eee;
  padding-bottom: 20px;
}

.cart-item {
  display: flex;
  padding: 15px 0;
  border-bottom: 1px solid #eee;
  align-items: center;
}

.cart-item-image {
  max-width: 100px;
  margin-right: 20px;
  border-radius: 4px;
}

.cart-item-details {
  flex-grow: 1;
}

.cart-item-title {
  font-size: 1.1em;
  margin-bottom: 5px;
  color: #333;
}

.cart-item-quantity,
.cart-item-price {
  margin: 3px 0;
  color: #666;
}

.cart-total {
  margin-top: 20px;
  text-align: right;
  font-size: 1.2em;
  color: #333;
  padding-right: 10px;
}

.empty-cart {
  text-align: center;
  padding: 20px;
  color: #777;
}

.remove-button,
.checkout-button {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
  transition: background-color 0.3s ease;
}

.remove-button:hover,
.checkout-button:hover {
  background-color: #c0392b;
}

.checkout-button-container {
  text-align: right;
  padding-top: 20px;
}
</style>