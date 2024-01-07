import { createWebHistory, createRouter } from 'vue-router'
import HomePage from './pages/HomePage'
import LoginUser from './pages/LoginUser'
import RegisterUser from './pages/RegisterUser'
import SearchCocktails from './pages/SearchCocktails'
import AlphabeticalCocktails from './pages/AlphabeticalCocktails'
import AlcoholCocktails from './pages/AlcoholCocktails'
import CocktailDetail from './pages/CocktailDetail'
import CocktailCollections from './pages/CocktailCollections'
import CollectionDetail from './pages/CollectionDetail'

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
  },
  {
    path: '/cocktails/ingredient',
    component: AlcoholCocktails,
    name: 'AlcoholCocktails'
  },
  {
    path: '/profile/collections',
    component: CocktailCollections,
    name: 'CocktailCollections'
  },
  {
    path: '/profile/collections/:collectionName',
    component: CollectionDetail,
    name: 'CollectionDetail'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
