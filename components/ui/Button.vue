<template>
  <!-- If it's a button -->
  <button
    v-if="!href"
    @click="$emit('click')"
    :type="type"
    :style="{'width': width}"
    class="button"
    :class="[buttonClass, buttonSize, {rounded, pill, tile, icon, depressed, pending}]"
  >
    <i
      :class="[iconClass, iconSize]"
      v-if="iconClass"
    ></i>
    <span class="text">
      <slot></slot>
    </span>
  </button>

  <!-- If it's a link -->
  <nuxt-link
    v-else
    @click="$emit('click')"
    tag="button"
    :to="href"
    :title="title"
    type="button"
    :style="{'width': width}"
    class="button"
    :class="[buttonClass, buttonSize, {rounded, pill, tile, icon, depressed, pending}]"
  >
    <i
      :class="[iconClass, iconSize]"
      v-if="iconClass"
    ></i>
    <span class="text">
      <slot></slot>
    </span>
  </nuxt-link>
</template>

<script>
export default {
  props: {
    href: String,
    title: String,
    pending: Boolean,
    type: String,
    buttonClass: {
      type: String,
      default: 'primary',
    },
    buttonSize: {
      type: String,
      default: 'sm',
    },
    width: String,
    // Icons
    icon: Boolean,
    iconClass: String,
    iconSize: String,
    // Types
    pill: Boolean,
    rounded: Boolean,
    depressed: Boolean,
    tile: Boolean,
  },
}
</script>

<style lang="scss" scoped>
button {
  line-height: 1;
  display: inline-block;
  font-family: 'Fira Sans', sans-serif;
  outline: none;
  font-weight: 500;
  color: #333447;
  text-align: center;
  user-select: none;
  background-color: transparent;
  border: 1px solid transparent;
  border-radius: 0.42em;
  line-height: 1.5;
  cursor: pointer;
  transition: all 0.15s ease;
  &:active {
    box-shadow: inset 0px 0px 8px 2px rgba(55, 55, 55, 0.3);
    transform: scale(0.96);
    transition: box-shadow 0.3s linear, box-shadow 0.1s ease-in-out;
    &.depressed {
      &:active {
        transform: none;
        box-shadow: none;
      }
    }
  }
  /* Sizes */
  &.xs {
    padding: 0.25em 0.6em;
    font-size: 0.8em;
    border-radius: 0.25em;
  }
  &.sm {
    padding: 0.65em 1.1em;
    font-size: 0.9em;
    border-radius: 0.42em;
  }
  &.md {
    padding: 0.65em 1.3em;
    font-size: 1.1em;
    border-radius: 0.32em;
  }
  &.lg {
    padding: 0.75em 1.7em;
    font-size: 1.2em;
    border-radius: 0.42em;
  }
  i,
  span {
    vertical-align: middle;
  }
  & > i {
    font-size: 1.5em;
    margin-left: -0.2em;
    margin-right: 0.1em;
    line-height: 1;
  }
  $list: (
    'primary': #3699ff,
    'warning': #ffa800,
    'danger': #f64e60,
    'success': #1bc5bd,
    'secondary': #e4e6ef,
  );

  /* Default */
  @each $name, $color in $list {
    &.#{$name} {
      color: #fff;
      background-color: $color;
      border-color: $color;
      &:hover,
      &.active {
        background-color: darken($color, 8%);
        border-color: darken($color, 8%);
      }
    }
    &.pending.#{$name} {
      &:before {
        border-color: #fff;
      }
    }
  }
  &.secondary {
    color: #333447;
  }
  &.primary:hover,
  &.primary.active {
    background-color: darken(#3699ff, 12%);
    border-color: darken(#3699ff, 12%);
  }

  /* Light */
  @each $name, $color in $list {
    &.light-#{$name} {
      color: $color;
      background-color: lighten($color, 33%);
      border-color: transparent;
      &:hover,
      &.active {
        color: #fff;
        background-color: $color;
        border-color: transparent;
      }
    }
  }
  &.light-warning {
    background-color: lighten(#ffa800, 40%);
  }
  &.light-success {
    background-color: lighten(#1bc5bd, 40%);
  }

  /* Hover-light */
  @each $name, $color in $list {
    &.hover-light-#{$name} {
      color: $color;
      background-color: transparent;
      border-color: transparent;
      &:hover,
      &.active {
        color: $color;
        background-color: lighten($color, 33%);
        border-color: transparent;
      }
    }
  }
  &.hover-light-warning:hover,
  &.hover-light-warning.active {
    background-color: lighten(#ffa800, 40%);
  }
  &.hover-light-success:hover,
  &.hover-light-success.active {
    background-color: lighten(#1bc5bd, 40%);
  }

  /* Outlined */
  @each $name, $color in $list {
    &.outline-#{$name} {
      color: $color;
      background-color: transparent;
      border-color: $color;
      &:hover,
      &.active {
        color: #fff;
        background-color: $color;
        border-color: $color;
      }
    }
  }
  &.outline-secondary {
    color: #333447;
    &:hover,
    &.active {
      color: #333447;
    }
  }

  /* Pending */
  &.pending {
    position: relative;
    pointer-events: none;
    opacity: 0.8;
    &:before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      border-radius: 50%;
      border: 2px solid #d1d3e0;
      border-right: 2px solid transparent !important;
      width: 1.5em;
      height: 1.5em;
      transform: translate(-50%, -50%);
      animation: pendingSpin 0.85s linear infinite;
    }
    span,
    i {
      opacity: 0;
    }
  }
  @each $name, $color in $list {
    &.pending.light-#{$name} {
      &:before {
        border-color: $color;
      }
    }
    &.pending.hover-light-#{$name} {
      &:before {
        border-color: $color;
      }
    }
    &.pending.outline-#{$name} {
      &:before {
        border-color: $color;
      }
    }
  }
  @keyframes pendingSpin {
    0% {
      transform: translate(-50%, -50%) rotate(0deg);
    }
    100% {
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }

  /* Types */
  &.tile {
    border-radius: 0;
  }
  &.rounded {
    border-radius: 50%;
  }
  &.pill {
    border-radius: 2em;
  }
  &.icon {
    line-height: 1;
    i,
    span {
      line-height: 1;
    }
    &.xs {
      padding: 0.3em;
      i {
        font-size: 1.3em;
      }
    }
    &.sm {
      padding: 0.4em;
      i {
        font-size: 1.4em;
      }
    }
    &.md {
      padding: 0.5em;
      i {
        font-size: 1.5em;
      }
    }
    &.lg {
      padding: 0.6em;
      i {
        font-size: 1.6em;
      }
    }
  }
}
</style>