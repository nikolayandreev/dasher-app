<template>
  <div
    class="flex flex-row flex-no-wrap items-center px-4 py-2 transition duration-200 border-b border-gray-300"
    :class="{'bg-red-100': !valueActive,
    'bg-green-100': valueActive && valueFrom && valueTo,
    'bg-orange-100': valueActive && (!valueFrom || !valueTo)}"
  >
    <div class="w-40">
      <input
        :id="id"
        type="checkbox"
        :value="valueActive"
        :checked="valueActive"
        @change="$emit('input', !valueActive)"
      />
      <label
        :for="id"
        class="mr-4 font-medium cursor-pointer select-none"
        :class="{'text-red-500': !valueActive,
    'text-green-500': valueActive && valueFrom && valueTo,
    'text-orange-500': valueActive && (!valueFrom || !valueTo)}"
      >{{ day }}</label>
    </div>

    <div>
      <span class="mr-2 text-sm text-gray-700">От</span>
      <date-picker
        style="width:85px;"
        prefix-class="xmx"
        :value="valueFrom"
        type="time"
        :show-second="false"
        @input="$emit('input-from', $event)"
        format="HH:mm"
        value-type="format"
        placeholder="hh:mm"
        :time-picker-options="timePickerOptions"
      >
        <template #icon-calendar>
          <svg-icon name="clock-outline" />
        </template>
      </date-picker>

      <span class="ml-4 mr-2 text-sm text-gray-700">До:</span>
      <date-picker
        style="width:85px;"
        prefix-class="xmx"
        :value="valueTo"
        @input="$emit('input-to', $event)"
        type="time"
        :show-second="false"
        format="HH:mm"
        value-type="format"
        placeholder="hh:mm"
        :time-picker-options="timePickerOptions"
      >
        <template #icon-calendar>
          <svg-icon name="clock-outline" />
        </template>
      </date-picker>
    </div>
  </div>
</template>

<script>
import DatePicker from 'vue2-datepicker'

export default {
  props: {
    day: String,
    id: String,
    valueFrom: String,
    valueTo: String,
    valueActive: Boolean,
  },
  data() {
    return {
      timePickerOptions: {
        start: '06:00',
        step: '00:15',
        end: '22:30',
      },
    }
  },
  components: { DatePicker },
}
</script>

<style src="~/assets/scss/datepicker.scss" lang="scss"></style>