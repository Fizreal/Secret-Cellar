<template>
    <header>
      <nav :class="(expandNav) ? 'expanded' : ''">
        <router-link to="/" class="home">
          <img src="" alt="logo">
          <h1>Site name</h1>
        </router-link>
        <div class="dropdown">
          <button class="dropdownButton">Browse Drinks</button>
          <div class="content">
            <router-link to="/cocktails/search">By Name</router-link>
            <router-link to="/cocktails/ingredient">By Ingredients</router-link>
            <router-link to="/cocktails/browse">Alphabetically</router-link>
          </div>
        </div>
        <div class="dropdown">
          <button class="dropdownButton">Community</button>
          <div class="content">
            <router-link to="/">Search</router-link>
            <router-link to="/community/new">Create Drink</router-link>
          </div>
        </div>
        <div class="dropdown" v-if="user">
          <button class="dropdownButton">Profile</button>
          <div class="content">
            <router-link to="/profile/collections/favorites">Favorites</router-link>
            <router-link to="/profile/collections">Collections</router-link>
            <button @click="handleSignOut">Sign out</button>
          </div>
        </div>
        <router-link to="/login" v-else class="signin">Sign In</router-link>        
        <button @click="toggleNav" aria-label="Expand Nav" class="expand"><img src="/hamburger.png" alt="Open"></button>
      </nav>
    </header>

</template>

<script>
import { authenticated } from '@/authenticated';
import { watchEffect } from 'vue';

export default {
  name: 'NavBar',
  data: () => ({
    expandNav: false,
    user: authenticated.user
  }),
  mounted() {
    watchEffect(() => {
      this.user = authenticated.user;
    });
  },
  methods: {
    handleSignOut () {
      authenticated.signOut();
      this.user = authenticated.user;
    },
    toggleNav () {
      this.expandNav = !this.expandNav;
    }
  }
}
</script>

<style scoped>

nav {
  overflow: hidden;
  display: flex;
  justify-content: flex-end;
  background-color: #06142E;
  color: white;
  padding-right: 75px;
}

.home {
  display: flex;
  flex-grow: 1;
  padding: 14px 16px;
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

.dropdown .dropdownButton {
  border: none;
  outline: none;
  margin: 0;
  background-color: inherit;
  padding: 14px 16px;
}

.signin {
  background-color: inherit;
  padding: 14px 16px;
}

.signin:hover {
  background-color: #473E66;
}

.content {
  display: block;
  position: absolute;
  overflow: hidden;
  background-color: #BD83B8;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  min-width: 150px;
  height: 0;
  z-index: 2;
  transition: all 0.3s ease-in-out;
}

.content a {
  float: none;
  display: block;
  text-align: left;
  padding: 12px 16px;
  transition: all 0.3s ease-in-out;
}

.content button {
  text-align: left;
  min-width: 150px;
  padding: 12px 16px;
  transition: all 0.3s ease-in-out;
}

.dropdown:hover .dropdownButton {
  background-color: #473E66;
}

.content a:hover, .content button:hover {
  background-color: #F5D7DB;
}

.dropdown:hover .content {
  height: auto;
}

@media screen and (max-width: 600px) {
nav a:not(:first-child), .dropdown .dropdownButton{
  display: none;
}
.expand {
  float: right;
  display: block;
}

nav.expanded {
  position: relative;
  display: block;
  padding: 0;
}

.expand {
  position: absolute;
  right: 0;
  top: 0;
  aspect-ratio: 1/1;
  height: 52px;
  padding: 12px;
}

nav.expanded .dropdown {
  float: none;
}

.content {
  height: 0;
  overflow: hidden;
}

.dropdown:hover .content {
  height: auto;
}

nav.expanded .content {
  position: relative;
}

nav.expanded a {
  float: none;
  display: block;
  text-align: left;
  width: 100%;
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