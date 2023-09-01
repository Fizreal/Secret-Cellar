import { createWebHistory, createRouter } from 'vue-router'
import HomePage from './pages/HomePage'
import CocktailDetail from './pages/CocktailDetail'

const routes = [
  { path: '/', component: HomePage, name: 'Homepage' },
  {
    path: '/cocktails/:cocktailId',
    component: CocktailDetail,
    name: 'CocktailDetail'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
