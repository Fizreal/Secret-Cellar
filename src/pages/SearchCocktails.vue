<template>
  <section id="Search Drinks" class="flex flex-col items-center w-4/5">
    <form @submit="searchCocktails">
      <input type="text" :value="searchQuery" @change="handleChange">
      <button>Search</button>
    </form>
    <section class="flex flex-wrap justify-center">
        <CocktailCard v-for="drink in searchResults" :key="drink.idDrink" :name="drink.strDrink" :category="drink.strCategory" :image_url="drink.strDrinkThumb" @click="selectDrink(drink.idDrink)"/>
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
        let res = await nameSearch(this.searchQuery)
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