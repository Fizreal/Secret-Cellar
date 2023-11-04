<template>
  <div id="app">
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
    },
    methods: {
    }
  }
</script>

<style src="./styles.css">

</style>
