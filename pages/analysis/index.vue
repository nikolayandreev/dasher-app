<template>
  <div>Analysis</div>
</template>

<script>
export default {
  layout: 'dashboard',
  middleware(app) {
    if (!app.$permission('analysis.view')) {
      app.redirect('/missing-access')
    }
  },
}
</script>