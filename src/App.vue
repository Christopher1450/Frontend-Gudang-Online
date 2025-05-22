<template>
  <div class="min-h-screen flex flex-col">
    <!-- Navbar at top -->
    <Navbar @toggleNavbar="NavbarOpen = !NavbarOpen" />

    <!-- Main layout -->
    <div class="flex flex-1">
      <!-- Sidebar on the left -->
      <Sidebar v-if="NavbarOpen" />

      <!-- Content area -->
      <main class="flex-1 bg-gray-100 p-4">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import Sidebar from '@/components/SideBar.vue'
import Navbar from '@/components/NavBar.vue'
import LoginView from './views/login/LoginView.vue'

export default {
  components: { Sidebar, Navbar },
  setup() {
    const route = useRoute()
    const sidebarOpen = ref(true)
    const NavbarOpen = ref(true)

    const isAuthRoute = computed(() => route.path === '/login')

    return { sidebarOpen, NavbarOpen, isAuthRoute }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');
</style>


<style lang="scss">
:root {
	--primary: #4ade80;
	--primary-alt: #22c55e;
	--grey: #64748b;
	--dark: #1e293b;
	--dark-alt: #334155;
	--light: #f1f5f9;
	--sidebar-width: 300px;
}

* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	font-family: 'Fira sans', sans-serif;
}

body {
	background: var(--light);
}

button {
	cursor: pointer;
	appearance: none;
	border: none;
	outline: none;
	background: none;
}

.app {
	display: flex;

	main {
		flex: 1 1 0;
		padding: 2rem;

		@media (max-width: 1024px) {
			padding-left: 6rem;
		}
	}
}
</style>
