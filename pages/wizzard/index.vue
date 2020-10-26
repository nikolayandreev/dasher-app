<template>
  <div>
    <VendorsWizzardWrapper />
  </div>
</template>

<script>
export default {
  layout: 'wizzard',
  created() {
    return this.$axios
      .$get('/api/areas')
      .then((res) => {
        this.$store.dispatch('wizzard/commitAreas', res.data)
      })
      .catch((err) => {
        this.$store.dispatch('wizzard/commitAreas', null)
        console.error(err)
      })
  },
}
</script>
