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

        <tr class="table__tr" v-for="(result, index) in results" :key="index">
          <td class="table__value">{{result.value}}, {{result.laboratory.units}}</td>
          <td colspan="table__ref">{{result.analyzer.ranges.max}}{{result.analyzer.ranges.min}}</td>
          <td class="table__laboratory">{{result.laboratory.name}}</td>
          <td class="table__date">{{$date(new Date(result.date), 'd MMMM yyyy')}}</td>
        </tr>
      </table>

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

    .table {
      border-collapse: separate;
      border-spacing: 0 10px;

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

      max-width: 828px;
      width: 100%;
      margin-top: 30px;

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
        color: $status-green;
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

    .main-wrapper {
      display: flex;
    }

    .right-wrapper {
      margin-top: 70px;
      margin-left: 54px;

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
