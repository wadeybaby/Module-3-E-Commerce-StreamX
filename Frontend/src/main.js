import { createApp } from 'vue';
import App from './App.vue';  // The main App component
import store from './store';
import router from './router';  // Import the router
import axios from 'axios';

// Create the Vue app and use the router
createApp(App).use(store).use(router).mount('#app')