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

          if (!localStorage.getItem('dasher_vendor_id')) {
            this.$store.dispatch('commitVendorId', res.data.vendors[0].id)
          } else {
            this.$store.dispatch(
              'commitVendorId',
              localStorage.getItem('dasher_vendor_id')
            )
          }
        })
        .catch((err) => {
          return this.$auth.logout()
        })
    }
  },
}
</script>