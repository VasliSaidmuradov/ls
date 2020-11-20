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

  rules: Function[] = [];

  oldValue = '';

  mounted() {
    this.oldValue = this.mail;
    this.rules.push(this.inputRules.validEmail)
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
