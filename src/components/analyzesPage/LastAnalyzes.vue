<template>
  <div class="analyzes-page-last-analyzes">
    <span class="title">Последние анализы </span>

    <div class="main-wrapper">
      <table class="table">
        <tr class="table__header">
          <th class="table__header-item">Значение, ед.и.</th>
          <th class="table__header-item">Реф. значения</th>
          <th class="table__header-item">Лаборатория</th>
          <th class="table__header-item">Дата сдачи</th>
        </tr>

        <tr class="table__tr" v-for="(result, index) in results.slice(-5)" :key="index">
          <td class="table__value" :style="{color: countColor(result)}">
            {{result.value}}, {{result.laboratory.units}}
          </td>
          <td colspan="table__ref">
            {{countRanges(result)}}
          </td>
          <td class="table__laboratory">
            {{result.laboratory.name}}
          </td>
          <td class="table__date">
            {{$date(new Date(result.date), 'd MMMM yyyy')}}
          </td>
        </tr>
      </table>

      <!--visible if max-width = 600px-->
      <div class="block__item-wrapper">
        <div class="block__item" v-for="(result, index) in results.slice(-5)" :key="index">
          <div class="block__item-header">
            <span class="block__item-value" :style="{color: countColor(result)}">
              {{result.value}}
            </span>
            <span class="block__item-units">{{result.laboratory.units}}</span>
          </div>
          <div class="block__item-middle">
            {{countRanges(result)}}
          </div>
          <div class="block__item-footer">
            <span class="block__item-date">
              {{$date(new Date(result.date), 'd MMMM yyyy')}}
            </span>
            <span class="block__item-laboratory">
              {{result.laboratory.name}}
            </span>
          </div>
        </div>
      </div>

      <div class="right-wrapper">
        <main-btn
            class="right-wrapper__btn"
            :type="'primary'"
            :text="'Экспортировать таблицу'"
            :width="247"
            :height="56"
            :border-color="'#7C74E9'"
        >
          <template v-slot:icon>
            <icon name="download-icon" class="right-wrapper__btn-icon"/>
          </template>
        </main-btn>

        <span class="right-wrapper__text">Экспорт в формат .pdf</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import { IChart } from '@/interfaces/chart.interface';
  import MainBtn from '@/components/UI/buttons/MainBtn.vue';

  @Component({
    components: { MainBtn },
  })
  export default class LastAnalyzes extends Vue {

    @Prop() results: IChart.IChartItem[];

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

    countRanges(result: IChart.IChartItem): string {
      const { ranges } = result.analyzer;

      return ranges.min !== null && ranges.max !== null
        ? `${ranges.min} - ${ranges.max}`
        : ranges.min !== null
          ? `${ranges.min} >`
          : `< ${ranges.max}`;
    }
  }
</script>

<style lang="scss" scoped>
  .analyzes-page-last-analyzes {
    margin-top: 70px;

    .title {
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 130%;
    }

    .main-wrapper {
      display: flex;
      @include media-breakpoint-up(1290px) {
        flex-direction: column;
      }
    }

    .table {
      border-collapse: separate;
      border-spacing: 0 10px;
      max-width: 828px;
      width: 100%;
      margin-top: 30px;

      @include media-breakpoint-up(600px) {
        display: none;
      }

      td:first-child, th:first-child {
        padding-left: 20px;
      }

      td:first-child {
        border-bottom-left-radius: 10px;
        border-top-left-radius: 10px;
      }

      td:last-child {
        border-bottom-right-radius: 10px;
        border-top-right-radius: 10px;
      }

      &__header-item {
        text-align: left;
        color: $black-04;
        font-weight: normal;
        font-size: 14px;
        line-height: 130%;
      }

      &__tr {
        height: 60px;
        border-radius: 10px;
        background-color: $light-white;
        box-shadow: 0 4px 15px $shadow-color;
      }

      &__value {
        font-weight: 600;
        font-size: 14px;
        line-height: 130%;
      }

      &__ref {
        color: $black-03;
        font-weight: normal;
        font-size: 14px;
        line-height: 130%;
      }

      &__laboratory {
        color: $black-02;
        font-weight: normal;
        font-size: 14px;
        line-height: 130%;
      }

      &__date {
        color: $black-04;
        font-weight: normal;
        font-size: 14px;
        line-height: 130%;
      }
    }

    .block__item + .block__item {
      margin-top: 8px;
    }

    .block__item {
      margin-top: 24px;
      padding: 14px 13px;
      height: 95px;
      border-radius: 20px;
      background-color: $light-white;
      box-shadow: 0 4px 15px $shadow-color;

      &-wrapper {
        display: none;
        @include media-breakpoint-up(600px) {
          display: block;
        }
      }

      &-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      &-middle {
        margin-top: 2px;
        font-weight: normal;
        font-size: 12px;
        line-height: 15px;
        color: $black-03;
      }

      &-footer {
        margin-top: 14px;
        display: flex;
        align-items: center;
      }

      &-value {
        font-weight: 500;
        font-size: 16px;
        line-height: 130%;
      }

      &-date {
        font-weight: 500;
        font-size: 12px;
        line-height: 15px;
        color: $black-04;
      }

      &-laboratory {
        margin-left: 24px;
        font-weight: 500;
        font-size: 12px;
        line-height: 15px;
        color: $black-01;
      }
    }

    .right-wrapper {
      margin-top: 70px;
      margin-left: 54px;
      @include media-breakpoint-up(600px) {
        display: none;
      }

      @include media-breakpoint-up(1290px) {
        margin-left: 0;
        margin-top: 10px;
      }

      &__text {
        margin-top: 10px;
        display: block;
        font-weight: normal;
        font-size: 14px;
        line-height: 130%;
        color: $black-04;
      }

      &__btn-icon {
        width: 24px;
        height: 24px;
        color: $accent-color;
      }
    }
  }
</style>
