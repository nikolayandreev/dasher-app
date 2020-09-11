<template>
  <div class="row">
    <div class="half">
      <h1>Build your own</h1>
      <div class="input-group">
        <label>Your toast message</label>
        <input
          v-model="toastMessage"
          type="text"
        />
      </div>

      <div class="radio-group">
        <h5>Choose toast type</h5>
        <input
          id="show"
          type="radio"
          value="show"
          name="type"
          v-model="toastType"
        />
        <label for="show">Basic</label>
        <br />
        <input
          id="success"
          type="radio"
          value="success"
          name="type"
          v-model="toastType"
        />
        <label for="success">Success</label>
        <br />
        <input
          id="error"
          type="radio"
          value="error"
          name="type"
          v-model="toastType"
        />
        <label for="error">Error</label>
        <br />
        <input
          id="info"
          type="radio"
          value="info"
          name="type"
          v-model="toastType"
        />
        <label for="info">Info</label>
      </div>
      <h4>Icon</h4>
      <div class="checkbox-group">
        <label for="icon">Show Icon</label>
        <input
          id="icon"
          type="checkbox"
          v-model="iconVisible"
        />
      </div>
      <div class="input-group">
        <label for="">Icon name</label>
        <input
          type="text"
          v-model="iconName"
        >
      </div>
      <h4>Action</h4>
      <div class="checkbox-group">
        <label for="action">Show Action</label>
        <input
          id="action"
          type="checkbox"
          v-model="actionVisible"
        />
      </div>
      <div class="input-group">
        <label for="">Action text</label>
        <input
          type="text"
          v-model="actionText"
        >
      </div><br />
      <div class="input-group">
        <label for="">Hide toast after:</label>
        <input
          step="100"
          v-model="toastDuration"
          type="number"
        >/ms
      </div>
      <br />
      <v-button
        @click="showToast"
        iconClass="ri-magic-fill"
        buttonSize="lg"
        buttonClass="success"
      >Spawn that cunt!</v-button>
      <v-button
        @click="showAll"
        iconClass="ri-magic-fill"
        buttonSize="lg"
        buttonClass="light-success"
      >Spawn all cunts!</v-button>
    </div>
    <div class="half">
      <h4>Loading toast message</h4>
      <div class="input-group">
        <label for="">Hide loading after:</label>
        <input
          step="100"
          v-model="loadingTime"
          type="number"
        >/ms
      </div>
      <br />
      <v-button
        @click="showLoading"
        buttonClass="light-primary"
      >
        Show Loading toast
      </v-button>

      <h4>Server Error toast message</h4>
      <div class="input-group">
        <label for="">Hide error after:</label>
        <input
          step="100"
          v-model="errorTime"
          type="number"
        >/ms
      </div>
      <br />
      <v-button
        @click="showError"
        buttonClass="light-danger"
      >
        Show Error toast
      </v-button>
    </div>
  </div>
</template>

<script>
import VButton from '~/components/ui/Button'

export default {
  auth: false,
  components: {
    VButton,
  },
  data() {
    return {
      loadingTime: 3000,
      errorTime: 3000,
      toastMessage: 'Your text goes here, silly...',
      toastType: 'show',
      toastDuration: 3000,
      iconVisible: false,
      iconName: 'ri-checkbox-circle-fill ri-2x',
      actionVisible: false,
      actionText: 'Cancel',
    }
  },
  methods: {
    showLoading() {
      const loading = this.$toast.global.loading()
      loading

      setTimeout(() => {
        loading.goAway()
      }, this.loadingTime)
    },
    showError() {
      const error = this.$toast.global.serverError()
      error

      setTimeout(() => {
        error.goAway()
      }, this.errorTime)
    },
    showAll() {
      this.$toast.success('Woah! You spawned a new one!', {
        duration: this.toastDuration,
        icon: {
          name: 'ri-checkbox-circle-fill ri-2x',
        },
      })
      this.$toast.show('Logged in to your account!', {
        duration: this.toastDuration,
        icon: {
          name: 'ri-user-shared-fill ri-2x',
        },
      })
      this.$toast.error(`Mr.Stark I don't feel so good!`, {
        duration: this.toastDuration,
        icon: {
          name: 'ri-close-circle-fill ri-2x',
        },
      })
      this.$toast.info(
        `Reminder: Mr.Stark's death he's locked in my basement..`,
        {
          duration: this.toastDuration,
          icon: {
            name: 'ri-subscript ri-2x',
          },
        }
      )
    },
    showToast() {
      if (!this.toastMessage) {
        return
      }

      this.$toast[this.toastType](this.toastMessage, {
        duration: this.toastDuration,
        icon: {
          name: this.iconVisible ? this.iconName : false,
        },
        action: {
          text: this.actionVisible ? this.actionText : false,
          onClick: (e, toastObject) => {
            toastObject.goAway(0)
          },
        },
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.row {
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: center;

  .half {
    margin: 0 30px;
    &:first-child {
      flex-basis: 30%;
      input[type='text'] {
        display: block;
        width: 100%;
      }
    }
    &:last-child {
      flex-basis: 30%;
    }
  }
}
</style>