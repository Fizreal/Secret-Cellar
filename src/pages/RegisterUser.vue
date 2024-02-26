<template>
  <section class="bg-[#F1916D]/80">
    <h1 class="font-semibold text-xl">Welcome</h1>
    <form @submit="handleSubmit">
      <fieldset>
        <label for="name">Display Name</label>
        <input id="name" name="name" type="text" :value="this.formValues.name" @input="handleChange" required>
      </fieldset>
      <fieldset>
        <label for="email">Email</label>
        <input id="email" name="email" type="email" :value="this.formValues.email" @input="handleChange" required>
      </fieldset>
      <fieldset class="relative">
        <label for="password">Password</label>
        <input id="password" name="password" :type="(showPassword) ? 'text' : 'password'" :value="this.formValues.password" @input="handleChange" required>
        <button @click="this.togglePassword" class="showPassword"><i :class="(showPassword) ? 'bi bi-eye' : 'bi bi-eye-slash'" ></i></button>
      </fieldset>
      <fieldset class="relative">
        <label for="password">Confirm Password</label>
        <input id="confirmPassword" name="confirmPassword" :type="(showPasswordConfirm) ? 'text' : 'password'" :value="this.formValues.confirmPassword" @input="handleChange" required>
        <button @click="this.togglePasswordConfirm" class="showPassword"><i :class="(showPasswordConfirm) ? 'bi bi-eye' : 'bi bi-eye-slash'" ></i></button>
      </fieldset>
      <button class="submit">Register</button>
    </form>
  </section>
</template>

<script>
import router from '@/router'
import { RegisterUser } from '@/services/Auth'

export default {
  name: 'RegisterUser',
  data: () => ({
    formValues: {name: '',email: '', password: '', confirmPassword: ''},
    showPassword: false,
    showPasswordConfirm: false,
    errorMessage: ''
  }),
  watch: {
    'formValues.confirmPassword': {
      handler() {
        this.errorMessage = this.formValues.password !== this.formValues.confirmPassword ? 'Passwords do not match' : ''
      },
      deep: true
    }
  },
  methods: {
    async handleSubmit(e) {
      try {
        if (this.formValues.password !== this.formValues.confirmPassword) return
        e.preventDefault()
        await RegisterUser({name: this.formValues.name, email: this.formValues.email, password: this.formValues.password})
        this.formValues = {name: '',email: '', password: '', confirmPassword: ''}
        router.push('/login')
      } catch (error) {
        this.formValues = { ...this.formValues, password: '', confirmPAssword: '' }
        this.showPassword = false
        this.showPasswordConfirm = false
        this.errorMessage = error.response.data
      }
    },
    handleChange(e) {
      this.formValues = { ...this.formValues, [e.target.name]: e.target.value }
    },
    togglePassword() {
      this.showPassword = !this.showPassword
    },
    togglePasswordConfirm() {
      this.showPasswordConfirm = !this.showPasswordConfirm
    }
  }
}
</script>

<style scoped>

  section {
    width: clamp(200px, 80%, 400px);
    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
    margin: 48px 0px;
    padding: 48px;
    border-radius: 16px;
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