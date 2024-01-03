import { reactive } from 'vue'

export const collections = reactive({
  collections: {},
  addCollection(collection) {
    this.collections[collection.name] = collection.array
  },
  removeCollection(collection) {
    delete this.collections[collection.name]
  },
  addToCollection(collection, item) {
    this.collections[collection.name].push(item)
  },
  removeFromCollection(collection, item) {
    const array = this.collections[collection.name].map((item) => item.id)
    const index = array.indexOf(item.id)
    this.collections[collection.name].splice(index, 1)
  }
})
