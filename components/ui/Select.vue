<template>
  <div class="relative">
    <select
      class="w-full py-2 pl-2 pr-10 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md appearance-none cursor-default focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
      :value="value"
      @input="$emit('input', $event.target.value)"
      :id="id"
      :multiple="multiple"
      :disabled="disabled"
    >
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.text }}
      </option>
    </select>
    <svg-icon
      name="select-arrows"
      class="absolute w-4 h-4 text-gray-600 pointer-events-none fill-current select-icon"
    />
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      required: true,
    },
    label: {
      type: String,
      required: false,
    },
    id: String,
    value: {
      required: true,
    },
    multiple: Boolean,
    disabled: Boolean,
  },
}
</script>

<style lang="scss" scoped>
.select-icon {
  top: 50%;
  right: 0.5rem;
  transform: translateY(-50%);
}
</style>