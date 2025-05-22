import '@/assets/style.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fas) // Add all solid icons


const app = createApp(App)

app.use(createPinia())
app.use(router)

createApp(App)
  .use(router)
  .mount('#app')

app.component('font-awesome-icon', FontAwesomeIcon) // Register as global component

// Logic For Logout
// router.beforeEach(function (to, from, next) {
//   console.log('beforeEach', to.path + ' - Auth: ' + auth.user.authenticated)
//   if ((to.path !== '/login' && to.path !== 'login') && !auth.user.authenticated) {
//     next({ path: '/login' })
//   } else if ((to.path === '/login' || to.path === 'login') && auth.user.authenticated) {
//     next({ path: '/' })
//   } else {
//     next()
//   }
// })

  // Whenerver Server Gives 401 Status Code, it logouts and redirect to login page
// Vue.http.interceptors.push(function (request, next) {
//   next(function (response) {
//     if (response.status === 401) {
//       let msg = response.body.returnMessage
//       localStorage.setItem('logoutReason', msg)
//       auth.logout()
//     }
//   })
// })
