<template>
  <div class="block px-4 py-6 overflow-hidden sm:px-8">
    <img
      class="h-8 mx-auto mb-4"
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
import LoginForm from '~/components/Auth/LoginForm'
import RegisterForm from '~/components/Auth/RegisterForm'
import ForgotPasswordForm from '~/components/Auth/ForgotPasswordForm'
import ResetPasswordForm from '~/components/Auth/ResetPasswordForm'

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
  auth: 'guest',
  layout: 'default',
  components: {
    signin: LoginForm,
    signup: RegisterForm,
    'forgot-password': ForgotPasswordForm,
    'reset-password': ResetPasswordForm,
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