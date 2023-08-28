import { createWebHistory, createRouter } from 'vue-router'
import HomePage from './pages/HomePage'

const routes = [{ path: '/', component: HomePage, name: 'Homepage' }]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
