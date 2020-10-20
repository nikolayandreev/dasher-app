<template>
  <div>
    <form @submit.prevent="onSubmit">
      <div class="form-group">
        <label for="category_id">Категория</label>
        <select
          v-if="serviceCategories"
          v-model="serviceForm.category"
        >
          <option
            v-for="category in serviceCategories"
            :key="category.id"
            :value="category.id"
          >{{ category.name }}</option>
        </select>
        <span
          class="block text-sm text-red-500 error"
          v-if="errors && errors.category"
        >{{ errors.category[0] }}</span>
      </div>
      <div class="form-group">
        <label for="name">Име на услугата</label>
        <input
          class="w-full"
          id="name"
          type="text"
          v-model="serviceForm.name"
        />
        <span
          class="block text-sm text-red-500 error"
          v-if="errors && errors.name"
        >{{ errors.name[0] }}</span>
      </div>
      <div class="form-group">
        <label for="price">Цена на услугата</label>
        <input
          class="w-full"
          id="price"
          type="text"
          v-model="serviceForm.price"
          placeholder="Пример: (25, 12.50, 5.90)"
        />
        <span
          class="block text-sm text-red-500 error"
          v-if="errors && errors.price"
        >{{ errors.price[0] }}</span>
      </div>
      <div class="form-group">
        <label for="duration">Време за изпълнение (в минути)</label>
        <input
          class="w-full"
          id="duration"
          type="number"
          v-model="serviceForm.duration"
        />
        <p class="hint">Минимална продължителност на услугата</p>
        <span
          class="block text-sm text-red-500 error"
          v-if="errors && errors.duration"
        >{{ errors.duration[0] }}</span>
      </div>
      <div class="mt-4 form-group">
        <input
          id="is_active"
          type="checkbox"
          v-model="serviceForm.is_active"
        />
        <label for="is_active">Активна</label>
      </div>
      <button type="submit">Добави услуга</button>
    </form>

    {{ hasPermission ? 'Yes you can' : 'No you cannot!' }}
  </div>
</template>

<script>
export default {
  layout: 'dashboard',
  middleware(context) {
    if (!context.$permission('services.create')) {
      context.redirect('/missing-access')
    }
  },
  data() {
    return {
      formPending: false,
      errors: null,
      hasPermission: false,
      serviceCategories: null,
      serviceForm: {
        category: null,
        name: null,
        price: null,
        duration: null,
        is_active: false,
      },
    }
  },
  computed: {
    selectedVendor() {
      return this.$store.getters['getVendorId']
    },
  },
  methods: {
    fetchServiceCategories() {
      this.$axios
        .$get('/api/service-categories')
        .then((res) => {
          this.serviceCategories = res.data
        })
        .catch((err) => {
          this.serviceCategories = null
        })
    },
    onSubmit() {
      this.formPending = true
      this.errors = null

      this.$axios
        .$post('/api/services', {
          vendor_id: this.selectedVendor,
          category_id: this.serviceForm.category,
          name: this.serviceForm.name,
          price: this.serviceForm.price,
          duration: this.serviceForm.duration,
          is_active: this.serviceForm.is_active,
        })
        .then((res) => {
          this.formPending = false
          this.hasPermission = res
        })
        .catch((err) => {
          this.errors = err.response.data
          this.formPending = false
          this.hasPermission = false
        })
    },
  },
  mounted() {
    this.fetchServiceCategories()
  },
}
</script>