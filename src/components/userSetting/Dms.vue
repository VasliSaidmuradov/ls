<template>
  <div
      class="dms-input form-input"
      :class="{'form-input--empty': !dms}">
    <label for="dms" class="form-label">ДМС</label>
    <q-input
        rounded
        id="dms"
        for="dms"
        v-model="dms"
        :rules="rules"
        :borderless="false"
        ref="dms"
    >
      <SaveFieldBtn v-if="oldValue !== dms && !checkError($refs.dms)" v-slot:append/>
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
export default class Dms extends BaseFormMixins {

  rules: Function[] = [];

  oldValue = '';

  mounted() {
    this.rules.push(this.inputRules.maxMinlength)
    this.oldValue = this.dms;
  }

  get dms(): string {
    return this.$store.state.personalArea.dms;
  }

  set dms(value: string) {
    this.$store.commit('personalArea/setPropertyInStore', {name: 'dms', value});
  }

}
</script>


<style lang="scss">

</style>
