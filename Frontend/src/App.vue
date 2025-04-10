<template>
  <div id="app">
    <NavBar @open-auth-modal="openAuthModal" />
    <router-view />
    <div v-if="showAuthModal" class="modal-overlay" @click.self="closeAuthModal">
      <div class="modal-content">
        <button class="close-btn" @click="closeAuthModal">:heavy_multiplication_x:</button>
        <Login v-if="authType === 'login'" @close-modal="closeAuthModal" />
        <SignUp v-if="authType === 'signup'" @close-modal="closeAuthModal" />
      </div>
    </div>
  </div>
</template>
<script>
import NavBar from './components/NavBar.vue';
import Login from './components/Login.vue';
import SignUp from './components/Signup.vue';
import MoviesView from './views/MoviesView.vue';
import ComingSoonView from './views/ComingSoonView.vue';
import MoviesDetails from './components/MoviesDetails.vue';
import AdminDashboardView from './views/AdminDashboardView.vue';
import cart from './components/cart.vue';
export default {
  components: {
    MoviesView,
    ComingSoonView,
    NavBar,
    Login,
    SignUp,
    MoviesDetails,
    AdminDashboardView,
    cart,
  },
  data() {
    return {
      showAuthModal: false,
      authType: "login", // Initially set to 'login'
    };
  },
  methods: {
    openAuthModal(type) {
      this.authType = type; // Set type to 'login' or 'signup'
      this.showAuthModal = true;
    },
    closeAuthModal() {
      this.showAuthModal = false;
    },
  },
  watch: {
    "$store.getters.token"(newToken) {
      if (newToken) {
        this.closeAuthModal();
      }
    },
  },
};
</script>
<style scoped>
/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.modal-content {
  background: white;
  padding: 20px;
  width: 350px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  position: relative;
}
.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  background: none;
  font-size: 18px;
  cursor: pointer;
}
</style>