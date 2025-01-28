<script setup>
defineProps({
  title: String,
  value: String
})
</script>

<template>
  <div class="bg-white p-4 rounded-lg shadow-sm">
    <h3 class="text-gray-500 mb-2">{{ title }}</h3>
    <p class="text-3xl font-semibold text-blue-500">{{ value }}</p>
  </div>
</template>