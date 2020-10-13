<template>
  <div class="box-border w-screen h-screen">
    <DashboardNavbar />
    <div class="flex flex-row flex-no-wrap items-stretch w-full h-auto min-h-full">
      <nav class="w-1/6">
        <DashboardNavigation />
      </nav>
      <div class="w-5/6 bg-gray-200 content">
        <Nuxt />
      </div>
    </div>
  </div>
</template>

<script>
import DashboardNavbar from '~/components/Dashboard/Header/DashboardNavbar'
import DashboardNavigation from '~/components/Dashboard/Header/DashboardNavigation'

export default {
  components: {
    DashboardNavbar,
    DashboardNavigation,
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