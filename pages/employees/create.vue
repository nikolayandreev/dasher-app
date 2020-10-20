<template>
  <div>Employees > Create</div>
</template>

<script>
export default {
  layout: 'dashboard',
  middleware(context) {
    if (!context.$permission('employees.create')) {
      context.redirect('/missing-access')
    }
  },
}
</script>