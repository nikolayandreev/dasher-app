<template>
  <div
    class="card"
    :class="[cardClass, {loading}]"
  >
    <header>
      <div class="content">
        <h4 v-if="title">{{ title }}</h4>
        <small v-if="subTitle">{{ subTitle }}</small>
      </div>
      <slot
        name="options"
        class="options"
        v-if="$slots.options"
      >
      </slot>
    </header>
    <main>
      <slot
        name="content"
        class="content"
      ></slot>
    </main>
    <footer v-if="$slots.actions">
      <slot
        name="actions"
        class="actions"
      ></slot>
    </footer>
  </div>
</template>

<script>
export default {
  props: {
    cardClass: {
      type: String,
      default: 'primary',
    },
    title: String,
    subTitle: String,
    iconClass: String,
    iconSize: String,
    loading: Boolean,
  },
}
</script>

<style lang="scss" scoped>
$loadingSize: 4px;

.card {
  position: relative;
  display: inline-block;
  width: 100%;
  background: #fff;
  border: 1px solid #f7f7f7;
  border-radius: 0.42em;
  box-shadow: 0 0 30px 5px rgba(82, 63, 105, 0.05);
  font-size: 16px;
  header {
    padding: 1em 1em 0.5em 1em;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: flex-start;
    .content {
      flex-basis: auto;
      h4 {
        display: block;
        font-size: 1.4em;
        line-height: 1em;
        margin: 0 0 0.2em 0;
        font-weight: 500;
      }
      small {
        display: block;
        font-size: 0.9em;
        color: #b5b5c3;
      }
    }
    .actions {
      flex-basis: 10%;
    }
  }
  main {
    padding: 0.5em 0em 0.5em 0em;
    .content {
    }
  }
  footer {
    .actions {
    }
  }
  &.loading {
    background: #f0f0f0;
    overflow: hidden;
    &:before {
      content: '';
      position: absolute;
      left: 0;
      right: auto;
      height: $loadingSize;
      background: #3699ff;
      width: 30%;
      transition: all 0.2s;
      animation: loading 1.5s infinite cubic-bezier(0.65, 0.05, 0.36, 1);
    }
    &:after {
      content: '';
      position: absolute;
      top: $loadingSize;
      bottom: 0;
      left: 0;
      width: 100%;
      background: rgba(255, 255, 255, 0.7);
    }
    @keyframes loading {
      0% {
        left: -30%;
      }
      100% {
        left: 130%;
      }
    }
  }
}
</style>