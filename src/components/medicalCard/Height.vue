<template>
  <div class="height-input form-input" :class="{'form-input--empty': !height}">
    <label class="form-label" for="height">Ваш рост</label>
    <q-input
        v-model="height"
        maxlength="10"
        for="height"
        :rules="rules"
        id="height"
        ref="height">
      <InputSuffix
          v-slot:prepend
          suffixText="См"
          :inputText.sync="height"
          :baseOffset="30"
          inputFontStyle="14px inter"
          suffixPosition="left"
      />

      <SaveFieldBtn v-if="oldValue !== height && !checkError($refs.height)" @save="saveData" v-slot:append />
    </q-input>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import InputSuffix from '@/components/InputSuffix.vue';
import BaseFormMixins from '@/mixins/base-form-mixins';
import {QInput} from 'quasar';
import SaveFieldBtn from '@/components/SaveField.vue';

export interface IRefs {
  height: QInput;
}

@Component({
  components: {
    InputSuffix,
    SaveFieldBtn
  },
})
export default class Height extends BaseFormMixins {

  rules: Function[] = []

  $refs: IRefs & Vue['$refs'];

  oldValue: number = 0;

  mounted() {
    this.oldValue = this.height;
    this.rules.push(this.inputRules.required)
  }

  get height(): number {
    return this.$store.state.personalArea.medicalCard.height;
  }

  set height (value: number) {
    this.$store.commit('personalArea/setMedicalCardProperty', {name: 'height',value: this.checkInputValueByRegExp(this.onlyNumber, value.toString())});
  }

  saveData() {
    if (!this.$refs.height.validate()) return;
    this.$store.dispatch('personalArea/updateMedicalCardData', {height: this.height})
  }

}
</script>

<style lang="scss">
  .height-input {
    margin-bottom: 25px;
  }
</style>
