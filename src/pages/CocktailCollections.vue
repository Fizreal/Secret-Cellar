<template>
  <section>
    <h1>Collections</h1>
    <div class="collections">
      <router-link :to="'/profile/collections/' + collection.name" v-for="collection in collections" :key="collection.id">
        <div class="collectionPreview">
          <img src="" alt="" v-if="collection.drinks.length === 0" class="previewImage">
          <img :src="collection.drinks[0].image_url" :alt="collection.drinks[0]?.name" v-else-if="collection.drinks?.length < 4" class="previewImage">
          <img :src="collection.drinks[n-1].image_url" :alt="collection.drinks[n-1]?.name" v-else v-for="n in 4" :key="collection.drinks[n]?.idDrink" class="previewImages">
        </div>
        <div class="collectionDetails">
          <h2>{{ collection.name[0].toUpperCase() + collection.name.slice(1) }}</h2>
          <p>{{ collectionText(collection.drinks.length) }}</p>
        </div>
      </router-link>
    </div>
    <div class="modal" v-if="showCreateModal">
      <div class="background" @click="toggleCreateModal"></div>
      <form @submit="createCollection">
        <h2>Create New Collection</h2>
        <fieldset>
          <label for="name">Name:</label>
          <input type="text" name="name" id="name">
        </fieldset>
        <button type="submit" class="submit">Create</button>
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
    showCreateModal: true,
    createForm: {
      name: ''
    },
  }),
  computed: {
    collections() {
      let availableCollections = []
      let collectionNames = Object.keys(collections.collections)
      console.log(collectionNames)
        for (let i = 0; i < collectionNames.length; i++) {
          let collection = collections.collections[collectionNames[i]]
          availableCollections.push({name: collectionNames[i], drinks: collection.drinks, id: collection.id})
        }
      return availableCollections
    }
  },
  methods: {
    toggleCreateModal() {
      this.showCreateModal = !this.showCreateModal
    },
    handleChange(e) {
      this.form.name = e.target.value
    },
    async createCollection(e) {
      e.preventDefault()
        let data = {
          name: e.target.name.value,
        }
        let collection = await createCollection(data)
        collections.addCollection(collection)
    },
    collectionText(length) {
      switch (length) {
        case length === 0:
          return 'No Drinks in collection'
        case 1:
          return '1 drink in collection'
        default:
          return `${length} drinks in collection`
    }
  }
}
}
</script>

<style scoped>

section {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  margin: 16px 0px;
  gap: 16px;
}

.collections {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 16px;
}

.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed; 
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
}

.modal > .background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal > form {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
  border-radius: 8px;
  gap: 16px;
  background-color: rgba(0, 0, 0, 0.5);
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  z-index: 1;
}

label {
  font-size: 1.125rem;
  line-height: 1.75rem;
  color: #F5D7DB;
  font-weight: 500;
  letter-spacing: 0.025em;
  margin-right: 4px;
}

input {
  border-radius: 4px;
  background: #F5D7DB;
  border: solid 1px #BD83B8;
  padding: 2px 4px;
  height: 24px;
}

.submit {
  font-size: 1.125rem;
  font-weight: 500;
  letter-spacing: 0.025em;
  color: #06142E;
  background: #F5D7DB;
  border-radius: 8px;
  padding: 4px 8px;
}

.submit:hover {
  background: #BD83B8;
}

a {
  display: flex;
  align-items: center;
  width: clamp(0px, 80%, 684px);
  aspect-ratio: 2/1;
  border: 1px solid #F5D7DB;
  border-radius: 10px;
  overflow: hidden;
}

.collectionDetails {
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  align-items: center;
}

.collectionPreview {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  height: 100%;
  aspect-ratio: 1/1;
}

.previewImage {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.previewImages {
  width: 50%;
  height: 50%;
  aspect-ratio: 1 / 1;
}

</style>