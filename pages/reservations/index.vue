<template>
  <div class="grid grid-cols-3 gap-8">
    <div class="col-span-1 px-4 pb-12 bg-gray-200">
      <h3 class="mb-4 text-xl">My Blog for vendor: {{ vendorId }}</h3>
      Has Permission to view billing: {{ $permission('billing.view') }}<br />
      Has Permission to view clients: {{ $permission('clients.view') }}
      <ul>
        <li>
          <nuxt-link to="/">Home</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/">About</nuxt-link>
        </li>
      </ul>
    </div>
    <div class="col-span-2">
      <div class="mt-12">
        <h1 class="pb-2 text-5xl">Some title</h1>
        <p>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
          rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
          ipsum
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'dashboard',
  middleware(context) {
    if (
      !context.$permission('reservations.view') &&
      !context.$permission('reservations.view.own')
    ) {
      context.redirect('/missing-access')
    }
  },
  computed: {
    user() {
      return this.$auth.user
    },
    vendorId() {
      return this.$store.getters['getVendorId']
    },
  },
}
</script>