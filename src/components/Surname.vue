<template>
  <div
      class="surname-input form-input"
      :class="{'form-input--empty': !surname}">
    <q-input
        rounded
        v-model="surname"
        :rules="rules"
        :borderless="false"
        ref="surname"
    >

      <SaveFieldBtn v-if="oldValue !== surname && !checkError($refs.surname)" v-slot:append/>
    </q-input>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SaveFieldBtn from '@/components/SaveField.vue';
import BaseFormMixins from '@/mixins/base-form-mixins';

@Component({
  components: {
    SaveFieldBtn
  },
  mixins: [BaseFormMixins]
})
export default class Name extends Vue {

  rules: Function[] = [(val: string) => val.length > 2 && val.length <= 20 || 'Please type something']

  oldValue = '';

  mounted() {
    this.oldValue = this.surname;
  }

  get surname(): string {
    return this.$store.state.userCard.surname;
  }

  set surname(value: string) {
    this.$store.commit('userCard/setPropertyInStore', {name: 'surname', value});
  }

}
</script>


<style lang="scss">
@import "../styles/vars";

</style>
