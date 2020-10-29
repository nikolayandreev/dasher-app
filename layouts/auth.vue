<template>
  <div class="flex flex-row flex-wrap items-start h-screen pt-12 bg-white sm:items-center sm:pt-0">
    <div class="order-1 w-full xl:w-3/6">
      <Nuxt />
    </div>
    <div class="order-2 hidden w-0 h-screen xl:w-3/6 lg:flex lg:flex-row lg:flex-wrap">
      <img
        src="/images/png/auth-bg.jpg"
        alt="Dasher.bg - Вход, Регистрация, Забравена парола"
        class="object-cover object-left-top"
      />
    </div>
  </div>
</template>

<script>
export default {
  // head() {
  //   return {
  //     script: [
  //       {
  //         src: 'https://js.stripe.com/v3/',
  //         defer: true,
  //       },
  //     ],
  //   }
  // },
}
</script>