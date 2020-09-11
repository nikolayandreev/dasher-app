<template>
  <div
    class="input-group"
    :class="{'has-error': hasError, 'is-valid': isValid}"
  >
    <label :for="id">{{ label }}</label>
    <div class="input-wrap">
      <input
        :value="value"
        @input="$emit('input', $event.target.value)"
        :id="id"
        type="text"
        @focus="showHint = true"
        @blur="showHint = false"
        :class="{filled, outlined}"
        :placeholder="placeholder"
        :requried="required"
        :disabled="disabled"
      />
      <transition name="fade-up">
        <div
          class="hint"
          v-if="hint && showHint && !hasError"
        >{{ hint }}</div>
      </transition>
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
      showHint: false,
    }
  },
  props: {
    label: {
      type: String,
      required: true,
    },
    placeholder: String,
    value: String,
    id: String,
    filled: Boolean,
    outlined: Boolean,
    required: Boolean,
    disabled: Boolean,
    hint: String,
    hasError: Boolean,
    errorMessage: String,
    isValid: Boolean,
  },
}
</script>

<style lang="scss" scoped>
.input-group {
  .input-wrap {
    input {
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
      &:focus {
        border-color: #3699ff;
        color: #333447;
        & + .hint {
          display: block;
        }
      }
      &::placeholder {
        color: lighten(#333447, 25);
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
    }
  }
  /* Input Group validation */
  &.has-error {
    .input-wrap {
      &:after {
        content: '\eca0';
        color: darken(#f64e60, 20);
      }
      input {
        border-color: lighten(#f64e60, 20);
        &:focus {
          border-color: #f64e60;
        }
      }
    }
  }
  &.is-valid {
    .input-wrap {
      &:after {
        content: '\eb80';
        color: #1bc5bd;
      }
      input {
        border-color: lighten(#1bc5bd, 20);
        &:focus {
          border-color: #1bc5bd;
        }
      }
    }
  }
}
</style>