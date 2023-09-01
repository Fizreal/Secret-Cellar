<template>
  <section>
    <h1>{{ cocktail.strDrink }}</h1>
  </section>
</template>

<script>
import axios from 'axios';
export default {
    name: 'CocktailDetail',
    data: () => ({
        cocktail: {}
    }),
    mounted() {
        this.getCocktail();
    },
    methods: {
        async getCocktail() {
            let cocktailId = this.$route.params.cocktailId;
            let cocktailDetails = await axios.get(`https://thecocktaildb.com/api/json/v1/1/lookup.php?i=${cocktailId}`);
            this.cocktail = cocktailDetails.data.drinks[0];
        }
    }
}
</script>