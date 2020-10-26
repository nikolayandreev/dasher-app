<template>
  <div class="flex flex-row flex-no-wrap items-center justify-around py-4 transition duration-200 border-b border-gray-300">
    <div
      class="flex flex-row items-center w-56 cursor-pointer"
      @click="$emit('input', !valueActive)"
    >
      <svg-icon
        :name="valueActive ? 'check-circle' : 'do-not-disturb'"
        class="w-5 h-5 fill-current"
        :class="{'text-green-600': valueActive,
        'text-red-600': !valueActive}"
      />
      <input
        :id="id"
        type="checkbox"
        :value="valueActive"
        :checked="valueActive"
        @change="$emit('input', !valueActive)"
        class="hidden"
      />
      <label
        :for="id"
        class="ml-2 text-xl cursor-pointer select-none font-display"
      >
        {{ day }}
      </label>
    </div>

    <div>
      <span class="mr-2 text-sm text-gray-700">От</span>
      <date-picker
        style="width: 85px"
        prefix-class="xmx"
        :value="valueFrom"
        type="time"
        :show-second="false"
        @input="$emit('input-from', $event)"
        format="HH:mm"
        value-type="format"
        placeholder="hh:mm"
        :clearable="false"
        :time-picker-options="timePickerOptions"
      >
        <template #icon-calendar>
          <svg-icon name="clock-outline" />
        </template>
      </date-picker>

      <span class="ml-4 mr-2 text-sm text-gray-700">До:</span>
      <date-picker
        style="width: 85px"
        prefix-class="xmx"
        :value="valueTo"
        @input="$emit('input-to', $event)"
        type="time"
        :show-second="false"
        format="HH:mm"
        value-type="format"
        placeholder="hh:mm"
        :clearable="false"
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