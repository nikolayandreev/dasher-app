<template>
  <div>
    <h2>Setup employees</h2>
    <div class="flex flex-row flex-no-wrap items-center justify-end">
      <button
        @click="$nuxt.$emit('wizzard-switch', 2)"
        class="text-lg text-gray-700 transition duration-200 border-b border-transparent focus:outline-none hover:text-gray-900 hover:border-gray-900"
      >
        Назад
      </button>
      <button
        @click="$nuxt.$emit('wizzard-switch', 4)"
        class="px-16 py-3 ml-10 font-medium tracking-wide text-pink-600 transition duration-200 bg-pink-200 rounded-md font-display hover:bg-pink-600 hover:text-white focus:shadow-outline-pink-600 focus:outline-none"
      >
        Следваща стъпка
      </button>
    </div>
  </div>
</template>