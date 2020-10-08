<template>
  <form @submit.prevent="onSubmit">
    <div>
      <h3 class="text-xl font-semibold text-gray-900 sm:text-2xl">Възстанови паролата си</h3>
      <p class="text-sm text-gray-500">Ще ти изпратим Email с интрускции как да възстановиш паролата си.</p>
      <div>

      </div>
    </div>
    <div
      class="w-full mt-4 form-group"
      v-if="!mailSent"
    >
      <label
        for="forgotPasswordEmail"
        class="block"
      >Email адрес</label>
      <input
        id="forgotPasswordEmail"
        type="email"
        placeholder="Твоят Email адрес"
        v-model="forgotPasswordForm.email"
      />
      <span
        class="block text-sm text-red-500 error"
        v-if="errors && errors.email"
      >{{ errors.email[0] }}</span>
    </div>
    <div
      v-if="mailSent"
      class="flex flex-row flex-wrap flex-auto px-4 py-5 mt-4 bg-green-200 border-2 border-green-300 rounded-md sm:flex-no-wrap"
    >
      <svg
        class="w-24 mx-auto text-green-700 fill-current sm:w-32"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
      >
        <path d="M506.82 214.025a8.521 8.521 0 00-9.242 1.664L360.516 346.223a8.54 8.54 0 00-2.645 6.263 8.58 8.58 0 002.773 6.212l137.054 125.466a8.565 8.565 0 005.768 2.236c1.161 0 2.33-.23 3.439-.725a8.533 8.533 0 005.094-7.808v-256a8.53 8.53 0 00-5.179-7.842zm-11.887 244.463L378.914 352.273l116.019-110.49v216.705zM366.933 25.6H8.533C3.823 25.6 0 29.423 0 34.134v256a8.536 8.536 0 008.533 8.533h358.4a8.53 8.53 0 008.533-8.533v-256c.001-4.711-3.822-8.534-8.533-8.534zm-8.533 256H17.067V42.667H358.4V281.6z" />
        <path d="M374.852 30.959a8.524 8.524 0 00-7.919-5.359H8.533a8.531 8.531 0 00-7.919 5.367 8.522 8.522 0 002.031 9.344l179.2 170.667c1.647 1.57 3.772 2.355 5.888 2.355s4.241-.776 5.88-2.355l179.2-170.667a8.54 8.54 0 002.039-9.352zM187.733 193.024L29.867 42.667H345.6L187.733 193.024z" />
        <path d="M370.295 26.3a8.529 8.529 0 00-9.25 1.655L223.983 158.49a8.54 8.54 0 00-2.645 6.263 8.58 8.58 0 002.773 6.212l137.054 125.466a8.565 8.565 0 005.768 2.236c1.161 0 2.33-.23 3.439-.725a8.533 8.533 0 005.094-7.808v-256a8.517 8.517 0 00-5.171-7.834zM358.4 270.755L242.381 164.54 358.4 54.051v216.704zM151.475 158.481L14.421 27.956a8.534 8.534 0 00-9.25-1.664A8.52 8.52 0 000 34.134v256a8.517 8.517 0 005.094 7.808 8.527 8.527 0 009.199-1.511l137.054-125.474a8.53 8.53 0 002.773-6.212 8.51 8.51 0 00-2.645-6.264zM17.067 270.763V54.051l116.019 110.498L17.067 270.763z" />
        <path d="M511.386 218.693a8.524 8.524 0 00-7.919-5.359H366.933a8.536 8.536 0 00-8.533 8.533V281.6H216.747a8.555 8.555 0 00-7.927 5.359 8.541 8.541 0 002.039 9.353l107.52 102.4c1.647 1.57 3.772 2.355 5.888 2.355s4.241-.776 5.88-2.355l179.2-170.667a8.543 8.543 0 002.039-9.352zM324.267 380.758l-86.187-82.091h128.853a8.536 8.536 0 008.533-8.533V230.4h106.667L324.267 380.758z" />
        <path d="M503.467 213.334H366.933a8.536 8.536 0 00-8.533 8.533V281.6H145.067a8.536 8.536 0 00-8.533 8.533v187.733a8.536 8.536 0 008.533 8.533h358.4a8.53 8.53 0 008.533-8.533v-256c0-4.709-3.823-8.532-8.533-8.532zm-8.534 256H153.6V298.667h213.333a8.536 8.536 0 008.533-8.533V230.4h119.467v238.934z" />
        <path d="M288.009 346.215l-65.374-62.259a8.544 8.544 0 00-5.888-2.355h-71.68a8.536 8.536 0 00-8.533 8.533v187.733a8.517 8.517 0 005.094 7.808 8.527 8.527 0 009.199-1.511L287.881 358.69a8.53 8.53 0 002.773-6.212 8.51 8.51 0 00-2.645-6.263zM153.6 458.488V298.667h59.733l56.286 53.606L153.6 458.488zM503.467 110.934h-76.8c-4.71 0-8.533 3.823-8.533 8.533s3.823 8.533 8.533 8.533h76.8c4.71 0 8.533-3.823 8.533-8.533s-3.823-8.533-8.533-8.533zM477.867 76.8h-76.8c-4.71 0-8.533 3.823-8.533 8.533s3.823 8.533 8.533 8.533h76.8c4.71 0 8.533-3.823 8.533-8.533s-3.823-8.533-8.533-8.533zM477.867 145.067h-76.8a8.536 8.536 0 00-8.533 8.533 8.536 8.536 0 008.533 8.533h76.8a8.536 8.536 0 008.533-8.533 8.536 8.536 0 00-8.533-8.533zM85.333 384h-76.8C3.823 384 0 387.823 0 392.534s3.823 8.533 8.533 8.533h76.8c4.71 0 8.533-3.823 8.533-8.533S90.044 384 85.333 384zM110.933 418.134h-76.8c-4.71 0-8.533 3.823-8.533 8.533s3.823 8.533 8.533 8.533h76.8c4.71 0 8.533-3.823 8.533-8.533s-3.822-8.533-8.533-8.533zM110.933 349.867h-76.8c-4.71 0-8.533 3.823-8.533 8.533s3.823 8.533 8.533 8.533h76.8c4.71 0 8.533-3.823 8.533-8.533s-3.822-8.533-8.533-8.533z" />
      </svg>
      <p class="w-auto p-0 mt-5 text-base text-green-700 sm:mt-0 sm:pl-6">
        Ако намерим този email адрес в нашата система ще изпратим на него инструкции за възстановяване на паролата.
      </p>
    </div>
    <div
      class="flex flex-row flex-no-wrap items-center justify-between mt-4"
      v-if="!mailSent"
    >
      <button type="submit">Send</button>
      <a
        class="pb-px text-sm font-bold text-blue-600 border-b border-transparent hover:border-blue-600"
        href="/signup"
        @click.prevent="switchForm"
      >Обратно към Вход</a>
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
      mailSent: false,
      forgotPasswordForm: {
        email: null,
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
          .post('/api/forgot-password', {
            email: this.forgotPasswordForm.email,
          })
          .then((res) => {
            this.mailSent = true
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