<template>
  <div id="app" class="min-h-screen bg-[#1B3358]">
    <NavBar />
    <main class="flex justify-center">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
  import NavBar from './components/NavBar.vue';

  export default {
    name: 'App',
    components: {
      NavBar
    },
    mounted () {
      this.checkSession()
    },
    methods: {
      async updateCollections() {},
      async checkSession () {}
    }
  }
</script>

<style src="./styles.css">

</style>
