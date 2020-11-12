<template>
  <div class="biological-sex">
    <h4 class="biological-sex__title medical-card__title">Биологический пол</h4>
    <div class="biological-sex__desk">
      <p>Мы уважаем права человека на определение собственной сексуальной ориентации и гендерной принадлежности.</p>
      <p>Однако биологический пол влияет на референсные зоны многих анализов. Для формирования корректных выводов и результатов выберите свой пол:</p>
    </div>

    <div class="biological-sex__controls">
      <label class="form-label">Ваш пол</label>
      <div class="form-toggle-btn">
        <q-btn-toggle
            name="biologicalSex"
            v-model="biologicalSex"
            padding="13px 25px"
            :options="options"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {IMedicalCard} from '@/interfaces/medical-card.interface';

@Component({})
export default class BiologicalSex extends Vue {

  options = [{
    label: 'Мужской',
    value: IMedicalCard.BiologicalSex.MAN,
  },{
    label: 'Женский',
    value: IMedicalCard.BiologicalSex.WOMAN,
  }];


  get biologicalSex(): IMedicalCard.BiologicalSex {
    return this.$store.state.medicalCard.biologicalSex;
  }

  set biologicalSex(value: IMedicalCard.BiologicalSex) {
    this.$store.commit('medicalCard/setPropertyInStore', {name: 'biologicalSex', value})
  }
}
</script>

<style lang="scss">
@import "../../styles/vars";

.biological-sex {
  margin-top: 60px;
  margin-bottom: 80px;

  &__title {
    margin-bottom: 12px;
  }

  &__desk {
    margin-bottom: 40px;

    p {
      margin-top: 0;
      margin-bottom: 15px;
      font-size: 14px;
      line-height: 130%;
      color: $black-01;
    }
  }

  &__controls {
    display: flex;
    flex-direction: column;
  }
}
</style>
