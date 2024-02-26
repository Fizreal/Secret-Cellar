<template>
  <section>
    <h2>{{ title }}</h2>
    <div class="carouselContainer">
      <button
        :onClick="scrollLeft"
        :disabled="currentIndex === 0"
        aria-label="Scroll Left"
        >
          <img
            src="/arrow-left.svg"
            alt="Scroll Left"
          />
        </button>
      <div class="displayContainer w-[250px] md:w-[516px] lg:w-[782px] 2xl:w-[1048px]">
        <div class="carousel"
          :style="{transform: `translateX(-${266 * currentIndex}px)`}"
          >
          <CarouselCard
            v-for="(drink, index) in drinks"
            :key="index"
            :drink="drink" @click="selectDrink(drink.idDrink)" />
        </div>
      </div>
      <button
        :onClick="scrollRight"
        :disabled="currentIndex === (drinks.length - 1 - displayOffset)"
        aria-label="Scroll Right"
        >
          <img
            
            src="/arrow-right.svg"
            alt="Scroll Right"
          />
        </button>
    </div>
  </section>
</template>

<script>
import CarouselCard from './CarouselCard.vue';

export default {
  name: 'ImageCarousel',
  data() {
    return {
      windowWidth: window.innerWidth,
      currentIndex: 0,
      displayOffset: 0
    }
  },
  props: {
    title: {
      type: String,
      required: true
    },
    drinks: {
      type: Array,
      required: true
    }
  },
  components: {
    CarouselCard
  },
  mounted() {
    window.addEventListener('resize', this.handleResize);
    this.displayOffset = this.calculateDisplayedDrinks();
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    selectDrink(cocktailId) {
      this.$router.push(`/cocktails/${cocktailId}`)
    },
    handleResize() {
      this.windowWidth = window.innerWidth;
      let newOffset = this.calculateDisplayedDrinks()
      if (newOffset !== this.displayOffset) {
        this.currentIndex = Math.max(this.currentIndex - (newOffset - this.displayOffset), 0);
      }
      this.displayOffset = newOffset
    },
    calculateDisplayedDrinks() {
      let offset
      if (this.windowWidth < 768) {
        offset = 0;
      } else if (this.windowWidth < 1024) {
        offset = 1;
      } else if (this.windowWidth < 1536) {
        offset = 2;
      } else {
        offset = 3;
      }
      return offset
    },
    scrollRight() {
      this.currentIndex = Math.min(this.currentIndex + 1, this.drinks.length - 1 - this.displayOffset);
    },
    scrollLeft() {
      this.currentIndex = Math.max(this.currentIndex - 1, 0);
    }
  }
}

</script>

<style scoped>

  section {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    gap: 16px;
  }


h2 {
    font-size: 18px;
    line-height: 24px;
    color: #BD83B8;
    font-weight: 500;
    letter-spacing: 0.025em;
    text-align: center;
  }

  .carouselContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    gap: 16px;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 80px;
    width: 40px;
    transform: scale(0.9);
    transition: all 0.3s ease-in-out;
  }
  
  button:hover {
    transform: scale(1);
  }

  button > image {
    height: 100%;
  }

  button:disabled > img {
    opacity: 0.25;
  }
  
  .displayContainer {
    position: relative;
    display: flex;
    overflow: hidden;
    height: 286px;
  }

  .carousel {
    position: absolute;
    display: flex;
    flex-wrap: nowrap;
    transition: all 0.3s ease-in-out;
    gap: 16px;
  }

</style>
