<template>
  <div>Employees > Holidays</div>
</template>

<script>
export default {
  layout: 'dashboard',
  middleware(app) {
    if (!app.$permission('employees.holidays.view')) {
      app.redirect('/missing-access')
    }
  },
}
</script>