<template>
  <div>Service > Index</div>
</template>

<script>
export default {
  layout: 'dashboard',
  middleware(context) {
    if (!context.$permission('services.view')) {
      context.redirect('/missing-access')
    }
  },
}
</script>