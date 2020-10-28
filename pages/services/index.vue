<template>
  <div>Service > Index</div>
</template>

<script>
export default {
  layout: 'dashboard',
  middleware(app) {
    if (!app.$permission('services.view')) {
      app.redirect('/missing-access')
    }
  },
}
</script>