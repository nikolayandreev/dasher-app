<template functional>
  <button
    class="w-full px-4 py-4 text-left transition duration-200 bg-white outline-none d-block focus:outline-none hover:bg-gray-200"
    @click="listeners.click"
    :class="{
      'bg-pink-100 hover:bg-pink-100 border-r-4  border-pink-600': props.active,
    }"
  >
    <h4
      class="text-lg font-medium text-gray-900"
      :class="{ 'text-pink-700': props.active }"
    >
      {{ props.roleName }}
    </h4>
    <p class="text-sm text-gray-600" :class="{ 'text-pink-600': props.active }">
      <slot></slot>
    </p>
  </button>
</template>