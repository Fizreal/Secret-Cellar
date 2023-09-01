<template>
  <section>
    <h1>Login</h1>
    <form @submit="loginUser">
      <input type="email" placeholder="Email" :value="this.email" required>
      <input type="password" placeholder="Password" :value="this.password" required>
    </form>
    <p>Don't have an account? <router-link to="/register">Register</router-link></p>
  </section>
</template>

<script>
export default {
  name: 'LoginUser',
  data: () => ({
    email: '',
    password: ''
  }),
  methods: {
    async loginUser() {}
  }
}
</script>