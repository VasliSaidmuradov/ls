<template>
  <div class="registration-form registration-form--other">
    <q-form class="form-layout registration-form__form">
      <Name />
      <Surname />
      <div class="form-input form-input--bordered registration-form__input">
        <q-input v-model="phone" :rules="rules" placeholder="Введите ваш номер телефона"/>
      </div>

      <q-btn @click="submit"></q-btn>
    </q-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BaseFormMixins from '@/mixins/base-form-mixins';
import Name from '@/components/userSetting/Name.vue';
import Surname from '@/components/userSetting/Surname.vue';

@Component({
  components: {
    Name,
    Surname
  }
})
export default class RegistrationFormOtherUser extends BaseFormMixins {
  phone: string = '';

  rules: Function[] = [];

  mounted() {
    this.rules.push(this.inputRules.required)
  }

  submit() {
    console.log(this.$store.state.userCard)
  }
}
</script>

<style lang="scss" scoped>


</style>
