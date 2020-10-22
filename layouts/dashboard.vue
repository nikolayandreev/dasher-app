<template>
  <div
    class="box-border w-screen"
    style="height: 93vh"
  >
    <DashboardNavbar />
    <div class="flex flex-row flex-no-wrap items-stretch w-full h-auto min-h-full">
      <nav class="w-1/6 bg-white">
        <DashboardNavigationVendor />
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
import DashboardNavigationVendor from '~/components/Dashboard/Header/DashboardNavigationVendor'

export default {
  components: {
    DashboardNavbar,
    DashboardNavigationVendor,
    DashboardNavigation,
  },
  watch: {
    '$store.state.vendor_id': function () {
      this.setSelectedVendor()
    },
  },
  methods: {
    setSelectedVendor() {
      if (this.$auth.user.vendors) {
        return this.$store.dispatch(
          'commitVendor',
          this.$auth.user.vendors.find(
            (elem) => elem.id === parseInt(this.$store.state.vendor_id)
          )
        )
      }

      return this.$router.push('/wizzard')
    },
  },
  created() {
    this.setSelectedVendor()
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
              parseInt(localStorage.getItem('dasher_vendor_id'))
            )
          }
        }
      } else {
        this.$store.dispatch('commitVendorId', null)
      }
    }
  },
}
</script>