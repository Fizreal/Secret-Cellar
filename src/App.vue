<template>
  <div id="app">
    <SideBar />
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
  import SideBar from './components/NavBar.vue'

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
