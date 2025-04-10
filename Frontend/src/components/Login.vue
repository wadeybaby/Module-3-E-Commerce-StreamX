<template>
  <div class="login-container">
    <form @submit.prevent="loginMethod">
      <div class="form-group">
        <label for="email">Email:</label>
        <input
          type="email"
          id="email"
          v-model="email"
          placeholder="Enter your email"
          required
        />
      </div>
      <div class="form-group">
        <label for="password_hash">Password:</label>
        <input
          type="password"
          id="password_hash"
          v-model="password_hash"
          placeholder="Enter your password"
          required
        />
      </div>
      <div v-if="errorMessage" class="error-message">
        <p>{{ errorMessage }}</p>
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      email: '',
      password_hash: '',
    };
  },
  computed: {
    errorMessage() {
      return this.$store.getters.errorMessage;
    },
  },
  methods: {
    async loginMethod() {
      await this.$store.dispatch('loginUser', {
        email: this.email,
        password: this.password_hash, // Corrected to 'password'
      });
      if (this.$store.getters.token) {
        await this.$router.push('/');
      }
    },
  },
};
</script>
<style scoped>
.login-container {
  width: 300px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
.form-group {
  margin-bottom: 15px;
}
label {
  display: block;
  margin-bottom: 5px;
}
input[type="email"],
input[type="password"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 3px;
  box-sizing: border-box;
}
button {
  width: 100%;
  padding: 10px;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}
.button:hover{
    background-color: #0056B3;
}
.error-message {
  color: red;
  margin-top: 10px;
}
</style>