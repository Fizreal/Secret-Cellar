<template>
  <div class="carouselCard">
    <img :src="drink.image_url" :alt="drink.name" />
    <h3>{{ drink.name }}</h3>
  </div>
</template>

<script>

export default {
  name: 'CarouselCard',
  props: {
    drink: {
      type: Object,
      required: true
    }
  },
}

</script>

<style scoped>

.carouselCard{
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 250px;
  gap: 8px;
}

img {
  aspect-ratio: 1/1;
  width: 100%;
  transform: scale(0.7);
  transition: all 0.3s ease-in-out;
  border-radius: 50%;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
}

h3 {
  visibility: hidden;
  font-size: 20px;
  line-height: 28px;
  color: #F5D7DB;
  font-weight: 500;
  letter-spacing: 0.025em;
}
.carouselCard:hover > img {
  transform: scale(1);
  border-radius: 25px;
}

.carouselCard:hover > h3 {
  visibility: visible;
}



</style>