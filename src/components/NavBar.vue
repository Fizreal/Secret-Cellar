<template>
    <header>
      <nav :class="(expandNav) ? 'expanded' : ''">
        <router-link to="/" class="home"  @click="closeNav">
          <img src="/logo.png" alt="Logo" class="logo">
          <p>Secret Cellar</p>
        </router-link>
        <div :class="expandedDropdown.drinks ? 'dropdown expanded' : 'dropdown'">
          <button class="dropdownButton" @click="expandDropdown('drinks')">Browse Drinks</button>
          <div class="content">
            <router-link to="/cocktails/search" @click="closeNav" >By Name</router-link>
            <router-link to="/cocktails/ingredient" @click="closeNav" >By Ingredients</router-link>
            <router-link to="/cocktails/browse" @click="closeNav" >Alphabetically</router-link>
          </div>
        </div>
        <div :class="'dropdown' + (expandedDropdown.community ? ' expanded' : '')">
          <button class="dropdownButton" @click="expandDropdown('community')">Community</button>
          <div class="content">
            <router-link to="/community" @click="closeNav" >Search</router-link>
            <router-link to="/community/new" v-if="user" @click="closeNav" >Create Drink</router-link>
          </div>
        </div>
        <div :class="'dropdown' + (expandedDropdown.profile ? ' expanded' : '')" v-if="user">
          <button class="dropdownButton" @click="expandDropdown('profile')">Profile</button>
          <div class="content">
            <router-link to="/profile/collections/favorites" @click="closeNav" >Favorites</router-link>
            <router-link to="/profile/collections" @click="closeNav" >Collections</router-link>
            <button @click="handleSignOut" >Sign out</button>
          </div>
        </div>
        <router-link to="/login" v-else class="signin" @click="closeNav" >Sign In</router-link>        
        <button @click="toggleNav" aria-label="Expand Nav" class="expand"><img src="/hamburger.png" alt="Open"></button>
      </nav>
    </header>

</template>

<script>
import { authenticated } from '@/authenticated';
import { collections } from '@/collections';

export default {
  name: 'NavBar',
  data: () => ({
    expandNav: false,
    expandedDropdown: {drinks: false, community: false, profile: false}
  }),
  computed: {
    user() {
      return authenticated.user;
    }
  },
  methods: {
    handleSignOut () {
      authenticated.signOut()
      collections.signOut()
      this.expandNav = false;
      this.$router.push('/');
    },
    toggleNav () {
      this.expandNav = !this.expandNav;
    },
    closeNav () {
      this.expandNav = false;
      this.expandedDropdown = {drinks: false, community: false, profile: false};
    },
    expandDropdown (dropdown) {
      const current = this.expandedDropdown[dropdown];
      this.expandedDropdown = {drinks: false, community: false, profile: false};
      this.expandedDropdown[dropdown] = !current;
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

  .logo {
    width: 24px;
    height: 24px;
    margin-right: 8px;
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

  @media screen and (max-width: 600px) {

    nav a:not(:first-child), .dropdown .dropdownButton{
      display: none;
    }
    
    nav.expanded {
      position: relative;
      display: block;
      padding: 0;
    }
    
    .expand {
      float: right;
      display: block;
      position: absolute;
      right: 0;
      top: 0;
      aspect-ratio: 1/1;
      height: 52px;
      padding: 12px;
    }

    .expand img {
      width: 28px;
      height: 28px;
    }

    nav.expanded .dropdown {
      float: none;
    }

    .content {
      height: 0;
      overflow: hidden;
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
  
  @media (hover: hover) {

    .dropdown:hover .dropdownButton {
      background-color: #473E66;
    }

    .content a:hover, .content button:hover {
      background-color: #F5D7DB;
    }

    .dropdown:hover .content {
      height: auto;
    }

  }

  @media (hover: none) {

    .drowndown.expanded .dropdownButton {
      background-color: #473E66;
    }

    .dropdown.expanded .content {
      height: auto;
    }

  }

</style>