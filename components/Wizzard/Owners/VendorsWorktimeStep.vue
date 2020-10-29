<template>
  <div>
    <h2 class="mt-8 text-3xl">Работно време</h2>
    <p class="text-sm text-gray-700">
      Определи разрешеното време за записване на резервации
    </p>

    <div class="flex flex-row flex-no-wrap mt-6">
      <div class="w-2/4">
        <template v-for="day in daysAvailable">
          <WorktimeEntry
            v-if="day.index < 5 && day.index !== 0"
            :key="day.index"
            :day="day.day"
            :id="`days[${day.index}]`"
            :valueFrom="worktime[day.index] ? worktime[day.index].from : '09:00'"
            @input-from="worktime[day.index].from = $event"
            :valueTo="worktime[day.index] ? worktime[day.index].to : '20:00'"
            @input-to="worktime[day.index].to = $event"
            :valueActive="worktime[day.index] ? worktime[day.index].active : false"
            @input="worktime[day.index].active = $event"
          />
        </template>
      </div>
      <div class="w-2/4">
        <template v-for="day in daysAvailable">
          <WorktimeEntry
            v-if="day.index >= 5 || day.index === 0"
            :key="day.index"
            :day="day.day"
            :id="`days[${day.index}]`"
            :valueFrom="worktime[day.index] ? worktime[day.index].from : '09:00'"
            @input-from="worktime[day.index].from = $event"
            :valueTo="worktime[day.index] ? worktime[day.index].to : '20:00'"
            @input-to="worktime[day.index].to = $event"
            :valueActive="worktime[day.index] ? worktime[day.index].active : false"
            @input="worktime[day.index].active = $event"
          />
        </template>
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
        class="px-16 py-3 ml-10 font-medium tracking-wide transition duration-200 rounded-md text-brand-500 bg-brand-100 font-display hover:bg-brand-500 hover:text-white focus:shadow-outline-brand-600 focus:outline-none"
      >
        Следваща стъпка
      </button>
    </div>
  </div>
</template>


<script>
import { required, requiredIf } from 'vuelidate/lib/validators'

export default {
  data() {
    return {
      formPending: false,
      daysAvailable: [
        {
          day: 'Понеделник',
          index: 1,
        },
        {
          day: 'Вторник',
          index: 2,
        },
        {
          day: 'Сряда',
          index: 3,
        },
        {
          day: 'Четвъртък',
          index: 4,
        },
        {
          day: 'Петък',
          index: 5,
        },
        {
          day: 'Събота',
          index: 6,
        },
        {
          day: 'Неделя',
          index: 0,
        },
      ],
      worktime: {},
    }
  },
  created() {
    this.fetchVendorWorktime()
  },
  computed: {
    vendorId() {
      const id = this.$store.getters['wizzard/getVendorId']
      return id ? id : parseInt(localStorage.getItem('wizzard_vendor_id'))
    },
  },
  deactivated() {
    this.storeVendorWorktime()
  },
  methods: {
    onSubmit() {
      this.formPending = true
      this.storeVendorWorktime()
      return $nuxt.$emit('wizzard-switch', 4)
    },
    storeVendorWorktime() {
      this.$axios
        .$post('/api/vendor/schedule', {
          vendor_id: this.vendorId,
          worktime: this.worktime,
        })
        .then((res) => {
          this.formPending = false
          this.worktime = res.data

          this.$store.dispatch('wizzard/commitStep', {
            step: 3,
            status: 'finished',
          })
        })
        .catch((err) => {
          this.formPending = false
          this.worktime = null
        })
    },
    fetchVendorWorktime() {
      this.$axios
        .$get(`/api/vendor/${this.vendorId}/schedule`)
        .then((res) => {
          this.worktime = res.data
        })
        .catch((err) => console.error(err))
    },
  },
}
</script>