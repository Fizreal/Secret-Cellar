<template>
  <section>
    <form @submit="searchCocktails">
      <label for="ingredientFilter">Browse by alcohol:</label>
      <select id="ingredientFilter" v-model="selectedAlcohol" @change="handleChange">
        <option v-for="ingredient in ingredients" :key="ingredient" :value="ingredient">{{ ingredient }}</option>
      </select>
    </form>
    <div v-if="searchResults" class="results">
        <CocktailCard v-for="drink in searchResults" :key="drink.idDrink" :name="drink.strDrink" :category="drink.strCategory" :image_url="drink.strDrinkThumb" @click="selectDrink(drink.idDrink)"/>
    </div>
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

<style scoped>

  section {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80%;
    gap: 16px;
    margin: 16px 0px;
  }

  label {
    font-size: 20px;
    line-height: 28px;
    color: #F5D7DB;
    font-weight: 500;
    letter-spacing: 0.025em;
    margin-right: 8px;
  }

  select {
    border-radius: 4px;
    background: #F5D7DB;
    border: solid 1px #BD83B8;
    padding: 2px 4px;
    height: 28px;
  }
  .results {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 16px;
  }

</style>
