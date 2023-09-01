<template>
  <section>
    <h1>Register</h1>
    <form @submit="registerUSer">
      <input type="text" placeholder="Name" :value="this.name" required>
      <input type="email" placeholder="Email" :value="this.email" required>
      <input type="password" placeholder="Password" :value="this.password" required>
      <input type="password" placeholder="Confirm Password" :value="this.confirmPassword" required>
    </form>
  </section>
</template>

<script>
export default {
  name: 'RegisterUser',
  data: () => ({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  }),
  methods: {
    async registerUser() {}
  }
}
</script>