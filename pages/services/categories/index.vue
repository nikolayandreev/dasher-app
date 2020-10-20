<template>
  <div>Service Categories</div>
</template>

<script>
export default {
  layout: 'dashboard',
  middleware(context) {
    if (!context.$permission('services.categories.view')) {
      context.redirect('/missing-access')
    }
  },
}
</script>