<template>
  <label
    class="radio-wrap"
    :class="{'has-error': error, inline}"
  >
    <slot></slot>
    <input
      type="radio"
      :value="value"
      :class="radioClass"
      @change="$emit('change', $event.target.value)"
      :checked="shouldBeChecked"
    >
    <span class="checkmark"></span>
  </label>
</template>

<script>
export default {
  model: {
    prop: 'modelValue',
    event: 'change',
  },
  props: {
    radioClass: {
      type: String,
      default: 'primary',
    },
    value: String,
    modelValue: {
      default: '',
    },
    error: Boolean,
    inline: Boolean,
  },
  computed: {
    shouldBeChecked() {
      return this.modelValue === this.value
    },
  },
}
</script>

<style lang="scss" scoped>
$list: (
  'primary': #3699ff,
  'warning': #ffa800,
  'danger': #f64e60,
  'success': #1bc5bd,
);
.radio-wrap {
  position: relative;
  display: inline-flex;
  width: 100%;
  flex-flow: row wrap;
  align-items: center;
  font-size: 1em;
  color: #333447;
  margin: 0.5em 0;
  padding-left: 2em;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
  }
  .checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 1.5em;
    width: 1.5em;
    background-color: #e4e6ef;
    border: 1px solid;
    border-color: darken(#e4e6ef, 15);
    border-radius: 2em;
    transition: all 0.3s;
    &:after {
      content: '';
      opacity: 0;
      position: absolute;
      left: 50%;
      top: 0.4em;
      width: 0em;
      height: 0em;
      border-radius: 2em;
      background: #fff;
      -webkit-transform: translateX(-50%);
      -ms-transform: translateX(-50%);
      transform: translateX(-50%);
    }
  }
  &:hover {
    input ~ .checkmark {
      background-color: darken(#e4e6ef, 15);
    }
  }
  input {
    &:checked ~ .checkmark {
      &:after {
        opacity: 1;
        width: 0.6em;
        height: 0.6em;
        transition-property: width, height;
        transition-duration: 0.2s;
        transition-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);
      }
    }
    @each $name, $color in $list {
      &.#{$name}:checked ~ .checkmark {
        background-color: $color;
        border-color: $color;
      }
    }
  }
  &.inline {
    display: inline-flex;
    margin-right: 1em;
    width: auto;
  }
  &.has-error {
    color: #f64e60;
  }
}
</style>