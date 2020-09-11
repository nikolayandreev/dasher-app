<template>
  <header>
    <nav>
      <ul>
        <li
          v-for="link in headerNav"
          :key="link.name"
        >
          <nuxt-link
            :to="link.url"
            :title="link.title"
          >
            {{ link.name }}
          </nuxt-link>
        </li>
        <li>
          <a
            href="#"
            @click.prevent="logout"
          >
            Sign out
          </a>
        </li>
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
          url: '/dashboard',
          title: 'Go back to Dashboard',
          name: 'Dashboard',
        },
        {
          url: '/',
          title: 'Abous us',
          name: 'Abous us',
        },
        {
          url: '/',
          title: 'How it works',
          name: 'How it works',
        },
        {
          url: '/',
          title: 'Pricing',
          name: 'Pricing',
        },
      ],
    }
  },
  methods: {
    async logout() {
      await this.$auth.logout().then((res) => {
        this.$router.push('/')
      })
    },
  },
}
</script>

<style lang="scss" scoped></style>
