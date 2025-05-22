import { createRouter, createWebHistory } from 'vue-router'

// Admin Views
import DashboardView from '@/views/admin/DashboardView.vue'
import InvoiceView from '@/views/admin/InvoiceView.vue'
import CategoryView from '@/views/admin/CategoryView.vue'
import LogStokView from '@/views/admin/LogStokView.vue'
import ModelView from '@/views/admin/ModelView.vue'
import OrderView from '@/views/admin/OrderView.vue'
import UsersView from '@/views/admin/UsersView.vue'

// User View
import CatalogueView from '@/views/User/CatalogueView.vue'

// Auth View
import LoginView from '@/views/login/LoginView.vue'

const routes = [
  { path: '/', redirect: '/dashboard' },

  // Admin Routes (butuh login)
  { path: '/dashboard', name: 'Dashboard', component: DashboardView, },
  { path: '/invoice', name: 'Invoice', component: InvoiceView, },
  { path: '/category', name: 'Category', component: CategoryView, },
  { path: '/logstok', name: 'LogStok', component: LogStokView, },
  { path: '/model', name: 'Model', component: ModelView, },
  { path: '/order', name: 'Order', component: OrderView, },
  { path: '/users', name: 'Users', component: UsersView, },

  // User Routes (jika ingin diatur)
  { path: '/catalogue', name: 'Catalogue', component: CatalogueView, meta: { requiresAuth: true } },

  // Login
  { path: '/login', name: 'Login', component: LoginView }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Auth Guard
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token')

  if (!isAuthenticated) {
    next('/login')
  } else if (to.path === '/login' && isAuthenticated) {
    next('/dashboard')
  } else {
    next()
  }
})

export default router
