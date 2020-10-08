<template>
  <form @submit.prevent="onSubmit">
    <div>
      <h3 class="text-xl font-semibold text-gray-900 sm:text-2xl">Регистрирай се в Dasher!</h3>
      <div class="mb-4">
        <span class="text-sm text-gray-600">Вече имаш акаунт?</span>
        <a
          class="pb-px text-sm font-bold text-blue-600 border-b border-transparent hover:border-blue-600"
          href="/signup"
          @click.prevent="switchForm"
        >Влез с него</a>
      </div>
    </div>
    <div class="flex flex-row flex-wrap">
      <div class="w-full form-group sm:w-2/4">
        <label
          for="registerFirstName"
          class="block"
        >Име</label>
        <input
          type="registerFirstName"
          placeholder="Име"
          v-model="registerForm.firstName"
        />
        <span
          class="block text-sm text-red-500 error"
          v-if="errors && errors.first_name"
        >{{ errors.first_name[0] }}</span>
      </div>
      <div class="w-full form-group sm:w-2/4">
        <label
          for="registerLastName"
          class="block"
        >Фамилия</label>
        <input
          id="registerLastName"
          type="text"
          placeholder="Фамилия"
          v-model="registerForm.lastName"
        />
        <span
          class="block text-sm text-red-500 error"
          v-if="errors && errors.last_name"
        >{{ errors.last_name[0] }}</span>
      </div>
      <div class="w-full form-group">
        <label
          for="registerEmail"
          class="block"
        >Email адрес</label>
        <input
          id="registerEmail"
          type="email"
          placeholder="Твоят Email адрес"
          v-model="registerForm.email"
        />
        <span
          class="block text-sm text-red-500 error"
          v-if="errors && errors.email"
        >{{ errors.email[0] }}</span>
      </div>
      <div class="w-full sm:w-2/4 form-group">
        <label
          for="registerPassword"
          class="block"
        >Парола</label>
        <input
          id="registerPassword"
          type="password"
          placeholder="Избери парола"
          v-model="registerForm.password"
        />
        <span
          class="block text-sm text-red-500 error"
          v-if="errors && errors.password"
        >{{ errors.password[0] }}</span>
      </div>
      <div class="w-full sm:w-2/4 form-group">
        <label
          for="registerPasswordConfirmed"
          class="block"
        >Потвърди парола</label>
        <input
          id="registerPasswordConfirmed"
          type="password"
          placeholder="Потвърди паролата си"
          v-model="registerForm.passwordConfirmed"
        />
        <span
          class="block text-sm text-red-500 error"
          v-if="errors && errors.password"
        >{{ errors.password[0] }}</span>
      </div>
      <div class="w-full mt-2 form-group">
        <input
          type="checkbox"
          id="registerTerms"
          v-model="registerForm.terms"
        />
        <label for="registerTerms">Съгласен съм с <nuxt-link
            class="pb-px text-sm font-bold text-blue-600 border-b border-transparent hover:border-blue-600"
            to="/terms-and-conditions"
            title="Общу условия за ползване"
          >общите условия</nuxt-link>
        </label>
      </div>
      <div class="block w-full mt-4">
        <button type="submit">Sign up</button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  auth: 'guest',
  layout: 'auth',
  data() {
    return {
      formPending: false,
      registerForm: {
        firstName: null,
        lastName: null,
        email: null,
        password: null,
        passwordConfirmed: null,
        terms: false,
      },
      errors: null,
    }
  },
  methods: {
    switchForm() {
      this.$nuxt.$emit('go-to-login')
    },
    onSubmit() {
      this.errors = null

      return this.$axios.$get('/sanctum/csrf-cookie').then(() => {
        return this.$axios
          .post('/api/register', {
            first_name: this.registerForm.firstName,
            last_name: this.registerForm.lastName,
            email: this.registerForm.email,
            password: this.registerForm.password,
            password_confirmation: this.registerForm.passwordConfirmed,
          })
          .then((res) => {})
          .catch((err) => {
            if (err.response.status === 422) {
              this.errors = err.response.data
            }
          })
      })
    },
  },
}
</script>