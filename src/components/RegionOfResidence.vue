<template>
  <div class="regional-select">
    <div class="form-toggle-btn regional-select__btn">
      <label>Регион проживания</label>
      <q-btn-toggle
          name="regionOfResidence"
          v-model="regionOfResidence"
          padding="13px 25px"
          :options="options"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {IMedicalCard} from '@/interfaces/medical-card.interface';

@Component({})
export default class RegionOfResidence extends Vue {

  options: IMedicalCard.IBaseFormOptions<IMedicalCard.RegionOfResidence>[] = [{
    label: 'Городская местность',
    value: IMedicalCard.RegionOfResidence.URBAN,
  },{
    label: 'Сельская',
    value: IMedicalCard.RegionOfResidence.RURAL,
  }]

  get regionOfResidence(): IMedicalCard.RegionOfResidence {
    return this.$store.state.medicalCard.regionOfResidence;
  }

  set regionOfResidence(value: IMedicalCard.RegionOfResidence) {
    this.$store.commit('medicalCard/setPropertyInStore', {name: 'regionOfResidence', value});
  }

}
</script>

<style lang="scss">
@import "../styles/vars";
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
