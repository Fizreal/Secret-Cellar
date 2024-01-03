import Client from './api'

export const getCocktailDetails = async (cocktailId) => {
  const response = await Client.get(`/cocktail/${cocktailId}`)
  return response
}

export const favoriteCocktail = async (cocktailId) => {
  const response = await Client.post(`/favorite/add/${cocktailId}`)
  return response
}

export const unfavoriteCocktail = async (cocktailId) => {
  const response = await Client.post(`/favorite/remove/${cocktailId}`)
  return response
}
