<template>
  <div>Clients > Segments</div>
</template>

<script>
export default {
  layout: 'dashboard',
  middleware(context) {
    if (!context.$permission('clients.segments.view')) {
      context.redirect('/missing-access')
    }
  },
}
</script>