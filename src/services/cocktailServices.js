import Client from './api'

export const getCocktailDetails = async (cocktailId) => {
  try {
    const response = await Client.get(`/cocktail/${cocktailId}`)
    return response
  } catch (error) {
    throw error
  }
}
