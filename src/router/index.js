import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'home', component: () => import('../pages/HomePage.vue') },
  { path: '/forwarding/schedule', name: 'schedule', component: () => import('../pages/SchedulePage.vue') },
  { path: '/api', name: 'api', component: () => import('../pages/ApiPage.vue') },
  { path: '/support', name: 'support', component: () => import('../pages/SupportPage.vue') },
  { path: '/login', name: 'login', component: () => import('../pages/LoginPage.vue') }
]

export default createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() { return { top: 0 } }
})
