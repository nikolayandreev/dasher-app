<template>
  <div
    class="flex flex-row flex-no-wrap items-center justify-between px-4 py-4"
    v-if="pagination"
  >
    <div>
      {{ resultsCount }}
    </div>
    <ul class="flex flex-row flex-no-wrap items-center">
      <li v-if="pagination.links && pagination.links.previous">
        <button @click="$emit('change-page', pagination.currentPage - 1)">
          <svg-icon
            name="chevron-left"
            class="inline-block w-6 h-6"
          ></svg-icon>
        </button>
      </li>
      <template v-for="(page, index) in pagination.totalPages">
        <span
          :key="index"
          class="mx-1 text-xs text-gray-700 align-middle"
          v-if="(page == pagination.totalPages && Math.abs(page - pagination.currentPage) > 3)"
        >
          ...
        </span>
        <li
          v-if="(Math.abs(page - pagination.currentPage) < 3 || page == pagination.totalPages || page == 1)"
          :key="index"
          class="mx-2 text-lg"
        >
          <button
            @click="$emit('change-page', page)"
            :class="{ 'font-semibold': pagination.currentPage === page }"
          >
            {{ page }}
          </button>
        </li>
        <span
          :key="index"
          class="mx-1 text-xs text-gray-700 align-middle"
          v-if="(page == 1 && Math.abs(page - pagination.currentPage) > 3)"
        >
          ...
        </span>
      </template>
      <li v-if="pagination.links && pagination.links.next">
        <button @click="$emit('change-page', pagination.currentPage + 1)">
          <svg-icon
            name="chevron-right"
            class="inline-block w-6 h-6"
          ></svg-icon>
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    pagination: {
      required: true,
    },
    results: {
      required: false,
    },
  },
  computed: {
    resultsCount() {
      return `Показване на резултати от ${this.results.from} до ${this.results.to} от общо ${this.pagination.total}`
    },
  },
}
</script>