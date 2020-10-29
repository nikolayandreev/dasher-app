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
        <span
          class="block text-sm text-red-500 error"
          v-if="errors && errors.name"
        >{{ errors.name[0] }}</span>
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
          <span
            class="block text-sm text-red-500 error"
            v-if="errors && errors.area_id"
          >{{ errors.area_id[0] }}</span>
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
          <span
            class="block text-sm text-red-500 error"
            v-if="errors && errors.street"
          >{{ errors.street[0] }}</span>
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
          <span
            class="block text-sm text-red-500 error"
            v-if="errors && errors.additional"
          >{{ errors.additional[0] }}</span>
        </div>
      </div>
    </div>

    <div class="flex flex-row flex-no-wrap items-center justify-end pt-4 mt-4">
      <button
        :disabled="formPending"
        :class="{pending: formPending}"
        @click="onSubmit"
        class="px-16 py-3 ml-10 font-medium tracking-wide transition duration-200 rounded-md text-brand-500 bg-brand-100 font-display hover:bg-brand-500 hover:text-white focus:shadow-outline-brand-600 focus:outline-none"
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
  created() {
    this.fetchVendorInfo()
  },
  computed: {
    vendorId() {
      const id = this.$store.getters['wizzard/getVendorId']
      return id ? id : parseInt(localStorage.getItem('wizzard_vendor_id'))
    },
    areas() {
      return this.$store.getters['wizzard/getAreas']
    },
  },
  activated() {
    this.$v.vendorForm.$reset()
  },
  deactivated() {
    if (this.$v.vendorForm.$anyDirty) {
      this.storeVendorInfo()
    }
  },
  methods: {
    onSubmit() {
      this.formPending = true
      this.$v.vendorForm.$touch()
      if (this.$v.vendorForm.$invalid) {
        this.formPending = false
      } else {
        this.storeVendorInfo()
        return $nuxt.$emit('wizzard-switch', 3)
      }
    },
    storeVendorInfo() {
      this.$axios
        .$post('/api/vendor', {
          name: this.vendorForm.name,
          area_id: this.vendorForm.address.area_id,
          street: this.vendorForm.address.street,
          additional: this.vendorForm.address.additional,
        })
        .then((res) => {
          this.formPending = false

          localStorage.setItem('wizzard_vendor_id', res.data.vendor_id)
          this.$store.dispatch('wizzard/commitVendorId', res.data.vendor_id)
          this.$store.dispatch('wizzard/commitAddressId', res.data.address_id)

          this.$store.dispatch('wizzard/commitStep', {
            step: 2,
            status: 'finished',
          })
        })
        .catch((err) => {
          this.formPending = false
          if (err.response && err.response.status === 422) {
            this.errors = err.response.data
          }
        })
    },

    fetchVendorInfo() {
      if (this.vendorId) {
        this.$axios
          .$get(`/api/vendor/${this.vendorId}?with=address`)
          .then((res) => {
            if (res.data) {
              this.vendorForm.name = res.data.name
              this.vendorForm.address = {
                area_id: res.data.address.area_id,
                street: res.data.address.street,
                additional: res.data.address.additional,
              }
            }
          })
          .catch((err) => console.error(err))
      }
    },
  },
  beforeDestroy() {
    this.storeVendorInfo()
  },
}
</script>