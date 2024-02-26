<template>
  <div :id="name" class="drinkCard">
    <img :src="image_url" :alt="name">
    <div>
      <h3>{{ name }}</h3>
      <p v-if="category">Type: {{ category }}</p>
      <p v-if="author">By: {{ author }}</p>
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

h3 {
  text-align: center;
  grid-column: span 2 / span 2;
  font-size: 20px;
  line-height: 28px;
  color: #F5D7DB;
  font-weight: 500;
  letter-spacing: 0.025em;
}

p {
  text-align: center;
  font-size: 16px;
  line-height: 24px;
  color: white;
  font-weight: 400;
  letter-spacing: 0.025em;

}

</style>