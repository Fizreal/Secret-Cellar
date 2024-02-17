import Client from './api'

export const getFavorites = async () => {
  const response = await Client.get(`/favorite`)
  return response.data
}

export const favoriteCocktail = async (cocktailId) => {
  const response = await Client.put(`/favorite/add/${cocktailId}`)
  return response.data
}

export const unfavoriteCocktail = async (cocktailId) => {
  const response = await Client.put(`/favorite/remove/${cocktailId}`)
  return response.data
}

export const getCollections = async () => {
  const response = await Client.get(`/collection`)
  return response.data
}

export const createCollection = async (data) => {
  const response = await Client.post(`/collection`, data)
  return response.data
}

export const addToCollection = async (collectionId, cocktailId) => {
  const response = await Client.put(
    `/collection/${collectionId}/add/${cocktailId}`
  )
  return response.data
}

export const removeFromCollection = async (collectionId, cocktailId) => {
  const response = await Client.put(
    `/collection/${collectionId}/remove/${cocktailId}`
  )
  return response.data
}

export const deleteCollection = async (collectionId) => {
  const response = await Client.delete(`/collection/${collectionId}`)
  return response.data
}
