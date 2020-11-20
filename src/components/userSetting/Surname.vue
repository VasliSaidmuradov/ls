<template>
  <div
      class="surname-input form-input"
      :class="{'form-input--empty': !surname}">
    <q-input
        rounded
        placeholder="Фамилия"
        v-model="surname"
        :rules="rules"
        :borderless="false"
        ref="surname"
    >

      <SaveFieldBtn v-if="oldValue !== surname && !checkError($refs.surname) && !disableAcceptField" v-slot:append/>
    </q-input>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import SaveFieldBtn from '@/components/SaveField.vue';
import BaseFormMixins from '@/mixins/base-form-mixins';
import {QInput} from 'quasar';

@Component({
  components: {
    SaveFieldBtn
  },
})
export default class Name extends BaseFormMixins {

  @Prop({default: () => []}) propRules: Function[];
  @Prop({default: false, type: Boolean}) disableAcceptField: boolean;

  rules: Function[] = []

  $refs: {
    surname: QInput;
  }

  oldValue = '';

  mounted() {
    this.rules.push(this.inputRules.maxMinlength, ...this.propRules);
    this.oldValue = this.surname;
  }

  get surname(): string {
    return this.$store.state.userCard.surname;
  }

  set surname(value: string) {
    this.$store.commit('userCard/setPropertyInStore', {name: 'surname', value: this.checkInputValueByRegExp(this.onlyLetters, value)});
  }

  validate(): Promise<boolean> | boolean {
    return this.$refs.surname.validate()
  }

}
</script>


<style lang="scss">


</style>
