<template>
  <section id="searchAlphabetically" class="flex flex-col items-center w-4/5">
    <section id="alphabetFilter" class="flex flex-wrap justify-center">
      <form class="md:hidden">
        <label for="letterSelect">Select letter:</label>
        <select id="letterSelect" v-model="currentLetter" @change="handleChange">
          <option v-for="letter in letters" :key="letter" :value="letter">{{ letter }}</option>
        </select>
      </form>
      <p class="hidden md:inline" v-for="letter in letters" :key="letter" @click="() => updateLetter(letter)">{{ letter }} <span v-if="letter !== 'Z'">/</span>&nbsp;</p>
    </section>
    <section id="Results" class="flex flex-wrap justify-center">
      <CocktailCard v-for="drink in searchResults" :key="drink.idDrink" :name="drink.strDrink" :category="drink.strCategory" :image_url="drink.strDrinkThumb" @click="selectDrink(drink.idDrink)"/>
    </section>
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