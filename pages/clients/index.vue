<template>
  <div class="overflow-hidden border border-gray-300 rounded-md shadow-xl">
    <div>
      <ClientsGrid
        :headers="headers"
        :filters="filters"
      />
    </div>
  </div>
</template>

<script>
import ClientsGrid from '~/components/Dashboard/Clients/ClientsGrid'

export default {
  layout: 'dashboard',
  components: {
    ClientsGrid,
  },
  data() {
    return {
      headers: [
        {
          label: '#',
          key: 'id',
          class: 'w-24 text-center',
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
          label: 'Посещения',
          key: 'total_visits',
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
          type: 'filler',
          key: 'total_visits',
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
        {
          type: 'filler',
          key: 'created_at',
        },
        {
          type: 'filler',
          key: 'updated_at',
        },
      ],
    }
  },
}
</script>