<template>
  <form @submit.prevent="onSubmit">
    <div>
      <h3 class="text-xl font-semibold text-gray-900 sm:text-2xl">Регистрирай се в Dasher!</h3>
      <p class="text-sm text-gray-500">
        Твоите данни ще са в пълна безопастност с нас, ние не ги споделяме с трети лица и събираме само необходимото.
      </p>
    </div>
    <div class="flex flex-row flex-wrap mt-4">
      <div class="w-full form-group sm:w-2/4">
        <label
          for="registerFirstName"
          class="block"
        >Име</label>
        <input
          class="w-full"
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
          class="w-full"
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
          class="w-full"
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
          class="w-full"
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
          class="w-full"
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
      <div class="w-full my-2 form-group">
        <label for="subscription">Избери план</label>
        <div class="flex flex-row flex-wrap overflow-hidden rounded-lg">
          <SubscriptionButton
            :selectedSubscription="selectedSubscription"
            :subscription="plans.basic"
            @click.prevent="registerForm.subscription = 'basic'"
          />
          <SubscriptionButton
            :selectedSubscription="selectedSubscription"
            :subscription="plans.pro"
            @click.prevent="registerForm.subscription = 'pro'"
          />
          <span
            class="block text-sm text-red-500 error"
            v-if="errors && errors.subscription"
          >{{ errors.subscription[0] }}</span>
        </div>
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
      <div class="block w-full mt-4 text-center">
        <button
          type="submit"
          class="inline-block px-40 py-3 text-white bg-pink-600 rounded-sm"
        >Регистрирай се</button>
        <span class="block mt-4 text-sm text-gray-600">Вече имаш акаунт?
          <a
            class="pb-px font-semibold text-blue-600 border-b border-transparent hover:border-blue-600"
            href="/signup"
            @click.prevent="switchForm"
          >Влез с него</a>
        </span>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  auth: 'guest',
  layout: 'auth',
  components: {},
  data() {
    return {
      plans: {
        basic: {
          name: 'Dasher Старт',
          trial: true,
          price: '40',
        },
        pro: {
          name: 'Dasher Про',
          trial: false,
          price: '60',
        },
      },
      formPending: false,
      registerForm: {
        firstName: null,
        lastName: null,
        email: null,
        password: null,
        passwordConfirmed: null,
        subscription: 'basic',
        terms: false,
      },
      errors: null,
    }
  },
  computed: {
    selectedSubscription() {
      return this.plans[this.registerForm.subscription]
    },
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
            subscription: this.registerForm.subscription,
            password: this.registerForm.password,
            password_confirmation: this.registerForm.passwordConfirmed,
          })
          .then((res) => {
            setTimeout(() => {
              window.location.href = res.data.data.redirect
            }, 600)
          })
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