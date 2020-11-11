<template>
  <div class="blood-type-select form-select">
    <div class="medical-card__select medical-card__blood-type">
      <label @click="showSelectOptions($refs.bloodType)" class="form-label">Группа крови</label>
      <q-select v-model="bloodType" hide-dropdown-icon :options="options" ref="bloodType">
        <div class="select-icon">
          <icon v-slot:appennd name="select-icon"></icon>
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
export default class BloodType extends Vue {
  options: IMedicalCard.BloodType[] = [
    IMedicalCard.BloodType.FIRST_POSITIVE,
    IMedicalCard.BloodType.FIRST_NEGATIVE,
  ]

  get bloodType(): IMedicalCard.BloodType {
    return this.$store.state.medicalCard.bloodType;
  }

  set bloodType(value: IMedicalCard.BloodType) {
    this.$store.commit('medicalCard/setPropertyInStore', {name: 'bloodType', value});
  }

}
</script>
