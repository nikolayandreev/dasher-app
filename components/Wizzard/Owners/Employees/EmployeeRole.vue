<template functional>
  <button
    class="w-full px-4 py-4 text-left transition duration-200 bg-white border-b border-gray-300 outline-none d-block focus:outline-none hover:bg-gray-200"
    @click="listeners.click"
    :class="{'bg-pink-600 hover:bg-pink-600': props.active}"
  >
    <h4
      class="text-lg font-medium text-gray-900"
      :class="{'text-pink-100': props.active}"
    >{{ props.roleName }}</h4>
    <p
      class="text-sm text-gray-600"
      :class="{'text-pink-200': props.active}"
    >
      <slot></slot>
    </p>
  </button>
</template>