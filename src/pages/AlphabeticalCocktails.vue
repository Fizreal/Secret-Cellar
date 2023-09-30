<template>
  <section>
    <section id="results" v-for="drink in searchResults" :key="drink.idDrink">
      <CocktailCard :name="drink.strDrink" :category="drink.strCategory" :image_url="drink.strDrinkThumb" />
    </section>
    <section id="selectLetter">
      <form>
        <select v-for="letter in letters" v-model="currentLetter" @change="handleChange">
          <option :value="letter">{{ letter }}</option>
        </select>
      </form>
      <section id="options">
        <p @click="() => updateLetter('A')">A</p> /
        <p @click="() => updateLetter('B')">B</p> /
        <p @click="() => updateLetter('C')">C</p> /
        <p @click="() => updateLetter('D')">D</p> /
        <p @click="() => updateLetter('E')">E</p> /
        <p @click="() => updateLetter('F')">F</p> /
        <p @click="() => updateLetter('G')">G</p> /
        <p @click="() => updateLetter('G')">G</p> /
        <p @click="() => updateLetter('H')">H</p> /
        <p @click="() => updateLetter('I')">I</p> /
        <p @click="() => updateLetter('J')">J</p> /
        <p @click="() => updateLetter('K')">K</p> /
        <p @click="() => updateLetter('L')">L</p> /
        <p @click="() => updateLetter('M')">M</p> /
        <p @click="() => updateLetter('N')">N</p> /
        <p @click="() => updateLetter('O')">O</p> /
        <p @click="() => updateLetter('P')">P</p> /
        <p @click="() => updateLetter('Q')">Q</p> /
        <p @click="() => updateLetter('R')">R</p> /
        <p @click="() => updateLetter('S')">S</p> /
        <p @click="() => updateLetter('T')">T</p> /
        <p @click="() => updateLetter('U')">U</p> /
        <p @click="() => updateLetter('V')">V</p> /
        <p @click="() => updateLetter('W')">W</p> /
        <p @click="() => updateLetter('X')">X</p> /
        <p @click="() => updateLetter('Y')">Y</p> /
        <p @click="() => updateLetter('Z')">Z</p>
      </section>
    </section>
  </section>
</template>

<script>
import { watch } from 'vue';
import { letterSearch } from '@/services/cocktailDB';
import CocktailCard from '@/components/CocktailCard.vue';

const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'H', 'I','J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

export default {
    name: 'AlphabeticalCocktails',
    data: () => ({
        searchResults: [],
        currentLetter: ''
    }),
    mounted() {
      this.currentLetter = 'A'
      this.getCocktails();
    },
    watch: {
      currentLetter(val) {
        this.getCocktails()
      }
    },
    methods: {
      async getCocktails () {
        let res = await letterSearch(this.currentLetter)
        this.searchResults = res.data
      },
      handleChange(e) {
        this.currentLetter = e.target.value
      },
      updateLetter (letter) {
        this.currentLetter = letter
      }
    }
}
</script>