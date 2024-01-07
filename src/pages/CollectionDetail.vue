<template>
  <section>
    <h1>{{ this.$route.params.collectionName[0].toUpperCase() + this.$route.params.collectionName.slice(1) }}</h1>
    <div id="collection" class="flex flex-wrap justify-center">
      <CocktailCard v-for="drink in collection" :key="drink.idDrink" :name="drink.name" :category="drink.category" :image_url="drink.image_url" :author="drink.author ? drink.author : ''" @click="selectDrink(drink.idDrink)"/>
    </div>
  </section>
</template>

<script>
import { watch } from 'vue';
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
    watch(() => collections.collections[this.$route.params.collectionName], newVal => {
      this.collection = newVal;
    });
  },
  methods: {
    getCollection() {
      this.collection = collections.collections[this.$route.params.collectionName]
    },
    selectDrink(cocktailId) {
      this.$router.push(`/cocktails/${cocktailId}`)
    }
  }
}
</script>