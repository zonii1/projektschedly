<script setup>
import Sidebar from './components/Sidebar.vue';
</script>

<template>
  <div id="app">
    <div class="layout">
      <Sidebar class="sidebar" />
      <div class="main-content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<style scoped>
.layout {
  display: flex; /* Create a flex container */
  height: 100vh; /* Full viewport height */
}

.sidebar {
  width: 250px; /* Adjust the width of the sidebar */
  background-color: #f8f9fa; /* Light background for the sidebar */
  border-right: 1px solid #ddd; /* Optional border to separate the sidebar */
  position: sticky;
  top: 0; /* Fixes the sidebar to the top */
  height: 100vh; /* Full viewport height */
  overflow-y: auto; /* Add scrolling if the sidebar content overflows */
}

.main-content {
  flex: 1; /* Take the remaining width */
  padding: 20px; /* Add padding to the main content */
  overflow-y: auto; /* Allow vertical scrolling if content overflows */
}

@media (max-width: 768px) {
  .layout {
    flex-direction: column; /* Stacks the sidebar and main content */
  }

  .sidebar {
    width: 100%; /* Sidebar takes full width */
    height: auto; /* Adjust height for smaller screens */
  }

  .main-content {
    padding: 10px; /* Reduce padding on smaller screens */
  }
}
</style>
