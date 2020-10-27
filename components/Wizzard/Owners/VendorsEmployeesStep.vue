<template>
  <div>
    <h2 class="mt-8 text-3xl">Добави служител</h2>
    <p class="text-sm text-gray-700">Въведи Email адрес, избери какви права да дадеш на служителя и изпрати покана.</p>

    <div class="flex flex-row flex-wrap w-3/5 mt-6">
      <div class="w-full input-group">
        <label>Email адрес</label>
        <input
          v-model="inviteForm.email"
          type="text"
          class="w-full"
          placeholder="Въведи Email адрес на служителя"
        >
      </div>

      <div class="w-full mt-4 overflow-hidden border border-gray-300 rounded-md">
        <EmployeeRole
          :active="inviteForm.role === 'employee'"
          roleName="Служител"
          @click="inviteForm.role = 'employee'"
        >Вижда само своите резервации.</EmployeeRole>

        <EmployeeRole
          :active="inviteForm.role === 'employee-elevated'"
          roleName="Старши-служител"
          @click="inviteForm.role = 'employee-elevated'"
        >Може да добавя резервации, клиенти и услуги.</EmployeeRole>

        <EmployeeRole
          :active="inviteForm.role === 'receptionist'"
          roleName="Рецепционист"
          @click="inviteForm.role = 'receptionist'"
        >Може да вижда и редактира всичко без Анализи и Плащания</EmployeeRole>
      </div>

      <button class="flex flex-row flex-no-wrap items-center justify-center w-full py-3 mt-4 ml-auto transition duration-200 rounded-full bg-brand-500 hover:bg-brand-600 focus:outline-none focus:shadow-outline-brand-600">
        <svg-icon
          name="send"
          class="w-6 h-6 mr-2 text-white fill-current"
        />
        <span class="font-medium tracking-wide text-white font-display">Изпрати покана</span>
      </button>
    </div>

    <div class="flex flex-row flex-no-wrap items-center justify-end pt-4 mt-4">
      <button
        @click="$nuxt.$emit('wizzard-switch', 2)"
        class="mr-auto text-lg text-gray-700 transition duration-200 border-b border-transparent focus:outline-none hover:text-gray-900 hover:border-gray-900"
      >
        Назад
      </button>
      <button
        @click="onSubmit"
        class="text-lg text-gray-600 transition duration-200 border-b border-transparent focus:outline-none hover:text-gray-900 hover:border-gray-900"
      >
        Пропусни
      </button>
      <button
        :disabled="formPending"
        :class="{pending: formPending}"
        @click="onSubmit"
        class="inline-block px-16 py-3 ml-10 font-medium tracking-wide transition duration-200 rounded-md bg-brand-100 text-brand-500 font-display hover:bg-brand-500 hover:text-white focus:shadow-outline-brand-600 focus:outline-none"
      >
        Следваща стъпка
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formPending: false,
      errors: null,
      inviteForm: {
        email: null,
        role: null,
      },
    }
  },
  methods: {
    onInviteSend() {},
    onSubmit() {
      this.formPending = false

      this.$store.dispatch('wizzard/commitStep', {
        step: 3,
        status: 'finished',
      })

      return $nuxt.$emit('wizzard-switch', 4)
    },
  },
}
</script>