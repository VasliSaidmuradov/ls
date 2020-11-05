<template>
  <div class="height-input form-input" :class="{'form-input--empty': !height}">
    <label class="form-label" for="height">Ваш рост</label>
    <q-input
        v-model="height"
        maxlength="10"
        for="height"
        :rules="rules"
        id="height"
        ref="height">
      <InputSuffix
          v-slot:prepend
          suffixText="См"
          :inputText.sync="height"
          :baseOffset="30"
          inputFontStyle="14px inter"
          suffixPosition="left"
      />
    </q-input>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import InputSuffix from '@/components/InputSuffix.vue';

@Component({
  components: {
    InputSuffix
  }
})
export default class Height extends Vue {

  rules: Function[] = [
    (val: number) => val.toString().length || 'обязательно к заполнению',
  ]


  get height() {
    return this.$store.state.medicalCard.height;
  }

  set height (value: any) {
    this.$store.commit('medicalCard/setPropertyInStore', {name: 'height', value: value.match(/[0-9]*/)});
  }

}
</script>

<style lang="scss">
@import "../styles/vars";

  .height-input {
    margin-bottom: 25px;
  }
</style>
