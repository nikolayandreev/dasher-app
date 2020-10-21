<template>
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
        class="text-sm font-medium text-gray-600 font-display"
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
</template>
<script>
export default {
  props: {
    headers: {
      type: Array,
      required: true,
    },
  },
  methods: {
    setIcon(header) {
      if (!header.sort) {
        return 'swap-vertical'
      }

      return header.sort === 'desc' ? 'arrow-up' : 'arrow-down'
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
      this.$emit('reload')
    },
  },
}
</script>

<style lang="scss" scoped>
thead tr {
  @apply border-b border-gray-300;
  td {
    @apply px-3 py-2;
  }
}
</style>
