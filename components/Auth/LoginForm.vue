<template>
  <form
    @submit.prevent="onSubmit"
    class="max-w-sm mx-auto"
  >
    <div>
      <h3 class="text-xl font-semibold text-center text-gray-900 sm:text-2xl">
        Добре дошъл, отново!
      </h3>
    </div>
    <div class="w-full mt-4 form-group">
      <div>
        <span
          class="block mb-1 text-sm text-red-500 error"
          v-if="mainError"
        >{{
          mainError.credentials[0]
        }}</span>
      </div>
      <label
        for="loginEmail"
        class="block"
      >Email адрес</label>
      <input
        class="w-full"
        id="loginEmail"
        type="email"
        placeholder="Твоят Email адрес"
        v-model="loginForm.email"
      />
      <span
        class="block text-sm text-red-500 error"
        v-if="errors && errors.email"
      >{{ errors.email[0] }}</span>
    </div>
    <div class="w-full form-group">
      <label
        for="loginPassword"
        class="block"
      >Парола</label>
      <input
        class="w-full"
        id="loginPassword"
        type="password"
        placeholder="Въведи паролата си"
        v-model="loginForm.password"
      />
      <span
        class="block text-sm text-red-500 error"
        v-if="errors && errors.password"
      >{{ errors.password[0] }}</span>
    </div>

    <div class="flex flex-row flex-no-wrap items-center justify-between w-full mt-4 form-group">
      <div>
        <input
          type="checkbox"
          id="loginRememberMe"
          v-model="loginForm.remember"
        />
        <label for="loginRememberMe">Запомни ме </label>
      </div>
      <a
        class="pb-px text-sm font-bold text-blue-600 border-b border-transparent hover:border-blue-600"
        @click.prevent="forgotPassword"
        href="/forgot-password"
        title="Възстанови паролата си"
      >Забравена парола?</a>
    </div>
    <div class="mt-4 text-center">
      <button
        type="submit"
        class="w-full py-3 text-white bg-pink-600 rounded-sm"
      >
        Влез в акаунта си
      </button>
      <span class="block mt-4 text-sm text-gray-600">Нямаш акаунт?
        <a
          class="pb-px text-sm font-semibold text-blue-600 border-b border-transparent hover:border-blue-600"
          href="/signup"
          @click.prevent="switchForm"
        >Създай нов</a>
      </span>
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
      loginForm: {
        email: null,
        password: null,
        remember: false,
      },
      errors: null,
      mainError: null,
    }
  },
  methods: {
    switchForm() {
      return this.$nuxt.$emit('go-to-register')
    },
    forgotPassword() {
      return this.$nuxt.$emit('go-to-password')
    },
    onSubmit() {
      this.errors = null
      this.mainError = null

      return this.$auth
        .loginWith('laravelSanctum', {
          data: this.loginForm,
        })
        .then((res) => {
          this.$store.commit('auth/SET', { key: 'user', value: res.data.data })

          if (!localStorage.getItem('dasher_vendor_id')) {
            this.$store.dispatch('commitVendorId', res.data.data.vendors[0].id)
          } else {
            this.$store.dispatch(
              'commitVendorId',
              localStorage.getItem('dasher_vendor_id')
            )
          }

          return this.$router.push('/reservations')
        })
        .catch((err) => {
          this.formPending = false
          if (err.response && err.response.status === 422) {
            if (!err.response.data.errors) {
              this.errors = err.response.data
            } else {
              this.mainError = err.response.data.errors
            }
          }
        })
    },
  },
}
</script>