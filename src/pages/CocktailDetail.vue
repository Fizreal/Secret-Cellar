<template>
    <section>
        <h1>{{ cocktail.strDrink }}</h1>
    </section>
</template>

<script>
import { getCocktailDetails } from '@/services/cocktailServices';
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
            let cocktailDetails = await getCocktailDetails(this.$route.params.cocktailId)
            this.cocktail = cocktailDetails
        }
    },
}
</script>