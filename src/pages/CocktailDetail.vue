<template>
    <section id="drinkDetails">
        <h1>{{ cocktail.name }}</h1>
        <img :src="cocktail.image_url" :alt="cocktail.name">
        <section id="ingredients">
            <h2>Ingredients</h2>
            <ul v-for="ingredient in cocktail.ingredients" :key="ingredient._id">
                <li><span v-if="ingredient.measure">{{ ingredient.measure }}&nbsp;</span>{{ ingredient.name }}</li>
            </ul>
        </section>
        <section>
            <h2>Instructions</h2>
            <div v-for="instruction in cocktail.instructions" :key="instruction.language">
                <button :id="instruction.language"></button>
            </div>
            <p>{{ directions }}</p>
            <h3>Recommended glass: {{ cocktail.glass }}</h3>
        </section>
    </section>
</template>

<script>
import { getCocktailDetails } from '@/services/cocktailServices';
export default {
    name: 'CocktailDetail',
    data: () => ({
        cocktail: {},
        instructions: 'en',
        directions: ''
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