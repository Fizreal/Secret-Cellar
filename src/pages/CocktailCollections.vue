<template>
  <section>
    <h1>Collections</h1>
    <div>
      <router-link :to="'/profile/collections/' + collection" v-for="collection in Object.keys(collections)" :key="collection">
        <div>
          <img src="" alt="" v-if="collections[collection].length === 0">
          <img :src="collections[collection][0].image_url" :alt="collections[collection][0].name" v-else-if="collections[collection].length < 4">
          <img :src="collections[collection][n-1].image_url" :alt="collections[collection][n-1].name" v-else v-for="n in 4" :key="collections[collection][n].idDrink">
        </div>
        <h2>{{ collection[0].toUpperCase() + collection.slice(1) }}</h2>
        <p>{{ collections[collection].length }} drinks</p>
      </router-link>
    </div>
    <div id="Create collection modal">
      <form @submit="createCollection">
        <label for="name">Name:</label>
        <input type="text" name="name" id="name">
        <button type="submit">Create</button>
      </form>
    </div>
  </section>
</template>

<script>
import { collections } from '@/collections';
import { createCollection } from '@/services/collectionServices';

export default {
  name: 'CocktailCollections',
  data: () => ({
    collections: collections.collections
  }),
  methods: {
    async createCollection(e) {
      e.preventDefault()
        let data = {
          name: e.target.name.value,
        }
        let collection = await createCollection(data)
        collections.addCollection(collection)
    }
  }
}
</script>