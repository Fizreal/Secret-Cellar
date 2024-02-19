import Client from './api'

export const getCocktailDetails = async (cocktailId) => {
  const response = await Client.get(`/cocktail/${cocktailId}`)
  return response.data
}

export const createCocktail = async (cocktailData) => {
  const response = await Client.post('/cocktail', cocktailData)
  return response.data
}

export const communityCreations = async () => {
  const response = await Client.get('/cocktail/community')
  return response.data
}

export const recentCreqtions = async () => {
  const response = await Client.get('/cocktail/recent')
  return response.data
}

export const popular = async () => {
  const response = await Client.get('/cocktail/popular')
  return response.data
}
