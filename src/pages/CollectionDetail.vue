<template>
  <section>
    <h1>{{ this.$route.params.collectionName[0].toUpperCase() + this.$route.params.collectionName.slice(1) }}</h1>
    <div id="collection" v-if="collection.length" class="flex flex-wrap justify-center">
      <CocktailCard v-for="drink in collection" :key="drink.idDrink" :name="drink.strDrink" :category="drink.strCategory" :image_url="drink.strDrinkThumb" @click="selectDrink(drink.idDrink)"/>
    </div>
  </section>
</template>

<script>
import { collections } from '@/collections';
import CocktailCard from '@/components/CocktailCard.vue';

export default {
  name: 'CollectionDetail',
  data: () => ({
    collection: []
  }),
  components: {
    CocktailCard
  },
  mounted() {
    this.getCollection()
  },
  methods: {
    getCollection() {
      this.collection = collections[this.$route.params.collectionName]
    },
    selectDrink(cocktailId) {
      this.$router.push(`/cocktails/${cocktailId}`)
    }
  }
}
</script>