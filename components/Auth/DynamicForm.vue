<template>
  <div class="block px-4 py-6 overflow-hidden sm:px-8" v-if="loaded">
    <img
      class="h-8 mx-auto mb-6"
      src="/images/dasher-logo.svg"
      alt="Dasher - Твоята система за управление"
    />
    <transition
      :name="`slide-${form === 'signin' ? 'left' : 'right'}`"
      mode="out-in"
    >
      <component :is="form"></component>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    form: {
      required: true,
      default: 'signin',
      validator: (prop) =>
        ['signin', 'signup', 'forgot-password', 'reset-password'].includes(
          prop
        ),
    },
  },
  data() {
    return {
      loaded: false,
    }
  },
  components: {
    signin: () => import('~/components/Auth/LoginForm'),
    signup: () => import('~/components/Auth/RegisterForm'),
    'forgot-password': () => import('~/components/Auth/ForgotPasswordForm'),
    'reset-password': () => import('~/components/Auth/ResetPasswordForm'),
  },
  mounted() {
    this.loaded = true
  },
}
</script>

<style lang="scss" scoped>
$opacityFrom: 0;
$opacityTo: 0.6;
$transitionTime: 120ms;
$pullLeft: -100px;
$pullRight: 100px;

.slide-left-enter {
  transform: translateX($pullLeft);
  opacity: $opacityFrom;
  transition: all $transitionTime;
}
.slide-left-enter-to {
  transform: translateX(0);
  opacity: $opacityTo;
  transition: all $transitionTime;
}
.slide-left-leave {
  transform: translateX(0);
  opacity: $opacityTo;
  transition: all $transitionTime;
}
.slide-left-leave-to {
  transform: translateX($pullRight);
  opacity: $opacityFrom;
  transition: all $transitionTime;
}

.slide-right-enter {
  transform: translateX($pullRight);
  opacity: $opacityFrom;
  transition: all $transitionTime;
}
.slide-right-enter-to {
  transform: translateX(0);
  opacity: $opacityTo;
  transition: all $transitionTime;
}
.slide-right-leave {
  transform: translateX(0);
  opacity: $opacityTo;
  transition: all $transitionTime;
}
.slide-right-leave-to {
  transform: translateX($pullLeft);
  opacity: $opacityFrom;
  transition: all $transitionTime;
}
</style>