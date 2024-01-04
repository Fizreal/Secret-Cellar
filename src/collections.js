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
    this.collections[collection.name].push(cocktail)
  },
  removeFromCollection(collection, cocktail) {
    let idx = this.collections[collection.name]
      .map((cocktail) => cocktail._id)
      .indexOf(cocktail._id)
    this.collections[collection.name].splice(idx, 1)
  }
})
