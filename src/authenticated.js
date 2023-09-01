import { reactive } from 'vue'

export const authenticated = reactive({
  user: null,
  signIn(user) {
    this.user = user
  },
  signOut(user) {
    this.user = null
  }
})
