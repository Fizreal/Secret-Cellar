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
    if (!this.collections[collection]) return

    this.collections[collection].drinks.push(cocktail)
  },
  removeFromCollection(collection, cocktail) {
    if (!this.collections[collection]) return

    let idx = this.collections[collection].drinks
      .map((cocktail) => cocktail._id)
      .indexOf(cocktail._id)
    if (idx === -1) return
    this.collections[collection].drinks.splice(idx, 1)
  }
})
