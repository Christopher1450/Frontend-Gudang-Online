<template>
  <div class="flex min-h-screen">
    <!-- Sidebar -->
    <Sidebar />

    <!-- Page Wrapper -->
    <div class="flex-1 flex flex-col">
      <!-- Navbar -->
      <Navbar @toggleNavbar="handleToggle" />

      <!-- Router View -->
      <main class="flex-1 bg-gray-100 p-4">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import Sidebar from '@/components/SideBar.vue'
import Navbar from '@/components/Navbar.vue'

function handleToggle() {

}
</script>
