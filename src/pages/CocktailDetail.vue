<template>
    <section id="drinkDetails">
        <h1>{{ cocktail.name }}</h1>
        <img :src="cocktail.image_url" :alt="cocktail.name">
        <section id="ingredients">
            <h2>Ingredients</h2>
            <ul >
                <li v-for="ingredient in cocktail.ingredients" :key="ingredient._id"><span v-if="ingredient.measure">{{ ingredient.measure }}&nbsp;</span>{{ ingredient.name }}</li>
            </ul>
        </section>
        <section>
            <h2>Instructions</h2>
            <div >
                <button :id="instruction.language" v-for="instruction in cocktail.instructions" :key="instruction.language" @click="() => setLanguage(instruction.language)"></button>
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
        language: '',
        directions: ''
    }),
    mounted() {
        this.getCocktail()
    },
    watch: {
        language() {
            this.setDirections()
        }
    },
    methods: {
        async getCocktail() {
            let cocktailDetails = await getCocktailDetails(this.$route.params.cocktailId)
            this.cocktail = cocktailDetails.data
            this.language = cocktailDetails.data.instructions[0].language
        },
        setLanguage(language) {
            this.language = language
        },
        setDirections() {
            const findLanguageIndex = (instruction) => instruction.language === this.language
            let idx = this.cocktail.instructions.findIndex(findLanguageIndex)
            if (idx !== -1) {
                this.directions = this.cocktail.instructions[idx].steps
            }
        }
    },
}
</script>