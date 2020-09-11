<template>
  <div
    class="select-group"
    :class="{'has-error': hasError, 'is-valid': isValid}"
  >
    <label :for="id">{{ label }}</label>
    <div class="select-wrap">
      <select
        :value="value"
        @input="$emit('input', $event.target.value)"
        :id="id"
        :class="{filled, outlined}"
        :multiple="multiple"
        :disabled="disabled"
      >
        <option
          class="default"
          v-if="withDefault"
          :value="null"
        >{{ withDefault }}</option>
        <option
          v-for="(option, index) in options"
          :key="index"
          :value="option.value"
        >
          {{ option.text }}
        </option>
      </select>
      <transition name="fade-up">
        <div
          class="error"
          v-if="hasError"
        >{{ errorMessage }}</div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      open: false,
    }
  },
  props: {
    options: {
      type: Array,
      required: true,
    },
    withDefault: String,
    label: {
      type: String,
      required: true,
    },
    value: String,
    id: String,
    filled: Boolean,
    outlined: Boolean,
    hint: String,
    hasError: Boolean,
    errorMessage: String,
    isValid: Boolean,
    multiple: Boolean,
    disabled: Boolean,
  },
}
</script>

<style lang="scss" scoped>
.select-group {
  .select-wrap {
    &:after {
      display: none;
    }
    &:before {
      content: '\ea4e';
      font-family: 'remixicon';
      position: absolute;
      color: lighten(#333447, 50);
      font-size: 1.5em;
      right: 1em;
      top: 50%;
      transform: translateY(-50%);
      transition: all 0.3s;
    }
    &.opened {
      &:before {
        content: '\ea78';
        color: #3699ff;
      }
    }
    select {
      display: block;
      width: 100%;
      outline: none;
      border: none;
      padding: 0.5em 0.8em;
      color: lighten(#333447, 20);
      font-size: 1em;
      border-bottom: 2px solid;
      border-color: lighten(#3699ff, 25);
      background: #fff;
      border-radius: 0.5em 0.5em 0 0;
      transition: all 0.3s;
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      &:focus {
        border-color: #3699ff;
        color: #333447;
      }
      &:disabled {
        cursor: no-drop;
        opacity: 0.4;
      }
      &.filled {
        background: #f5f5f5;
        &:focus {
          background: #f0f0f0;
        }
      }
      &.outlined {
        border-radius: 0.5em;
        border: 1px solid;
        border-color: lighten(#343a40, 50);
        &:focus {
          border-color: #3699ff;
        }
      }
      option.default {
        color: lighten(#333447, 40);
      }
    }
  }
  /* Input Group validation */
  &.has-error {
    .select-wrap {
      &:before {
        color: darken(#f64e60, 20);
      }
      select {
        border-color: lighten(#f64e60, 20);
        &:focus {
          border-color: #f64e60;
        }
      }
    }
  }
  &.is-valid {
    .select-wrap {
      &:before {
        color: #1bc5bd;
      }
      select {
        border-color: lighten(#1bc5bd, 20);
        &:focus {
          border-color: #1bc5bd;
        }
      }
    }
  }
}
</style>