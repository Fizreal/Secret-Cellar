<template>
  <section class="bg-[#F1916D]/80 mt-12 p-12 rounded-2xl">
    <h1 class="font-semibold text-xl">Welcome Back!</h1>
    <form @submit="handleSubmit">
      <fieldset>
        <label for="email">Email</label>
        <input id="email" name="email" type="email" :value="this.formValues.email" @input="handleChange" required>
      </fieldset>
      <fieldset class="relative">
        <label for="password">Password</label>
        <input id="password" name="password" :type="(showPassword) ? 'text' : 'password'" :value="this.formValues.password" @input="handleChange" required>
        <button @click="this.togglePassword" class="showPassword"><i :class="(showPassword) ? 'bi bi-eye' : 'bi bi-eye-slash'" ></i></button>
      </fieldset>
      <button class="submit">Log in</button>
    </form>
    <p class="text-sm mt-4 text-center">Don't have an account? <router-link to="/register" class="font-bold">Register</router-link></p>
  </section>
</template>

<script>
import router from '@/router'
import { SignInUser } from '@/services/Auth'
import { authenticated } from '@/authenticated';

export default {
  name: 'LoginUser',
  data: () => ({
    formValues: {email: '', password: ''},
    showPassword: false,
    errorMessage: ''
  }),
  methods: {
    async handleSubmit(e) {
    try {
      e.preventDefault()
      const payload = await SignInUser(this.formValues)
      authenticated.signIn(payload)
      this.formValues = {email: '', password: ''}
      router.push('/')
    } catch (error) {
      this.formValues = { ...this.formValues, password: '' }
      this.showPassword = false
      this.errorMessage = error.response.data
    }
  },
    handleChange(e) {
      console.log(e.target.name)
      this.formValues = { ...this.formValues, [e.target.name]: e.target.value }
    },
    togglePassword() {
      this.showPassword = !this.showPassword
    }
  }
}
</script>

<style scoped>

section {
  width: clamp(200px, 80%, 400px);
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
}

fieldset {
  display: flex;
  flex-direction: column;
  margin: 30px 0;
}

input {
  padding: 8px 12px;
  border-radius: 6px;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
}

.showPassword {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  right: 8px;
  bottom: 7px;
  padding: 0 4px 2px 4px;
}

.showPassword:focus {
  border: 1px solid black;
}

.submit {
  width: 100%;
  text-align: center;
  padding: 8px 12px;
  border-radius: 6px;
  background-color: blue;
  border: 2px solid blue;
}

submit:focus {
  border: 2px solid white;
}
</style>