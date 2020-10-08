<template>
  <div class="flex flex-row flex-wrap items-start h-screen pt-12 bg-gray-100 sm:items-center sm:pt-0">
    <div class="order-1 hidden w-1/4 h-screen px-2 py-6 bg-purple-800 xl:flex xl:flex-row xl:flex-wrap">
      <nav class="self-end">
        <ul class="flex flex-row flex-wrap">
          <li>Общи условия</li>
          <li>Условия за ползване</li>
          <li>Лични данни</li>
          <li>Помощ</li>
        </ul>
      </nav>
    </div>
    <div class="order-2 w-full xl:w-3/4">
      <Nuxt />
    </div>
  </div>
</template>

<script>
export default {}
</script>