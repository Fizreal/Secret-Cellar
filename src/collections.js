import { reactive } from 'vue'

export const collections = reactive({
  collections: {},
  addCollection(collection) {
    this.collections[collection.name] = {
      drinks: collection.cocktails,
      id: collection.id
    }
  },
  removeCollection(collection) {
    delete this.collections[collection]
  },
  addToCollection(collection, cocktail) {
    this.collections[collection].drinks = [cocktail]
  },
  removeFromCollection(collection, cocktail) {
    let idx = this.collections[collection].drinks
      .map((cocktail) => cocktail._id)
      .indexOf(cocktail._id)
    if (idx === -1) return
    this.collections[collection].drinks.splice(idx, 1)
  }
})
