<template>
  <div>Employees > Create</div>
</template>

<script>
export default {
  layout: 'dashboard',
  middleware(app) {
    if (!app.$permission('employees.create')) {
      app.redirect('/missing-access')
    }
  },
}
</script>