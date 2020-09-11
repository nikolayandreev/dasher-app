<template>
  <div id="main">
    <div class="container">
      <form @submit.prevent>
        <div class="row">
          <div class="col-md-12">
            <h4>Regular TextField</h4>
          </div>
          <div class="col-md-4">
            <v-text-input
              id='firstNameRegular'
              placeholder="Твоето име"
              label="Име"
              v-model="$v.regularForm.firstName.$model"
              hint="We ask for your first name"
              :hasError="$v.regularForm.firstName.$dirty && $v.regularForm.firstName.$invalid"
              :errorMessage="error ? error : 'You must enter your first name'"
              :isValid="$v.regularForm.firstName.$dirty && !$v.regularForm.firstName.$invalid"
            ></v-text-input>
          </div>
          <div class="col-md-4">
            <v-text-input
              id='middleNameRegular'
              placeholder="Твоето презиме"
              label="Презиме"
              v-model="$v.regularForm.middleName.$model"
              hint='We ask for your middle name'
              :hasError="$v.regularForm.middleName.$dirty && $v.regularForm.middleName.$invalid"
              :errorMessage="error ? error : 'You must enter your middle name'"
              :isValid="$v.regularForm.middleName.$dirty && !$v.regularForm.middleName.$invalid"
            ></v-text-input>
          </div>
          <div class="col-md-4">
            <v-text-input
              id='lastNameRegular'
              placeholder="Твоята фамилия"
              label="Фамилия"
              v-model="$v.regularForm.lastName.$model"
              hint='We ask for your family name'
              :hasError="$v.regularForm.lastName.$dirty && $v.regularForm.lastName.$invalid"
              :errorMessage="error ? error : 'You must enter your family name'"
              :isValid="$v.regularForm.lastName.$dirty && !$v.regularForm.lastName.$invalid"
            ></v-text-input>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <v-select-input
              id="frameworkRegular"
              label="Фреймуърк"
              :options="options"
              v-model="$v.regularForm.framework.$model"
              :hasError="$v.regularForm.framework.$dirty && $v.regularForm.framework.$invalid"
              :errorMessage="error ? error : 'You must enter you fav framework'"
              withDefault="Please select a framework"
              :isValid="$v.regularForm.framework.$dirty && !$v.regularForm.framework.$invalid"
            ></v-select-input>
          </div>
          <div class="col-md-6">
            <v-textarea-input
              id="frameworkInfoRegular"
              label="Напишете нещо за вашият фреймуърк"
              placeholder="Инфо за фреймуърк"
              v-model="$v.regularForm.frameworkInfo.$model"
              hint="We ask for more info for your favorite framework"
              :hasError="$v.regularForm.frameworkInfo.$dirty && $v.regularForm.frameworkInfo.$invalid"
              :errorMessage="error ? error : 'You must enter info for your fav framework'"
              withDefault="Please write something for your favourite framework"
              :isValid="$v.regularForm.frameworkInfo.$dirty && !$v.regularForm.frameworkInfo.$invalid"
              noresize
            ></v-textarea-input>
          </div>
          <div class="col-md-12">

          </div>
          <div class="col-md-12 text-right">
            <v-button @click="onSubmitRegular">
              Check Regular form
            </v-button>
          </div>
        </div>
      </form>
      <div class="row">
        <div class="col-md-12">
          <h4>Filled TextField</h4>
        </div>
        <div class="col-md-4">
          <v-text-input
            id='firstNameFilled'
            placeholder="Твоето име"
            label="Име"
            v-model="$v.filledForm.firstName.$model"
            hint="We ask for your first name"
            :hasError="$v.filledForm.firstName.$dirty && $v.filledForm.firstName.$invalid"
            :errorMessage="error ? error : 'You must enter your first name'"
            :isValid="$v.filledForm.firstName.$dirty && !$v.filledForm.firstName.$invalid"
            filled
          ></v-text-input>
        </div>
        <div class="col-md-4">
          <v-text-input
            id='middleNameFilled'
            placeholder="Твоето презиме"
            label="Презиме"
            v-model="$v.filledForm.middleName.$model"
            hint='We ask for your middle name'
            :hasError="$v.filledForm.middleName.$dirty && $v.filledForm.middleName.$invalid"
            :errorMessage="error ? error : 'You must enter your middle name'"
            :isValid="$v.filledForm.middleName.$dirty && !$v.filledForm.middleName.$invalid"
            filled
          ></v-text-input>
        </div>
        <div class="col-md-4">
          <v-text-input
            id='lastNameFilled'
            placeholder="Твоята фамилия"
            label="Фамилия"
            v-model="$v.filledForm.lastName.$model"
            hint='We ask for your family name'
            :hasError="$v.filledForm.lastName.$dirty && $v.filledForm.lastName.$invalid"
            :errorMessage="error ? error : 'You must enter your family name'"
            :isValid="$v.filledForm.lastName.$dirty && !$v.filledForm.lastName.$invalid"
            filled
          ></v-text-input>
        </div>
        <div class="col-md-6">
          <v-select-input
            id="frameworkFilled"
            label="Фреймуърк"
            :options="options"
            v-model="$v.filledForm.framework.$model"
            :hasError="$v.filledForm.framework.$dirty && $v.filledForm.framework.$invalid"
            :errorMessage="error ? error : 'You must enter you fav framework'"
            withDefault="Please select a framework"
            :isValid="$v.filledForm.framework.$dirty && !$v.filledForm.framework.$invalid"
            filled
          ></v-select-input>
        </div>
        <div class="col-md-6">
          <v-textarea-input
            id="frameworkInfoFilled"
            label="Напишете нещо за вашият фреймуърк"
            placeholder="Инфо за фреймуърк"
            v-model="$v.filledForm.frameworkInfo.$model"
            hint="We ask for more info for your favorite framework"
            :hasError="$v.filledForm.frameworkInfo.$dirty && $v.filledForm.frameworkInfo.$invalid"
            :errorMessage="error ? error : 'You must enter info for your fav framework'"
            withDefault="Please write something for your favourite framework"
            :isValid="$v.filledForm.frameworkInfo.$dirty && !$v.filledForm.frameworkInfo.$invalid"
            filled
            noresize
          ></v-textarea-input>
        </div>
        <div class="col-md-12 text-right">
          <v-button @click="onSubmitFilled">
            Check filled form
          </v-button>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <h4>Outlined TextField</h4>
        </div>
        <div class="col-md-4">
          <v-text-input
            id='firstNameOutlined'
            placeholder="Твоето име"
            label="Име"
            v-model="$v.outlinedForm.firstName.$model"
            hint="We ask for your first name"
            :hasError="$v.outlinedForm.firstName.$dirty && $v.outlinedForm.firstName.$invalid"
            :errorMessage="error ? error : 'You must enter your first name'"
            :isValid="$v.outlinedForm.firstName.$dirty && !$v.outlinedForm.firstName.$invalid"
            outlined
          ></v-text-input>
        </div>
        <div class="col-md-4">
          <v-text-input
            id='middleNameOutlined'
            placeholder="Твоето презиме"
            label="Презиме"
            v-model="$v.outlinedForm.middleName.$model"
            hint='We ask for your middle name'
            :hasError="$v.outlinedForm.middleName.$dirty && $v.outlinedForm.middleName.$invalid"
            :errorMessage="error ? error : 'You must enter your middle name'"
            :isValid="$v.outlinedForm.middleName.$dirty && !$v.outlinedForm.middleName.$invalid"
            outlined
          ></v-text-input>
        </div>
        <div class="col-md-4">
          <v-text-input
            id='lastNameOutlined'
            placeholder="Твоята фамилия"
            label="Фамилия"
            v-model="$v.outlinedForm.lastName.$model"
            hint='We ask for your family name'
            :hasError="$v.outlinedForm.lastName.$dirty && $v.outlinedForm.lastName.$invalid"
            :errorMessage="error ? error : 'You must enter your family name'"
            :isValid="$v.outlinedForm.lastName.$dirty && !$v.outlinedForm.lastName.$invalid"
            outlined
          ></v-text-input>
        </div>
        <div class="col-md-6">
          <v-select-input
            id="frameworkOutlined"
            label="Фреймуърк"
            :options="options"
            v-model="$v.outlinedForm.framework.$model"
            :hasError="$v.outlinedForm.framework.$dirty && $v.outlinedForm.framework.$invalid"
            :errorMessage="error ? error : 'You must enter you fav framework'"
            withDefault="Please select a framework"
            :isValid="$v.outlinedForm.framework.$dirty && !$v.outlinedForm.framework.$invalid"
            outlined
          ></v-select-input>
        </div>
        <div class="col-md-6">
          <v-textarea-input
            id="frameworkInfoOutlined"
            label="Напишете нещо за вашият фреймуърк"
            placeholder="Инфо за фреймуърк"
            v-model="$v.outlinedForm.frameworkInfo.$model"
            hint="We ask for more info for your favorite framework"
            :hasError="$v.outlinedForm.frameworkInfo.$dirty && $v.outlinedForm.frameworkInfo.$invalid"
            :errorMessage="error ? error : 'You must enter info for your fav framework'"
            withDefault="Please write something for your favourite framework"
            :isValid="$v.outlinedForm.frameworkInfo.$dirty && !$v.outlinedForm.frameworkInfo.$invalid"
            outlined
            noresize
          ></v-textarea-input>
        </div>
        <div class="col-md-12 text-right">
          <v-button @click="onSubmitOutlined">
            Check Outlined form
          </v-button>
        </div>
        <div class="col-md-12">
          <v-checkbox-input
            inline
            v-model="$v.checkboxForm.firstCheck.$model"
            :error="$v.checkboxForm.firstCheck.$dirty && $v.checkboxForm.firstCheck.$invalid"
          >
            Активна публикация
          </v-checkbox-input>
          <v-checkbox-input
            inline
            checkboxClass="success"
            v-model="$v.checkboxForm.secondCheck.$model"
            :error="$v.checkboxForm.secondCheck.$dirty && $v.checkboxForm.secondCheck.$invalid"
          >
            Препоръчана публикация
          </v-checkbox-input>
          <v-checkbox-input
            checkboxClass="danger"
            v-model="$v.checkboxForm.thirdCheck.$model"
            :error="$v.checkboxForm.thirdCheck.$dirty && $v.checkboxForm.thirdCheck.$invalid"
          >
            Съгласен съм с общите условия предоставени на сайта
          </v-checkbox-input>
          <v-checkbox-input
            checkboxClass="warning"
            v-model="$v.checkboxForm.fourthCheck.$model"
            :error="$v.checkboxForm.fourthCheck.$dirty && $v.checkboxForm.fourthCheck.$invalid"
          >
            Съгласен съм с общите условия предоставени на сайта
          </v-checkbox-input>
        </div>
        <div class="col-md-12 text-right">
          <v-button @click="onSubmitCheckbox">
            Check Checkbox form
          </v-button>
        </div>
        <div class="col-md-12">
          <v-radio-input
            value="One"
            v-model="$v.radioForm.radio.$model"
            :error="$v.radioForm.radio.$dirty && $v.radioForm.radio.$invalid"
          >
            Активна публикация
          </v-radio-input>
          <v-radio-input
            radioClass="success"
            inline
            value="Two"
            v-model="$v.radioForm.radio.$model"
            :error="$v.radioForm.radio.$dirty && $v.radioForm.radio.$invalid"
          >
            Неактивна публикация
          </v-radio-input>
          <v-radio-input
            radioClass="danger"
            inline
            value="Three"
            v-model="$v.radioForm.radio.$model"
            :error="$v.radioForm.radio.$dirty && $v.radioForm.radio.$invalid"
          >
            Активна публикация
          </v-radio-input>
          <v-radio-input
            radioClass="warning"
            inline
            value="Four"
            v-model="$v.radioForm.radio.$model"
            :error="$v.radioForm.radio.$dirty && $v.radioForm.radio.$invalid"
          >
            Неактивна публикация
          </v-radio-input>
        </div>
        <div class="col-md-12 text-right">
          <v-button @click="onSubmitRadio">
            Check Radio form
          </v-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VTextInput from '~/components/ui/Forms/TextInput'
import VButton from '~/components/ui/Button'
import VSelectInput from '~/components/ui/Forms/SelectInput'
import VTextareaInput from '~/components/ui/Forms/TextareaInput'
import VCheckboxInput from '~/components/ui/Forms/CheckboxInput'
import VRadioInput from '~/components/ui/Forms/RadioInput'
import { required, minLength, sameAs } from 'vuelidate/lib/validators'

export default {
  components: {
    VTextInput,
    VSelectInput,
    VTextareaInput,
    VCheckboxInput,
    VRadioInput,
    VButton,
  },
  data() {
    return {
      error: '',
      options: [
        {
          text: 'Vue.js',
          value: 'vue',
        },
        {
          text: 'Adonis.js',
          value: 'adonis',
        },
        {
          text: 'Express.js',
          value: 'express',
        },
        {
          text: 'Laravel',
          value: 'laravel',
        },
        {
          text: 'MySQL',
          value: 'mysql',
        },
      ],
      regularForm: {
        firstName: null,
        middleName: null,
        lastName: null,
        framework: null,
        frameworkInfo: null,
      },
      filledForm: {
        firstName: null,
        middleName: null,
        lastName: null,
        framework: null,
        frameworkInfo: null,
      },
      outlinedForm: {
        firstName: null,
        middleName: null,
        lastName: null,
        framework: null,
        frameworkInfo: null,
      },
      checkboxForm: {
        firstCheck: false,
        secondCheck: false,
        thirdCheck: false,
        fourthCheck: true,
      },
      radioForm: {
        radio: '',
      },
    }
  },
  validations: {
    regularForm: {
      firstName: {
        required,
        minLength: minLength(2),
      },
      middleName: {
        required,
        minLength: minLength(3),
      },
      lastName: {
        required,
        minLength: minLength(4),
      },
      framework: {
        required,
      },
      frameworkInfo: {
        required,
      },
    },
    filledForm: {
      firstName: {
        required,
        minLength: minLength(2),
      },
      middleName: {
        required,
        minLength: minLength(3),
      },
      lastName: {
        required,
        minLength: minLength(4),
      },
      framework: {
        required,
      },
      frameworkInfo: {
        required,
      },
    },
    outlinedForm: {
      firstName: {
        required,
        minLength: minLength(2),
      },
      middleName: {
        required,
        minLength: minLength(3),
      },
      lastName: {
        required,
        minLength: minLength(4),
      },
      framework: {
        required,
      },
      frameworkInfo: {
        required,
      },
    },
    radioForm: {
      radio: {
        required,
      },
    },
    checkboxForm: {
      firstCheck: {
        sameAs: sameAs(() => true),
      },
      secondCheck: {
        sameAs: sameAs(() => true),
      },
      thirdCheck: {
        sameAs: sameAs(() => true),
      },
      fourthCheck: {
        sameAs: sameAs(() => true),
      },
    },
  },
  methods: {
    onSubmitRegular() {
      this.$v.regularForm.$touch()
    },
    onSubmitFilled() {
      this.$v.filledForm.$touch()
    },
    onSubmitOutlined() {
      this.$v.outlinedForm.$touch()
    },
    onSubmitCheckbox() {
      this.$v.checkboxForm.$touch()
    },
    onSubmitRadio() {
      this.$v.radioForm.$touch()
    },
  },
}
</script>
<style lang="scss" scoped>
</style>