<template>
    <header>
      <nav :class="(expandNav) ? 'expanded' : ''">
        <router-link to="/" class="home">
          <img src="" alt="logo">
          <h1>Site name</h1>
        </router-link>
        <div class="dropdown">
          <button class="">Drinks</button>
          <div class="content">
            <router-link to="/cocktails/search">Search</router-link>
            <router-link to="/cocktails/ingredient">Ingredients</router-link>
            <router-link to="/cocktails/browse">Browse</router-link>
          </div>
        </div>
        <div class="dropdown" v-if="user">
          <button>Profile</button>
          <div class="content">
            <router-link to="/profile/favorites">Favorites</router-link>
            <router-link to="/cocktails/ingredient"></router-link>
            <button @click="handleSignOut">Sign out</button>
          </div>
        </div>
        <router-link to="/login" v-else >Sign In</router-link>        

        <button @click="toggleNav" class="expand">hamburger</button>
      </nav>
    </header>

</template>

<script>
import { authenticated } from '@/authenticated';
  export default {
    name: 'NavBar',
    data: () => ({
      expandNav: false,
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
      },
      toggleNav () {
        this.expandNav = !this.expandNav
      }
    }
  }
</script>

<style scoped>

nav {
  overflow: hidden;
  display: flex;
  justify-content: end;
}

.home {
  display: flex;
  flex-grow: 1;
}

nav a {
  float: left;
  display: block;
  text-align: center;
}

.expand {
  display: none;
}

.dropdown {
  overflow: hidden;
  float: left;
}

.dropdown button {
  border: none;
  outline: none;
  margin: 0;
}

.content {
  display: none;
  position: absolute;
  z-index: 1;
  /* box shadow and min-width */
}

.content * {
  float: none;
  display: block;
  text-align: left;
}

.dropdown:hover .content {
  display: block;
}

@media screen and (max-width: 600px) {
nav a:not(:first-child), .dropdown button{
  display: none;
}
.expand {
  float: right;
  display: block;
}

nav.expanded {
  position: relative;
  display: block;
}

nav.expanded .expand {
  position: absolute;
  right: 0;
  top: 0;
}

nav.expanded .dropdown {
  float: none;
}
nav.expanded .content {
  position: relative;
}

nav.expanded a {
  float: none;
  display: block;
  text-align: left;
}

nav.expanded .home {
  float: none;
  display: flex;
  text-align: left;
}
nav.expanded .dropdown button {
  display: block;
  width: 100%;
  text-align: left;
}
}
</style>