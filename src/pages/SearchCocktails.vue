<template>
  <section>
    <form @submit="searchCocktails" class="search">
      <input type="text" :value="searchQuery" @change="handleChange">
      <button>Search</button>
    </form>
    <div class="results">
        <CocktailCard v-for="drink in searchResults" :key="drink.idDrink" :name="drink.strDrink" :category="drink.strCategory" :image_url="drink.strDrinkThumb" @click="selectDrink(drink.idDrink)"/>
    </div>
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

<style scoped>

section {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  gap: 16px;
  padding: 16px 0px;
}

.search {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.search > input {
  width: 224px;
  padding: 2px 8px;
  border: 1px solid #BD83B8;
  border-radius: 4px;
  background: #F5D7DB;
}

.search > button {
  background: #BD83B8;
  color: #F5D7DB;
  width: 128px;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 20px;
  line-height: 28px;
  font-weight: 500;
  letter-spacing: 0.025em
}

.search > button:hover {
  background: #F5D7DB;
  color: #BD83B8;
}

.results {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px;
}

</style>
