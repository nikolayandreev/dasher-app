<template>
  <transition
    :name="`slide-${form === 'signin' ? 'left' : 'right'}`"
    mode="out-in"
  >
    <component :is="form"></component>
  </transition>
</template>

<script>
import LoginForm from '~/components/Auth/LoginForm'
import RegisterForm from '~/components/Auth/RegisterForm'

export default {
  props: {
    form: {
      required: true,
      default: 'signin',
      validator: (prop) => ['signin', 'signup'].includes(prop),
    },
  },
  auth: 'guest',
  layout: 'default',
  components: {
    signin: LoginForm,
    signup: RegisterForm,
  },
}
</script>

<style lang="scss" scoped>
.slide-left-enter {
  transform: translateX(-100px);
  opacity: 0;
  transition: all 0.3s;
}
.slide-left-enter-to {
  transform: translateX(0);
  opacity: 1;
  transition: all 0.3s;
}
.slide-left-leave {
  transform: translateX(0);
  opacity: 1;
  transition: all 0.3s;
}
.slide-left-leave-to {
  transform: translateX(100px);
  opacity: 0;
  transition: all 0.3s;
}

.slide-right-enter {
  transform: translateX(100px);
  opacity: 0;
  transition: all 0.3s;
}
.slide-right-enter-to {
  transform: translateX(0);
  opacity: 1;
  transition: all 0.3s;
}
.slide-right-leave {
  transform: translateX(0);
  opacity: 1;
  transition: all 0.3s;
}
.slide-right-leave-to {
  transform: translateX(-100px);
  opacity: 0;
  transition: all 0.3s;
}
</style>