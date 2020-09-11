<template>
  <div>
    <DashboardNavbar />
    <Nuxt />
  </div>
</template>

<script>
import DashboardNavbar from '~/components/Dashboard/Header/DashboardNavbar'

export default {
  components: {
    DashboardNavbar,
  },
  beforeCreate() {
    if (process.client && !this.$auth.user.id) {
      this.$axios
        .$get('/api/user')
        .then((res) => {
          this.$auth.setUser(res.data)
        })
        .catch((err) => {
          return this.$auth.logout()
        })
    }
  },
}
</script>
