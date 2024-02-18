<template>
  <section id="Search Drinks" class="flex flex-col items-center w-4/5">
    <form @submit="searchCocktails" class="flex flex-col items-center mt-4">
      <input type="text" :value="searchQuery" @change="handleChange" class="rounded w-56 px-1 py-0.5 border border-[#BD83B8] bg-[#F5D7DB]">
      <button class="mt-2 py-1 px-2 w-32 rounded hover:bg-white/5 text-xl text-[rgb(245,215,219)] font-medium tracking-wide">Search</button>
    </form>
    <section class="flex flex-wrap justify-center gap-4">
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