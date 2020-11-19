<template>
  <div
      class="name-input form-input"
      :class="{'form-input--empty': !name}">
    <q-input
        rounded
        placeholder="Имя"
        v-model="name"
        :rules="rules"
        :borderless="false"
        ref="name"
    >

      <SaveFieldBtn v-if="oldValue !== name && !checkError($refs.name) && !disableAcceptField" v-slot:append />
    </q-input>
  </div>
</template>

<script lang="ts">
import {Component, Mixins, Vue, Prop} from 'vue-property-decorator';
import BaseFormMixins from '@/mixins/base-form-mixins';
import SaveFieldBtn from '@/components/SaveField.vue';
import {QInput} from 'quasar';

@Component({
  components: {
    SaveFieldBtn
  },
})
export default class Name extends BaseFormMixins {
  @Prop() propRules: Function[];
  @Prop({default: false, type: Boolean}) disableAcceptField: boolean;

  oldValue = '';
  rules: Function[] = [];

  mounted() {
    this.rules.push(this.inputRules.maxMinlength, ...this.propRules)
    this.oldValue = this.name;
  }


  get name(): string {
    return this.$store.state.userCard.name;
  }

  set name(value: string) {
    this.$store.commit('userCard/setPropertyInStore', {name: 'name', value: this.checkInputValueByRegExp(this.onlyLetters, value)});
  }

  validate(): Promise<boolean> | boolean {
    return (this.$refs.name as QInput).validate();
  }

}
</script>


<style lang="scss">

</style>
