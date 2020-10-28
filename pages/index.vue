<template>
  <div>
    Redirecting...
  </div>
</template>

<script>
export default {
  middleware(app) {
    if (app.$auth.loggedIn) {
      app.redirect('/reservations')
    } else {
      app.redirect('/signin')
    }
  },
}
</script>