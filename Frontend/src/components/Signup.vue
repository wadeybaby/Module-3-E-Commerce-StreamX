<template>
  <div class="auth-form">
    <h2>Sign Up</h2>
    <div>
      <label>
        <span>Username:</span><input type="text" v-model="username" />
      </label>
      <br />
      <label>
        <span>Email:</span><input type="text" v-model="email" />
      </label>
      <br />
      <label>
        <span>Phone number:</span><input type="text" v-model="phone_number" />
      </label>
      <br />
      <label>
        <span>Password:</span><input type="password" v-model="password" />
      </label>
      <br /><br />
      <button @click="submitSignUp">Signup</button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      username: '',
      email: '',
      phone_number: '',
      password: '',
    };
  },
  methods: {
    async submitSignUp() {
      const userData = {
        username: this.username,
        email: this.email,
        phone_number: this.phone_number,
        password: this.password,
      };
      try {
        await this.$store.dispatch('signUpUser', userData);
        this.$emit('close-modal');
        this.clearFields();
      } catch (error) {
        console.error('Signup error:', error);
      }
    },
    clearFields() {
      this.username = '';
      this.email = '';
      this.phone_number = '';
      this.password = '';
    },
  },
};
</script>
<style scoped>
.auth-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  text-align: center;
}
input {
  padding: 10px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 5px;
}
button {
  padding: 10px;
  background-color: #F39C12;
  color: white;
  border: none;
  cursor: pointer;
}
button:hover {
  background-color: #E67E22;
}
</style>