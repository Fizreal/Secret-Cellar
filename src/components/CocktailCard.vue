<template>
  <section :id="name" class="m-2">
    <img :src="image_url" :alt="name">
    <section class="grid grid-cols-2 grid-rows-2 border">
      <h3 class="col-span-2 text-center text-xl">{{ name }}</h3>
      <p class="text-center" v-if="category">Type: {{ category }}</p>
      <p class="text-center" v-if="author">By: {{ author }}</p>
    </section>
  </section>
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