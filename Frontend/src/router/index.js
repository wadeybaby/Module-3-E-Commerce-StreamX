// router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import MoviesView from '../views/MoviesView.vue';
import MovieDetail from '../components/MoviesDetails.vue';
import ComingSoonView from '../views/ComingSoonView.vue';
import HomeView from '@/views/HomeView.vue';
import AdminDashboardView from '../views/AdminDashboardView.vue';
import cart from '../components/cart.vue';
import Payment from '@/components/Payment.vue';
import store from '../store';
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/movies',
    name: 'movies',
    component: MoviesView,
  },
  {
    path: '/movies/:id', // Changed to use :id parameter
    name: 'movie-details',
    component: MovieDetail,
    props: true,
  },
  {
    path: '/coming-soon',
    name: 'coming-soon',
    component: ComingSoonView,
  },
 
  {
    path: '/cart',
    name: 'cart',
    component: cart,
  },
  {
    path: '/payment',
    name: 'payment',
    component: Payment,
  },
  {
    path: '/adminDashboard',
    name: 'adminDashboard',
    component: AdminDashboardView,
    meta: { requiresAdmin: true },
  },
];
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAdmin) {
    if (store.getters.isAdmin) {
      next();
    } else {
      next('/');
    }
  } else if (to.meta.requiresUser) {
    if (store.getters.token) {
      next();
    } else {
      next('/');
    }
  } else {
    next();
  }
});
export default router;