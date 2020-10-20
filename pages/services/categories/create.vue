<template>
  <div>Service Categories > Create</div>
</template>

<script>
export default {
  layout: 'dashboard',
  middleware(context) {
    if (!context.$permission('services.categories.create')) {
      context.redirect('/missing-access')
    }
  },
}
</script>