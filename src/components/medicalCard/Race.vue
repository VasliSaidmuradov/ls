<template>
  <div class="race-select">
      <div class="medical-card__select form-select">
        <label for="race" class="form-label" @click="showSelectOptions($refs.race)">Раса</label>
        <q-select for="race" id="race" map-options option-label="description" hide-dropdown-icon v-model="race" :options="options" ref="race">
            <div class="select-icon">
              <icon name="select-icon" v-slot:appennd></icon>
            </div>
        </q-select>
      </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BaseFormMixins from '@/mixins/base-form-mixins';
import {IPersonalArea} from '@/interfaces/personal-area.interface';

@Component({
  mixins: [BaseFormMixins],
})
export default class Race extends Vue {

  get options(): IPersonalArea.ISelectOptionsItem[] {
    return this.$store.state.personalArea.selectOptions.races;
  }

  get race(): IPersonalArea.ISelectOptionsItem {
    return this.$store.state.personalArea.medicalCard.race;
  }

  set race({value}: IPersonalArea.ISelectOptionsItem) {
    this.$store.dispatch('personalArea/updateMedicalCardData', {race: value});
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
