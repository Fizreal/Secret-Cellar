<template>
  <aside>
    <header>
      <router-link to="/">
        <img src="" alt="logo">
        <h1>Site name</h1>
      </router-link>
    </header>
    <ul>
      <li>Drinks</li>
      <ul>
        <li>
          <router-link to="/cocktails/search">Search</router-link>
        </li>
        <li>
          <router-link to="/cocktails/ingredient">Ingredients</router-link>
        </li>
        <li>
          <router-link to="/cocktails/browse">Browse</router-link>
        </li>
      </ul>
      <ul v-if="authenticated.user">
        <li>Profile</li>
        <li>Sign out</li>
      </ul>
      <li v-else>Sign in</li>
    </ul>
  </aside>

</template>

<script>
import { authenticated } from '@/authenticated';
  export default {
    name: 'SideBar',
    data: () => ({
      expandCocktails: false
    }),
    methods: {
      handleCocktails () {
        this.expandCocktails = this.expandCocktails ? false : true
      }
    }
  }
</script>

<style scoped>

</style>