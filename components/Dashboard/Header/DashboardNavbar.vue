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
    <select id="vendor" v-if="user.vendors" @change="changeVendor($event)">
      <option
        v-for="vendor in user.vendors"
        :key="vendor.id"
        :selected="parseInt(selectedVendor) === vendor.id"
        :value="vendor.id"
      >
        {{ vendor.name }}
      </option>
    </select>
    <li>
      <a href="#" @click.prevent="logout"> Sign out </a>
    </li>
  </header>
</template>

<script>
export default {
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
    async logout() {
      await this.$auth.logout().then((res) => {
        this.$router.push('/')
      })
    },
  },
  methods: {
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
  watch: {
    '$store.state.vendor_id': function (vendorId) {
      if (this.user.vendors && this.user.vendors.length) {
        this.fetchAddress(vendorId)
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
