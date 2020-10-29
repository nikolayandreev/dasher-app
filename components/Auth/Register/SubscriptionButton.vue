<template functional>
  <a
    href="#"
    class="relative inline-block px-6 py-4 text-center text-gray-800 transition-all duration-200 transform rounded-md shadow-xs sm:w-5/12 focus:outline-none"
    :class="{
      'shadow-md bg-white scale-105': props.selectedSubscription === props.subscription,
      'bg-gray-200  scale-95': props.selectedSubscription !== props.subscription
    }"
    @click.prevent="listeners.click"
  >
    <h4 class="block text-2xl font-medium text-center">{{ props.subscription.name }}</h4>
    <p
      class="my-3 text-sm leading-5 tracking-tight text-gray-600"
      v-if="props.subscription.description"
    >
      {{ props.subscription.description }}
    </p>

    <span class="block text-4xl font-normal font-display text-brand-500">{{ props.subscription.price }}
      <span class="-ml-2 text-sm font-normal text-gray-800">лв./месец</span>
    </span>
  </a>
</template>