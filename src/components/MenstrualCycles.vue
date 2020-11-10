<template>
  <div class="menstrual-cycles">
    <h4 class="menstrual-cycles__title medical-card__title">
      Менструальные циклы
    </h4>
    <p class="menstrual-cycles__desk">Это важно понимать для чего-то, о чем мы напишем.</p>

    <div class="menstrual-cycles__content">
      <div class="menstrual-cycles__item">
        <label class="form-label" for="firstMenstruation">Возраст первой менструации</label>
        <q-input type="number" id="firstMenstruation" for="firstMenstruation"  class="form-input" v-model="firstMenstruation"/>
      </div>

      <div class="menstrual-cycles__item">
        <label class="form-label" for="durationMenstruation">Длительность менструации</label>
        <q-input type="number" class="form-input" id="durationMenstruation" for="durationMenstruation" v-model="durationMenstruation"/>
      </div>

      <div class="menstrual-cycles__item">
        <label class="form-label" for="cycleDuration">Длительность цикла</label>
        <q-input class="form-input" v-model="cycleDuration" id="cycleDuration" for="cycleDuration" type="number" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {IMedicalCardStore} from '@/interfaces/medical-card.interface';

@Component({})
export default class MenstrualCycles extends Vue {

  get firstMenstruation(): number {
    return this.$store.state.medicalCard.firstMenstruation;
  }

  set firstMenstruation(value: number) {
    this.$store.commit('medicalCard/setPropertyInStore', {name: 'firstMenstruation', value})
  }

  get durationMenstruation(): number {
    return this.$store.state.medicalCard.durationMenstruation;
  }

  set durationMenstruation(value: number) {
    this.$store.commit('medicalCard/setPropertyInStore', {name: 'durationMenstruation', value})
  }

  get cycleDuration(): number {
    return this.$store.state.medicalCard.cycleDuration;
  }

  set cycleDuration(value: number) {
    this.$store.commit('medicalCard/setPropertyInStore', {name: 'cycleDuration', value})
  }

}
</script>


<style lang="scss">
@import '../styles/vars';

  .menstrual-cycles {
    margin: 60px 0px;

    &__title {
      margin-bottom: 12px;
      margin-top: 0;
    }

    &__desk {
      margin-top: 0;
      margin-bottom: 40px;
      font-size: 14px;
      line-height: 130%;
      color: $black-02;
    }

    &__content {
      display: flex;
      flex-wrap: wrap;
      align-items: flex-end;

      @media (max-width: 1110px) {
        flex-direction: column;
      }
    }

    &__item {
      width: calc(33% - 30px);
      margin-right: 30px;
      box-sizing: content-box;

      .q-field__control-container {
        input {
          padding: 0px 0px 0px 20px;
          max-height: 56px;
        }
      }

      &:last-child {
        margin-right: 0;
      }


      @media (max-width: 1110px) {
        width: 100%;
        margin-right: 0;
        margin-bottom: 33px;
      }
    }
  }
</style>
