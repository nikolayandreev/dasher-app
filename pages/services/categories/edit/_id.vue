<template>
  <div>Service Categories > Edit</div>
</template>

<script>
export default {
  layout: 'dashboard',
  middleware(app) {
    if (!app.$permission('services.categories.edit')) {
      app.redirect('/missing-access')
    }
  },
  validate({ params }) {
    if (!params.id) {
      return false
    }

    return /^[0-9]*$/.test(params.id)
  },
}
</script>