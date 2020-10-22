<template>
  <div>
    <div>
      <div>
        {{ allowedDays }}
        <input
          id="days[0]"
          type="checkbox"
          value="0"
          name="days[0]"
          v-model="allowedDays"
        />
        <label for="days[0]">Понеделник</label>
      </div>
      <div>
        <input
          id="days[1]"
          type="checkbox"
          value="1"
          v-model="allowedDays"
          name="days[1]"
        />
        <label for="days[1]">Вторник</label>
      </div>
      <div>
        <input
          id="days[2]"
          type="checkbox"
          value="2"
          v-model="allowedDays"
          name="days[2]"
        />
        <label for="days[2]">Сряда</label>
      </div>
      <div>
        <input
          id="days[3]"
          type="checkbox"
          value="3"
          v-model="allowedDays"
          name="days"
        />
        <label for="days[3]">Четвъртък</label>
      </div>
      <div>
        <input
          id="days[4]"
          type="checkbox"
          value="4"
          v-model="allowedDays"
          name="days"
        />
        <label for="days[4]">Петък</label>
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
        :class="{pending: formPending}"
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
      allowedDays: [],
      worktimeForm: {
        days: null,
        hours_from: null,
        hours_to: null,
      },
    }
  },
  validations: {
    worktimeForm: {},
  },
  mounted() {},
  computed: {
    storedName() {
      return this.$store.getters['wizzard/getName']
    },
    storedAddress() {
      return this.$store.getters['wizzard/getAddress']
    },
  },
  methods: {
    onSubmit() {
      this.formPending = true
      this.$v.worktimeForm.$touch()
      if (this.$v.worktimeForm.$invalid) {
        this.formPending = false
      } else {
        // return this.storeVendorInfo()
      }
    },
    storeVendorInfo() {
      this.$store.dispatch('wizzard/commitName', this.worktimeForm.name)
      this.$store.dispatch('wizzard/commitAddress', this.worktimeForm.address)
      this.formPending = false
      $nuxt.$emit('wizzard-finished', 1)

      return $nuxt.$emit('wizzard-switch', 2)
    },

    mapVendorInfo() {
      if (this.storedAddress) {
        this.vendorForm.address.area_id = this.storedAddress.area_id
        this.vendorForm.address.street = this.storedAddress.street
        this.vendorForm.address.additional = this.storedAddress.additional
      }

      if (this.storedName) {
        this.vendorForm.name = this.storedName
      }
    },
  },
}
</script>