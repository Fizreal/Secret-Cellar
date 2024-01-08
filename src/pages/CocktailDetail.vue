<template>
    <section id="Drink Details" class="flex flex-wrap w-4/5 mt-4">
        <div class="w-full md:grid md:grid-cols-2">
            <div>
                <img :src="cocktail.image_url" :alt="cocktail.name" class="drink">
                <div class="flex w-full max-w-[400px] justify-around">
                    <div class="likes">
                        <button :aria-label="(this.favorite) ? 'Unfavorite' : 'Favorite'" @click="toggleFavorite" :disabled="disableFavorite">
                            <img :src="(this.favorite) ? '/liked.png' : '/like.png'" :alt="(this.favorite) ? 'Unfavorite' : 'Favorite'">
                        </button>
                        <p>{{this.cocktail?.likes}}</p>
                    </div>
                    <button>Add to collection</button>
                </div>

            </div>
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
import { favoriteCocktail, unfavoriteCocktail } from '@/services/collectionServices';
import { collections } from '@/collections';
import { authenticated } from '@/authenticated';

export default {
    name: 'CocktailDetail',
    data: () => ({
        cocktail: {},
        favorite: false,
        disableFavorite: false,
        language: '',
        directions: ''
    }),
    mounted() {
        this.getCocktail()
    },
    computed: {
        user() {
        return authenticated.user;
        }
    },
    watch: {
        '$route.params.cocktailId': {
            immediate: true,
            handler: 'getCocktail'
        },
        user: {
            immediate: true,
            handler: 'checkFavorite'
        },
        'collections.collections': {
            immediate: true,
            handler: 'checkFavorite'
        },
        cocktail: {
            immediate: true,
            handler: 'checkFavorite'
        },
        language() {
            this.setDirections()
        }
    },
    methods: {
        async getCocktail() {
            let cocktailDetails = await getCocktailDetails(this.$route.params.cocktailId)
            this.cocktail = cocktailDetails
            this.language = cocktailDetails.instructions[0].language
        },
        checkFavorite() {
            if (!this.user) return
            const favorites = collections.collections.favorites
            const favoriteIds = favorites?.map(favorite => favorite._id)
            const idx = favoriteIds?.indexOf(this.cocktail._id)
            if (idx !== -1) {
                this.favorite = true
            }
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
        },
        toggleFavorite() {
            if (this.favorite) {
                this.unforavoriteDrink()
            } else {
                this.favoriteDrink()
            }
        },
        async favoriteDrink () {
            this.disableFavorite = true
            await favoriteCocktail(this.cocktail._id)
            collections.addToCollection('favorites', this.cocktail)
            this.cocktail.likes++
            this.favorite = true
            this.disableFavorite = false
        },
        async unforavoriteDrink () {
            this.disableFavorite = true
            await unfavoriteCocktail(this.cocktail._id)
            collections.removeFromCollection('favorites', this.cocktail)
            this.cocktail.likes--
            this.favorite = false
            this.disableFavorite = false
        }
    }
}
</script>

<style scoped>
.drink {
    width: clamp(150px, 100%, 400px);
    aspect-ratio: 1/1;
    justify-self: center;
}

.likes {
    display: flex;
}

.likes button {
    width: 25px;
}


</style>