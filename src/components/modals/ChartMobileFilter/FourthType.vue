<template>
  <div class="fourth-type">
    <back-btn
        class="back-btn"
        @go-back="changeType"
    />

    <span class="title">Выберите конкретные даты сдачи</span>
    <span class="subtitle">Если вы хотите посмотреть общую динамику из ключевых промежуточных значений</span>

    <div class="date__main-wrapper">
      <div class="date__wrapper">
        <div
            class="date__item"
            v-for="(result, index) in results"
            :key="index"
        >
          <div class="date__input-date-wrapper">
            <checkbox-input
                :value="result.visible"
                :color="countColor(result)"
                :border-color="countColor(result)"
                @change-value="changeVisible($event, index)"
            />

            <span class="date__date">{{$date(new Date(result.date), 'd MMMM yyyy')}}</span>
          </div>

          <span
              class="date__value"
              :style="{color: countColor(result)}"
          >
            {{result.value}} {{result.laboratory.units}}
          </span>
        </div>
      </div>
    </div>

    <main-btn
        class="btn-accept"
        type="small-bg"
        width="122"
        height="42"
        text="Применить"
    >
      <template v-slot:icon>
        <icon name="gull-icon" class="btn-accept-icon"/>
      </template>
    </main-btn>
  </div>
</template>

<script lang="ts">
  import { Component, Emit, Prop, Vue } from 'vue-property-decorator';
  import { IChart } from '@/interfaces/chart.interface';
  import MainBtn from '@/components/UI/buttons/MainBtn.vue';
  import CheckboxInput from '@/components/UI/inputs/CheckboxInput.vue';
  import BackBtn from '@/components/UI/buttons/BackBtn.vue';

  @Component({
    components: { BackBtn, CheckboxInput, MainBtn },
  })
  export default class FourthType extends Vue {
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

    @Emit('change-type')
    changeType() {
      return 0;
    }
  }
</script>

<style lang="scss" scoped>
  .fourth-type {
    .title {
      display: block;
      color: $black-02;
      font-weight: 600;
      font-size: 14px;
      line-height: 130%;
    }

    .subtitle {
      display: block;
      margin-top: 10px;
      font-weight: normal;
      font-size: 14px;
      line-height: 130%;
      color: $black-03;
    }

    .date {
      &__main-wrapper {
        margin-top: 19px;
        padding-right: 20px;
        max-height: 292px;
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

      &__wrapper {
        display: flex;
        flex-direction: column-reverse;
      }

      &__item {
        margin-top: 5px;
        flex-shrink: 0;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: $light-background;
        border-radius: 10px;
      }

      &__input-date-wrapper {
        display: flex;
        align-items: center;
      }

      &__date {
        margin-left: 12px;
        width: 115px;
        font-weight: normal;
        font-size: 12px;
        line-height: 15px;
        color: $black-02;
      }

      &__value {
        width: 120px;
        font-weight: 500;
        font-size: 12px;
        line-height: 15px;
      }
    }

    .back-btn {
      margin-bottom: 35px;
    }

    .btn-accept {
      margin-top: 35px;

      &-icon {
        width: 12px;
        height: 12px;
        color: $light-white;
      }
    }
  }
</style>
