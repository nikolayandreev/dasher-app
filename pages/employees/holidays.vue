<template>
  <div>Employees > Holidays</div>
</template>

<script>
export default {
  layout: 'dashboard',
  middleware(context) {
    if (!context.$permission('employees.holidays.view')) {
      context.redirect('/missing-access')
    }
  },
}
</script>