<template>
  <div>
    <h2 class="mt-8 text-3xl">Работно време</h2>
    <p class="text-sm text-gray-700">
      Определи разрешеното време за записване на резервации
    </p>

    <div class="flex flex-row flex-no-wrap mt-6">
      <div class="w-2/4">
        <WorktimeEntry
          day="Понеделник"
          :id="'days[0]'"
          :valueFrom="worktime['0'].from"
          @input-from="worktime['0'].from = $event"
          :valueTo="worktime['0'].to"
          @input-to="worktime['0'].to = $event"
          :valueActive="worktime['0'].active"
          @input="worktime['0'].active = $event"
        />
        <WorktimeEntry
          day="Вторник"
          :id="'days[1]'"
          :valueFrom="worktime['1'].from"
          @input-from="worktime['1'].from = $event"
          :valueTo="worktime['1'].to"
          @input-to="worktime['1'].to = $event"
          :valueActive="worktime['1'].active"
          @input="worktime['1'].active = $event"
        />
        <WorktimeEntry
          day="Сряда"
          :id="'days[2]'"
          :valueFrom="worktime['2'].from"
          @input-from="worktime['2'].from = $event"
          :valueTo="worktime['2'].to"
          @input-to="worktime['2'].to = $event"
          :valueActive="worktime['2'].active"
          @input="worktime['2'].active = $event"
        />
        <WorktimeEntry
          day="Четвъртък"
          :id="'days[3]'"
          :valueFrom="worktime['3'].from"
          @input-from="worktime['3'].from = $event"
          :valueTo="worktime['3'].to"
          @input-to="worktime['3'].to = $event"
          :valueActive="worktime['3'].active"
          @input="worktime['3'].active = $event"
        />
      </div>
      <div class="w-2/4">
        <WorktimeEntry
          day="Петък"
          :id="'days[4]'"
          :valueFrom="worktime['4'].from"
          @input-from="worktime['4'].from = $event"
          :valueTo="worktime['4'].to"
          @input-to="worktime['4'].to = $event"
          :valueActive="worktime['4'].active"
          @input="worktime['4'].active = $event"
        />
        <WorktimeEntry
          day="Събота"
          :id="'days[5]'"
          :valueFrom="worktime['5'].from"
          @input-from="worktime['5'].from = $event"
          :valueTo="worktime['5'].to"
          @input-to="worktime['5'].to = $event"
          :valueActive="worktime['5'].active"
          @input="worktime['5'].active = $event"
        />
        <WorktimeEntry
          day="Неделя"
          :id="'days[6]'"
          :valueFrom="worktime['6'].from"
          @input-from="worktime['6'].from = $event"
          :valueTo="worktime['6'].to"
          @input-to="worktime['6'].to = $event"
          :valueActive="worktime['6'].active"
          @input="worktime['6'].active = $event"
        />
      </div>
    </div>

    <div class="flex flex-row flex-no-wrap items-center justify-end pt-4 mt-4">
      <button
        @click="$nuxt.$emit('wizzard-switch', 1)"
        class="mr-auto text-lg text-gray-700 transition duration-200 border-b border-transparent focus:outline-none hover:text-gray-900 hover:border-gray-900"
      >
        Назад
      </button>
      <button
        :disabled="formPending"
        :class="{ pending: formPending }"
        @click="onSubmit"
        class="px-16 py-3 ml-10 font-medium tracking-wide text-pink-600 transition duration-200 bg-pink-200 rounded-md font-display hover:bg-pink-600 hover:text-white focus:shadow-outline-pink-600 focus:outline-none"
      >
        Следваща стъпка
      </button>
    </div>
  </div>
</template>


<script>
import { required } from 'vuelidate/lib/validators'

export default {
  data() {
    return {
      formPending: false,
      errors: null,
      worktime: {
        0: {
          active: true,
          from: '08:00',
          to: '20:00',
        },
        1: {
          active: true,
          from: '08:00',
          to: '20:00',
        },
        2: {
          active: true,
          from: '08:00',
          to: '20:00',
        },
        3: {
          active: true,
          from: '08:00',
          to: '20:00',
        },
        4: {
          active: true,
          from: '08:00',
          to: '20:00',
        },
        5: {
          active: true,
          from: '10:00',
          to: '17:00',
        },
        6: {
          active: true,
          from: '10:00',
          to: '17:00',
        },
      },
    }
  },
  computed: {
    storedWorktime() {
      return this.$store.getters['wizzard/getWorktime']
    },
  },
  mounted() {
    this.mapWorktime()
  },
  methods: {
    onSubmit() {
      this.formPending = true

      this.$store.dispatch('wizzard/commitStep', {
        step: 2,
        status: 'finished',
      })

      return $nuxt.$emit('wizzard-switch', 3)
    },
    storeWorktime() {
      this.$store.dispatch('wizzard/commitWorktime', this.worktime)
      this.formPending = false
    },

    mapWorktime() {
      if (this.storedWorktime) {
        this.worktime = JSON.parse(JSON.stringify(this.storedWorktime))
      }
    },
  },
  beforeDestroy() {
    this.storeWorktime()
  },
}
</script>