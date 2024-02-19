<template>
    <section id="Drink Details" v-if="!cocktail">
        <div v-if="loading">
            <h1>Loading...</h1>
        </div>
        <div v-else>
            <h1>Not Found</h1>
        </div>
    </section>
    <section id="Drink Details" v-else>
        <div class="w-full md:grid md:grid-cols-2">
            <div>
                <img :src="cocktail.image_url" :alt="cocktail.name" class="drink">
                <div class="flex w-full max-w-[400px] justify-around">
                    <div class="likes">
                        <button :aria-label="(this.favorite) ? 'Unfavorite' : 'Favorite'" @click="toggleFavorite" :disabled="disableFavorite">
                            <img :src="(this.favorite) ? '/liked.png' : '/like.png'" :alt="(this.favorite) ? 'Unfavorite' : 'Favorite'">
                        </button>
                        <p class="likeText">{{this.cocktail.likes}}</p>
                    </div>
                    <div class="popover">
                        <button class="popoverButton">Add to collection</button>
                        <div class="collections">
                            <div class="collection" v-for="collection in collections" :key="collection.id">
                                <button @click="addToCollection(collection)" v-if="!collection.inCollection" :disabled="disableCollections">
                                    <img src="/plus.png" alt="Add" class="w-6 h-6 rounded-full bg-green-600">
                                </button>
                                <button v-else :disabled="disableCollections" @click="removeFromCollection(collection)">
                                    <img src="/minus.png" alt="Remove" class="w-6 h-6 rounded-full bg-red-600">
                                </button>
                                <p>{{ collection.name }}</p>
                            </div>
                            <div class="collection">
                                <form @submit="createCollection">
                                    <button>
                                        <img src="/plus.png" alt="Add" class="w-6 h-6 rounded-full bg-green-600">
                                    </button>
                                    <input type="text" placeholder="New collection" :value="this.collectionForm.name" @change="handleChange">
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <h1 class="w-full text-center">{{ cocktail.name }}</h1>
                <div id="Ingredients" class="flex flex-col items-center w-full mt-4">
                    <h2>Ingredients</h2>
                    <ul class="mt-2">
                        <li v-for="ingredient in cocktail.ingredients" :key="ingredient._id"><span v-if="ingredient.measure">{{ ingredient.measure }}&nbsp;</span>{{ ingredient.name }}</li>
                    </ul>
                </div>
            </div>
        </div>
        <div id="Instructions" class="w-full flex flex-col gap-2">
            <h2 class="text-center">Instructions</h2>
            <div class="flex justify-center flex-wrap gap-2">
                <img class="h-12 scale-90 hover:scale-100 transition-all ease-in-out" :id="instruction.language" :src="`/${instruction.language}.png`" :title="`${instruction.language}`" v-for="instruction in cocktail.instructions" :key="instruction.language" @click="() => setLanguage(instruction.language)">
            </div>
            <p class="text-center">{{ directions }}</p>
        </div>
        <div class="w-full flex justify-center gap-1">
            <h2>Recommended glass:</h2>
            <p>{{ cocktail.glass }}</p>
        </div>
    </section>
</template>

<script>
import { getCocktailDetails } from '@/services/cocktailServices'
import { favoriteCocktail, unfavoriteCocktail, addToCollection, createCollection, removeFromCollection } from '@/services/collectionServices'
import { collections } from '@/collections'
import { authenticated } from '@/authenticated'

export default {
    name: 'CocktailDetail',
    data: () => ({
        loading: true,
        cocktail: null,
        disableFavorite: false,
        disableCollections: false,
        language: '',
        collectionForm: { name: '' }
    }),
    mounted() {
        this.getCocktail()
    },
    computed: {
        user() {
            return authenticated.user;
        },
        favorite() {
            if (!this.user || !this.cocktail) return false
            const favorites = collections.collections.favorites?.drinks
            const favoriteIds = favorites?.map(favorite => favorite._id)
            const idx = favoriteIds?.indexOf(this.cocktail?._id)
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
                if (collection.drinks.findIndex(drink => drink._id === this.cocktail._id) === -1) {
                    availableCollections.push({name: collectionNames[i], id: collection.id, inCollection: false})
                } else {
                    availableCollections.push({name: collectionNames[i], id: collection.id, inCollection: true})
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
        toggleFavorite() {
            if (this.favorite) {
                this.unforavoriteDrink()
            } else {
                this.favoriteDrink()
            }
        },
        async addToCollection(collection) {
            this.disableCollections = true
            try {
                await addToCollection(collection.id, this.cocktail._id)
                collections.addToCollection(collection.name, this.cocktail)
            } catch (error) {
                console.log(error)
            }
            this.disableCollections = false
        },
        async removeFromCollection(collection) {
            this.disableCollections = true
            try {
                await removeFromCollection(collection.id, this.cocktail._id)
                collections.removeFromCollection(collection.name, this.cocktail)
            } catch (error) {
                console.log(error)
            }
            this.disableCollections = false
        },
        handleChange(e) {
            this.collectionForm.name = e.target.value
        },
        async createCollection(e) {
            e.preventDefault()

            try {
                let collection = await createCollection({name: this.collectionForm.name})
                this.collectionForm.name = ''
                collections.addCollection(collection)
            } catch (error) {
                console.log(error)
            }
        }
    }
}
</script>

<style scoped>

section {
    display: flex;
    flex-wrap: wrap;
    width: 80%;
    margin: 16px 0px;
    gap: 16px;
}

h1 {
    font-size: 20px;
    line-height: 28px;
    color: #F5D7DB;
    font-weight: 500;
    letter-spacing: 0.025em;
}

h2, .likeText {
    font-size: 18px;
    line-height: 24px;
    color: #BD83B8;
    font-weight: 500;
    letter-spacing: 0.025em;
}

p:not(.likeText), li {
    font-size: 16px;
    line-height: 24px;
    color: white;
    font-weight: 400;
    letter-spacing: 0.025em;
}

.drink {
    width: clamp(150px, 100%, 400px);
    aspect-ratio: 1/1;
    justify-self: center;
    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
    border-radius: 10px;
}

.likes {
    display: flex;
    align-items: center;
    gap: 6px;
}

.likes button {
    width: 25px;
}

.collection {
    display: flex;
    align-items: center;
    gap: 6px;
}

.collection > p {
    text-wrap: wrap;
}

.collection form {
    display: flex;
    align-items: center;
    gap: 6px;
    width: 100%;
}

input {
    border-radius: 4px;
    background: #F5D7DB;
    border: solid 1px #BD83B8;
    padding: 2px 4px;
    height: 24px;
    width: 170px;
}

.popover {
    overflow: hidden;
}

.popover .popoverButton {
    border: none;
    outline: none;
    margin: 0;
    background-color: inherit;
    padding: 7px 8px;
    font-size: 18px;
    line-height: 24px;
    color: #BD83B8;
    font-weight: 500;
    letter-spacing: 0.025em;
}

.collections {
    display: flex;
    flex-direction: column;
    position: absolute;
    overflow: hidden;
    background-color: #BD83B8;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    min-width: 150px;
    gap: 10px;
    height: 0;
    z-index: 1;
}

.popover:hover .collections {
    height: auto;
    padding: 5px;
}

.popover:hover .popoverButton {
    background-color: #473E66;
}

</style>