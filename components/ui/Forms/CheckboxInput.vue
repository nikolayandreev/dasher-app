<template>
  <label
    class="checkbox-wrap"
    :class="{'has-error': error, inline}"
  >
    <slot></slot>
    <input
      type="checkbox"
      @change="$emit('change', $event.target.checked)"
      :class="checkboxClass"
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
    checkboxClass: {
      type: String,
      default: 'primary',
    },
    value: String,
    modelValue: {
      default: false,
    },
    error: Boolean,
    inline: Boolean,
    trueValue: {
      default: true,
    },
    falseValue: {
      default: false,
    },
  },
  computed: {
    shouldBeChecked() {
      if (this.modelValue instanceof Array) {
        return this.modelValue.includes(this.value)
      }

      return this.modelValue === this.trueValue
    },
  },
  methods: {
    updateInput(event) {
      let isChecked = event.target.checked

      if (this.modelValue instanceof Array) {
        let newValue = [...this.modelValue]
        if (isChecked) {
          newValue.push(this.value)
        } else {
          newValue.splice(newValue.indexOf(this.value), 1)
        }
        this.$emit('change', newValue)
      } else {
        this.$emit('change', isChecked ? this.trueValue : this.falseValue)
      }
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
.checkbox-wrap {
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
    height: 0;
    width: 0;
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
    border-radius: 0.35em;
    transition: all 0.3s;
    &:after {
      content: '';
      opacity: 0;
      position: absolute;
      left: 50%;
      top: 0.7em;
      width: 0.3em;
      height: 0.7em;
      border: solid #fff;
      border-width: 0 2px 2px 0;
      -webkit-transform: translateX(-50%) rotate(45deg);
      -ms-transform: translateX(-50%) rotate(45deg);
      transform: translateX(-50%) rotate(45deg);
      transition: top 0.2s;
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
        top: 0.2em;
        opacity: 1;
        transition: top 0.2s;
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