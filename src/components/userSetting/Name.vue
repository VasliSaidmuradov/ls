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

      <SaveFieldBtn v-if="oldValue !== name && !checkError($refs.name)" v-slot:append />
    </q-input>
  </div>
</template>

<script lang="ts">
import {Component, Mixins, Vue} from 'vue-property-decorator';
import BaseFormMixins from '@/mixins/base-form-mixins';
import SaveFieldBtn from '@/components/SaveField.vue';

@Component({
  components: {
    SaveFieldBtn
  },
})
export default class Name extends BaseFormMixins {

  oldValue = '';
  rules: Function[] = [];

  mounted() {
    this.rules.push(this.inputRules.maxMinlength)
    this.oldValue = this.name;
  }


  get name(): string {
    return this.$store.state.userCard.name;
  }

  set name(value: string) {
    console.log( this.checkInputValueByRegExp(this.onlyLetters, value))
    this.$store.commit('userCard/setPropertyInStore', {name: 'name', value: this.checkInputValueByRegExp(this.onlyLetters, value)});
  }

}
</script>


<style lang="scss">

</style>
