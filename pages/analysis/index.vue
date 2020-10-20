<template>
  <div>Analysis</div>
</template>

<script>
export default {
  layout: 'dashboard',
  middleware(context) {
    if (!context.$permission('analysis.view')) {
      context.redirect('/missing-access')
    }
  },
}
</script>