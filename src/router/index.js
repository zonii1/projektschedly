import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '../components/Dashboard.vue';
import SchoolSchedule from '../components/SchoolSchedule.vue';
import PersonalSchedule from '../components/PersonalSchedule.vue'; // Import the component

const routes = [
  { path: '/', name: 'Dashboard', component: Dashboard },
  { path: '/schoolschedule', name: 'SchoolSchedule', component: SchoolSchedule },
  { path: '/personalschedule', name: 'PersonalSchedule', component: PersonalSchedule }, // Add the route
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
