<template>
  <form @submit.prevent="onSubmit">
    <div class="form-group">
      <label for="email">Email</label>
      <input
        type="email"
        placeholder="Enter your email"
        v-model="loginForm.email"
      />
    </div>
    <div class="form-group">
      <label for="password">Password</label>
      <input
        type="password"
        placeholder="Enter your password"
        v-model="loginForm.password"
      />
    </div>
    <button type="submit">Sign in</button>
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
      },
    }
  },
  methods: {
    onSubmit() {
      this.$auth
        .loginWith('laravelSanctum', {
          data: this.loginForm,
        })
        .then((res) => {
          this.$auth.setUser(res.data.data)
          this.showSuccess()
          return this.$router.push('/dashboard')
        })
        .catch((err) => {
          this.formPending = false
        })
    },
  },
}
</script>