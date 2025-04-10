<template>
  <nav class="navbar">
    <div class="logo">
      <router-link to="/" class="brand-name">StreamX</router-link>
    </div>
    <ul class="nav-links">
      <li><router-link to="/">Home</router-link></li>
      <router-link to="/movies">Movies</router-link>
      <li><router-link to="/coming-soon">Coming Soon</router-link></li>
      <!-- <li v-if="currentUser && !isAdmin"><router-link to="/my-list">My List</router-link></li> -->
      <li v-if="isAdmin"><router-link to="/adminDashboard">AdminDashboard</router-link></li>
    </ul>
    <div class="auth-buttons">
      <button v-if="!currentUser && !signupSuccess" class="login-btn" @click="openAuthModal('login')">Login</button>
      <button v-if="!currentUser && !signupSuccess" class="signup-btn" @click="openAuthModal('signup')">Sign Up</button>
      <button v-if="currentUser" class="logout-btn" @click="handleLogout">Logout</button>
    </div>
  </nav>
  <!-- <router-view /> -->
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  computed: {
    ...mapGetters(['currentUser', 'isAdmin', 'signupSuccess']), // Add signupSuccess to getters
  },
  methods: {
    ...mapActions(['logout']),
    openAuthModal(type) {
      this.$emit('open-auth-modal', type);
    },
    handleLogout() {
      this.logout();
      this.$router.push('/');
    },
  },
};
</script>
<style scoped>
/* :white_tick: Navbar Styles */
/* :white_tick: Navbar Styles */
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 40px;
  background-color: black;
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 1000;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
  font-family: Arial, sans-serif;
  font-family: Arial, sans-serif;
}
/* :white_tick: StreamX Name */
.logo .brand-name {
  font-size: 24px;
  font-weight: bold;
  color: #FFCC00;
  font-weight: bold;
  color: #FFCC00;
  text-decoration: none;
}
/* :white_tick: Navigation Links */
.nav-links {
  list-style: none;
  list-style: none;
  display: flex;
  gap: 20px;
  gap: 20px;
  margin: 0;
  padding: 0;
}
.nav-links li {
  margin-right: 20px;
}
.nav-links a {
  color: white;
  text-decoration: none;
  font-size: 1rem;
  font-weight: bold;
  font-size: 1rem;
  font-weight: bold;
  transition: color 0.3s;
}
.nav-links a:hover {
  color: #FFCC00;
  color: #FFCC00;
}
/* :white_tick: Auth Buttons */
.auth-buttons {
  display: flex;
}
.auth-buttons .login-btn,
.auth-buttons .signup-btn,
.auth-buttons .logout-btn {
  padding: 8px 16px;
  margin-left: 15px;
  border: none;
  background-color: #FFCC00;
  color: white;
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;
  transition: background-color 0.3s ease;
  border-radius: 5px;
  border-radius: 5px;
}
.auth-buttons .login-btn:hover,
.auth-buttons .signup-btn:hover,
.auth-buttons .logout-btn:hover {
  background-color: #E67E22;
}
/* :white_tick: Hamburger Menu for Mobile */
.menu-toggle {
  display: none;
  flex-direction: column;
  cursor: pointer;
}
.menu-toggle div {
  width: 25px;
  height: 3px;
  background-color: white;
  margin: 4px 0;
  transition: all 0.3s ease;
}
/* :white_tick: Mobile & Tablet View */
@media (max-width: 768px) {
  .menu-toggle {
    display: flex;
  }
  .nav-links {
    display: none;
    flex-direction: column;
    background-color: black;
    width: 100%;
    position: absolute;
    top: 60px;
    left: 0;
    padding: 15px 30px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
  }
  .nav-links.active {
    display: flex;
    height: auto;
    min-height: 100vh; /* Full screen to prevent clipping */
  }
  .nav-links li {
    margin-bottom: 10px;
  }
  /* :white_tick: Auth Buttons Fix */
  .auth-buttons {
    position: absolute;
    top: 60px; /* Ensure it's below the navbar */
    right: 20px;
    background-color: black;
    padding: 10px;
    border-radius: 5px;
    display: none; /* Initially hidden */
    flex-direction: column;
    align-items: center;
    z-index: 2000; /* Ensure it's above everything */
  }
  .auth-buttons.active {
    display: flex; /* Show when toggled */
  }
  .auth-buttons .login-btn,
  .auth-buttons .signup-btn,
  .auth-buttons .logout-btn {
    margin-left: 0;
    margin-bottom: 10px;
    width: 100%;
  }
}
</style>