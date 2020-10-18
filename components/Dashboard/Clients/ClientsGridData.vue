<template >
  <tr class="border-b border-gray-300 hover:text-gray-900 hover:bg-gray-200">
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