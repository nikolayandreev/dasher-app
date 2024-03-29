<template>
  <div>
    <div class="px-4 py-4">
      <div>
        Показване на
        <select
          v-model="perPage"
          @change="fetchClients()"
        >
          <option
            v-for="option in pageOptions"
            :key="option"
            :value="option"
          >
            {{ option }}
          </option>
        </select>
        резултата
      </div>
    </div>
    <table class="w-full text-gray-700 table-fixed">
      <thead>
        <tr>
          <td
            v-for="header in headers"
            :key="header.key"
            :class="{
              [header.class]: header.class,
              'cursor-pointer': header.sortable,
              'text-gray-900': header.sort,
            }"
            class="text-sm font-semibold text-gray-600"
            @click="header.sortable ? changeSort(header) : false"
          >
            <div class="flex flex-row flex-no-wrap items-center">
              <span class="w-full">{{ header.label }}
                <svg-icon
                  v-if="header.sortable"
                  class="inline-block w-4 h-4 ml-2 text-gray-600 align-middle fill-current"
                  :class="{ 'text-gray-900': header.sort }"
                  :name="setIcon(header)"
                />
              </span>
            </div>
          </td>
        </tr>
      </thead>
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
            <select
              v-if="filter.type === 'select'"
              v-model="filter.value"
              @change="fetchClients()"
            >
              <option value="">
                {{ filter.label }}
              </option>
              <option
                v-for="option in filter.options"
                :key="option.value"
                :value="option.value"
              >
                {{ option.name }}
              </option>
            </select>
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

export default {
  components: {
    ClientsGridData,
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
    setIcon(header) {
      if (!header.sort) {
        return 'sort'
      }

      return header.sort === 'desc' ? 'sort-desc' : 'sort-asc'
    },
    changeSort(header) {
      this.headers.forEach((elem) => {
        if (elem.sortable && elem !== header) {
          elem.sort = null
        }
      })

      if (!header.sort) {
        header.sort = 'desc'
      }

      header.sort = header.sort === 'desc' ? 'asc' : 'desc'
      this.setIcon(header)
      this.fetchClients()
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
  thead tr {
    @apply border-b border-gray-300;
    td {
      @apply px-2 py-2;
    }
  }
  tbody tr {
    &.filters {
      td {
        @apply py-2 px-2 bg-gray-100 border-0;
      }
    }
  }
}
</style>