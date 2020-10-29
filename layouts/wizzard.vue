<template>
  <div class="min-w-full min-h-screen bg-gray-100">
    <Nuxt />
  </div>
</template>

<script>
export default {
  async middleware(app) {
    if (!app.$auth.user || !app.$auth.user.id) {
      await app.$axios
        .$get('/api/user')
        .then((res) => {
          return app.$auth.setUser(res.data)
        })
        .catch((err) => {
          return app.$auth.logout()
        })
    }
  },
}
</script>