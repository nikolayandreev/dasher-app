<template>
  <div>Clients > Edit</div>
</template>

<script>
export default {
  layout: 'dashboard',
  middleware(context) {
    if (!context.$permission('clients.edit')) {
      context.redirect('/missing-access')
    }
  },
  validate({ params }) {
    if (!params.id) {
      return false
    }

    return /^[0-9]*$/.test(params.id)
  },
}
</script>