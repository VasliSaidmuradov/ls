<template>
  <div class="weigh-input form-input">
    <label for="weight">Ваш вес</label>
    <q-input for="weight"
             id="weight"
             :rules="rules"
             maxlength="10"
             v-model="weight"
             :class="{'form-input--empty': !weight}"
             ref="weight">
        <InputSuffix
            v-slot:prepend
            suffixText="Кг"
            :inputText.sync="weight"
            :baseOffset="30"
            inputFontStyle="14px inter"
            suffixPosition="left"
        />
      <SaveFieldBtn v-if="oldValue !== weight && !checkError($refs.weight)" @save="save" v-slot:append />
    </q-input >
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BaseFormMixins from '@/mixins/base-form-mixins';
import InputSuffix from '@/components/InputSuffix.vue';
import SaveFieldBtn from '@/components/SaveField.vue';


@Component({
  components: {
    InputSuffix,
    SaveFieldBtn
  }
})
export default class Weight extends BaseFormMixins {

  rules: Function[] = []

  oldValue = 0;

  mounted() {
    this.rules.push(this.inputRules.required)
    this.oldValue = this.weight;
  }

  get weight(): number {
    return this.$store.state.personalArea.medicalCard.weight;
  }

  set weight (value: number) {
    this.$store.commit('personalArea/setMedicalCardProperty', {name: 'weight', value: this.checkInputValueByRegExp(this.onlyNumber, value.toString())});
  }

  save() {
    this.$store.dispatch('personalArea/updateMedicalCardData', {weight: this.weight})
  }


}
</script>

<style lang="scss">
.weigh-input {
  margin-bottom: 25px;

  label {
    display: block;
    font-weight: 500;
    font-size: 13px;
    color: $black-02;
    margin-bottom: 8px;
  }

  .q-field__prepend {
    position: absolute;
    z-index: 99;
    display: flex;
    align-items: center;
  }
}
</style>
