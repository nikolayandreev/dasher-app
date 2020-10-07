<template>
  <div class="container">
    <component :is="activeForm"></component>
  </div>
</template>

<script>
import LoginForm from '~/components/Auth/LoginForm'
import RegisterForm from '~/components/Auth/LoginForm'

export default {
  auth: 'guest',
  layout: 'auth',
  components: {
    login: LoginForm,
    register: RegisterForm,
  },
  data() {
    return {
      activeForm: 'login',
    }
  },
}
</script>

<style lang="scss" scoped></style>
