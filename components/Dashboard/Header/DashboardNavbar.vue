<template>
  <header
    class="flex flex-row flex-no-wrap justify-between w-full px-5 py-3 bg-white"
  >
    <div class="logo">
      <img
        class="w-auto h-10"
        src="/images/dasher-logo.svg"
        alt="Dasher - Твоята система за управление"
      />
    </div>

    <li>
      <a href="#" @click.prevent="logout()"> Sign out </a>
    </li>
  </header>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$auth.user
    },
  },
  methods: {
    logout() {
      this.$auth.logout()
    },
  },
}
</script>

<style lang="scss" scoped></style>
