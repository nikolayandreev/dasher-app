<template>
  <header>
    <nav>
      <ul>
        <template v-for="link in headerNav">
          <li
            v-if="link.visible"
            :key="link.name"
          >
            <nuxt-link
              :to="link.url"
              :title="link.title"
            >
              {{ link.name }}
            </nuxt-link>
          </li>
        </template>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  data() {
    return {
      headerNav: [
        {
          url: '/',
          title: 'Go to Homepage',
          name: 'Home',
          visible: true,
        },
        {
          url: '/',
          title: 'Abous us',
          name: 'Abous us',
          visible: true,
        },
        {
          url: '/',
          title: 'How it works',
          name: 'How it works',
          visible: true,
        },
        {
          url: '/',
          title: 'Pricing',
          name: 'Pricing',
          visible: true,
        },
        {
          url: '/dashboard',
          class: 'accent',
          title: 'Visit your dashboard',
          name: 'Dashboard',
          visible: true,
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped></style>
