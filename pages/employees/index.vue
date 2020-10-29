<template>
  <div>
    <div class="space-y-1">
      <label
        id="listbox-label"
        class="block text-sm font-medium leading-5 text-gray-700"
      >
        Assigned to
      </label>
      <div class="relative">
        <span class="inline-block w-full rounded-md shadow-sm">
          <button
            type="button"
            aria-haspopup="listbox"
            aria-expanded="true"
            aria-labelledby="listbox-label"
            class="relative w-full py-2 pl-3 pr-10 text-left transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md cursor-default focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
          >
            <div class="flex items-center space-x-3">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
                class="flex-shrink-0 w-6 h-6 rounded-full"
              />
              <span class="block truncate"> Tom Cook </span>
            </div>
            <span
              class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"
            >
              <svg-icon
                name="select-arrows"
                class="w-5 h-5 text-gray-400"
              ></svg-icon>
            </span>
          </button>
        </span>

        <!--
      Select popover, show/hide based on select state.

      Entering: ""
        From: ""
        To: ""
      Leaving: "transition ease-in duration-100"
        From: "opacity-100"
        To: "opacity-0"
    -->
        <div class="absolute w-full mt-1 bg-white rounded-md shadow-lg">
          <ul
            tabindex="-1"
            role="listbox"
            aria-labelledby="listbox-label"
            aria-activedescendant="listbox-item-3"
            class="py-1 overflow-auto text-base leading-6 rounded-md shadow-xs max-h-56 focus:outline-none sm:text-sm sm:leading-5"
          >
            <!--
          Select option, manage highlight styles based on mouseenter/mouseleave and keyboard navigation.

          Highlighted: "text-white bg-indigo-600", Not Highlighted: "text-gray-900"
        -->
            <li
              id="listbox-item-0"
              role="option"
              class="relative py-2 pl-3 text-gray-900 cursor-default select-none pr-9"
            >
              <div class="flex items-center space-x-3">
                <img
                  src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80"
                  alt=""
                  class="flex-shrink-0 w-6 h-6 rounded-full"
                />
                <!-- Selected: "font-semibold", Not Selected: "font-normal" -->
                <span class="block font-normal truncate"> Wade Cooper </span>
              </div>

              <!--
            Checkmark, only display for selected option.

            Highlighted: "text-white", Not Highlighted: "text-indigo-600"
          -->
              <span class="absolute inset-y-0 right-0 flex items-center pr-4">
                <!-- Heroicon name: check -->
                <svg
                  class="w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
            </li>

            <!-- More options... -->
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'dashboard',
  middleware(app) {
    if (!app.$permission('employees.view')) {
      app.redirect('/missing-access')
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