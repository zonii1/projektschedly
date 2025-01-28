<script setup>
import { ref, computed } from 'vue'
import StatCard from './StatCard.vue'
import CourseCard from './CourseCard.vue'
import PlanningItem from './PlanningItem.vue'

const userName = ref('GABRIJEL')
const searchQuery = ref('')
const showAddTaskModal = ref(false)

const newTask = ref({
  title: '',
  time: '',
  icon: '📝',
  bgColor: 'bg-blue-50'
})

const courses = [
  { title: 'Locations', lessons: 35, progress: 75, icon: '📍', color: 'bg-blue-500' },
  { title: 'People', lessons: 30, progress: 50, icon: '👤', color: 'bg-orange-400' },
  { title: 'Airport', lessons: 45, progress: 25, icon: '✈️', color: 'bg-green-500' },
  { title: 'Places', lessons: 20, progress: 75, icon: '🏰', color: 'bg-yellow-400' }
]

const planningItems = ref([
  { title: 'Reading - Topic 1', time: '8:00 - 10:00', icon: '📚', bgColor: 'bg-blue-50', completed: false },
  { title: 'Writing - Topic 2', time: '13:00 - 14:00', icon: '✏️', bgColor: 'bg-orange-50', completed: false },
  { title: 'Listening - Topic 1', time: '15:00 - 16:00', icon: '🎧', bgColor: 'bg-green-50', completed: false },
  { title: 'Listening - Topic 2', time: '19:00 - 20:00', icon: '🔊', bgColor: 'bg-yellow-50', completed: false }
])

// Computed statistics
const stats = computed(() => {
  const completedTasks = planningItems.value.filter(task => task.completed).length
  const totalTasks = planningItems.value.length
  const inProgressTasks = totalTasks - completedTasks

  return {
    tasksCompleted: String(completedTasks).padStart(2, '0'),
    tasksInProgress: String(inProgressTasks).padStart(2, '0'),
    tasksFinished: String(completedTasks).padStart(2, '0'),
    totalTasks: totalTasks
  }
})

// Weekly progress
const weeklyProgress = computed(() => {
  const completedTasks = planningItems.value.filter(task => task.completed).length
  const totalTasks = planningItems.value.length
  return {
    completed: completedTasks,
    total: totalTasks,
    percentage: totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0
  }
})

const addTask = () => {
  if (newTask.value.title && newTask.value.time) {
    planningItems.value.push({
      ...newTask.value,
      completed: false
    })
    newTask.value = {
      title: '',
      time: '',
      icon: '📝',
      bgColor: 'bg-blue-50'
    }
    showAddTaskModal.value = false
  }
}

const deleteTask = (index) => {
  planningItems.value.splice(index, 1)
}

const toggleTaskComplete = (index, completed) => {
  planningItems.value[index].completed = completed
}

const editTask = (index) => {
  const task = planningItems.value[index]
  newTask.value = { ...task }
  showAddTaskModal.value = true
  // Remove the old task when editing
  planningItems.value.splice(index, 1)
}
</script>

<template>
  <main class="flex-1 p-8">
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-2xl">
        Hello <span class="text-blue-500">{{ userName }}</span>, welcome back!
      </h1>
      <div class="flex items-center gap-4">
        <div class="relative">
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Search..."
            class="pl-10 pr-4 py-2 rounded-lg border border-gray-200"
          />
          <svg class="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <button class="p-2 rounded-full bg-gray-100 relative">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span class="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <div class="flex items-center gap-2">
          <img src="/src/assets/pfp.jpg" alt="Profile" class="w-10 h-10 rounded-full" />
          <div>
            <p class="font-semibold">Gabrijel Mijatovic</p>
            <p class="text-sm text-blue-500">Basic Plan</p>
          </div>
        </div>
      </div>
    </div>

    <section class="mb-8">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-semibold">My Courses</h2>
        <a href="#" class="text-blue-500">View All</a>
      </div>
      <div class="grid grid-cols-4 gap-4">
        <CourseCard v-for="course in courses" :key="course.title" v-bind="course" />
      </div>
    </section>

    <section class="grid grid-cols-4 gap-8">
      <div class="col-span-2">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-semibold">Tasks</h2>
          <div class="flex items-center gap-2">
            <button 
              @click="showAddTaskModal = true"
              class="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Add Task
            </button>
            <span class="text-gray-400">{{ new Date().toLocaleDateString() }}</span>
          </div>
        </div>
        <div class="space-y-4">
          <PlanningItem 
            v-for="(item, index) in planningItems" 
            :key="index"
            v-bind="item"
            @toggle-complete="toggleTaskComplete(index, $event)"
            @edit="editTask(index)"
            @delete="deleteTask(index)"
          />
        </div>
      </div>

      <div class="col-span-2 space-y-8">
        <div>
          <h2 class="text-xl font-semibold mb-4">Statistics</h2>
          <div class="grid grid-cols-2 gap-4">
            <StatCard title="Tasks Completed" :value="stats.tasksCompleted" />
            <StatCard title="Tasks In Progress" :value="stats.tasksInProgress" />
            <StatCard title="Tasks Finished" :value="stats.tasksFinished" />
            <StatCard title="Total Tasks" :value="String(stats.totalTasks).padStart(2, '0')" />
          </div>
        </div>

        <div>
          <h2 class="text-xl font-semibold mb-4">Weekly Progress</h2>
          <div class="bg-white p-4 rounded-lg shadow-sm">
            <div class="flex justify-between items-center">
              <h3 class="font-semibold">Tasks This Week</h3>
              <div class="relative w-16 h-16">
                <div class="absolute inset-0 flex items-center justify-center">
                  <span class="text-lg font-semibold">{{ weeklyProgress.completed }}/{{ weeklyProgress.total }}</span>
                </div>
                <svg class="w-full h-full transform -rotate-90">
                  <circle
                    cx="32"
                    cy="32"
                    r="28"
                    stroke="#E5E7EB"
                    stroke-width="8"
                    fill="none"
                  />
                  <circle
                    cx="32"
                    cy="32"
                    r="28"
                    stroke="#3B82F6"
                    stroke-width="8"
                    fill="none"
                    stroke-dasharray="175.9292"
                    :stroke-dashoffset="175.9292 * (1 - weeklyProgress.percentage / 100)"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Add Task Modal -->
    <div v-if="showAddTaskModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div class="bg-white rounded-lg p-6 w-96">
        <h3 class="text-lg font-semibold mb-4">{{ newTask.title ? 'Edit Task' : 'Add New Task' }}</h3>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input 
              type="text"
              v-model="newTask.title"
              class="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Enter task title"
            >
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Time</label>
            <input 
              type="text"
              v-model="newTask.time"
              class="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="e.g., 9:00 - 10:00"
            >
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Icon</label>
            <select 
              v-model="newTask.icon"
              class="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="📝">📝 Note</option>
              <option value="📚">📚 Study</option>
              <option value="✏️">✏️ Write</option>
              <option value="🎧">🎧 Listen</option>
              <option value="🔊">🔊 Speak</option>
            </select>
          </div>
        </div>
        <div class="mt-6 flex justify-end gap-3">
          <button 
            @click="showAddTaskModal = false"
            class="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button 
            @click="addTask"
            class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            {{ newTask.title ? 'Save Changes' : 'Add Task' }}
          </button>
        </div>
      </div>
    </div>
  </main>
</template>