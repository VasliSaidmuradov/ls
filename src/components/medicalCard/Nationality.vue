<template>
  <div class="nationality-select form-select">
    <label for="nationality" class="form-label" @click="showSelectOptions($refs.nationality)">Национальность (выберите страну)</label>
    <q-select id="nationality" for="nationality" v-model="nationality" hide-dropdown-icon :options="options" ref="nationality">
      <div class="select-icon">
        <icon name="select-icon" v-slot:appennd ></icon>
      </div>
    </q-select>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {IMedicalCard} from '@/interfaces/medical-card.interface';
import BaseFormMixins from '@/mixins/base-form-mixins';

@Component({
  mixins: [BaseFormMixins],
})
export default class Nationality extends Vue {
  options: IMedicalCard.Nationality[] = [
    IMedicalCard.Nationality.BELARUS,
    IMedicalCard.Nationality.UKRAINE,
  ]

  get nationality(): IMedicalCard.Nationality {
    return this.$store.state.medicalCard.nationality;
  }

  set nationality(value: IMedicalCard.Nationality) {
    this.$store.commit('medicalCard/setPropertyInStore', {name: 'nationality', value});
  }
}
</script>


<style lang="scss">

.nationality-select {
  margin-bottom: 25px;

  label {
    font-weight: 500;
    font-size: 13px;
    color: $black-02;
    margin-bottom: 8px;
  }
}
</style>
