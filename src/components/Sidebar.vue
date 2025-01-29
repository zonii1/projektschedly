<script setup>
import { HomeIcon, AcademicCapIcon, CalendarIcon, ChatBubbleLeftIcon, Cog6ToothIcon } from '@heroicons/vue/24/outline'
import { ref } from 'vue'

// Zadržiš isti 'currentRoute' za promjenu stila (ako želiš)
const currentRoute = ref('home')

const menuItems = [
  { name: 'Overview', icon: HomeIcon, route: '/' },
  { name: 'School Schedule', icon: AcademicCapIcon, route: '/schoolschedule' },
  { name: 'Personal Schedule', icon: CalendarIcon, route: '/personalschedule' },
]
</script>

<template>
  <aside class="w-64 bg-white p-6 flex flex-col">
    <div class="flex items-center mb-8">
      <img src="/src/assets/thumbnail_image.png" alt="Logo" class="w-10 h-10" />
      <span class="ml-2 text-xl font-bold text-blue-600">Schedly</span>
    </div>

    <nav class="flex-1">
      <ul class="space-y-4">
        <li v-for="item in menuItems" :key="item.name">
          <router-link 
            :to="item.route" 
            class="flex items-center p-3 rounded-lg" 
            :class="{
              'text-blue-600 bg-blue-50': currentRoute === item.route,
              'text-gray-500 hover:bg-gray-50': currentRoute !== item.route
            }"
            @click="currentRoute = item.route"
          >
            <component :is="item.icon" class="w-6 h-6 mr-3" />
            {{ item.name }}
          </router-link>
        </li>
      </ul>
    </nav>

    <div class="mt-auto">
      <div class="bg-blue-50 p-4 rounded-lg">
        <h3 class="font-semibold mb-2">Upgrade Your Plan</h3>
        <a href="#" class="text-blue-600 flex items-center">
          Go to PRO
          <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </div>
  </aside>
</template>