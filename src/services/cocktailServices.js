import Client from './api'

export const getCocktailDetails = async (cocktailId) => {
  const response = await Client.get(`/cocktail/${cocktailId}`)
  return response.data
}
