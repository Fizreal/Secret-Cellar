import axios from 'axios'

const BASE_URL = 'https://thecocktaildb.com/api/json/v1/1/'

export const nameSearch = async (name) => {
  const res = await axios.get(`${BASE_URL}search.php?s=${name}`)
  return res.data.drinks
}

export const ingredientSearch = async (ingredient) => {
  const res = await axios.get(`${BASE_URL}filter.php?i=${ingredient}`)
  return res.data.drinks
}

export const categorySearch = async (category) => {
  const res = await axios.get(`${BASE_URL}filter.php?c=${category}`)
  return res.data.drinks
}

export const letterSearch = async (letter) => {
  const res = await axios.get(`${BASE_URL}search.php?f=${letter}`)
  return res.data.drinks
}
