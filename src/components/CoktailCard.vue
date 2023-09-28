<template>
  <div class="card">
    <img :src="cocktail.strDrinkThumb" :alt="cocktail.strDrink">
    <h3>{{ cocktail.strDrink }}</h3>
    <p>{{ cocktail.strCategory }}</p>
    <p v-if="cocktail.author">By: {{ cocktail.author }}</p>
  </div>
</template>

<script>
export default {
    name: 'CocktailDetail',
    data: () => ({
        cocktail: {}
    })
}
</script>

<style scoped>
.card {
  height: 400px;
  width: 342px;
  border-radius: 25px;
  
}

img {
  height: 342px;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
}

</style>