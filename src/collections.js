import { reactive } from 'vue'

export const collections = reactive({
  collections: {},
  addCollection(collection) {
    this.collections[collection.name] = collection.cocktails
  },
  removeCollection(collection) {
    delete this.collections[collection.name]
  },
  addToCollection(collection, cocktail) {
    if (!this.collections[collection]) {
      this.collections[collection] = [cocktail]
    } else {
      this.collections[collection].push(cocktail)
    }
  },
  removeFromCollection(collection, cocktail) {
    if (!this.collections[collection]) return
    let idx = this.collections[collection]
      .map((cocktail) => cocktail?._id)
      .indexOf(cocktail._id)
    if (idx === -1) return
    this.collections[collection].splice(idx, 1)
  }
})
