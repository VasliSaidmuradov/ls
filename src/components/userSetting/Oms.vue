<template>
  <div
      class="oms-input form-input"
      :class="{'form-input--empty': !oms}">
    <label for="oms" class="form-label">ОМС</label>
    <q-input
        rounded
        for="oms"
        id="oms"
        v-model="oms"
        :rules="rules"
        :borderless="false"
        ref="oms"
    >

      <SaveFieldBtn v-if="oldValue !== oms && !checkError($refs.oms)" v-slot:append/>
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
  },
})
export default class Oms extends BaseFormMixins {

  rules: Function[] = []

  oldValue = '';

  mounted() {
    this.rules.push(this.inputRules.maxMinlength);
    this.oldValue = this.oms;
  }

  get oms(): string {
    return this.$store.state.userCard.oms;
  }

  set oms(value: string) {
    this.$store.commit('userCard/setPropertyInStore', {name: 'oms', value});
  }

}
</script>


<style lang="scss">
@import "../../styles/vars";

</style>
