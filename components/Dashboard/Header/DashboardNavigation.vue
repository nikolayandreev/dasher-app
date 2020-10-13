<template>
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
  </ul>
</template>

<script>
export default {
  data() {
    return {
      headerNav: [
        {
          url: '/reservations',
          title: 'Табло с резервации',
          name: 'Резервации',
        },
        {
          url: null,
          title: 'Служители',
          name: 'Служители',
          children: [
            {
              url: '/employees/create',
              title: 'Добави служител',
              name: 'Добави служител',
            },
            {
              url: '/employees',
              title: 'Списък',
              name: 'Списък',
            },
            {
              url: '/employees/holidays',
              title: 'Почивни дни',
              name: 'Почивни дни',
            },
          ],
        },
        {
          url: null,
          title: 'Услуги',
          name: 'Услуги',
          children: [{}],
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
}
</script>

<style lang="scss" scoped></style>
