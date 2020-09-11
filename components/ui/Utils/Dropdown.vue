<template>
  <div
    class="dropdown"
    :class="{ dropup: top }"
    @click="toggleMenu"
  >
    <slot></slot>
    <transition :name="transition">
      <div
        v-show="value"
        class="dropdown-menu"
        :class="direction"
        @click.stop
        ref="dropdown"
      >
        <slot name="dropdown"></slot>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    value: Boolean,
    direction: {
      type: String,
      default: 'left',
    },
    transition: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      hovering: false,
      top: false,
    }
  },
  destroyed() {
    document.body.removeEventListener('click', this.closeMenu)
  },
  methods: {
    closeMenu($event) {
      if (!$event || !this.$el.contains($event.target)) {
        if (this.value) {
          this.$emit('input', false)
        }
      }
    },
    toggleMenu() {
      this.$emit('input', !this.value)
    },
  },
  mounted() {
    document.body.addEventListener('click', this.closeMenu)
  },
  watch: {
    value(v) {
      if (v) {
        let vm = this
        this.top = false
        this.$nextTick(() => {
          let rect = vm.$refs.dropdown.getBoundingClientRect()
          let window_height =
            window.innerHeight || document.documentElement.clientHeight
          this.top = rect.bottom > window_height && rect.top >= rect.height
        })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.dropdown {
  display: inline-block;
  position: relative;
  font-size: 16px;
  .dropdown-menu {
    min-width: 200px;
    position: absolute;
    background-color: #fff;
    z-index: 900;
    display: flex;
    flex-flow: row wrap;
    border: 0 solid rgba(0, 0, 0, 0.15);
    border-radius: 0.42rem;
    box-shadow: 0 0 50px 0 rgba(82, 63, 105, 0.15);
    &.right {
      left: auto;
      right: 0;
    }
    &.left {
      left: 0;
      right: auto;
    }
    &.top {
      bottom: 100%;
    }
  }
}
</style>