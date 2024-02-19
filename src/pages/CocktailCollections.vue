<template>
  <section>
    <button @click="toggleCreateModal" aria-label="Create collection" class="modalButton">
      <img src="/plus.png" alt="Plus">
      <p>New Collection</p>
    </button>
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
          <input type="text" name="name" id="name" :value="newCollection" @change="handleChange" maxlength="20">
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
    showCreateModal: false,
    newCollection: '',
  }),
  computed: {
    collections() {
      let availableCollections = []
      let collectionNames = Object.keys(collections.collections)
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
      this.newCollection = e.target.value
    },
    async createCollection(e) {
      e.preventDefault()
      if (this.newCollection === '') return
      let data = {
        name: this.newCollection,  
      }  
      let collection = await createCollection(data)
      collections.addCollection(collection)
      this.toggleCreateModal()
      this.newCollection = ''
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
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  margin: 16px 0px;
  gap: 32px;
}

h1 {
  font-size: 20px;
  line-height: 28px;
  color: rgb(245,215,219);
  font-weight: 500;
  letter-spacing: 0.025em;
}

h2 {
  font-size: 18px;
  line-height: 24px;
  color: #BD83B8;
  font-weight: 500;
  letter-spacing: 0.025em;
  text-align: center;
}

p {
  font-size: 16px;
  line-height: 24px;
  color: white;
  font-weight: 400;
  letter-spacing: 0.025em;
  text-align: center;
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
  background-color: rgba(0, 0, 0, 0.8);
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
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
}

.collectionDetails {
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  gap: 10px;
  background: rgb(255,255,255,0.1);
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

.modalButton {
  position: absolute;
  display: flex;
  align-items: center;
  top: 0;
  right: 0;
  padding: 8px 16px;
  gap: 8px;
  border-radius: 8px;
  background: #BD83B8;
  z-index: 1;
}

.modalButton:hover {
  background: #F5D7DB;
}

.modalButton:hover p {
  color: #BD83B8;
}

.modalButton img {
  width: 24px;
  height: 24px;
}

.modalButton p {
  display: none;
  color: #F5D7DB;
  font-size: 1.125rem;
  font-weight: 500;
  letter-spacing: 0.025em;
}

@media screen and (min-width: 768px){
  .modalButton p {
    display: block;
  }
}

</style>