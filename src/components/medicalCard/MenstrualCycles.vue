<template>
  <div class="menstrual-cycles">
    <h4 class="menstrual-cycles__title medical-card__title">
      Менструальные циклы
    </h4>
    <p class="menstrual-cycles__desk">Это важно понимать для чего-то, о чем мы напишем.</p>

    <div class="menstrual-cycles__content">
      <div class="menstrual-cycles__item">
        <label class="form-label" for="firstMenstruation">Возраст первой менструации</label>
        <q-select type="number" id="firstMenstruation"
                  for="firstMenstruation"
                  :options="optionsFirstMenstruation"
                  class="form-select" v-model="firstMenstruation"/>
      </div>

      <div class="menstrual-cycles__item">
        <label class="form-label" for="durationMenstruation">Длительность менструации</label>
        <q-select type="number"
                  class="form-select"
                  :options="optionsDuration"
                  id="durationMenstruation"
                  for="durationMenstruation"
                  v-model="durationMenstruation"/>
      </div>

      <div class="menstrual-cycles__item">
        <label class="form-label" for="cycleDuration">Длительность цикла</label>
        <q-select class="form-select"
                  v-model="cycleDuration"
                  :options="optionsСycle"
                  id="cycleDuration"
                  for="cycleDuration"
                  type="number" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {IMedicalCard, IMedicalCardStore} from '@/interfaces/medical-card.interface';

@Component({})
export default class MenstrualCycles extends Vue {

  optionsFirstMenstruation: IMedicalCard.FirstMenstruation[] = [
    IMedicalCard.FirstMenstruation.ELEVEN,
    IMedicalCard.FirstMenstruation.TEN
  ];

  optionsDuration: IMedicalCard.DurationMenstruation[] = [
    IMedicalCard.DurationMenstruation.ELEVEN,
    IMedicalCard.DurationMenstruation.TEN
  ];

  optionsСycle: IMedicalCard.CycleDuration[] = [
    IMedicalCard.CycleDuration.TEN,
    IMedicalCard.CycleDuration.ELEVEN
  ];

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
  .menstrual-cycles {
    margin: 60px 0;

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

      @include media-breakpoint-up($breakpoint-pre-md) {
        flex-direction: column;
      }
    }

    &__item {
      width: calc(33% - 30px);
      margin-right: 30px;
      box-sizing: content-box;

      .q-field__control-container {
        input {
          padding: 0 0 0 20px;
          max-height: 56px;
        }
      }

      &:last-child {
        margin-right: 0;
      }


      @include media-breakpoint-up($breakpoint-pre-md) {
        width: 100%;
        margin-right: 0;
        margin-bottom: 33px;
      }
    }
  }
</style>
