<template>
  <div class="pt-4 overflow-hidden border border-gray-300 rounded-md shadow-xl">
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
      записа
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
              <div v-if="header.sortable">
                <svg-icon
                  class="w-4 h-4 mr-2 text-gray-600 fill-current"
                  :class="{ 'text-gray-900': header.sort }"
                  :name="setIcon(header)"
                />
              </div>
              <span>{{ header.label }}</span>
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
            {{ filter.value }}
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
        <tr
          class="border-b border-gray-300 hover:text-gray-900 hover:bg-gray-200"
          v-for="client in clients"
          :key="client.id"
        >
          <td>
            {{ client.id }}
          </td>
          <td>
            {{ client.first_name }}
          </td>
          <td>
            {{ client.last_name }}
          </td>
          <td>{{ client.phone }}</td>
          <td>{{ client.sex }}</td>
          <td>{{ client.created_at ? client.created_at : 'N/A' }}</td>
          <td>{{ client.updated_at ? client.updated_at : 'N/A' }}</td>
        </tr>
      </tbody>
    </table>
    <ul v-if="pagination">
      <li
        v-for="(page, index) in pagination.totalPages"
        :key="index"
      >
        <button @click="fetchClients(page)">
          {{ page }}
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  layout: 'dashboard',
  middleware(context) {
    if (!context.$permission('employees.view')) {
      context.redirect('/missing-access')
    }
  },
  data() {
    return {
      timer: null,
      page: 1,
      perPage: 15,
      pageOptions: [10, 15, 20, 25, 30, 50, 100],
      clients: null,
      pagination: null,
      headers: [
        {
          label: '#',
          key: 'id',
          class: 'w-32 text-center',
          sort: 'desc',
          sortable: true,
        },
        {
          label: 'Име',
          key: 'first_name',
        },
        {
          label: 'Фамилия',
          key: 'last_name',
        },
        {
          label: 'Телефон',
          key: 'phone',
          sort: null,
          sortable: true,
        },
        {
          label: 'Пол',
          key: 'sex',
          sort: null,
          sortable: true,
        },
        {
          label: 'Създаден на',
          key: 'created_at',
          sort: null,
          sortable: true,
        },
        {
          label: 'Променен на',
          key: 'updated_at',
          sort: null,
          sortable: true,
        },
      ],
      filters: [
        {
          label: 'ID',
          type: 'input',
          key: 'id',
          value: null,
        },
        {
          label: 'Търси по име',
          type: 'input',
          key: 'first_name',
          value: null,
        },
        {
          label: 'Търси по Фамилия',
          type: 'input',
          key: 'last_name',
          value: null,
        },
        {
          label: 'Търси по телефон',
          type: 'input',
          key: 'phone',
          value: null,
        },
        {
          label: 'Търси по пол',
          type: 'select',
          key: 'sex',
          value: '',
          options: [
            {
              value: 1,
              name: 'Мъж',
            },
            {
              value: 2,
              name: 'Жена',
            },
          ],
        },
      ],
    }
  },
  computed: {
    vendorId() {
      return this.$store.getters['getVendorId']
    },
  },
  watch: {
    '$store.state.vendor_id': function () {
      this.fetchClients(this.pagination ? this.pagination.currentPage : 1)
    },
    'pagination.currentPage': function (page) {
      // this.fetchClients(page)
      console.log(page)
    },
  },
  created() {
    //TODO INVEST TIME TO REFACTOR
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
      return this.$axios
        .$get(
          `/api/clients/${this.vendorId}/grid?perPage=${this.perPage}
        ${this.prepareFilters()}${this.prepareSort()}&page=${page}`
        )
        .then((res) => {
          this.clients = res.data
          this.pagination = res.pagination
        })
        .catch((err) => {
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
    &:last-child {
      @apply border-b-0;
    }
    &.filters {
      td {
        @apply py-2 px-2 bg-gray-100 border-0;
      }
    }
    &:not(.filters) {
      td {
        @apply px-3 py-3;
      }
    }
  }
}
</style>