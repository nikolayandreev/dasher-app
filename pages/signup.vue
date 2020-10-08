<template functional>
  <div class="container">
    <FormsWrapper setActive="signup" />
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
}
</script>