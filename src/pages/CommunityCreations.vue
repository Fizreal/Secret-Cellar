<template>
  <section v-if="!communityCreations">
    <h1 v-if="loading">Loading...</h1>
    <h1 v-else>No community creations available</h1>
    </section>
  <section v-else>
    <h1>Community Creations</h1>
    <div class="results">
      <CocktailCard v-for="drink in communityCreations" :key="drink.idDrink" :name="drink.name" :category="drink.category" :image_url="drink.image_url" :author="drink.author" @click="selectDrink(drink.idDrink)"/>
    </div>
  </section>
</template>

<script>
import { communityCreations } from '@/services/cocktailServices';
import CocktailCard from '@/components/CocktailCard.vue';

export default {
  name: 'CommunityCreations',
  data: () => ({
    communityCreations: null,
    loading: true
  }),
  components: {
    CocktailCard
  },
  mounted() {
    this.fetchCommunityCreations()
  },
  methods: {
    async fetchCommunityCreations() {
      let res = await communityCreations()
      if (res.length === 0) {
        this.loading = false
        return
      }
      this.communityCreations = res
      this.loading = false
    },
    selectDrink(cocktailId) {
      this.$router.push(`/cocktails/${cocktailId}`)
    }
  }
}
</script>

<style scoped>

section {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80%;
    margin: 16px 0px;
    gap: 16px;
}

h1 {
    font-size: 20px;
    line-height: 28px;
    color: #F5D7DB;
    font-weight: 500;
    letter-spacing: 0.025em;
}
.results {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px;
}

</style>

