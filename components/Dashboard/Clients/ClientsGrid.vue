<template>
  <div class="relative">

    <div
      class="absolute z-30 flex flex-row flex-wrap items-center justify-center w-full h-full pending"
      v-if="pending"
    >
      <div class="absolute inset-0 z-40 bg-gray-400 opacity-25"></div>
      <div class="flex flex-row flex-no-wrap items-center justify-center px-20 py-4 bg-white border border-blue-100 shadow-lg animate-bounce">
        <svg-icon
          name="loading"
          class="w-5 h-5 mr-2 text-blue-600 align-middle fill-current animate-spin"
        />
        <span class="font-medium text-md font-display">Зареждане...</span>
      </div>
    </div>

    <div class="px-4 py-4">
      <div>
        Показване на
        <select
          v-model="perPage"
          @change="fetchClients()"
        >
          <option
            v-for="(option, i) in pageOptions"
            :key="i"
            :value="option"
          >{{ option }}</option>
        </select>
        резултата
      </div>
    </div>
    <table class="w-full overflow-x-scroll text-gray-700 table-auto sm:table-fixed">
      <DataTableHeaders
        :headers="headers"
        @reload="fetchClients()"
      />
      <tbody>
        <tr
          class="filters"
          v-if="filters"
        >
          <td
            v-for="filter in filters"
            :key="filter.key"
            :colspan="filter.colspan ? filter.colspan : 1"
          >
            <input
              v-if="filter.type === 'input'"
              type="text"
              :placeholder="filter.label"
              v-model="filter.value"
              @keyup="filterQuery()"
            />
            <DhSelect
              id="clients[sex]"
              v-if="filter.type === 'select'"
              :options="filter.options"
              v-model="filter.value"
              @input="fetchClients()"
            />
          </td>
          <td
            v-if="headers.length - filters.length > 0"
            :colspan="headers.length - filters.length"
          ></td>
        </tr>
        <ClientsGridData
          v-for="client in clients"
          :key="client.id"
          :client="client"
          @reload="fetchClients(pagination.currentPage)"
        />
      </tbody>
    </table>
    <DataTablePagination
      :pagination="pagination"
      :results="results"
      @change-page="page = $event"
    />
  </div>
</template>

<script>
import ClientsGridData from '~/components/Dashboard/Clients/ClientsGridData'
import DhSelect from '~/components/ui/Select'

export default {
  components: {
    ClientsGridData,
    DhSelect,
  },
  props: {
    headers: {
      required: true,
      type: Array,
    },
    filters: {
      required: false,
      type: Array,
    },
  },
  data() {
    return {
      pending: false,
      clients: null,
      timer: null,
      page: 1,
      perPage: 15,
      pageOptions: [10, 15, 20, 25, 30, 50, 100],
      pagination: null,
      results: null,
    }
  },
  computed: {
    vendorId() {
      return this.$store.getters['getVendorId']
    },
  },
  watch: {
    page(newValue, oldValue) {
      return this.fetchClients(newValue)
    },
    '$store.state.vendor_id': function () {
      this.fetchClients(this.pagination ? this.pagination.currentPage : 1)
    },
  },
  created() {
    if (!this.clients && this.vendorId) {
      this.fetchClients()
    }
  },
  methods: {
    filterQuery(event) {
      clearTimeout(this.timer)

      this.timer = setTimeout(() => {
        return this.fetchClients()
      }, 500)
    },
    prepareFilters() {
      let output = ''
      this.filters.forEach((filter) => {
        output += '&'
        output += `filters[${filter.key}]=${filter.value ? filter.value : ''}`
      })
      return output
    },
    prepareSort() {
      let output = ''
      this.headers.forEach((header) => {
        if (header.sortable && header.sort) {
          output += '&'
          output += `sort[by]=${header.key}`
          output += '&'
          output += `sort[dir]=${header.sort}`
        }
      })
      return output
    },
    fetchClients(page = 1) {
      this.page = page
      this.pending = true
      return this.$axios
        .$get(
          `/api/clients/${this.vendorId}/grid?perPage=${this.perPage}
        ${this.prepareFilters()}${this.prepareSort()}&page=${page}`
        )
        .then((res) => {
          this.clients = res.data
          this.pagination = res.pagination
          this.results = res.results
          this.pending = false
        })
        .catch((err) => {
          this.pending = false
          console.error(err)
        })
    },
  },
}
</script>

<style lang="scss" scoped>
table {
  tbody tr {
    &.filters {
      td {
        @apply py-2 px-2 bg-gray-100 border-0;
      }
    }
  }
}
</style>