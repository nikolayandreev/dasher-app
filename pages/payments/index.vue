<template>
  <div>Payments</div>
</template>

<script>
export default {
  layout: 'dashboard',
  middleware(context) {
    if (!context.$permission('billing.view')) {
      context.redirect('/missing-access')
    }
  },
  mounted() {
    // console.log(this.$auth.user)
  },
}
</script>