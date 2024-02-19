<template>
  <section>
    <button @click="toggleDeleteModal" aria-label="Delete collection" class="modalButton">
      <img src="/minus.png" alt="Plus">
      <p>Delete Collection</p>
    </button>
    <h1>{{ this.$route.params.collectionName[0].toUpperCase() + this.$route.params.collectionName.slice(1) }}</h1>
    <div id="collection" class="flex flex-wrap justify-center gap-4">
      <CocktailCard v-for="drink in collection.drinks" :key="drink.idDrink" :name="drink.name" :category="drink.category" :image_url="drink.image_url" :author="drink.author ? drink.author : '' " @click="selectDrink(drink.idDrink)"/>
    </div>
    <div class="modal" v-if="showDeleteModal">
      <div class="background" @click="toggleDeleteModal"></div>
      <div class="confirmDelete">
        <p>Are you sure you want to delete this collection?</p>
        <div>
          <button @click="toggleDeleteModal" class="secondary">Cancel</button>
          <button @click="deleteCollection" class="primary">Delete</button>
        </div>
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
      this.showDeleteModal = !this.showDeleteModal
    },
    async deleteCollection() {
      await deleteCollection(this.collection.id)
      collections.removeCollection(this.$route.params.collectionName)
      this.$router.push('/profile/collections')
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

.confirmDelete {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
  padding: 24px;
  border-radius: 8px;
  gap: 16px;
  background-color: rgba(0, 0, 0, 0.8);
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  z-index: 1;
}

.confirmDelete p {
  font-size: 1.125rem;
  line-height: 1.75rem;
  color: #F5D7DB;
  font-weight: 500;
  letter-spacing: 0.025em;
  text-align: center;
}

.confirmDelete div {
  display: flex;
  width: 100%;
  justify-content: space-between;
}

.confirmDelete button {
  width: 100px;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 1.125rem;
  font-weight: 500;
  letter-spacing: 0.025em;
  transition: all 0.3s ease-in-out;
}

.primary {
  background-color: #BD83B8;
  color: #F5D7DB;
}

.secondary {
  color: #F5D7DB;
  border: 1px solid #F5D7DB;
}

.confirmDelete button:hover {
  background-color: #F5D7DB;
  color: #BD83B8;
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
