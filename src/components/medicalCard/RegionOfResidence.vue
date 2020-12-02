<template>
  <div class="regional-select">
    <div class="form-toggle-btn regional-select__btn">
      <label>Регион проживания</label>
      <q-btn-toggle
          name="regionOfResidence"
          v-model="regionOfResidence"
          padding="13px 25px"
          :options="regionTypes"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {IMedicalCard, IPersonalArea} from '@/interfaces/personal-area.interface';

@Component({})
export default class RegionOfResidence extends Vue {

  get regionTypes(): {label: string; value: string | number}[] {
    return this.$store.state.personalArea.selectOptions?.region_types
        ?.map((item: IPersonalArea.ISelectOptionsItem) => {
          return {
            label: item.description,
            value: item.value,
          }
        })
  }

  get regionOfResidence(): number {
    return this.$store.state.personalArea.medicalCard.region_type;
  }

  set regionOfResidence(value: number) {
    this.$store.dispatch('personalArea/updateMedicalCardData', {region_type: value});
  }

}
</script>

<style lang="scss">
 .regional-select {
   &__btn {
     display: flex;
     flex-direction: column;
     margin-bottom: 75px;

     label {
       display: block;
       font-weight: 500;
       font-size: 13px;
       color: $black-02;
       margin-bottom: 8px;
     }
    }
 }
</style>
