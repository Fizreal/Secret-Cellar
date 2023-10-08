<template>
  <section id="search">
    <form @submit="searchCocktails">
      <label for="ingredientFilter">Browse by alcohol:</label>
      <select id="ingredientFilter" v-for="ingredient in ingredients" v-model="selectedAlcohol" @change="handleChange">
      <option :value="ingredient">{{ ingredient }}</option>
    </select>
    </form>
    <section id="results" v-if="searchResults" v-for="drink in searchResults" :key="drink.idDrink">
      <CocktailCard :name="drink.strDrink" :category="drink.strCategory" :image_url="drink.strDrinkThumb" @click="selectDrink(drink.idDrink)"/>
    </section>
  </section>
</template>

<script>
import CocktailCard from '@/components/CocktailCard.vue';
import { ingredientSearch } from '@/services/cocktailDB';

const ingredients = ["Amaretto", "Bourbon", "Brandy", "Champagne", "Coffee liqueur", "Cognac", "Dark rum", "Dry Vermouth", "Gin", "Light rum", "Rum", "Scotch", "Sweet Vermouth", "Tequila", "Triple sec", "Vodka"]

export default {
    name: 'SearchCocktails',
    data: () => ({
        searchResults: [],
        selectedAlcohol: 'Amaretto'
    }),
    components: {
      CocktailCard
    },
    mounted() {
      this.searchCocktails();
    },
    watch: {
      selectedAlcohol(val) {
        this.searchCocktails()
      }
    },
    methods: {
      async searchCocktails() {
        let res = await ingredientSearch(this.selectedAlcohol)
        this.searchResults = res.data
      },
      handleChange(e) {
        this.selectedAlcohol = e.target.value
      },
      selectDrink(cocktailId) {
        this.$router.push(`/cocktails/${cocktailId}`)
      }
    }
}
</script>