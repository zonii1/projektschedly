<script setup>
defineProps({
  title: String,
  lessons: Number,
  progress: Number,
  icon: String,
  color: String
})
</script>

<template>
  <div class="bg-white p-6 rounded-lg shadow-sm">
    <div class="flex justify-between items-start mb-4">
      <div>
        <h3 class="font-semibold mb-1">{{ title }}</h3>
        <p class="text-sm text-gray-500">{{ lessons }} Lessons</p>
      </div>
      <div :class="[color, 'w-12 h-12 rounded-lg flex items-center justify-center text-white text-2xl']">
        {{ icon }}
      </div>
    </div>
    <div class="relative h-2 bg-gray-100 rounded-full">
      <div
        class="absolute left-0 top-0 h-full rounded-full"
        :class="color"
        :style="{ width: `${progress}%` }"
      ></div>
    </div>
    <p class="mt-2 text-sm text-gray-500">{{ progress }}%</p>
  </div>
</template>