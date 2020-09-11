<template>
  <div
    class="fixed inset-0 z-50 bg-gray-600 opacity-75"
    @click="dialog ? animate() : close()"
    v-if="show"
  >
    <div
      class="absolute flex flex-row flex-wrap max-w-6xl overflow-hidden bg-white rounded-lg shadow-xl modal-container"
      :class="{'animate': animateModal}"
      :style="{'max-width': width}"
      @click.stop
    >
      <header class="flex flex-row items-center justify-between w-full px-6 py-4 border-b border-gray-300">
        <h4 class="text-xl">{{ title }}</h4>
        <button
          class="w-10 h-10 px-1 rounded-full outline-none cursor-pointer focus:outline-none hover:text-red-900 close-btn hover:bg-red-200"
          @click="close"
          v-if="closeIcon"
        >
          <svg
            class="fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
          </svg>
        </button>
      </header>
      <perfect-scrollbar>
        <main
          class="modal-body remote"
          v-if="remoteBody && remoteBody.length"
          v-html="remoteBody"
        ></main>
        <main
          class="modal-body"
          v-else
        >
          <slot></slot>
        </main>
      </perfect-scrollbar>
      <footer
        class="flex flex-row items-center justify-end w-full px-6 py-4 border-t border-gray-300"
        v-if="$slots.actions"
      >
        <slot name="actions"></slot>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: Boolean,
    title: String,
    fetch: String,
    fetchRemote: String,
    dialog: Boolean,
    cache: {
      type: Boolean,
      default: true,
    },
    width: String,
    closeIcon: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      remoteBody: null,
      animateModal: null,
    }
  },
  watch: {
    show() {
      if (this.show) {
        document.body.classList.add('modal-open')
        if (!this.remoteBody || !this.cache) {
          this.fetchContent()
          this.fetchRemoteContent()
        }
      } else {
        document.body.classList.remove('modal-open')
        this.animateModal = false
        this.close()
      }
    },
  },
  methods: {
    animate() {
      this.animateModal = true

      const timer = setTimeout(() => {
        this.animateModal = false
      }, 500)
      return () => clearTimeout(timer)
    },
    close() {
      this.$emit('close')
    },
    async fetchContent() {
      if (!this.fetch) {
        return
      }

      await this.$axios
        .$get('/remote/test.html', {
          baseURL: false,
        })
        .then((res) => {
          this.remoteBody = res
        })
        .catch((err) => {
          this.remoteBody = `<p class="error">Възникна грешка при изтеглянето на информацията, моля опитайте по-късно.</p>`
        })
    },
    async fetchRemoteContent() {
      if (!this.fetchRemote) {
        return
      }

      await this.$axios
        .$get(this.fetchRemote)
        .then((res) => {
          this.remoteBody = res.data
        })
        .catch((err) => {
          this.remoteBody = `<p class="error">Възникна грешка при изтеглянето на информацията, моля опитайте по-късно.</p>`
        })
    },
  },
  mounted() {
    if (!this.dialog) {
      document.addEventListener('keydown', (e) => {
        if (this.show && e.keyCode == 27) {
          this.close()
        }
      })
    }
  },
}
</script>

<style lang="scss" scoped>
* {
  user-select: none;
}
.ps {
  flex-basis: 100%;
  max-height: 50vh;
}
.modal-container {
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  main.modal-body {
    padding: 10px 30px;
    min-height: 5vh;
    &.remote {
      padding: 10px 30px;
    }
  }
  &.animate {
    animation: shake 0.5s linear alternate;
  }
}
@keyframes shake {
  0% {
    transform: translate(-50%, -50%);
  }
  25% {
    transform: translate(-49.5%, -50.5%);
  }
  50% {
    transform: translate(-50.5%, -49.5%);
  }
  75% {
    transform: translate(-49.5%, -50.5%);
  }
  100% {
    transform: translate(-50%, -50%);
  }
}
</style>