<template>
  <section>
    <h1>{{ this.$route.params.collectionName[0].toUpperCase() + this.$route.params.collectionName.slice(1) }}</h1>
    <div id="collection" class="flex flex-wrap justify-center gap-4">
      <CocktailCard v-for="drink in collection.drinks" :key="drink.idDrink" :name="drink.name" :category="drink.category" :image_url="drink.image_url" :author="drink.author ? drink.author : '' " @click="selectDrink(drink.idDrink)"/>
    </div>
    <div class="modal" v-if="showDeleteModal">
      <div class="background" @click="toggleDeleteModal"></div>
      <div class="confirmDelete">
        <p>Are you sure you want to delete this collection?</p>
        <button @click="toggleDeleteModal">Cancel</button>
        <button @click="deleteCollection">Delete</button>
      </div>
    </div>
  </section>
</template>

<script>
import { collections } from '@/collections';
import {  deleteCollection } from '@/services/collectionServices';
import CocktailCard from '@/components/CocktailCard.vue';

export default {
  name: 'CollectionDetail',
  data: () => ({
    showDeleteModal: false,
  }),
  components: {
    CocktailCard
  },
  computed: {
    collection() {
      return collections.collections[this.$route.params.collectionName]
    }
  },
  methods: {
    selectDrink(cocktailId) {
      this.$router.push(`/cocktails/${cocktailId}`)
    },
    toggleDeleteModal() {
      this.deleteModal.display = !this.deleteModal.display
    },
    async deleteCollection() {
      await deleteCollection(this.collection.id)
      collections.removeCollection(this.$route.params.collectionName)
      this.toggleDeleteModal()
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

</style>
