<template>
  <div class="mt-8">
    <div>
      <div class="mt-4 input-group">
        <label for="vendor[name]">Име на обекта</label>
        <input
          id="vendor[name]"
          class="w-full"
          type="text"
          placeholder="Въведи име на обекта"
          v-model="$v.vendorForm.name.$model"
        />
        <span
          class="error"
          v-if="$v.vendorForm.name.$dirty && $v.vendorForm.name.$invalid"
        >
          Грешка при попълването!
        </span>
      </div>
      <h3 class="mt-4 text-2xl">Адрес на обекта</h3>
      <hr class="my-4 border-gray-300" />
      <div class="flex flex-row flex-wrap justify-between -mx-2">
        <div class="w-4/12 px-2 input-group">
          <label for="vendor[address][city]">Град</label>
          <select
            v-model="$v.vendorForm.address.area_id.$model"
            class="w-full"
          >
            <option value="">Избери град</option>
            <option
              v-for="area in areas"
              :key="area.id"
              :value="area.id"
            >{{ area.name }}</option>
          </select>
          <span
            class="error"
            v-if="$v.vendorForm.address.area_id.$dirty && $v.vendorForm.address.area_id.$invalid"
          >
            Грешка при попълването!
          </span>
        </div>
        <div class="w-4/12 px-2 input-group">
          <label for="vendor[address][street]">Улица</label>
          <input
            type="text"
            v-model="$v.vendorForm.address.street.$model"
            placeholder="Въведи улица"
            class="w-full"
          />
          <span
            class="error"
            v-if="$v.vendorForm.address.street.$dirty && $v.vendorForm.address.street.$invalid"
          >
            Грешка при попълването!
          </span>
        </div>
        <div class="w-4/12 px-2 input-group">
          <label for="vendor[address][additional]">Допълнително</label>
          <input
            type="text"
            v-model="$v.vendorForm.address.additional.$model"
            placeholder="Допълнително към адреса"
            class="w-full"
          />
          <span
            class="error"
            v-if="$v.vendorForm.address.additional.$dirty && $v.vendorForm.address.additional.$invalid"
          >
            Грешка при попълването!
          </span>
        </div>
      </div>
    </div>

    <div class="flex flex-row flex-no-wrap items-center justify-end pt-4 mt-4">
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
      areas: null,
      formPending: false,
      errors: null,
      vendorForm: {
        name: null,
        address: {
          area_id: null,
          street: null,
          additional: null,
        },
      },
    }
  },
  validations: {
    vendorForm: {
      name: { required },
      address: {
        area_id: { required },
        street: { required },
        additional: { required },
      },
    },
  },
  mounted() {
    this.fetchAreas()
    this.mapVendorInfo()
  },
  computed: {
    storedName() {
      return this.$store.getters['wizzard/getName']
    },
    storedAddress() {
      return this.$store.getters['wizzard/getAddress']
    },
  },
  methods: {
    fetchAreas() {
      return this.$axios
        .$get('/api/areas')
        .then((res) => {
          this.areas = res.data
        })
        .catch((err) => {
          this.areas = null
          console.error(err)
        })
    },
    onSubmit() {
      this.formPending = true
      this.$v.vendorForm.$touch()
      if (this.$v.vendorForm.$invalid) {
        this.formPending = false
      } else {
        this.$store.dispatch('wizzard/commitStep', {
          step: 1,
          status: 'finished',
        })

        return $nuxt.$emit('wizzard-switch', 2)
      }
    },
    storeVendorInfo() {
      this.$store.dispatch('wizzard/commitName', this.vendorForm.name)
      this.$store.dispatch('wizzard/commitAddress', this.vendorForm.address)
      this.formPending = false
    },

    mapVendorInfo() {
      if (this.storedAddress) {
        this.vendorForm.address = JSON.parse(JSON.stringify(this.storedAddress))
      }

      if (this.storedName) {
        this.vendorForm.name = this.storedName
      }
    },
  },
  beforeDestroy() {
    this.storeVendorInfo()
  },
}
</script>