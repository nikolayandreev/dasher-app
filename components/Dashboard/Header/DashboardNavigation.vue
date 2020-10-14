<template>
  <ul>
    <li v-for="link in headerNav" :key="link.name">
      <button
        v-if="!link.url"
        @click.prevent="setOpened(link.name)"
        class="flex flex-row flex-no-wrap items-center justify-between w-full px-5 py-4 font-medium text-left text-gray-900 transition-all duration-200 bg-white border-r-4 border-transparent outline-none hover:bg-gray-300 focus:outline-none"
        :class="{ opened: link.opened, hasActive: link.active }"
      >
        <span>{{ link.name }}</span>
        <svg
          viewBox="0 0 24 24"
          class="w-6 h-6 text-gray-900 transition-all duration-300 fill-current"
          :class="{
            'transition-all transform rotate-180': link.opened || link.active,
            'text-blue-600': link.active,
          }"
        >
          <path
            xmlns="http://www.w3.org/2000/svg"
            d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"
          />
        </svg>
      </button>
      <nuxt-link
        v-else
        :to="link.url"
        :title="link.title"
        class="inline-block w-full px-5 py-4 font-medium text-left text-gray-900 transition-all duration-200 bg-white border-r-4 border-transparent outline-none hover:bg-gray-300 focus:outline-none"
      >
        {{ link.name }}
      </nuxt-link>
      <transition name="slide" mode="out-in">
        <ul
          v-if="link.children && (link.opened || link.active)"
          class="pl-6 bg-white sub-menu"
        >
          <li
            v-for="child in link.children"
            :key="child.url"
            class="inline-block w-full px-4 py-3 text-gray-900 transition-all duration-200 hover:text-blue-600"
          >
            <nuxt-link
              :to="child.url"
              :title="child.title"
              class="block w-full"
            >
              {{ `-  ${child.name}` }}
            </nuxt-link>
          </li>
        </ul>
      </transition>
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
          active: false,
          opened: false,
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
          active: false,
          opened: false,
          children: [
            {
              url: '/services/create',
              title: 'Добави услуга',
              name: 'Добави услуга',
            },
            {
              url: '/services',
              title: 'Списък',
              name: 'Списък',
            },
            {
              url: '/services/categories',
              title: 'Категории',
              name: 'Категории',
            },
          ],
        },
        {
          url: null,
          title: 'Клиенти',
          name: 'Клиенти',
          active: false,
          opened: false,
          children: [
            {
              url: '/clients/create',
              title: 'Добави клиент',
              name: 'Добави клиент',
            },
            {
              url: '/clients',
              title: 'Списък',
              name: 'Списък',
            },
            {
              url: '/clients/segments',
              title: 'Сегменти',
              name: 'Сегменти',
            },
          ],
        },
        {
          url: '/analysis',
          title: 'Анализи',
          name: 'Анализи',
        },
        {
          url: '/payments',
          title: 'Плащания',
          name: 'Плащания',
        },
      ],
    }
  },
  computed: {
    currentPath() {
      return this.$store.getters['getActiveMenu']
    },
  },
  watch: {
    $route() {
      this.$store.dispatch('commitActiveMenu', this.$route.path)
      this.matchActive()
    },
  },
  created() {
    this.$store.dispatch('commitActiveMenu', this.$route.path)
    this.matchActive()
  },
  methods: {
    matchActive() {
      return this.headerNav.forEach((parent) => {
        let state = false

        if (!parent.children) {
          return
        }

        state = parent.children.some(
          (elem) =>
            elem.url === this.currentPath || this.$route.path.includes(elem.url)
        )

        parent.opened = state
        parent.active = state
      })
    },
    closeOpened() {
      let opened = this.headerNav.filter((elem) => elem.opened === true)

      for (let item of opened) {
        item.opened = !item.opened
      }
    },

    setOpened(menuName) {
      const item = this.headerNav.find((elem) => elem.name === menuName)

      if (!item.opened) {
        this.closeOpened()
        return (item.opened = true)
      }
      return (item.opened = false)
    },
  },
}
</script>

<style lang="scss" scoped>
.opened,
.hasActive {
  @apply border-r-4 border-blue-400;
}
.hasActive {
  @apply text-blue-600 bg-blue-100 border-r-4 border-blue-600;
}
.nuxt-link-exact-active {
  @apply text-blue-600  border-blue-700 border-r-4 bg-blue-100 transition-all;
}
.sub-menu .nuxt-link-exact-active {
  @apply text-blue-600 bg-white border-r-0 font-medium;
}
.slide-enter-active {
  transition-duration: 0.3s;
  transition-timing-function: ease-in-out;
}
.slide-leave-active {
  transition-duration: 0.3s;
  transition-timing-function: ease-in-out;
}
.slide-enter-to,
.slide-leave {
  max-height: 150px;
  overflow: hidden;
}
.slide-enter,
.slide-leave-to {
  overflow: hidden;
  max-height: 0;
}
</style>
