<template>
  <div>
    <h2>Setup settings</h2>
    <div class="flex flex-row flex-no-wrap items-center justify-end">
      <button
        @click="$nuxt.$emit('wizzard-switch', 3)"
        class="text-lg text-gray-700 transition duration-200 border-b border-transparent focus:outline-none hover:text-gray-900 hover:border-gray-900"
      >
        Назад
      </button>
      <button
        @click="$nuxt.$emit('wizzard-switch', 4)"
        class="px-16 py-3 ml-10 font-medium tracking-wide transition duration-200 rounded-md text-brand-500 bg-brand-100 font-display hover:bg-brand-500 hover:text-white focus:shadow-outline-brand-600 focus:outline-none"
      >
        Завърши конфигурацията
      </button>
    </div>
  </div>
</template>