<template>
  <div class="analyzes-page layout">
    <info-header/>

    <chart-control />

    <div class="chart-dates-wrapper">
      <div class="chart">
        <chart-component
            :data="mainData"
            :date-range="dateRange"
        />

        <div class="chart__bottom">
          <main-btn
              class="chart__btn"
              :text="'Скачать график в .jpeg'"
              :bcg-color="'#ffffff'"
              :type="'small'"
              :height="56"
          >
            <template v-slot:icon>
              <icon name="download-icon" class="chart__btn-icon"/>
            </template>
          </main-btn>

          <checkbox-input
              class="chart__checkbox"
              :label="'Референсные зоны'"
              :border-color="'#63C58A'"
              :color="'#63C58A'"
              :value="isCheckboxValue"
              @change-value="changeCheckboxValue"
          />
        </div>
      </div>

      <choose-specific-dates :results="mainData.results"/>
    </div>


    <look-dynamic/>

    <last-analyzes :results="mainData.results"/>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import InfoHeader from '@/components/analyzesPage/InfoHeader.vue';
  import ChartComponent from '@/components/ChartComponent.vue';
  import { IChart } from '@/interfaces/chart.interface';
  import LastAnalyzes from '@/components/analyzesPage/LastAnalyzes.vue';
  import LookDynamic from '@/components/analyzesPage/LookDynamic.vue';
  import MainBtn from '@/components/UI/buttons/MainBtn.vue';
  import CheckboxInput from '@/components/UI/inputs/CheckboxInput.vue';
  import ChooseSpecificDates from '@/components/analyzesPage/ChooseSpecificDates.vue';
  import ChartControl from '@/components/analyzesPage/ChartControl.vue';

  @Component({
    components: { ChartControl, ChooseSpecificDates, CheckboxInput, MainBtn, LookDynamic, LastAnalyzes, InfoHeader, ChartComponent },
  })
  export default class AnalyzesPage extends Vue {
    isCheckboxValue = false;
    dateRange: Date[] = [new Date(2020, 3, 1), new Date(2020, 9, 30)];
    mainData: IChart.IChart = {
      name: 'Аполипопротеид В',
      results: [
        {
          'date': '2020-04-12',
          'value': 0.1,
          'analyzer': {
            'name': 'AU 680',
            'ranges': {
              'min': 0.6,
              'max': 1.4,
            },
          },
          'laboratory': {
            'name': 'ЛабСтори',
            'units': 'г/л',
          },
        },
        {
          'date': '2020-05-18',
          'value': 0.56,
          'analyzer': {
            'name': 'AU 680',
            'ranges': {
              'min': 0.6,
              'max': 2,
            },
          },
          'laboratory': {
            'name': 'ЛабСтори',
            'units': 'г/л',
          },
        },
        {
          'date': '2020-06-25',
          'value': 0.78,
          'analyzer': {
            'name': 'GTX 1080',
            'ranges': {
              'min': 0.7,
              'max': 1.5,
            },
          },
          'laboratory': {
            'name': 'Helex',
            'units': 'г/л',
          },
        },
        {
          'date': '2020-07-28',
          'value': 1.07,
          'analyzer': {
            'name': 'AU 680',
            'ranges': {
              'min': 0.6,
              'max': 1.4,
            },
          },
          'laboratory': {
            'name': 'ЛабСтори',
            'units': 'г/л',
          },
        },
        {
          'date': '2020-08-16',
          'value': 1.02,
          'analyzer': {
            'name': 'AU 680',
            'ranges': {
              'min': 0.6,
              'max': 1.4,
            },
          },
          'laboratory': {
            'name': 'ЛабСтори',
            'units': 'г/л',
          },
        },
        {
          'date': '2020-08-25',
          'value': 1.27,
          'analyzer': {
            'name': 'AU 680',
            'ranges': {
              'min': 0.6,
              'max': 1.4,
            },
          },
          'laboratory': {
            'name': 'ЛабСтори',
            'units': 'г/л',
          },
        },
        {
          'date': '2020-9-25',
          'value': 1.27,
          'analyzer': {
            'name': 'AU 680',
            'ranges': {
              'min': 0.6,
              'max': 1.4,
            },
          },
          'laboratory': {
            'name': 'ЛабСтори',
            'units': 'г/л',
          },
        },
      ],
    };

    changeCheckboxValue(val: boolean) {
     this.isCheckboxValue = val
    }
  }
</script>

<style lang="scss" scoped>
  .analyzes-page {
    .chart-dates-wrapper {
      margin-top: 40px;
      display: flex;
      align-items: flex-start;
    }

    .chart {
      width: 100%;
      max-width: 722px;
      padding-bottom: 24px;
      background-color: $light-white;
      border-radius: 15px;

      &__btn-icon {
        width: 24px;
        height: 24px;
        color: $accent-color;
      }

      &__bottom {
        display: flex;
        justify-content: space-between;
        align-items: center;
        max-width: 650px;
        margin: 15px auto 0 auto;
      }
    }
  }
</style>
