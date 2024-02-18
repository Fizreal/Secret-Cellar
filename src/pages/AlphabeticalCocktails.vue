<template>
  <section id="searchAlphabetically" class="flex flex-col items-center w-4/5">
    <div id="alphabetFilter" class="flex flex-wrap justify-center my-4">
      <form class="md:hidden">
        <label for="letterSelect" class="mr-2 text-xl text-[#F5D7DB] font-medium tracking-wide">Filter:</label>
        <select id="letterSelect" v-model="currentLetter" @change="handleChange" class="rounded px-1 py-0.5 border border-[#BD83B8] bg-[#F5D7DB]">
          <option v-for="letter in letters" :key="letter" :value="letter">{{ letter }}</option>
        </select>
      </form>
      <div class="hidden md:flex items-center" v-for="letter in letters" :key="letter" @click="() => updateLetter(letter)">
        <button class="transition-all ease-in-out text-gray-400 hover:text-[#F1916D] text-xl mx-2">{{ letter }}</button>
        <span v-if="letter !== 'Z'" class="text-gray-400">/</span>
      </div>
    </div>
    <div id="Results" class="flex flex-wrap justify-center gap-4">
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