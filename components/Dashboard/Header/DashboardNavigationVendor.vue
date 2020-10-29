<template>
  <client-only>
    <div class="flex flex-row flex-no-wrap items-start px-4 py-2 my-4">
      <div class="w-1/5 px-3 py-3 rounded-md bg-brand-100">
        <svg-icon name="store" class="w-8 h-8 fill-current text-brand-500" />
      </div>
      <div class="w-4/5 pl-4" v-if="selectedVendor">
        <div class="flex flex-row flex-wrap items-center">
          <div
            :class="{
              'w-10/12': $permission('vendor.edit'),
              'w-full': !$permission('vendor.edit'),
            }"
            class="mb-1"
          >
            <div
              v-if="$auth.user.vendors && $auth.user.vendors.length > 1"
              class="relative border-b border-gray-300"
            >
              <select
                id="vendor"
                class="pr-3 -ml-1 -mr-1 text-gray-900 appearance-none cursor-pointer font-display"
                @change="changeVendor($event)"
              >
                <option
                  v-for="vendor in $auth.user.vendors"
                  :key="vendor.id"
                  :selected="selectedVendor.id === vendor.id"
                  :value="vendor.id"
                >
                  {{ vendor.name }}
                </option>
              </select>
              <svg-icon
                name="select-arrows"
                class="absolute right-0 w-4 h-4 text-gray-600 pointer-events-none fill-current"
                style="top: 50%; transform: translateY(-50%)"
              />
            </div>
            <h4
              class="tracking-tight text-gray-900"
              :class="{
                'w-10/12': $permission('vendor.edit'),
                'w-full': !$permission('vendor.edit'),
              }"
              v-else
            >
              {{ selectedVendor.name }}
            </h4>
          </div>
          <nuxt-link
            v-if="$permission('vendor.edit')"
            class="w-2/12"
            :to="`/vendor/settings/${selectedVendor.id}`"
            title="Настройки"
          >
            <svg-icon
              name="cog"
              class="w-4 h-4 ml-auto text-gray-500 fill-current hover:text-gray-800"
            />
          </nuxt-link>
        </div>
        <small class="block w-full -mb-1 font-medium text-gray-600">{{
          selectedVendor.address.street
        }}</small>
        <small class="block w-full text-gray-600">{{
          selectedVendor.address.additional
        }}</small>
      </div>
    </div>
  </client-only>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$auth.user
    },
    selectedVendor() {
      return this.$store.getters['getSelectedVendor']
    },
  },
  watch: {
    '$store.state.vendor_id': function (vendorId) {
      if (this.user.vendors && this.user.vendors.length) {
        this.fetchAddress(vendorId)
      }
    },
  },
  methods: {
    fetchAddress(vendorId) {
      this.$axios
        .$get(`/api/addresses/${vendorId}`)
        .then((res) => console.log(res))
    },
    changeVendor(event) {
      this.$store.dispatch('commitVendorId', event.target.value)
      localStorage.setItem('dasher_vendor_id', event.target.value)
    },
  },
}
</script>