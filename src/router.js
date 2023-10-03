import { createWebHistory, createRouter } from 'vue-router'
import HomePage from './pages/HomePage'
import LoginUser from './pages/LoginUser'
import RegisterUser from './pages/RegisterUser'
import SearchCocktails from './pages/SearchCocktails'
import AlphabeticalCocktails from './pages/AlphabeticalCocktails'
import CocktailDetail from './pages/CocktailDetail'

const routes = [
  { path: '/', component: HomePage, name: 'Homepage' },
  {
    path: '/login',
    component: LoginUser,
    name: 'LoginUser'
  },
  {
    path: '/register',
    component: RegisterUser,
    name: 'RegisterUser'
  },
  {
    path: '/cocktails/:cocktailId',
    component: CocktailDetail,
    name: 'CocktailDetail'
  },
  {
    path: '/cocktails/search',
    component: SearchCocktails,
    name: 'SearchCocktails'
  },
  {
    path: '/cocktails/browse',
    component: AlphabeticalCocktails,
    name: 'AlphabeticalCocktails'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
