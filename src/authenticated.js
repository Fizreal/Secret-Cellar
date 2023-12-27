import { reactive } from 'vue'

export const authenticated = reactive({
  user: {},
  signIn(user) {
    this.user = user
  },
  signOut() {
    this.user = null
  }
})
