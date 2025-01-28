<script setup>
import { createRouter, createWebHistory } from 'vue-router';
import { defineComponent } from 'vue';
import Sidebar from './components/Sidebar.vue';
import SchoolSchedule from './components/SchoolSchedule.vue';
import Dashboard from './components/Dashboard.vue';

const routes = [
  { path: '/', component: Dashboard },
  { path: '/schoolschedule', component: SchoolSchedule },
  // Ostale rute
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

defineComponent({
  name: 'App',
  components: {
    Sidebar,
  },
  setup() {
    return {
      router,
    };
  },
});
</script>

<template>
  <div id="app">
    <Sidebar />
    <router-view />
  </div>
</template>