<template>
  <button
    class="w-full px-4 py-3 text-left bg-purple-100 shadow-md sm:w-3/6 focus:outline-none"
    :class="{'bg-purple-200 transition-colors duration-300': selectedSubscription === subscription}"
    @click.prevent="$emit('click', $event)"
  >
    <h4 class="block text-xl font-semibold text-gray-800">{{ subscription.name }}</h4>
    <span
      class="block text-sm"
      v-if="subscription.trial"
    >14 дни безплатно!</span>
    <span
      class="block text-sm"
      v-if="!subscription.trial"
    >Неограничено СМС известяване</span>
    <a
      class="block mt-3 text-sm text-gray-600"
      href="#"
      :title="`Научи повече за ${ subscription.name }`"
    >Научи повече за {{ subscription.name }}</a>
    <span class="block mt-px text-lg font-medium text-gray-800 font-display">Само за: {{ subscription.price }}лв. / месец</span>
  </button>
</template>

<script>
export default {
  props: {
    selectedSubscription: {
      required: false,
    },
    subscription: {
      required: true,
    },
  },
}
</script>