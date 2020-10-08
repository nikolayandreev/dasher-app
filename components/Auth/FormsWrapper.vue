<template>
  <div class="block mx-auto sm:w-full md:w-5/6 lg:w-4/6 xl:w-3/6">
    <!-- <div class="flex flex-row flex-wrap items-end">
      <button
        @click="activeForm = 'signin'"
        class="w-2/4 py-2 transition-colors duration-300 bg-gray-200 border-b-2 border-teal-400 outline-none hover:bg-gray-300 rounded-tl-md focus:outline-none"
        :class="{'py-3 rounded-tr-md font-semibold bg-teal-400 text-white hover:bg-teal-400': activeForm === 'signin'}"
      >Вход</button>
      <button
        @click="activeForm = 'signup'"
        class="w-2/4 py-2 transition-colors duration-300 bg-gray-200 border-b-2 border-teal-400 outline-none rounded-tr-md hover:bg-gray-300 focus:outline-none"
        :class="{'py-3 rounded-tl-md font-semibold bg-teal-400 text-white hover:bg-teal-400': activeForm === 'signup'}"
      >Регистрация</button>
    </div> -->
    <DynamicForm :form="activeForm" />
  </div>
</template>

<script>
import DynamicForm from '~/components/Auth/DynamicForm'

export default {
  props: {
    setActive: {
      required: true,
      default: 'signin',
      validate: (prop) => ['signin', 'signup'].includes(prop),
    },
  },
  data() {
    return {
      activeForm: this.setActive,
    }
  },
  components: {
    DynamicForm,
  },
  mounted() {
    if (this.setActive) {
    }
    this.$nuxt.$on('go-to-register', () => {
      this.activeForm = 'signup'
    })
    this.$nuxt.$on('go-to-login', () => {
      this.activeForm = 'signin'
    })
    this.$nuxt.$on('go-to-password', () => {
      this.activeForm = 'forgot-password'
    })
  },
  watch: {
    activeForm(newVal, oldVal) {
      window.history.pushState('', '', `/${newVal}`)
    },
  },
}
</script>