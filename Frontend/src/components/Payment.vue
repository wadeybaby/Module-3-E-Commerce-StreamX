<template>
  <div class="payment-container">
    <div class="payment-card">
      <h2 class="title">Checkout</h2>
      <p class="subtitle">Complete your payment below</p>

      <button @click="makePayment" :disabled="isProcessing" class="pay-button">
        {{ isProcessing ? 'Processing...' : 'Pay Now' }}
      </button>

      <!-- Success Message -->
      <div v-if="paymentStatus === 'success'" class="payment-status success">
        ✅ Payment Successful!
        <button @click="fetchDetails" v-if="paymentDetails">View Payment Details</button>
      </div>

      <!-- Failure Message -->
      <div v-if="paymentStatus === 'failed'" class="payment-status failed">
        ❌ Payment Failed. Try again.
      </div>

      <!-- Error Message -->
      <div v-if="paymentError" class="payment-status warning">
        ⚠️ {{ paymentError }}
      </div>

      <!-- Payment Details Section -->
      <div v-if="fetchedPaymentDetails">
        <h2>Payment Details</h2>
        <p><strong>Payment ID:</strong> {{ fetchedPaymentDetails.id }}</p>
        <p><strong>User ID:</strong> {{ fetchedPaymentDetails.user_id }}</p>
        <p><strong>Payment Method:</strong> {{ fetchedPaymentDetails.payment_method }}</p>
        <p><strong>Status:</strong> {{ fetchedPaymentDetails.status }}</p>
        <p><strong>Created At:</strong> {{ fetchedPaymentDetails.created_at }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  data() {
    return {
      isProcessing: false,
      fetchedPaymentDetails: null, // Stores fetched payment details
    };
  },
  computed: {
    ...mapState(['paymentStatus', 'paymentError', 'paymentDetails']),
  },
  methods: {
    ...mapActions(['processPaymentController', 'fetchPaymentDetails']),

    async makePayment() {
      this.isProcessing = true;
      try {
        await this.processPaymentController(); // Calls Vuex action to handle payment
      } catch (error) {
        console.error('Payment error:', error);
      }
      this.isProcessing = false;
    },

    async fetchDetails() {
      if (this.paymentDetails?.id) {
        try {
          this.fetchedPaymentDetails = await this.fetchPaymentDetails(this.paymentDetails.id);
        } catch (error) {
          console.error('Error fetching payment details:', error);
        }
      } else {
        console.warn('No valid payment ID found.');
      }
    },
  },
};
</script>

<style scoped>
.payment-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f4f5f7;
  padding: 20px;
}

.payment-card {
  background-color: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
}

.title {
  font-size: 24px;
  font-weight: bold;
  color: #333;
}

.subtitle {
  color: #666;
  margin-top: 10px;
}

.pay-button {
  background-color: #3182ce;
  color: white;
  font-size: 16px;
  font-weight: bold;
  padding: 12px 24px;
  border: none;
  border-radius: 5px;
  margin-top: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.pay-button:hover {
  background-color: #2b6cb0;
}

.pay-button:disabled {
  background-color: #aaa;
  cursor: not-allowed;
}

.payment-status {
  margin-top: 20px;
  padding: 10px;
  border-radius: 5px;
  font-weight: bold;
}

.success {
  background-color: #c6f6d5;
  color: #2f855a;
}

.failed {
  background-color: #fed7d7;
  color: #e53e3e;
}

.warning {
  background-color: #fffaf0;
  color: #d69e2e;
}
</style>
