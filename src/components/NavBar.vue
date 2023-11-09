<template>
    <header>
      <router-link to="/">
        <img src="" alt="logo">
        <h1>Site name</h1>
      </router-link>
      <nav class="relative flex">
        <div class="">Drinks
          <div class="drop">
            <router-link to="/cocktails/search">Search</router-link>
            <router-link to="/cocktails/ingredient">Ingredients</router-link>
            <router-link to="/cocktails/browse">Browse</router-link>
          </div>
        </div>
        <div class="" v-if="user">Profile
          <div class="">
            <router-link to="/profile/favorites">Favorites</router-link>
            <router-link to="/cocktails/ingredient"></router-link>
            <button @click="handleSignOut">Sign out</button>
          </div>
        </div>
        <router-link to="/login" class="item" v-else >Sign In</router-link>
      </nav>
    </header>

</template>

<script>
import { authenticated } from '@/authenticated';
  export default {
    name: 'NavBar',
    data: () => ({
      expandCocktails: false,
      user: null
    }),
    mounted() {
      this.getUser()
    },
    methods: {
      handleCocktails () {
        this.expandCocktails = this.expandCocktails ? false : true
      },
      getUser () {
        this.user = authenticated.user
      },
      handleSignOut () {
        authenticated.signOut()
        this.getUser()
      }
    }
  }
</script>