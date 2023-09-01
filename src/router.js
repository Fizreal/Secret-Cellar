import { createWebHistory, createRouter } from 'vue-router'
import HomePage from './pages/HomePage'
import CocktailDetail from './pages/CocktailDetail'
import LoginUser from './components/LoginUser'
import RegisterUser from './components/RegisterUser'

const routes = [
  { path: '/', component: HomePage, name: 'Homepage' },
  {
    path: '/cocktails/:cocktailId',
    component: CocktailDetail,
    name: 'CocktailDetail'
  },
  {
    path: '/login',
    component: LoginUser,
    name: 'LoginUser'
  },
  {
    path: '/register',
    component: RegisterUser,
    name: 'RegisterUser'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
