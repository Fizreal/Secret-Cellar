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
        <option :value="category" v-for="(category, index) in categories" :key="index">{{ category }}</option>
      </select>
      <label for="glass">Glass Type:</label>
      <select name="glass" id="glass" v-model="formValues.glass" @input="handleChange" required>
        <option value="" disabled selected>Select a serving glass</option>
        <option :value="glass" v-for="(glass, index) in glasses" :key="index">{{ glass }}</option>
      </select>
      <input type="file" name="file" accept=".jpg,.jpeg,.png" required>
      <h2>Recipe</h2>
      <table>
        <thead>
          <tr>
            <th>Measure</th>
            <th>Ingredient</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(ingredient, index) in formValues.ingredients" :key="index">
            <td>
              {{ingredient.measure}}
            </td>
            <td>
              {{ ingredient.name }}
            </td>
            <td>
              <button type="button" @click="handleRemoveIngredient(index)">Remove</button>
            </td>
          </tr>
          <tr>
            <td>
              <input type="text" name="measure" v-model="newIngredient.measure">
            </td>
            <td>
              <input type="text" name="name" v-model="newIngredient.name">
            </td>
            <td>
              <button type="button" @click="handleAddIngredient">Add</button>
            </td>
          </tr>
        </tbody>
      </table>
      <h2>Instructions</h2>
      <table>
        <thead>
          <tr>
            <th>Language</th>
            <th>Directions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(instruction, index) in formValues.instructions" :key="index">
            <td>
              {{instruction.language}}
            </td>
            <td>
              {{ instruction.instruction }}
            </td>
            <td>
              <button type="button" @click="handleRemoveInstruction(index)">Remove</button>
            </td>
          </tr>
          <tr>
            <td>
              <select name="" id="" v-model="newInstruction.language">
                <option value="" disabled selected>Select a language</option>
                <option :value="language" v-for="(language, index) in availableLanguages" :key="index">{{ language }}</option>
              </select>
            </td>
            <td>
              <input type="text" name="name" v-model="newInstruction.instruction">
            </td>
            <td>
              <button type="button" @click="handleAddInstruction">Add</button>
            </td>
          </tr>
        </tbody>
      </table>
      <button>Create</button>
    </form>
  </section>
</template>

<script>
import { createCocktail } from '@/services/cocktailServices';
const languages = ['en', 'fr', 'de', 'it', 'es']

export default {
  name: 'CreateCocktail',
  data: () => ({
    categories: ['Ordinary Drink', 'Cocktail', 'Shot', 'Punch/Party Drink', 'Other'],
    glasses: ['Highball glass', 'Cocktail glass', 'Old-fashioned glass', 'Champagne flute', 'Whiskey sour glass',  'Coffee mug', 'Shot glass', 'Punch bowl', 'Pitcher', 'Pint glass', 'Copper Mug', 'Wine Glass', 'Mason jar', 'Margarita glass', 'Martini Glass'],
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
    newIngredient: {
      measure: '',
      name: '',
    },
    newInstruction: {
      language: '',
      instruction: '',
    }
  }),
  computed: {
    availableLanguages() {
      return languages.filter(language => !this.formValues.instructions.some(instruction => instruction.language === language))
    },
  },
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
    handleAddIngredient() {
      if (this.newIngredient.name.trim() !== '') {
        this.formValues.ingredients.push(this.newIngredient)
        this.newIngredient = {
          measure: '',
          name: '',
        }
      }
    },
    handleRemoveIngredient(index) {
      this.formValues.ingredients.splice(index, 1)
    },
    handleAddInstruction() {
      if (this.newInstruction.language.trim() !== '' && this.newInstruction.instruction.trim() !== '') {
        this.formValues.instructions.push(this.newInstruction)
        this.newInstruction = {
          language: '',
          instruction: '',
        }
      }
    },
    handleRemoveInstruction(index) {
      this.formValues.instructions.splice(index, 1)
    }
  }
}

</script>