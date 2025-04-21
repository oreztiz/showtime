import { createRouter, createWebHistory } from 'vue-router';
import ShowDashboard from '../components/ShowDashboard.vue';

const routes = [
  { path: '/', component: ShowDashboard },
  { path: '/show/:id', component: ShowDashboard }, // Dynamic route for show details
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
