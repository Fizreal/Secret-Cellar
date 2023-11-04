<template>
    <section id="Drink Details" class="flex flex-wrap w-4/5">
        <h1 class="w-full text-center">{{ cocktail.name }}</h1>
        <section class="w-full md:grid md:grid-cols-2">
            <img :src="cocktail.image_url" :alt="cocktail.name">
            <section id="Ingredients and " class="flex flex-col items-center w-full">
                <h2>Ingredients</h2>
                <ul >
                    <li v-for="ingredient in cocktail.ingredients" :key="ingredient._id"><span v-if="ingredient.measure">{{ ingredient.measure }}&nbsp;</span>{{ ingredient.name }}</li>
                </ul>
            </section>
        </section>
        <section id="Instructions" class="w-full">
            <h2 class="text-center">Instructions</h2>
            <section class="flex justify-center flex-wrap">
                <img class="h-10 m-1" :id="instruction.language" :src="`/${instruction.language}.png`" :title="`${instruction.language}`" v-for="instruction in cocktail.instructions" :key="instruction.language" @click="() => setLanguage(instruction.language)">
            </section>
            <p class="text-center">{{ directions }}</p>
        </section>
        <h3 class="w-full text-center">Recommended glass: {{ cocktail.glass }}</h3>
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