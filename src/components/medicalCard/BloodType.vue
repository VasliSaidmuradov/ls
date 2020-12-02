<template>
  <div class="blood-type-select form-select">
    <div class="medical-card__select medical-card__blood-type">
      <label @click="showSelectOptions($refs.bloodType)" class="form-label">Группа крови</label>
      <q-select v-model="bloodType" map-options option-label="description" hide-dropdown-icon :options="options" ref="bloodType">
        <div class="select-icon">
          <icon v-slot:appennd name="select-icon"></icon>
        </div>
      </q-select>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BaseFormMixins from '@/mixins/base-form-mixins';
import {IPersonalArea} from '@/interfaces/personal-area.interface';

@Component({})
export default class BloodType extends BaseFormMixins {

  get options(): IPersonalArea.ISelectOptionsItem[] {
    return this.$store.state.personalArea.selectOptions.blood_groups;
  }

  get bloodType(): IPersonalArea.ISelectOptionsItem {
    return this.$store.state.personalArea.medicalCard.blood_group;
  }

  set bloodType(value: IPersonalArea.ISelectOptionsItem) {
    this.$store.dispatch('personalArea/updateMedicalCardData', {blood_group: value.value})
  }

}
</script>
