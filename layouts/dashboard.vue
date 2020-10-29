<template>
  <div class="box-border w-screen" style="height: 93vh">
    <DashboardNavbar />
    <div
      class="flex flex-row flex-no-wrap items-stretch w-full h-auto min-h-full"
    >
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
  async middleware(app) {
    if (!app.$auth.user || !app.$auth.user.id) {
      await app.$axios
        .$get('/api/user')
        .then((res) => {
          return app.$auth.setUser(res.data)
        })
        .catch((err) => {
          localStorage.removeItem('dasher_vendor_id')
          return app.$auth.logout()
        })
    }

    if (
      (!app.$auth.user.vendors || !app.$auth.user.subscribed) &&
      app.$auth.user.type === 1
    ) {
      return app.redirect('/wizzard')
    }
  },
  components: {
    DashboardNavbar,
    DashboardNavigationVendor,
    DashboardNavigation,
  },
  watch: {
    '$store.state.vendor_id': function () {
      this.setSelectedVendor()
    },
    '$store.state.auth.loggedIn': function () {
      localStorage.removeItem('dasher_vendor_id')
    },
  },
  computed: {
    selectedVendorId() {
      if (this.$store.getters['getVendorId'])
        return this.$store.getters['getVendorId']

      if (localStorage.getItem('dasher_vendor_id'))
        return parseInt(localStorage.getItem('dasher_vendor_id'))
    },
  },
  methods: {
    setSelectedVendor() {
      if (this.$auth.user.vendors) {
        return this.$store.dispatch(
          'commitVendor',
          this.$auth.user.vendors.find(
            (elem) => elem.id === parseInt(this.selectedVendorId)
          )
        )
      }
    },
  },
  created() {
    this.setSelectedVendor()
  },
  beforeCreate() {
    if (this.$auth.user.vendors && this.$auth.user.vendors.length) {
      let vendorId = null

      if (!localStorage.getItem('dasher_vendor_id')) {
        vendorId = this.$auth.user.vendors
          ? this.$auth.user.vendors[0].id
          : null
      } else {
        vendorId = parseInt(localStorage.getItem('dasher_vendor_id'))
      }

      this.$store.dispatch('commitVendorId', vendorId)
    }
  },
}
</script>