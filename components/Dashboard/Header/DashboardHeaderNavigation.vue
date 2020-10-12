<template>
  <header>
    <select
      id="vendor"
      v-if="user.vendors"
      @change="changeVendor($event)"
    >
      <option
        v-for="vendor in user.vendors"
        :key="vendor.id"
        :selected="parseInt(selectedVendor) === vendor.id"
        :value="vendor.id"
      >{{ vendor.name }}</option>
    </select>
    <nav>
      <ul>
        <li
          v-for="link in headerNav"
          :key="link.name"
        >
          <nuxt-link
            :to="link.url"
            :title="link.title"
          >
            {{ link.name }}
          </nuxt-link>
        </li>
        <li>
          <a
            href="#"
            @click.prevent="logout"
          >
            Sign out
          </a>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  data() {
    return {
      headerNav: [
        {
          url: '/dashboard',
          title: 'Go back to Dashboard',
          name: 'Dashboard',
        },
        {
          url: '/',
          title: 'Abous us',
          name: 'Abous us',
        },
        {
          url: '/',
          title: 'How it works',
          name: 'How it works',
        },
        {
          url: '/',
          title: 'Pricing',
          name: 'Pricing',
        },
      ],
    }
  },
  methods: {
    async logout() {
      await this.$auth.logout().then((res) => {
        this.$router.push('/')
      })
    },
    changeVendor(event) {
      this.$store.dispatch('commitVendorId', event.target.value)
      localStorage.setItem('dasher_vendor_id', event.target.value)
    },
    fetchAddress(vendorId) {
      this.$axios
        .$get(`/api/addresses/${vendorId}`)
        .then((res) => console.log(res))
    },
  },
  computed: {
    selectedVendor() {
      if (process.client && localStorage.getItem('dasher_vendor_id')) {
        return localStorage.getItem('dasher_vendor_id')
      }
      return this.$store.getters['getVendorId']
    },
    user() {
      return this.$auth.user
    },
  },
  watch: {
    '$store.state.vendor_id': function (vendorId) {
      this.fetchAddress(vendorId)
    },
  },
}
</script>

<style lang="scss" scoped></style>
