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
    if (process.client) {
      if (this.$auth.loggedIn) {
        if (this.$auth.user.vendors && this.$auth.user.vendors.length) {
          let firstVendorId = this.$auth.user.vendors[0].id
          if (!localStorage.getItem('dasher_vendor_id')) {
            this.$store.dispatch('commitVendorId', firstVendorId)
          } else {
            this.$store.dispatch(
              'commitVendorId',
              localStorage.getItem('dasher_vendor_id')
            )
          }
        }
      } else {
        this.$store.dispatch('commitVendorId', null)
      }
    }
    // if (!this.$auth.user.id) {
    //   this.$axios
    //     .$get('/api/user')
    //     .then((res) => {
    //       this.$store.commit('auth/SET', { key: 'user', value: res.data })
    //       if (process.client) {
    //         if (res.data.vendors && res.data.vendors.length) {
    //           let firstVendorId = res.data.vendors[0].id
    //           if (!localStorage.getItem('dasher_vendor_id')) {
    //             this.$store.dispatch('commitVendorId', firstVendorId)
    //           } else {
    //             this.$store.dispatch(
    //               'commitVendorId',
    //               localStorage.getItem('dasher_vendor_id')
    //             )
    //           }
    //         }
    //       }
    //     })
    //     .catch((err) => {
    //       this.$store.dispatch('commitVendorId', null)
    //       if (process.client) {
    //         localStorage.removeItem('dasher_vendor_id')
    //       }
    //       return this.$auth.logout()
    //     })
    // }
  },
}
</script>