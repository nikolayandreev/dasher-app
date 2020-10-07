<template>
  <div class="container">
    <nav class="mb-4">
      <ul class="flex flex-row flex-wrap">
        <li
          class="mr-4"
          @click="activeForm = 'signin'"
        >Вход
        </li>
        <li @click="activeForm = 'signup'">Регистрация</li>
      </ul>
    </nav>
    <DynamicForm :form="activeForm" />
  </div>
</template>

<script>
import DynamicForm from '~/components/Auth/DynamicForm'

export default {
  auth: 'guest',
  layout: 'default',
  components: {
    DynamicForm,
  },
  data() {
    return {
      activeForm: 'signin',
    }
  },
}
</script>