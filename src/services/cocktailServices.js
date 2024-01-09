import Client from './api'

export const getCocktailDetails = async (cocktailId) => {
  const response = await Client.get(`/cocktail/${cocktailId}`)
  return response.data
}

export const createCocktail = async (cocktailData) => {
  const response = await Client.post('/cocktail', cocktailData)
  return response.data
}
