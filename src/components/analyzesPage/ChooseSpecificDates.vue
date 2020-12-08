<template>
  <div class="choose-specific-dates">
    <span class="title">Выберите конкретные даты сдачи</span>
    <span class="subtitle">Если вы хотите посмотреть общую динамику из ключевых промежуточных значений</span>


    <div class="date__main-wrapper">
      <div class="date__wrapper">
        <div
            class="date__item"
            v-for="(result, index) in results"
            :key="index"
        >
          <span
              class="date__value"
              :style="{color: countColor(result)}"
          >
            {{result.value}} {{result.laboratory.units}}
          </span>
          <span class="date__date">
            {{$date(new Date(result.date), 'd MMMM yyyy')}}
          </span>
          <checkbox-input
              :value="result.visible"
              :color="countColor(result)"
              :border-color="countColor(result)"
              @change-value="changeVisible($event, index)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Emit, Prop, Vue } from 'vue-property-decorator';
  import { IChart } from '@/interfaces/chart.interface';
  import CheckboxInput from '@/components/UI/inputs/CheckboxInput.vue';

  @Component({
    components: { CheckboxInput },
  })
  export default class ChooseSpecificDates extends Vue {
    @Prop() results: IChart.IChartItem[];

    @Emit('change-visible')
    changeVisible(e: boolean, index: number) {
      return { e, index };
    }

    countColor(result: IChart.IChartItem): string {
      const green = '#63C58A';
      const red = '#FF7C7C';
      const value = result.value;
      const min = result.analyzer.ranges.min || 0;
      const max = result.analyzer.ranges.max || 0;

      if (value < min || value > max) {
        return red;
      }

      return green;
    }

  }
</script>

<style lang="scss" scoped>
  .choose-specific-dates {
    margin-left: 20px;

    .title {
      display: block;
      font-weight: 600;
      font-size: 14px;
      line-height: 130%;
      color: $black-02;
    }

    .subtitle {
      margin-top: 10px;
      display: block;
      font-weight: normal;
      font-size: 14px;
      line-height: 130%;
      color: $black-03;
    }

    .date__item + .date__item {
      margin-top: 10px;
    }

    .date {
      &__main-wrapper {
        margin-top: 20px;
        border: 1px solid $light-stroke;
        border-radius: 15px;
      }

      &__wrapper {
        margin: 20px 25px 20px 30px;
        padding-right: 20px;
        max-height: 324px;
        overflow: auto;

        &::-webkit-scrollbar {
          width: 2px;
        }

        &::-webkit-scrollbar-track {
          background-color: $black-04;
        }

        &::-webkit-scrollbar-thumb {
          border-radius: 8px;
          background-color: $accent-color;
        }
      }

      &__item {
        height: 49px;
        display: flex;
        align-items: center;
        justify-content: space-around;
        background-color: $light-white;
        border-radius: 10px;
        box-shadow: 0 4px 15px $shadow-color;
      }

      &__value {
        width: 120px;
        font-weight: 500;
        font-size: 12px;
        line-height: 15px;
      }

      &__date {
        width: 110px;
        font-weight: normal;
        font-size: 12px;
        line-height: 15px;
        color: $black-02;
      }
    }
  }
</style>
