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
  middleware(app) {
    if (!app.$permission('clients.view')) {
      app.redirect('/missing-access')
    }
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
          key: 'reservations_count',
          class: 'text-center',
          sort: null,
          sortable: true,
        },
        {
          label: 'Телефон',
          key: 'phone',
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
        {
          label: 'Действия',
          key: 'actions',
          class: 'w-24 text-right',
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
              value: null,
              text: 'Избери пол',
            },
            {
              value: 1,
              text: 'Мъж',
            },
            {
              value: 2,
              text: 'Жена',
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
        {
          type: 'filler',
          key: 'actions',
        },
      ],
    }
  },
}
</script>