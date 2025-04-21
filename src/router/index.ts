import { createRouter, createWebHistory } from 'vue-router';
import ShowDashboard from '../components/ShowDashboard.vue';

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: ShowDashboard,
  },
  {
    path: '/show/:id',
    name: 'ShowDetails',
    component: ShowDashboard,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
