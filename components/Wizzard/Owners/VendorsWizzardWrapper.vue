<template>
  <div class="container py-8">
    <div class="text-center">
      <h1 class="text-5xl font-medium text-gray-900">Добре дошли в Dasher!</h1>
      <p class="mt-4 text-lg text-gray-700">За да започнете да използвате Dasher, първо трябва да настроим вашият акаунт в няколко лесни стъпки.</p>
    </div>

    <nav class="flex flex-row flex-no-wrap items-center justify-around mx-auto mt-10">
      <div
        :id="`wizzard-nav-${tab.index}`"
        class="w-full pb-4 text-center border-b-2"
        :class="{
          'border-brand-100': progress.find(item => item.step === tab.index && item.status === 'finished'),
          'border-brand-500': tab.key === step,
          'border-gray-200': tab.index > index,
        }"
        v-for="tab in tabs"
        :key="tab.key"
      >
        <button
          class="outline-none focus:outline-none"
          @click="lastFinished && lastFinished.step + 1 >= tab.index ? switchStep(index, tab.index) : false"
        >
          <div
            class="inline-block px-3 py-3 transition duration-200 rounded-full"
            :class="{
          'bg-brand-100': progress.find(item => item.step === tab.index && item.status === 'finished'),
          'bg-brand-500': tab.key === step,
          'bg-gray-200': tab.index > index
        }"
          >
            <svg-icon
              :name="progress && progress.find(item => item.step === tab.index).status === 'finished' ? 'check' : tab.icon"
              class="w-8 h-8 mx-auto transition duration-200 fill-current"
              :class="{
                'text-brand-100': tab.index === index,
                'text-brand-500': tab.index !== index && progress.find(item => item.step === tab.index && item.status === 'finished'),
                'text-gray-500': tab.index > index
              }"
            />
          </div>
          <div
            class="block mt-2 text-lg text-gray-800 transition duration-200"
            :class="{'font-medium text-brand-500': tab.index === index}"
          >
            {{ tab.name }}
          </div>
        </button>
      </div>
    </nav>
    <transition
      v-if="loaded"
      :name="`slide-${direction === 'left' ? 'left' : 'right'}`"
      mode="out-in"
    >
      <keep-alive>
        <component :is="step"></component>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      step: 'info',
      direction: 'right',
      index: 1,
      loaded: false,
      tabs: [
        {
          key: 'info',
          name: 'Информация за обект',
          icon: 'information-outline',
          index: 1,
        },
        {
          key: 'worktime',
          name: 'Работно време',
          icon: 'clock-outline',
          index: 2,
        },
        {
          key: 'employees',
          name: 'Добави служители',
          icon: 'account-group-outline',
          index: 3,
        },
        {
          key: 'settings',
          name: 'Настройки',
          icon: 'cog-outline',
          index: 4,
        },
      ],
    }
  },
  watch: {
    index(newValue, oldValue) {
      const active = this.tabs.find((elem) => elem.index === newValue)

      this.switchStep(oldValue, newValue)
    },
  },
  components: {
    info: () => import('~/components/Wizzard/Owners/VendorsInfoStep'),
    worktime: () => import('~/components/Wizzard/Owners/VendorsWorktimeStep'),
    employees: () => import('~/components/Wizzard/Owners/VendorsEmployeesStep'),
    settings: () => import('~/components/Wizzard/Owners/VendorsSettingsStep'),
  },
  methods: {
    switchStep(fromIndex, toIndex) {
      if (!fromIndex || !toIndex) {
        return false
      }

      const fromTab = this.tabs.find((elem) => elem.index === fromIndex)
      const toTab = this.tabs.find((elem) => elem.index === toIndex)

      this.step = toTab.key
      this.index = toTab.index

      if (fromTab.index > toTab.index) {
        this.direction = 'left'
      } else {
        this.direction = 'right'
      }
    },
  },
  computed: {
    progress() {
      return this.$store.getters['wizzard/getStep']
    },
    lastFinished() {
      return this.progress
        .slice()
        .reverse()
        .find((item) => item.status === 'finished')
    },
  },
  created() {
    this.$nuxt.$on('wizzard-switch', (step) => (this.index = step))
  },
  mounted() {
    this.loaded = true
  },
}
</script>


<style lang="scss" scoped>
$opacityFrom: 0;
$opacityTo: 0.6;
$transitionTime: 120ms;
$pullLeft: -100px;
$pullRight: 100px;

.slide-left-enter {
  transform: translateX($pullLeft);
  opacity: $opacityFrom;
  transition: all $transitionTime;
}
.slide-left-enter-to {
  transform: translateX(0);
  opacity: $opacityTo;
  transition: all $transitionTime;
}
.slide-left-leave {
  transform: translateX(0);
  opacity: $opacityTo;
  transition: all $transitionTime;
}
.slide-left-leave-to {
  transform: translateX($pullRight);
  opacity: $opacityFrom;
  transition: all $transitionTime;
}

.slide-right-enter {
  transform: translateX($pullRight);
  opacity: $opacityFrom;
  transition: all $transitionTime;
}
.slide-right-enter-to {
  transform: translateX(0);
  opacity: $opacityTo;
  transition: all $transitionTime;
}
.slide-right-leave {
  transform: translateX(0);
  opacity: $opacityTo;
  transition: all $transitionTime;
}
.slide-right-leave-to {
  transform: translateX($pullLeft);
  opacity: $opacityFrom;
  transition: all $transitionTime;
}
</style>