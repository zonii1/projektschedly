<script setup>
import { ref } from 'vue'

const props = defineProps({
  title: String,
  time: String,
  icon: String,
  bgColor: String,
  completed: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['toggle-complete', 'edit', 'delete'])

const isCompleted = ref(props.completed)

const toggleComplete = () => {
  isCompleted.value = !isCompleted.value
  emit('toggle-complete', isCompleted.value)
}
</script>

<template>
  <div class="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
    <div class="flex items-center gap-4">
      <input 
        type="checkbox" 
        :checked="isCompleted" 
        @change="toggleComplete"
        class="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
      />
      <div :class="[bgColor, 'w-10 h-10 rounded-lg flex items-center justify-center']">
        {{ icon }}
      </div>
      <div>
        <h4 class="font-semibold" :class="{ 'line-through text-gray-400': isCompleted }">{{ title }}</h4>
        <p class="text-sm text-gray-500">{{ time }}</p>
      </div>
    </div>
    <div class="flex items-center gap-2">
      <button 
        @click="$emit('edit')"
        class="text-gray-400 hover:text-blue-600 transition-colors"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
      </button>
      <button 
        @click="$emit('delete')"
        class="text-gray-400 hover:text-red-600 transition-colors"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>
  </div>
</template>