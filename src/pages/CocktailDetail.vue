<template>
    <section id="Drink Details" class="flex flex-wrap w-4/5 mt-4">
        <div class="w-full md:grid md:grid-cols-2">
            <img :src="cocktail.image_url" :alt="cocktail.name">
            <div class="mt-4 sm:mt-0">
                <h1 class="w-full text-center">{{ cocktail.name }}</h1>
                <div id="Ingredients" class="flex flex-col items-center w-full mt-4">
                    <h2>Ingredients</h2>
                    <ul class="mt-2">
                        <li v-for="ingredient in cocktail.ingredients" :key="ingredient._id"><span v-if="ingredient.measure">{{ ingredient.measure }}&nbsp;</span>{{ ingredient.name }}</li>
                    </ul>
                </div>
            </div>
        </div>
        <div id="Instructions" class="w-full mt-4">
            <h2 class="text-center">Instructions</h2>
            <div class="flex justify-center flex-wrap">
                <img class="h-12 scale-90 m-1 hover:scale-100 transition-all ease-in-out" :id="instruction.language" :src="`/${instruction.language}.png`" :title="`${instruction.language}`" v-for="instruction in cocktail.instructions" :key="instruction.language" @click="() => setLanguage(instruction.language)">
            </div>
            <p class="text-center">{{ directions }}</p>
        </div>
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