<template>
  <section>
    <h1>Collections</h1>
    <div>
      <router-link :to="'/' + collection.name" v-for="collection in Object.keys(collections)" :key="collection.name">
        <div>
          <img src="" alt="" v-if="collection.cocktails.length === 0">
          <img :src="collection.cocktails[0].image_url" :alt="collection.cocktails[0].name" v-else-if="collection.cocktails.length === 0">
          <img :src="collection.cocktails[n-1].image_url" :alt="collection.cocktails[n-1].name" v-else v-for="n in 4">
        </div>
        <h2>{{ collection.name[0].toUpperCase() + collection.name.slice(1) }}</h2>
        <p>{{ collection.cocktails.length }} drinks</p>
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
    collections: collections
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