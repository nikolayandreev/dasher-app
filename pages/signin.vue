<template>
  <div class="container">
    <FormsWrapper setActive="signin" />
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