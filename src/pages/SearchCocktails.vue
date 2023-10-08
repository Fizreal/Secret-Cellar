<template>
  <section id="search">
    <form @submit="searchCocktails">
      <input type="text" :value="searchQuery" @change="handleChange">
      <button>Search</button>
    </form>
    <section id="results" v-if="results" v-for="drink in searchResults" :key="drink.idDrink">
      <CocktailCard :name="drink.strDrink" :category="drink.strCategory" :image_url="drink.strDrinkThumb" @click="selectDrink(drink.idDrink)"/>
    </section>
  </section>
</template>

<script>
import CocktailCard from '@/components/CocktailCard.vue';
import { nameSearch } from '@/services/cocktailDB';
export default {
    name: 'SearchCocktails',
    components: {
      CocktailCard
    },
    data: () => ({
        searchResults: [],
        searchQuery: ""
    }),
    methods: {
      async searchCocktails(e) {
        e.preventDefault()
        let res = await nameSearch(searchQuery)
        this.searchResults = res
        this.searchQuery = ""
      },
      handleChange(e) {
        this.searchQuery = e.target.value
      },
      selectDrink(cocktailId) {
        this.$router.push(`/cocktails/${cocktailId}`)
      }
    }
}
</script>