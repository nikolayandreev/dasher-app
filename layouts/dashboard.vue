<template>
  <div
    class="box-border w-screen"
    style="height: 93vh"
  >
    <DashboardNavbar />
    <div class="flex flex-row flex-no-wrap items-stretch w-full h-auto min-h-full">
      <nav class="w-1/6 bg-white">
        <DashboardNavigation />
      </nav>
      <div class="flex flex-row flex-wrap w-5/6 bg-gray-400">
        <div class="w-full px-6 py-6 mx-3 my-3 bg-white">
          <Nuxt />
        </div>
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
          localStorage.removeItem('dasher_vendor_id')
          return this.$auth.logout()
        })
    }
  },
}
</script>