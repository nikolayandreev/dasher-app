<template>
  <div>Employees > Edit</div>
</template>

<script>
export default {
  layout: 'dashboard',
  validate({ params }) {
    if (!params.id) {
      return false
    }

    return /^[0-9]*$/.test(params.id)
  },
}
</script>