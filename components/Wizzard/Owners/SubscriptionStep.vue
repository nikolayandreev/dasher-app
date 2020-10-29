<template>
  <div class="mt-8">
    <div class="max-w-6xl mx-auto">
      <h1 class="text-xl font-display">Избери подходящ абонамент</h1>
      <p class="text-sm text-gray-600">
        Можеш да спреш по всяко време, а също така и да продължиш от където и
        спрял.
      </p>
      <div class="mt-10 form-group">
        <div class="flex flex-row flex-wrap justify-around -mx-10">
          <SubscriptionButton
            :selectedSubscription="selectedSubscription"
            :subscription="plans.start"
            @click.prevent="$v.subscriptionForm.plan.$model = 'start'"
          />
          <SubscriptionButton
            :selectedSubscription="selectedSubscription"
            :subscription="plans.pro"
            @click.prevent="$v.subscriptionForm.plan.$model = 'pro'"
          />
          <span
            class="block text-sm text-red-500 error"
            v-if="errors && errors.plan"
            >{{ errors.plan[0] }}</span
          >
        </div>
        <div class="mt-12 form-group">
          <label for="card-element"> Дебитна или кредитна карта </label>
          <div id="card-element" class="max-w-xl mt-2" ref="card"></div>
        </div>
        <span
          class="block text-sm text-red-500 error"
          v-if="errors && errors.stripe_token"
          >{{ errors.stripe_token[0] }}</span
        >
      </div>
    </div>

    <div class="flex flex-row flex-no-wrap items-center justify-end pt-4 mt-4">
      <button
        :disabled="formPending"
        :class="{ pending: formPending }"
        @click="onSubmit"
        class="px-16 py-3 ml-10 font-medium tracking-wide transition duration-200 rounded-md text-brand-500 bg-brand-100 font-display hover:bg-brand-500 hover:text-white focus:shadow-outline-brand-600 focus:outline-none"
      >
        Следваща стъпка
      </button>
    </div>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'

export default {
  data() {
    return {
      paymentMethod: null,
      intentToken: null,
      stripe: null,
      card: null,
      elements: null,
      plans: {
        start: {
          name: 'Dasher START',
          description: `Планът включва - Система за резервации, анализи, клиентска база, неограничен брой обекти и служители.`,
          trial: true,
          price: '40',
        },
        pro: {
          name: 'Dasher PRO',
          description: `Планът включва всичко от Dasher START + SMS известяване, разширени анализи и управление на скалдова наличност.`,
          trial: true,
          price: '60',
        },
      },
      subscriptionForm: {
        plan: 'start',
      },
      errors: null,
      formPending: false,
    }
  },
  validations: {
    subscriptionForm: {
      plan: { required },
    },
  },
  computed: {
    selectedSubscription() {
      return this.plans[this.subscriptionForm.plan]
    },
    user() {
      return this.$auth.user
    },
  },
  methods: {
    loadIntent() {
      this.$axios.$get('/api/subscriptions/init').then((res) => {
        this.intentToken = res
      })
    },
    onSubmit() {
      this.processPayment()
    },
    async processPayment() {
      await this.confirmCard()
      await this.processSubscription()
    },
    async confirmCard() {
      const { setupIntent, error } = await this.stripe.confirmCardSetup(
        this.intentToken.client_secret,
        {
          payment_method: {
            card: this.card,
            billing_details: {
              name: `${this.user.first_name} ${this.user.last_name}`,
            },
          },
        }
      )

      if (error) {
        // Display "error.message" to the user...
      } else {
        console.log(setupIntent)
        this.paymentMethod = setupIntent.payment_method
        return true
      }
    },
    async processSubscription() {
      return await this.$axios
        .$post('/api/subscriptions', {
          plan: this.subscriptionForm.plan,
          payment_method: this.paymentMethod,
        })
        .then((res) => {
          console.log(res)

          this.$store.dispatch('wizzard/commitStep', {
            step: 1,
            status: 'finished',
          })

          this.formPending = false
          return $nuxt.$emit('wizzard-switch', 2)
        })
        .catch((err) => {
          this.formPending = false
          if (err.response && err.response.status === 422) {
            this.errors = err.response.data
          }
        })
    },
    includeStripe(URL, callback) {
      let documentTag = document,
        tag = 'script',
        object = documentTag.createElement(tag),
        scriptTag = documentTag.getElementsByTagName(tag)[0]
      object.src = '//' + URL

      if (callback) {
        object.addEventListener(
          'load',
          function (e) {
            callback(null, e)
          },
          false
        )
      }
      scriptTag.parentNode.insertBefore(object, scriptTag)
    },
    configureStripe(spk) {
      let style = {
        base: {
          color: '#32325d',
          fontFamily: '"Fira Sans", Ubuntu, sans-serif',
          fontSmoothing: 'antialiased',
          fontSize: '16px',
          '::placeholder': {
            color: '#aab7c4',
          },
        },
        invalid: {
          color: '#fa755a',
          iconColor: '#fa755a',
        },
      }

      this.stripe = Stripe(spk)
      this.elements = this.stripe.elements({
        locale: 'bg-BG',
        hidePostalCode: true,
      })

      this.card = this.elements.create('card', { style })
      this.card.mount(this.$refs.card)
    },
  },
  mounted() {
    this.includeStripe(
      'js.stripe.com/v3/',
      function () {
        this.configureStripe(process.env.STRIPE_KEY)
        this.loadIntent()
      }.bind(this)
    )
  },
}
</script>


<style lang="scss" scoped>
.StripeElement {
  box-sizing: border-box;

  height: 40px;

  padding: 10px 12px;

  border: 1px solid transparent;
  border-radius: 4px;
  background-color: white;

  box-shadow: 0 1px 3px 0 #e6ebf1;
  -webkit-transition: box-shadow 150ms ease;
  transition: box-shadow 150ms ease;
}

.StripeElement--focus {
  box-shadow: 0 1px 3px 0 #cfd7df;
}

.StripeElement--invalid {
  border-color: #fa755a;
}

.StripeElement--webkit-autofill {
  background-color: #fefde5 !important;
}
</style>