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
                  option-label="description"
                  map-options
                  :options="optionsFirstMenstruation"
                  class="form-select" v-model="firstMenstruation"/>
      </div>

      <div class="menstrual-cycles__item">
        <label class="form-label" for="durationMenstruation">Длительность менструации</label>
        <q-select type="number"
                  class="form-select"
                  :options="optionsDuration"
                  option-label="description"
                  id="durationMenstruation"
                  map-options
                  for="durationMenstruation"
                  v-model="durationMenstruation"/>
      </div>

      <div class="menstrual-cycles__item">
        <label class="form-label" for="cycleDuration">Длительность цикла</label>
        <q-select class="form-select"
                  v-model="cycleDuration"
                  :options="optionsСycle"
                  map-options
                  option-label="description"
                  id="cycleDuration"
                  for="cycleDuration"
                  type="number" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {IMedicalCard, IPersonalArea} from '@/interfaces/personal-area.interface';

@Component({})
export default class MenstrualCycles extends Vue {

  get optionsСycle(): IPersonalArea.ISelectOptionsItem[] {
    return this.$store.state.personalArea.selectOptions.menstruation_cycles;
  }

  get optionsDuration(): IPersonalArea.ISelectOptionsItem[] {
    return this.$store.state.personalArea.selectOptions.menstruation_durations;
  }

  get optionsFirstMenstruation(): IPersonalArea.ISelectOptionsItem[] {
    return this.$store.state.personalArea.selectOptions.menstruation_starts;
  }

  get firstMenstruation(): IPersonalArea.ISelectOptionsItem {
    return this.$store.state.personalArea.medicalCard.menstruation_start;
  }

  set firstMenstruation({value}: IPersonalArea.ISelectOptionsItem) {
    this.$store.dispatch('personalArea/updateMedicalCardData', {menstruation_start: value})
  }

  get durationMenstruation(): IPersonalArea.ISelectOptionsItem {
    return this.$store.state.personalArea.medicalCard.menstruation_duration;
  }

  set durationMenstruation({value}: IPersonalArea.ISelectOptionsItem) {
    this.$store.dispatch('personalArea/updateMedicalCardData', {menstruation_duration: value})
  }

  get cycleDuration(): IPersonalArea.ISelectOptionsItem {
    return this.$store.state.personalArea.medicalCard.menstruation_cycle;
  }

  set cycleDuration({value}: IPersonalArea.ISelectOptionsItem) {
    this.$store.dispatch('personalArea/updateMedicalCardData', {menstruation_cycle: value})
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
