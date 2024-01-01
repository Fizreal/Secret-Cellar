<template>
  <section id="search" class="flex flex-col items-center w-4/5">
    <form @submit="searchCocktails" class="my-4">
      <label for="ingredientFilter" class="mr-2 text-xl text-[#F5D7DB] font-medium tracking-wide">Browse by alcohol:</label>
      <select id="ingredientFilter" v-model="selectedAlcohol" @change="handleChange" class="rounded px-1 py-0.5 border border-[#BD83B8] bg-[#F5D7DB]">
        <option v-for="ingredient in ingredients" :key="ingredient" :value="ingredient">{{ ingredient }}</option>
      </select>
    </form>
    <section id="results" v-if="searchResults" class="flex flex-wrap justify-center">
        <CocktailCard v-for="drink in searchResults" :key="drink.idDrink" :name="drink.strDrink" :category="drink.strCategory" :image_url="drink.strDrinkThumb" @click="selectDrink(drink.idDrink)"/>
    </section>
  </section>
</template>

<script>
import CocktailCard from '@/components/CocktailCard.vue';
import { ingredientSearch } from '@/services/cocktailDB';


export default {
  name: 'AlcoholCocktails',
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