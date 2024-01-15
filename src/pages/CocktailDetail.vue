<template>
    <section v-if="!cocktail">
        <div v-if="loading">
            <h1>Loading...</h1>
        </div>
        <div v-else>
            <h1>Not Found</h1>
        </div>
    </section>
    <section id="Drink Details" class="flex flex-wrap w-4/5 mt-4" v-else>
        <div class="w-full md:grid md:grid-cols-2">
            <div>
                <img :src="cocktail.image_url" :alt="cocktail.name" class="drink">
                <div class="flex w-full max-w-[400px] justify-around">
                    <div class="likes">
                        <button :aria-label="(this.favorite) ? 'Unfavorite' : 'Favorite'" @click="toggleFavorite" :disabled="disableFavorite">
                            <img :src="(this.favorite) ? '/liked.png' : '/like.png'" :alt="(this.favorite) ? 'Unfavorite' : 'Favorite'">
                        </button>
                        <p>{{this.cocktail.likes}}</p>
                    </div>
                    <div class="popover">
                        <button>Add to collection</button>
                        <div class="collections">
                            <div class="collection" v-for="collection in collections">
                                <button @click="addToCollection(collection)" v-if="!collection.inCollection">
                                    <img src="/plus.png" alt="Add" class="rounded-full bg-green-600">
                                </button>
                                <button v-else>
                                    <img src="/minus.png" alt="Remove" class="rounded-full bg-red-600">
                                </button>
                                <p>{{ collection.name }}</p>
                            </div>
                            <div class="collection">
                                <form @submit="createCollection">
                                    <button>
                                        <img src="" alt="Add">
                                    </button>
                                    <input type="text" >
                                </form>
                            </div>
                        </div>
                    </div>
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
import { getCocktailDetails } from '@/services/cocktailServices'
import { favoriteCocktail, unfavoriteCocktail, addToCollection, createCollection } from '@/services/collectionServices'
import { collections } from '@/collections'
import { authenticated } from '@/authenticated'

export default {
    name: 'CocktailDetail',
    data: () => ({
        loading: true,
        cocktail: null,
        disableFavorite: false,
        language: '',
        collectionForm: {
            name: ''}
    }),
    mounted() {
        this.getCocktail()
    },
    computed: {
        user() {
        return authenticated.user;
        },
        favorite() {
            if (!this.user) return false
            const favorites = collections.collections.favorites.drinks
            const favoriteIds = favorites?.map(favorite => favorite._id)
            const idx = favoriteIds?.indexOf(this.cocktail._id)
            if (idx !== -1) {
                return true
            }
            return false
        },
        directions() {
            const findLanguageIndex = (instruction) => instruction.language === this.language
            let idx = this.cocktail.instructions?.findIndex(findLanguageIndex)
            if (idx !== -1) {
                return this.cocktail.instructions[idx].steps
            }
            return ''
        },
        collections() {
            let availableCollections = []
            let collectionNames = Object.keys(collections.collections)
            for (let i = 0; i < collectionNames.length; i++) {
                if(collectionNames[i] === 'favorites') continue
                let collection = collections.collections[collectionNames[i]]
                if (collection.drinks?.findIndex(drink => drink._id === this.cocktail._id) === -1) {
                    collections.push({name: collectionNames[i], collection: collection, id: collection.id, inCollection: false})
                } else {
                    collections.push({name: collectionNames[i], collection: collection, id: collection.id, inCollection: true})
                }
            }
            availableCollections.sort((a, b) => a.inCollection - b.inCollection)
            return availableCollections
        }
    },
    watch: {
        '$route.params.cocktailId': {
            immediate: true,
            handler: 'getCocktail'
        }
    },
    methods: {
        async getCocktail() {
            this.loading = true
            this.cocktail = null
            try {
                let cocktailDetails = await getCocktailDetails(this.$route.params.cocktailId)
                this.cocktail = cocktailDetails
                this.language = cocktailDetails.instructions[0].language
                this.loading = false
            } catch (error) {
                console.log(error) 
                this.loading = false
            }
        },
        setLanguage(language) {
            this.language = language
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
            try {
                await favoriteCocktail(this.cocktail._id)
                collections.addToCollection('favorites', this.cocktail)
                this.cocktail.likes++
            } catch (error) {
                console.log(error)
            }
            this.disableFavorite = false
        },
        async unforavoriteDrink () {
            this.disableFavorite = true
            try {
                await unfavoriteCocktail(this.cocktail._id)
                collections.removeFromCollection('favorites', this.cocktail)
                this.cocktail.likes--
            } catch (error) {
                console.log(error)
            }
            this.disableFavorite = false
        },
        async addToCollection(collection) {
            try {
                await addToCollection(collection.id, this.cocktail._id)
                collections.addToCollection(collection.name, this.cocktail)
            } catch (error) {
                console.log(error)
            }
        },
        async createCollection() {
            try {
                let collection = await createCollection(this.collectionName)
                collections.addCollection(collection)
                await this.addToCollection(collection)
            } catch (error) {
                console.log(error)
            }
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