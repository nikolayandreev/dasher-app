<template>
  <div>Service Categories</div>
</template>

<script>
export default {
  layout: 'dashboard',
  middleware(app) {
    if (!app.$permission('services.categories.view')) {
      app.redirect('/missing-access')
    }
  },
}
</script>