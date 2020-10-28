<template>
  <div>Payments</div>
</template>

<script>
export default {
  layout: 'dashboard',
  middleware(app) {
    if (!app.$permission('billing.view')) {
      app.redirect('/missing-access')
    }
  },
}
</script>