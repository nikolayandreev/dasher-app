<template >
  <tr class="border-b border-gray-300 group hover:text-gray-900 hover:bg-gray-200">
    <td class="text-center">
      {{ client.id }}
    </td>
    <td>
      {{ client.first_name }}
    </td>
    <td>
      {{ client.last_name }}
    </td>
    <td class="text-sm font-medium text-center">
      <span
        class="inline-block w-8 h-8 py-1 border border-gray-300 rounded-full"
        :class="{'text-red-700': client.total_visits === 0}"
      >{{ client.total_visits }}</span>
    </td>
    <td class="text-sm text-gray-600 group-hover:text-gray-900">{{ client.phone }}</td>
    <td>
      <div class="inline-flex flex-row flex-no-wrap items-center px-3 py-1 border border-gray-300 rounded-full">
        <svg-icon
          :class="client.sex === 1 ? 'text-blue-500' : 'text-pink-500'"
          :name="client.sex === 1 ? 'gender-male' : 'gender-female'"
          class="inline-block w-4 h-4 fill-current"
        />
        <span class="ml-1 text-xs font-medium uppercase">{{ client.sex === 1 ? 'Мъж' : 'Жена' }}</span>
      </div>
    </td>
    <td class="text-sm text-gray-600 group-hover:text-gray-900">{{ client.created_at ? client.created_at : 'N/A' }}</td>
    <td class="text-sm text-gray-600 group-hover:text-gray-900">{{ client.updated_at ? client.updated_at : 'N/A' }}</td>
    <td>
      <div class="flex flex-row flex-no-wrap items-center justify-end">
        <nuxt-link
          class="px-1 py-1 transition-colors duration-200 rounded-full hover:bg-gray-400"
          :to="`/clients/edit/${client.id}`"
          title="Редактиране на клиент"
        >
          <svg-icon
            name="pencil"
            class="w-5 h-5 text-gray-700 fill-current"
          ></svg-icon>
        </nuxt-link>
        <button
          @click.prevent="onDelete(client.id)"
          class="inline-block px-1 py-1 transition-colors duration-200 rounded-full focus:outline-none hover:bg-red-200"
        >
          <svg-icon
            class="w-5 h-5 text-red-700 fill-current"
            name="delete"
          ></svg-icon>
        </button>
      </div>
    </td>
  </tr>
</template>

<script>
export default {
  props: {
    pending: {
      required: false,
      type: Boolean,
    },
    client: {
      required: true,
      type: Object,
    },
  },
  methods: {
    onDelete(clientId) {
      this.$axios
        .$delete(`/api/clients/${clientId}`)
        .then((res) => {
          this.$emit('reload')
        })
        .catch((err) => {
          console.log(err)
        })
    },
  },
}
</script>

<style lang="scss" scoped>
tr td {
  @apply px-2 py-3;
}
</style>