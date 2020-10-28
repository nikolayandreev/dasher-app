<template>
  <div>Clients > Create</div>
</template>

<script>
export default {
  layout: 'dashboard',
  middleware(app) {
    if (!app.$permission('clients.create')) {
      app.redirect('/missing-access')
    }
  },
}
</script>