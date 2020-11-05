<template>
  <div
      class="name-input form-input"
      :class="{'form-input--empty': !name}">
    <q-input
        rounded
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
import { Component, Vue } from 'vue-property-decorator';
import BaseFormMixins from '@/mixins/base-form-mixins';
import SaveFieldBtn from '@/components/SaveField.vue';

@Component({
  mixins: [BaseFormMixins],
  components: {
    SaveFieldBtn
  }
})
export default class Name extends Vue {

  rules: Function[] = [(val: string) => val.length > 2 && val.length <= 20 || 'Please type something']

  oldValue = '';

  mounted() {
    this.oldValue = this.name;
  }


  get name(): string {
    return this.$store.state.userCard.name;
  }

  set name(value: string) {
    this.$store.commit('userCard/setPropertyInStore', {name: 'name', value});
  }

}
</script>


<style lang="scss">
@import "../styles/vars";

</style>
