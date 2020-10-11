<template>
  <div class="block mx-auto sm:w-full md:w-5/6 lg:w-4/6 xl:w-3/6">
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
    window.addEventListener('popstate', function(event) {
      window.location.reload();
    });

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