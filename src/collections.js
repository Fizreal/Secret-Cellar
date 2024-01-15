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
    delete this.collections[collection.name]
  },
  addToCollection(collection, cocktail) {
    if (this.collections[collection].drinks.length === 0) {
      this.collections[collection].drinks = [cocktail]
    } else {
      this.collections[collection].drinks.push(cocktail)
    }
  },
  removeFromCollection(collection, cocktail) {
    let idx = this.collections[collection].drinks
      .map((cocktail) => cocktail._id)
      .indexOf(cocktail._id)
    if (idx === -1) return
    this.collections[collection].splice(idx, 1)
  }
})
