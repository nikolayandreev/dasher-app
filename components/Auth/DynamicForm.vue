<template>
  <div class="block px-4 py-6 overflow-hidden sm:px-8">
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

export default {
  props: {
    form: {
      required: true,
      default: 'signin',
      validator: (prop) =>
        ['signin', 'signup', 'forgot-password'].includes(prop),
    },
  },
  auth: 'guest',
  layout: 'default',
  components: {
    signin: LoginForm,
    signup: RegisterForm,
    'forgot-password': ForgotPasswordForm,
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