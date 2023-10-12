<template>
  <section id="search">
    <form @submit="searchCocktails">
      <label for="ingredientFilter">Browse by alcohol:</label>
      <select id="ingredientFilter" v-model="selectedAlcohol" @change="handleChange">
        <option v-for="ingredient in ingredients" :key="ingredient" :value="ingredient">{{ ingredient }}</option>
      </select>
    </form>
    <section id="results" v-if="searchResults">
      <div v-for="drink in searchResults" :key="drink.idDrink">
        <CocktailCard :name="drink.strDrink" :category="drink.strCategory" :image_url="drink.strDrinkThumb" @click="selectDrink(drink.idDrink)"/>
      </div>
    </section>
  </section>
</template>

<script>
import CocktailCard from '@/components/CocktailCard.vue';
import { ingredientSearch } from '@/services/cocktailDB';


export default {
  name: 'SearchCocktails',
  data: () => ({
    searchResults: [],
    selectedAlcohol: 'Amaretto',
    ingredients: ["Amaretto", "Bourbon", "Brandy", "Champagne", "Coffee liqueur", "Cognac", "Dark rum", "Dry Vermouth", "Gin", "Light rum", "Rum", "Scotch", "Sweet Vermouth", "Tequila", "Triple sec", "Vodka"]
  }),
  components: {
    CocktailCard
  },
  mounted() {
    this.searchCocktails();
  },
  watch: {
    selectedAlcohol() {
      this.searchCocktails()
    }
  },
  methods: {
    async searchCocktails() {
      let res = await ingredientSearch(this.selectedAlcohol)
      this.searchResults = res
    },
    handleChange(e) {
      this.selectedAlcohol = e.target.value
    },
    selectDrink(cocktailId) {
      this.$router.push(`/cocktails/${cocktailId}`)
    }
  },
}
</script>