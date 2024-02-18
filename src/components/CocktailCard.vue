<template>
  <div :id="name" class="drinkCard">
    <img :src="image_url" :alt="name">
    <div>
      <h3 class="col-span-2 text-center text-xl">{{ name }}</h3>
      <p class="text-center" v-if="category">Type: {{ category }}</p>
      <p class="text-center" v-if="author">By: {{ author }}</p>
    </div>
  </div>
</template>

<script>
export default {
    name: 'CocktailDetail',
    props: {
      image_url: String,
      name: String,
      author: String,
      category: String
    }
}
</script>

<style scoped>

.drinkCard{
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  width: 342px;
}

img {
  aspect-ratio: 1/1;
  height: 342px;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
}

.drinkCard > div {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  width: 100%;
  background: #473E66;
}

</style>