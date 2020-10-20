<template>
  <div>Clients > Create</div>
</template>

<script>
export default {
  layout: 'dashboard',
  middleware(context) {
    if (!context.$permission('clients.create')) {
      context.redirect('/missing-access')
    }
  },
}
</script>