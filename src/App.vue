<template>
  <div id="app" class="min-h-screen">
    <NavBar />
    <main class="flex justify-center">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
  import NavBar from './components/NavBar.vue';
  import { authenticated } from './authenticated';
  import { collections } from './collections';
  import { CheckSession } from './services/Auth';
  import { getFavorites, getCollections } from './services/collectionServices';

  export default {
    name: 'App',
    components: {
      NavBar
    },
    mounted () {
      this.checkSession()
    },
    methods: {
      async updateCollections() {
        let favorites = await getFavorites();
        let allCollections = await getCollections();
        collections.addCollection(favorites)
        allCollections.forEach(collection => {
          collections.addCollection(collection)
        })
      },
      async checkSession () {
        let user = await CheckSession()
        if (user) {
          authenticated.signIn(user)
          await this.updateCollections()
        }
      }
    }
  }
</script>

<style src="./styles.css">

</style>
