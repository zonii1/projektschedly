<script setup>
import { ref } from 'vue'

const emit = defineEmits(['close', 'login'])
const isSignUp = ref(false)
const formData = ref({
  email: '',
  password: '',
  name: '' // Only for sign up
})

const toggleMode = () => {
  isSignUp.value = !isSignUp.value
  formData.value = {
    email: '',
    password: '',
    name: ''
  }
}

const handleSubmit = () => {
  // Here you would implement actual authentication logic
  console.log('Form submitted:', formData.value)
  // Emit login event with user data
  emit('login', {
    name: isSignUp.value ? formData.value.name : formData.value.email.split('@')[0],
    email: formData.value.email
  })
  emit('close')
}
</script>

<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg p-6 w-96">
      <h3 class="text-lg font-semibold mb-4">{{ isSignUp ? 'Sign Up' : 'Login' }}</h3>
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div v-if="isSignUp">
          <label class="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input 
            type="text"
            v-model="formData.name"
            class="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          >
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input 
            type="email"
            v-model="formData.email"
            class="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          >
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input 
            type="password"
            v-model="formData.password"
            class="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          >
        </div>
        <div class="mt-6 flex flex-col gap-3">
          <button 
            type="submit"
            class="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            {{ isSignUp ? 'Sign Up' : 'Login' }}
          </button>
          <button 
            type="button"
            @click="toggleMode"
            class="text-blue-500 hover:text-blue-600 text-sm"
          >
            {{ isSignUp ? 'Already have an account? Login' : 'Need an account? Sign Up' }}
          </button>
          <button 
            type="button"
            @click="$emit('close')"
            class="text-gray-500 hover:text-gray-700 text-sm"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
</template>