<template>
  <section>
    <h1>Create Cocktail</h1>
    <form @submit="handleSubmit">
      <label for="name">Drink's Name:</label>
      <input type="text" name="name" id="name" :value="this.formValues.name" @input="handleChange" required>
      <label for="alcoholic">Alcoholic:</label>
      <input type="checkbox" name="alcoholic" id="alcoholic" :value="this.formValues.alcoholic" @input="handleChange" required>
      <label for="category">Category:</label>
      <select name="category" id="category" v-model="formValues.category" @input="handleChange" required>
        <option value="" disabled selected>Select a category</option>
        <option :value="category" v-for="category in categories">{{ category }}</option>
      </select>
      <label for="glass">Glass Type:</label>
      <select name="glass" id="glass" v-model="formValues.glass" @input="handleChange" required>
        <option value="" disabled selected>Select a serving glass</option>
        <option :value="glass" v-for="glass in glasses">{{ glass }}</option>
      </select>
      <input type="file" name="file" accept=".jpg,.jpeg,.png" required>
    </form>
  </section>
</template>

<script>
import { createCocktail } from '@/services/cocktailServices';

export default {
  name: 'CreateCocktail',
  data: () => ({
    categories: ['Ordinary Drink', 'Cocktail', 'Shot', 'Punch/Party Drink', 'Other'],
    glasses: ['Highball glass', 'Cocktail glass', 'Old-fashioned glass', 'Champagne flute', 'Whiskey sour glass',  'Coffee mug', 'Shot glass', 'Punch bowl', 'Pitcher', 'Pint glass', 'Copper Mug', 'Wine Glass', 'Mason jar', 'Margarita glass', 'Martini Glass'],
    languages: ['en', 'fr', 'de', 'it', 'es'],
    formValues: {
      name: '',
      alcoholic: false,
      category: '',
      glass: '',
      instructions: [],
      ingredients: [],
      communityCreation: true,
    },
    file: null,
  }),
  methods: {
    async handleSubmit(e) {
    e.preventDefault()
    try {
      let formData = new FormData();
      Object.keys(this.formValues).forEach(key => {
        formData.append(key, this.formValues[key])
      })
      formData.append('file', this.file)

      let cocktail = await createCocktail(formData)
      this.formValues = {
        name: '',
        alcoholic: false,
        category: '',
        glass: '',
        instructions: [],
        ingredients: [],
        communityCreation: true,
      }
      this.file = null
      this.$router.push(`/cocktails/${cocktail.idDrink}`)
    } catch (error) {
      console.log(error)
    }
  },
  handleChange(e) {
    if (e.target.type === 'file') {
      this.file = e.target.files[0]
    } else {
      this.formValues = { ...this.formValues, [e.target.name]: e.target.value }
    }
  },
  }
}

</script>