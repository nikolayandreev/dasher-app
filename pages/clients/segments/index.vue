<template>
  <div>Clients > Segments</div>
</template>

<script>
export default {
  layout: 'dashboard',
  middleware(app) {
    if (!app.$permission('clients.segments.view')) {
      app.redirect('/missing-access')
    }
  },
}
</script>