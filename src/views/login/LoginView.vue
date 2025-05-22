<template>
  <div class="flex min-h-screen">
    <!-- Left: Login Form -->
    <div class="w-full md:w-1/2 flex flex-col justify-center items-center bg-white px-8">
      <div class="w-32 h-32 border-2 border-blue-500 rounded-full flex items-center justify-center mb-6">
        <img :src="logo" alt="Logo" class="w-28 h-28 object-contain" />
      </div>
      <h2 class="text-xl font-semibold mb-6">Log In</h2>
      <form class="w-full max-w-sm space-y-4" @submit.prevent="login">
        <div>
          <label class="block mb-1 text-gray-700">Username</label>
          <div class="relative">
            <input v-model="username" type="text" placeholder="username"
              class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
            <span class="absolute right-3 top-2.5 text-gray-400">
              <i class="fas fa-user"></i>
            </span>
          </div>
        </div>
        <div>
          <label class="block mb-1 text-gray-700">Password</label>
          <div class="relative">
            <input v-model="password" type="password" placeholder="password"
              class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
            <span class="absolute right-3 top-2.5 text-gray-400">
              <i class="fas fa-eye"></i>
            </span>
          </div>
        </div>
        <button type="submit"
          class="w-full bg-sky-500 hover:bg-sky-600 text-white py-2 rounded transition duration-200">
          Log In
        </button>
      </form>
      <p class="text-xs text-gray-500 mt-10">© 2025 Mega Mulia.</p>
    </div>

    <!-- Right: Branding Background -->
    <div class="hidden md:flex w-1/2 bg-gradient-to-l from-blue-900 to-blue-400 justify-center items-center">
      <div class="text-center text-white">
        <h1 class="text-3xl font-bold mb-2">MEGA MULIA</h1>
        <p class="text-sm">Product Management System</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import logo from '@/assets/logo.png'


const router = useRouter()
const username = ref('')
const password = ref('')

function login() {
  if (username.value === 'admin' && password.value === 'admin') {
    localStorage.setItem('token', 'test')
        localStorage.setItem('token', 'test')

    router.push('/dashboard')
  } else {
    alert('Login gagal')
  }
}

</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');
</style>
