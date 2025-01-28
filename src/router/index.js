import { createRouter, createWebHistory } from 'vue-router';

// Import komponentu iz components mape
import SchoolSchedule from '../components/SchoolSchedule.vue';

const routes = [
  {
    path: '/schoolschedule', // Definiraš rutu
    name: 'schoolschedule',
    component: SchoolSchedule, // Povezuješ je s komponentom
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;