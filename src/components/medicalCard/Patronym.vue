<template>
  <div
      class="patronym-input form-input"
      :class="{'form-input--empty': !patronym}">
    <q-input
        rounded
        v-model="patronym"
        placeholder="Фамилия"
        :rules="rules"
        :borderless="false"
        ref="patronym"
    >
      <SaveFieldBtn v-if="oldValue !== patronym && !checkError($refs.patronym)" v-slot:append/>
    </q-input>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BaseFormMixins from '@/mixins/base-form-mixins';
import SaveFieldBtn from '@/components/SaveField.vue';

@Component({
  components: {
    SaveFieldBtn
  }
})
export default class Patronym extends BaseFormMixins {

  rules: Function[] = []

  oldValue = '';

  mounted() {
    this.rules.push(this.inputRules.maxMinlength)
    this.oldValue = this.patronym;
  }

  get patronym(): string {
    return this.$store.state.userCard.patronym;
  }

  set patronym(value: string) {
    this.$store.commit('userCard/setPropertyInStore', {name: 'patronym', value: this.checkInputValueByRegExp(this.onlyLetters, value)});
  }

}
</script>


<style lang="scss">

</style>
