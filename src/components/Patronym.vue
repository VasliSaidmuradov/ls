<template>
  <div
      class="patronym-input form-input"
      :class="{'form-input--empty': !patronym}">
    <q-input
        rounded
        v-model="patronym"
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
  mixins: [BaseFormMixins],
  components: {
    SaveFieldBtn
  }
})
export default class Patronym extends Vue {

  rules: Function[] = [(val: string) => val.length > 2 && val.length <= 20 || 'Please type something']

  oldValue = '';

  mounted() {
    this.oldValue = this.patronym;
  }

  get patronym(): string {
    return this.$store.state.userCard.patronym;
  }

  set patronym(value: string) {
    this.$store.commit('userCard/setPropertyInStore', {name: 'patronym', value});
  }

}
</script>


<style lang="scss">
@import "../styles/vars";

</style>
