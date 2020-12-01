<template>
  <div class="nationality-select form-select">
    <label for="nationality" class="form-label" @click="showSelectOptions($refs.nationality)">Национальность (выберите страну)</label>
    <q-select id="nationality"
              option-label="description"
              for="nationality"
              v-model="nationality"
              map-options
              hide-dropdown-icon
              :options="options"
              ref="nationality">
      <div class="select-icon">
        <icon name="select-icon" v-slot:appennd ></icon>
      </div>
    </q-select>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BaseFormMixins from '@/mixins/base-form-mixins';
import {QInput} from 'quasar';
import {IPersonalArea, IPersonalAreaStore} from '@/interfaces/personal-area.interface';

export interface IRefs {
  nationality: QInput;
}

@Component({
  mixins: [BaseFormMixins],
})
export default class Nationality extends Vue {

  get options(): IPersonalArea.ISelectOptionsItem[] {
    return this.$store.state.personalArea.selectOptions.countries;
  }

  get nationality(): IPersonalArea.ISelectOptionsItem {
    return this.$store.state.personalArea.medicalCard.country;
  }

  set nationality({value}: IPersonalArea.ISelectOptionsItem) {
    this.$store.dispatch('personalArea/updateMedicalCardData', {country: value})
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
