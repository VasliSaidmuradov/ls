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
    </q-input>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import InputSuffix from '@/components/InputSuffix.vue';
import BaseFormMixins from '@/mixins/base-form-mixins';

@Component({
  components: {
    InputSuffix
  },
})
export default class Height extends BaseFormMixins {

  rules: Function[] = []


  get height() {
    this.rules.push(this.inputRules.required)
    return this.$store.state.medicalCard.height;
  }

  set height (value: any) {
    this.$store.commit('medicalCard/setPropertyInStore', {name: 'height',value: this.checkInputValueByRegExp(this.onlyNumber, value)});
  }

}
</script>

<style lang="scss">
@import "../styles/vars";

  .height-input {
    margin-bottom: 25px;
  }
</style>
