  <template>
  <ul>
    <template v-for="link in headerNav">
      <li
        v-if="
          $auth.user.permissions &&
          $auth.user.permissions.includes(link.authorize)
        "
        :key="link.name"
      >
        <nuxt-link
          v-if="link.url"
          :to="link.url"
          :title="link.title"
          class="flex flex-row flex-no-wrap items-center justify-start w-full px-4 py-3 text-gray-800 transition-all duration-300 bg-transparent border-r-4 border-transparent outline-none hover:bg-brand-50 hover:text-brand-500 focus:outline-none"
        >
          <svg-icon
            :name="link.icon"
            class="w-6 h-6 mr-4 transition-all duration-300 fill-current text-brand-500"
          />
          {{ link.name }}
        </nuxt-link>
        <button
          v-else
          @click.prevent="setOpened(link.name)"
          class="flex flex-row flex-no-wrap items-center justify-start w-full px-4 py-3 text-gray-800 transition-all duration-300 bg-transparent border-r-4 border-transparent outline-none hover:bg-brand-50 hover:text-brand-500 focus:outline-none"
          :class="{ opened: link.opened, hasActive: link.active }"
        >
          <svg-icon
            :name="link.icon"
            class="w-6 h-6 mr-4 transition-all duration-300 fill-current text-brand-500"
          />
          <span>{{ link.name }}</span>
          <svg
            viewBox="0 0 24 24"
            class="w-6 h-6 ml-auto text-gray-800 transition-all duration-300 fill-current"
            :class="{
              'transition-all transform rotate-180': shouldOpenSubMenu(link),
              'text-brand-500': link.active,
            }"
          >
            <path
              xmlns="http://www.w3.org/2000/svg"
              d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"
            />
          </svg>
        </button>
        <transition
          name="
            slide"
          mode="out-in"
        >
          <ul
            v-if="link.children && shouldOpenSubMenu(link)"
            class="pl-6 bg-gray-100 sub-menu"
          >
            <li
              v-for="child in link.children"
              :key="child.url"
              class="inline-block w-full px-4 py-3 text-gray-800 transition-all duration-200 hover:text-brand-500"
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
    </template>
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
          authorize: 'reservations.view',
          icon: 'reservations',
        },
        {
          url: null,
          title: 'Служители',
          name: 'Служители',
          active: false,
          opened: false,
          authorize: 'employees.view',
          icon: 'employees',
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
          authorize: 'services.view',
          icon: 'services',
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
          authorize: 'clients.view',
          icon: 'clients',
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
          authorize: 'analysis.view',
          icon: 'analysis',
        },
        {
          url: '/payments',
          title: 'Плащания',
          name: 'Плащания',
          authorize: 'billing.view',
          icon: 'payments',
        },
      ],
    }
  },
  computed: {
    currentPath() {
      return this.$store.getters['getActiveMenu']
    },
    selectedVendorId() {
      if (process.client && localStorage.getItem('dasher_vendor_id')) {
        return parseInt(localStorage.getItem('dasher_vendor_id'))
      }
      return this.$store.getters['getVendorId']
    },
    user() {
      return this.$auth.user
    },
    selectedVendor() {
      return this.$store.getters['getSelectedVendor']
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
    changeVendor(event) {
      this.$store.dispatch('commitVendorId', event.target.value)
      localStorage.setItem('dasher_vendor_id', event.target.value)
    },
    shouldOpenSubMenu(link) {
      if (link.active) {
        return link.opened && link.active
      }

      return link.opened || link.active
    },
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
  @apply border-r-4 border-brand-300;
}
.hasActive {
  @apply text-brand-500 bg-brand-50 border-r-4 border-brand-500;
}
.nuxt-link-exact-active {
  @apply text-brand-500  border-brand-500 border-r-4 bg-brand-50 transition-all;
  svg {
    @apply text-brand-500;
  }
}
.sub-menu .nuxt-link-exact-active {
  @apply text-brand-500 bg-transparent border-r-0 font-medium;
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
