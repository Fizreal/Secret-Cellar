<template>
  <div class="card">
    <img :src="image_url" :alt="name">
    <h3>{{ name }}</h3>
    <p>{{ category }}</p>
    <p v-if="author">By: {{ author }}</p>
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