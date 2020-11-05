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
  mixins: [BaseFormMixins]
})
export default class Dms extends Vue {

  rules: Function[] = [(val: string) => val.length > 2 && val.length <= 20 || 'Please type something']

  oldValue = '';

  mounted() {
    this.oldValue = this.dms;
  }

  get dms(): string {
    return this.$store.state.userCard.dms;
  }

  set dms(value: string) {
    this.$store.commit('userCard/setPropertyInStore', {name: 'dms', value});
  }

}
</script>


<style lang="scss">
@import "../styles/vars";

</style>
