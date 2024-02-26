<template>
  <section class="home">
    <h1>Welcome</h1>
    <ImageCarousel title="Popular Drinks" :drinks="popularDrinks" />
    <ImageCarousel title="Recent Creations" :drinks="recentCreations" />
  </section>
</template>

<script>
import ImageCarousel from '../components/ImageCarousel.vue';
import { popular, recentCreations } from '@/services/cocktailServices';


export default {
  name: "HomePage",
  components: {
    ImageCarousel
  },data() {
    return {
      popularDrinks: [],
      recentCreations: []
    }
  },
  created() {
    this.fetchDrinks();
  },
  methods: {
    async fetchDrinks() {
      this.popularDrinks = await popular();
      this.recentCreations = await recentCreations();
    }
  },
}
</script>

<style scoped>

  .home {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 16px 0px;
    gap: 32px;
  }

  h1 {
    font-size: 20px;
    line-height: 28px;
    color: rgb(245,215,219);
    font-weight: 500;
    letter-spacing: 0.025em;
  }

</style>
