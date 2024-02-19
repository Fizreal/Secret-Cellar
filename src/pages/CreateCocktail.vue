<template>
  <section>
    <h1>Create Cocktail</h1>
    <form @submit="handleSubmit">
      <fieldset>
        <label for="name">Drink's Name:</label>
        <input type="text" name="name" id="name" :value="this.formValues.name" @input="handleChange" required>
      </fieldset>
      <fieldset>
        <label for="alcoholic">Alcoholic:</label>
        <input type="checkbox" name="alcoholic" id="alcoholic" :value="this.formValues.alcoholic" @input="handleChange" required>
      </fieldset>
      <fieldset>
        <label for="category">Category:</label>
        <select name="category" id="category" v-model="formValues.category" @input="handleChange" required>
          <option value="" disabled selected>Select a category</option>
          <option :value="category" v-for="(category, index) in categories" :key="index">{{ category }}</option>
        </select>
      </fieldset>
      <fieldset>
        <label for="glass">Glass Type:</label>
        <select name="glass" id="glass" v-model="formValues.glass" @input="handleChange" required>
          <option value="" disabled selected>Select a serving glass</option>
          <option :value="glass" v-for="(glass, index) in glasses" :key="index">{{ glass }}</option>
        </select>
      </fieldset>
      <div class="imageUpload">
        <p class='uploadLabel' v-if="file">Image Preview</p>
        <p class='uploadLabel' v-else>Select Drink Image</p>
        <div v-if="file" class="imagePreview">
          <img :src="imageURL" alt="Image preview">
          <button @click="handleRemoveImage" aria-label="Remove image">
            <img src="/x.svg" alt="Remove">
          </button>
        </div>
        <label class="fileUpload" v-else>
          <input type="file" name="file" id="file" accept="image/jpg,image/jpeg,image/png" @change="handleChange" required>
          <img src="/upload.png" alt="Upload">Upload Image
      </label>
        <p>{{ errorMessages.file }}</p>
      </div>
      <div>
        <h2>Recipe</h2>
        <table>
          <thead>
            <tr>
              <th class="tableCell">Measure</th>
              <th class="tableCell">Ingredient</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(ingredient, index) in formValues.ingredients" :key="index" class="text-pretty">
              <td class="tableCell tableText">
                {{ingredient.measure}}
              </td>
              <td class="tableCell tableText">
                {{ ingredient.name }}
              </td>
              <td>
                <button type="button" @click="handleRemoveIngredient(index)" aria-label="Remove ingredient" class="remove">
                  <img src="/minus.png" alt="Remove">
                </button>
              </td>
            </tr>
            <tr class="inputRow">
              <td class="tableCell">
                <input type="text" name="measure" v-model="newIngredient.measure">
              </td>
              <td class="tableCell">
                <input type="text" name="name" v-model="newIngredient.name">
              </td>
              <td>
                <button type="button" @click="handleAddIngredient" aria-label="Add Ingredient" class="add">
                  <img src="/plus.png" alt="Add">
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <p>{{ errorMessages.ingredients }}</p>
      </div>
      <div>
        <h2>Instructions</h2>
        <table>
          <thead>
            <tr>
              <th class="tableCell">Language</th>
              <th class="tableCell">Directions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(instruction, index) in formValues.instructions" :key="index">
              <td class="tableCell tableText">
                {{instruction.language}}
              </td>
              <td class="tableCell tableText">
                {{ instruction.instruction }}
              </td>
              <td>
                <button type="button" @click="handleRemoveInstruction(index)" aria-label="Remove instructions" class="remove">
                  <img src="/minus.png" alt="Remove">
                </button>
              </td>
            </tr>
            <tr class="inputRow">
              <td class="tableCell">
                <select name="" id="" v-model="newInstruction.language">
                  <option value="" disabled selected>Select a language</option>
                  <option :value="language" v-for="(language, index) in availableLanguages" :key="index">{{ language }}</option>
                </select>
              </td>
              <td class="tableCell">
                <input type="text" name="name" v-model="newInstruction.instruction">
              </td>
              <td>
                <button type="button" @click="handleAddInstruction" aria-label="Add instructions" class="add">
                  <img src="/plus.png" alt="Add">
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <p>{{ errorMessages.instructions }}</p>
      </div>
      <div>
        <button class="submit">Create</button>
      </div>
    </form>
  </section>
</template>

<script>
import { createCocktail } from '@/services/cocktailServices';

const languages = ['en', 'fr', 'de', 'it', 'es']
const categories = ['Ordinary Drink', 'Cocktail', 'Shot', 'Punch/Party Drink', 'Other']
const glasses = ['Highball glass', 'Cocktail glass', 'Old-fashioned glass', 'Champagne flute', 'Whiskey sour glass',  'Coffee mug', 'Shot glass', 'Punch bowl', 'Pitcher', 'Pint glass', 'Copper Mug', 'Wine Glass', 'Mason jar', 'Margarita glass', 'Martini Glass']

export default {
  name: 'CreateCocktail',
  data: () => ({
    categories,
    glasses,
    formValues: {
      name: '',
      alcoholic: false,
      category: '',
      glass: '',
      instructions: [],
      ingredients: []
    },
    errorMessages: {instructions: '', ingredients: '', file: ''},
    file: null,
    imageURL: '',
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
        if (this.formValues.ingredients.length === 0 || this.formValues.instructions.length === 0 || !this.file) {
          this.errorMessages.ingredients = this.formValues.ingredients.length ? 'You must add at least one ingredient' : ''
          this.errorMessages.instructions = this.formValues.instructions.length ? 'You must add at least one instruction' : ''
          this.errorMessages.file = this.file ? '' : 'You must add an image'
          return
        }
        let formData = new FormData();
        Object.keys(this.formValues).forEach(key => {
          if (Array.isArray(this.formValues[key])) {
            formData.append(key, JSON.stringify(this.formValues[key]))
          } else {
            formData.append(key, this.formValues[key])
          }
        })
        formData.append('file', this.file)
        console.log(this.formValues, formData)
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
        let file = e.target.files[0]
        if (file.size > 10485760) {
          this.errorMessages.file = 'File size must be less than 10MB'
          return
        }
        this.file = file
        this.imageURL = URL.createObjectURL(file)
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
    },
    handleRemoveImage() {
      this.file = null
      this.imageURL = ''
    }
  }
}

</script>

<style scoped>

section {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 16px;
  width: clamp(300px, 80%, 600px);

}

h1 {
  font-size: 20px;
  line-height: 28px;
  color: rgb(245,215,219);
  font-weight: 500;
  letter-spacing: 0.025em;
}

form {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  gap: 8px;
  background: rgb(255, 255, 255, 0.1);
  margin-top: 16px;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
}

div {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

input:not([type='checkbox']), select {
  border-radius: 4px;
  background: #F5D7DB;
  border: solid 1px #BD83B8;
  padding: 2px 4px;
  height: 28px;
}

input[type="file"] {
    display: none;
}

.fileUpload {
    border: 1px solid #06142E;
    border-radius: 8px;
    display: flex;
    background: #F5D7DB;
    color: #06142E;
    padding: 6px 12px;
    cursor: pointer;
}

.fileUpload img {
  aspect-ratio: 1/1;
  width: 30px;
  margin-right: 8px;
}

.imageUpload, fieldset {
  margin: 8px 0;
}

.imageUpload > p {
  margin: 0 0 8px 0;
}

.imagePreview {
  position: relative;
  width: clamp(100px, 80%, 342px);
  aspect-ratio: 1/1;
  border-radius: 8px;
  overflow: hidden;
}
.imagePreview > img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.imagePreview > button {
  position: absolute;
  top: 8px;
  right: 8px;
}

.imagePreview > button img {
  aspect-ratio: 1/1;
  width: 16px;
  mix-blend-mode: difference;
}

label, .uploadLabel {
  font-size: 1.125rem;
  line-height: 1.75rem;
  color: #F5D7DB;
  font-weight: 500;
  letter-spacing: 0.025em;
  margin-right: 4px;
}

h2 {
  font-size: 1.125rem;
  line-height: 1.75rem;
  color: #F5D7DB;
  font-weight: 500;
  letter-spacing: 0.025em;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 8px;
}

th {
  font-size: 1rem;
  line-height: 1.5rem;
  color: #BD83B8;
}

tbody {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;

}
tr {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
}

.inputRow {
  height: 30px;
}

td {
  display: flex;
  align-items: center;
}

table button {
  aspect-ratio: 1/1;
  width: 30px;
  border-radius: 50%;
  transform: scale(0.8);
  transition: transform 0.2s ease-in-out;
}

table button:hover {
  transform: scale(1);
}

.add {
  background: rgb(22 163 74);
}

.remove {
  background: rgb(220 38 38);
}

img {
  width: 100%;
}

.tableCell {
  width: 45.77%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tableCell > input, .tableCell > select{
  width: 100%;
}

.tableText {
  color: #BD83B8;
}

.tableCell > select {
  width: 100%;
}

.submit {
  font-size: 1.125rem;
  font-weight: 500;
  letter-spacing: 0.025em;
  color: #06142E;
  background: #F5D7DB;
  border-radius: 8px;
  padding: 4px 8px;
}

.submit:hover {
  background: #BD83B8;
}

</style>
