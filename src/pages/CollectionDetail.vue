<template>
  <section>
    <h1>{{ this.$route.params.collectionName[0].toUpperCase() + this.$route.params.collectionName.slice(1) }}</h1>
    <div id="collection" class="flex flex-wrap justify-center">
      <CocktailCard v-for="drink in collection" :key="drink.idDrink" :name="drink.name" :category="drink.category" :image_url="drink.image_url" :author="drink.author ? drink.author : ''" @click="selectDrink(drink.idDrink)"/>
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
  computed: {
    collection() {
      return collections.collections[this.$route.params.collectionName].drinks
    }
  },
  methods: {
    selectDrink(cocktailId) {
      this.$router.push(`/cocktails/${cocktailId}`)
    }
  }
}
</script>