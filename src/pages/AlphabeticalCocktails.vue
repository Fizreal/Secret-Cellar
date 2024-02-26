<template>
  <section>
    <div id="alphabetFilter">
      <form class="md:hidden">
        <label for="letterSelect">Filter:</label>
        <select id="letterSelect" v-model="currentLetter" @change="handleChange">
          <option v-for="letter in letters" :key="letter" :value="letter">{{ letter }}</option>
        </select>
      </form>
      <div class="hidden md:flex items-center" v-for="letter in letters" :key="letter" @click="() => updateLetter(letter)">
        <button class="transition-all ease-in-out text-gray-400 hover:text-[#F1916D] text-xl mx-2">{{ letter }}</button>
        <span v-if="letter !== 'Z'" class="text-gray-400">/</span>
      </div>
    </div>
    <div class="results">
      <CocktailCard v-for="drink in searchResults" :key="drink.idDrink" :name="drink.strDrink" :category="drink.strCategory" :image_url="drink.strDrinkThumb" @click="selectDrink(drink.idDrink)"/>
    </div>
  </section>
</template>

<script>
import { letterSearch } from '@/services/cocktailDB';
import CocktailCard from '@/components/CocktailCard.vue';

export default {
  name: 'AlphabeticalCocktails',
  data: () => ({
    searchResults: [],
    currentLetter: '',
    letters: ['A', 'B', 'C', 'D', 'E', 'F', 'H', 'I','J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
  }),
  components: {
    CocktailCard
  },
  mounted() {
    this.currentLetter = 'A'
    this.getCocktails();
  },
  watch: {
    currentLetter() {
      this.getCocktails()
    }
  },
  methods: {
    async getCocktails () {
      let res = await letterSearch(this.currentLetter)
      this.searchResults = res
    },
    handleChange(e) {
      this.currentLetter = e.target.value
    },
    updateLetter (letter) {
      this.currentLetter = letter
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

  #alphabetFilter {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
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