<template>
  <section :id="name" class="m-2">
    <img :src="image_url" :alt="name">
    <section class="grid grid-cols-2 grid-rows-2 bg-[#473E66]">
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

section {
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
}

img {
  height: 342px;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
}

</style>