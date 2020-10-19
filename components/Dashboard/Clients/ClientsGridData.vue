<template >
  <tr class="border-b border-gray-300 hover:text-gray-900 hover:bg-gray-200">
    <td class="text-center">
      {{ client.id }}
    </td>
    <td>
      {{ client.first_name }}
    </td>
    <td>
      {{ client.last_name }}
    </td>
    <td>
      {{ client.total_visits }}
    </td>
    <td>{{ client.phone }}</td>
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
    <td>{{ client.created_at ? client.created_at : 'N/A' }}</td>
    <td>{{ client.updated_at ? client.updated_at : 'N/A' }}</td>
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
}
</script>

<style lang="scss" scoped>
tr td {
  @apply px-3 py-3;
}
</style>