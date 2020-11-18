<template>
  <div
      class="mail-input form-input"
      :class="{'form-input--empty': !mail}">
    <q-input
        rounded
        v-model="mail"
        placeholder="Email"
        :rules="rules"
        :borderless="false"
        ref="mail"
    >
      <SaveFieldBtn color="#63C58A" position="right" v-if="oldValue !== mail && !checkError($refs.mail)" v-slot:append />
    </q-input>
    <div class="mail-input__desk">
      <p>На эту почту будут присылаться результаты анализов.</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SaveFieldBtn from '@/components/SaveField.vue';
import BaseFormMixins from '@/mixins/base-form-mixins';

@Component({
  components: {
    SaveFieldBtn
  },
})
export default class Mail extends BaseFormMixins {

  rules: Function[] = [(val: string) => this.isValidEmail(val) || 'Please type something']

  oldValue = '';

  mounted() {
    this.oldValue = this.mail;
  }

  isValidEmail (val: string): boolean | string {
    const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
    return emailPattern.test(val) || 'Invalid email';
  }

  get mail(): string {
    return this.$store.state.userCard.mail;
  }

  set mail(value: string) {
    this.$store.commit('userCard/setPropertyInStore', {name: 'mail', value});
  }

}
</script>


<style lang="scss">
.mail-input {

  &__desk {
    color: $black-04;
    font-size: 14px;
    margin-bottom: 10px;
  }
}
</style>
