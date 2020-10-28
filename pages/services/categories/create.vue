<template>
  <div>Service Categories > Create</div>
</template>

<script>
export default {
  layout: 'dashboard',
  middleware(app) {
    if (!app.$permission('services.categories.create')) {
      app.redirect('/missing-access')
    }
  },
}
</script>