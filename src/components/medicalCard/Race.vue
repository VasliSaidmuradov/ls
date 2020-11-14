<template>
  <div class="race-select">
      <div class="medical-card__select form-select">
        <label for="race" class="form-label" @click="showSelectOptions($refs.race)">Раса</label>
        <q-select for="race" id="race" hide-dropdown-icon v-model="race" :options="options" ref="race">
            <div class="select-icon">
              <icon name="select-icon" v-slot:appennd></icon>
            </div>
        </q-select>
      </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {IMedicalCard} from '@/interfaces/medical-card.interface';
import BaseFormMixins from '@/mixins/base-form-mixins';

@Component({
  mixins: [BaseFormMixins],
})
export default class Race extends Vue {

  options: IMedicalCard.Race[] = [
    IMedicalCard.Race.CAUCASIAN,
    IMedicalCard.Race.NEGROID
  ];

  get race(): IMedicalCard.Race {
    return this.$store.state.medicalCard.race;
  }

  set race(value: IMedicalCard.Race) {
    this.$store.commit('medicalCard/setPropertyInStore', {name: 'race', value});
  }

}
</script>


<style lang="scss">

  .race-select {
    margin-bottom: 25px;

    label {
      font-weight: 500;
      font-size: 13px;
      color: $black-02;
      margin-bottom: 8px;
    }
  }
</style>
