<template>
  <div id="app">
    <SideBar />
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
  import SideBar from './components/SideBar.vue'

  export default {
    name: 'App',
    components: {
      SideBar
    },
    mounted () {
    },
    methods: {
    }
  }
</script>

<style src="./styles.css">

</style>
