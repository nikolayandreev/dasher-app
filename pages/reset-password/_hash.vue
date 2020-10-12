<template>
  <div class="container">
    <FormsWrapper setActive="reset-password" />
  </div>
</template>

<script>
import FormsWrapper from '~/components/Auth/FormsWrapper'

export default {
  auth: 'guest',
  layout: 'auth',
  components: {
    FormsWrapper,
  },
  validate({ params }) {
    if (!params || !params.hash) {
      return false
    }

    return true
  },
}
</script>