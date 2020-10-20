<template>
  <form
    @submit.prevent="onSubmit"
    class="max-w-sm mx-auto"
  >
    <div>
      <h3 class="text-xl font-semibold text-center text-gray-900 sm:text-2xl">Възстанови паролата си</h3>
    </div>
    <div
      class="w-full mt-4 form-group"
      v-if="!passwordChanged"
    >
      <label
        for="resetPasswordNew"
        class="block"
      >Нова парола</label>
      <input
        id="resetPasswordNew"
        type="password"
        class="w-full"
        placeholder="Избери нова парола"
        v-model="resetPasswordForm.new_password"
      />
    </div>
    <div
      class="w-full mt-4 form-group"
      v-if="!passwordChanged"
    >
      <label
        for="resetPasswordConfirm"
        class="block"
      >Потвърди парола</label>
      <input
        id="resetPasswordConfirm"
        type="password"
        class="w-full"
        placeholder="Избери нова парола"
        v-model="resetPasswordForm.new_password_confirmed"
      />
      <span
        class="block text-sm text-red-500 error"
        v-if="errors && errors.error && errors.error.message"
      >{{ errors.error.message }}</span>
      <span
        class="block text-sm text-red-500 error"
        v-if="errors && errors.new_password"
      >{{ errors.new_password[0] }}</span>
    </div>
    <div
      v-if="passwordChanged"
      class="py-5 mt-4 sm:flex-no-wrap"
    >
      <p class="w-full mt-5 text-base text-gray-600 sm:mt-0">
        Паролата ви е сменена успешно! Можете да се върнете
        <a
          class="pb-px text-sm font-semibold text-blue-600 border-b border-transparent hover:border-blue-600"
          href="/signup"
          @click.prevent="switchForm"
        >Обратно към Вход</a>
      </p>

    </div>
    <div
      class="block mt-4 text-center"
      v-if="!passwordChanged"
    >
      <button
        type="submit"
        class="w-full py-3 text-white bg-pink-600 rounded-sm"
      >Възстанови парола</button>
      <span class="block mt-4 text-sm text-gray-500">Размисли? <a
          class="pb-px text-sm font-semibold text-blue-600 border-b border-transparent hover:border-blue-600"
          href="/signup"
          @click.prevent="switchForm"
        >Обратно към Вход</a>
      </span>
    </div>
  </form>
</template>

<script>
import SuccessCheck from '~/components/utils/SuccessCheck'

export default {
  auth: 'guest',
  layout: 'auth',
  components: {
    SuccessCheck,
  },
  data() {
    return {
      formPending: false,
      passwordChanged: false,
      resetPasswordForm: {
        new_password: null,
        new_password_confirmed: null,
      },
      errors: null,
    }
  },
  methods: {
    switchForm() {
      return this.$nuxt.$emit('go-to-login')
    },
    onSubmit() {
      this.errors = null

      return this.$axios.$get('/sanctum/csrf-cookie').then(() => {
        return this.$axios
          .post('/api/password/reset-password', {
            hash: this.$route.params.hash,
            new_password: this.resetPasswordForm.new_password,
            new_password_confirmation: this.resetPasswordForm
              .new_password_confirmed,
          })
          .then((res) => {
            this.passwordChanged = true
          })
          .catch((err) => {
            if ([422, 400].includes(err.response.status)) {
              this.errors = err.response.data
            }
          })
      })
    },
  },
}
</script>