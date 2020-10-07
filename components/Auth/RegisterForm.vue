<template>
  <form @submit.prevent="onSubmit">
    <div class="form-group">
      <label for="email">First Name</label>
      <input
        type="email"
        placeholder="Enter your first name"
        v-model="registerForm.firstName"
      />
    </div>
    <div class="form-group">
      <label for="email">Last Name</label>
      <input
        type="email"
        placeholder="Enter your last name"
        v-model="registerForm.lastName"
      />
    </div>
    <div class="form-group">
      <label for="email">Email</label>
      <input
        type="email"
        placeholder="Enter your email"
        v-model="registerForm.email"
      />
    </div>
    <div class="form-group">
      <label for="password">Password</label>
      <input
        type="password"
        placeholder="Enter your password"
        v-model="registerForm.password"
      />
    </div>
    <button type="submit">Sign up</button>
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
      },
    }
  },
  methods: {
    onSubmit() {
      this.$axios
        .post('/register', {
          first_name: this.registerForm.firstName,
          last_name: this.registerForm.lastName,
          email: this.registerForm.email,
          password: this.registerForm.password,
        })
        .then((res) => {})
    },
  },
}
</script>