<template>
  <div id="main">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <h4>Filled buttons</h4>
          <v-button>
            Primary
          </v-button>

          <v-button buttonClass="warning">
            Warning
          </v-button>

          <v-button buttonClass="danger">
            Danger
          </v-button>

          <v-button buttonClass="success">
            Success
          </v-button>

          <v-button buttonClass="secondary">
            Secondary
          </v-button>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12">
          <h4>Pending buttons</h4>
          <v-button :pending="pendingButton">
            Primary
          </v-button>

          <v-button
            :pending="pendingButton"
            buttonClass="warning"
          >
            Warning
          </v-button>

          <v-button
            :pending="pendingButton"
            buttonClass="danger"
          >
            Danger
          </v-button>

          <v-button
            :pending="pendingButton"
            buttonClass="success"
          >
            Success
          </v-button>

          <v-button
            :pending="pendingButton"
            buttonClass="secondary"
          >
            Secondary
          </v-button>
          <br />
          <v-button
            :pending="pendingButton"
            buttonClass="light-primary"
          >
            Primary
          </v-button>

          <v-button
            :pending="pendingButton"
            buttonClass="light-warning"
          >
            Warning
          </v-button>

          <v-button
            :pending="pendingButton"
            buttonClass="light-danger"
          >
            Danger
          </v-button>

          <v-button
            :pending="pendingButton"
            buttonClass="light-success"
          >
            Success
          </v-button>
          <br />
          <v-button
            :pending="pendingButton"
            buttonClass="outline-primary"
          >
            Primary
          </v-button>

          <v-button
            :pending="pendingButton"
            buttonClass="outline-warning"
          >
            Warning
          </v-button>

          <v-button
            :pending="pendingButton"
            buttonClass="outline-danger"
          >
            Danger
          </v-button>

          <v-button
            :pending="pendingButton"
            buttonClass="outline-success"
          >
            Success
          </v-button>

          <v-button
            :pending="pendingButton"
            buttonClass="outline-secondary"
          >
            Secondary
          </v-button>
          <v-button
            @click="togglePending"
            :pending="pendingButton"
            buttonClass="light-danger"
          >
            Click Me
          </v-button>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12">
          <h4>Light buttons</h4>
          <v-button buttonClass="light-primary">
            Primary
          </v-button>

          <v-button buttonClass="light-warning">
            Warning
          </v-button>

          <v-button buttonClass="light-danger">
            Danger
          </v-button>

          <v-button buttonClass="light-success">
            Success
          </v-button>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12">
          <h4>Hover light buttons</h4>
          <v-button buttonClass="hover-light-primary">
            Primary
          </v-button>

          <v-button buttonClass="hover-light-warning">
            Warning
          </v-button>

          <v-button buttonClass="hover-light-danger">
            Danger
          </v-button>

          <v-button buttonClass="hover-light-success">
            Success
          </v-button>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12">
          <h4>Outlined buttons</h4>
          <v-button buttonClass="outline-primary">
            Primary
          </v-button>

          <v-button buttonClass="outline-warning">
            Warning
          </v-button>

          <v-button buttonClass="outline-danger">
            Danger
          </v-button>

          <v-button buttonClass="outline-success">
            Success
          </v-button>
          <v-button buttonClass="outline-secondary">
            Secondary
          </v-button>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12">
          <h4>Sized buttons</h4>
          <v-button
            buttonSize="xs"
            buttonClass="primary"
          >
            Extra small
          </v-button>

          <v-button
            buttonSize="sm"
            buttonClass="primary"
          >
            Small
          </v-button>

          <v-button
            buttonSize="md"
            buttonClass="primary"
          >
            Medium
          </v-button>

          <v-button
            buttonSize="lg"
            buttonClass="primary"
          >
            Large
          </v-button>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12">
          <h4>Icon buttons</h4>
          <v-button
            rounded
            icon
            buttonClass="primary"
            buttonSize="xs"
          >
            <i class="ri-checkbox-circle-fill ri-2x"></i>
          </v-button>

          <v-button
            rounded
            icon
            buttonClass="warning"
            buttonSize="sm"
          >
            <i class="ri-checkbox-circle-fill"></i>
          </v-button>

          <v-button
            rounded
            icon
            buttonClass="success"
            buttonSize="md"
          >
            <i class="ri-checkbox-circle-fill"></i>
          </v-button>

          <v-button
            rounded
            icon
            buttonClass="danger"
            buttonSize="lg"
          >
            <i class="ri-checkbox-circle-line"></i>
          </v-button><br />
          <v-button
            rounded
            icon
            buttonClass="hover-light-primary"
            buttonSize="xs"
          >
            <i class="ri-checkbox-circle-line"></i>
          </v-button>

          <v-button
            rounded
            icon
            buttonClass="hover-light-warning"
            buttonSize="sm"
          >
            <i class="ri-checkbox-circle-line"></i>
          </v-button>

          <v-button
            rounded
            icon
            buttonClass="hover-light-success"
            buttonSize="md"
          >
            <i class="ri-checkbox-circle-line"></i>
          </v-button>

          <v-button
            rounded
            icon
            buttonClass="hover-light-danger"
            buttonSize="lg"
          >
            <i class="ri-checkbox-circle-line"></i>
          </v-button>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <h4>Icon buttons</h4>
          <v-button
            buttonClass="primary"
            iconClass="ri-checkbox-circle-fill"
          >
            Success
          </v-button>

          <v-button
            buttonClass="warning"
            iconClass="ri-error-warning-fill"
          >
            Warning
          </v-button>

          <v-button
            buttonClass="danger"
            iconClass="ri-close-circle-fill"
          >
            Danger
          </v-button>

          <v-button
            buttonClass="success"
            iconClass="ri-checkbox-circle-fill"
          >
            Large
          </v-button>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12">
          <h4>Squared buttons</h4>
          <v-button tile>
            Primary
          </v-button>

          <v-button
            tile
            buttonClass="warning"
          >
            Warning
          </v-button>

          <v-button
            tile
            buttonClass="danger"
          >
            Danger
          </v-button>

          <v-button
            tile
            buttonClass="success"
          >
            Success
          </v-button>

          <v-button
            tile
            buttonClass="secondary"
          >
            Secondary
          </v-button>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12">
          <h4>Pills</h4>
          <v-button pill>
            Primary
          </v-button>

          <v-button
            buttonClass="warning"
            pill
          >
            Warning
          </v-button>

          <v-button
            buttonClass="danger"
            pill
          >
            Danger
          </v-button>

          <v-button
            buttonClass="success"
            pill
          >
            Success
          </v-button>

          <v-button
            buttonClass="secondary"
            pill
          >
            Secondary
          </v-button>
        </div>
      </div>
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
      pendingButton: false,
    }
  },
  methods: {
    togglePending() {
      this.pendingButton = true
      setTimeout(() => {
        this.pendingButton = false
      }, 3000)
    },
    onClick() {
      console.log(`You're clicking a fabilous button!`)
    },
  },
}
</script>

<style lang="scss" scoped>
#main {
  p {
    font-family: 'Ubuntu', sans-serif;
    font-size: 17px;
    line-height: 1.4;
  }
  .uppercase {
    text-transform: uppercase;
  }
  .itallic {
    font-style: italic;
  }
  .bold {
    font-weight: 600;
  }
  .regular {
    font-weight: 400;
  }
  .thin {
    font-weight: 300;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: 'Fira Sans', sans-serif;
  }
}
</style>