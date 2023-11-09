import { reactive } from 'vue'

export const authenticated = reactive({
  user: '1',
  signIn(user) {
    this.user = user
  },
  signOut() {
    this.user = null
  }
})
