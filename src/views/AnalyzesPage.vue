<template>
  <div class="analyzes-page layout">
    <back-btn class="back-btn" @go-back="$router.go(-1)"/>

    <info-header :results="mainData.results"/>

    <span class="middle-title">Динамика показателя</span>

    <div class="options-wrapper">
      <q-toggle
          label="Референсная зона"
          :value="isRefZonesVisible"
          @input="changeRefZonesVisible"
      />

      <main-btn
          class="options-wrapper__filter-btn"
          bcg-color="#ffffff"
          type="only-icon"
          width="52"
          height="43"
          @click-btn="toggleFilterModal(true)"
      >
        <template v-slot:icon>
          <icon name="filter-icon" class="options-wrapper__filter-btn-icon"/>
        </template>
      </main-btn>
    </div>

    <laboratory-designation class="laboratory-designation"/>

    <chart-control
        class="control"
        :laboratory-list="laboratoryList"
        :laboratory-options="countAllLaboratory"
        @choose-laboratory="chooseLaboratory"
        @change-date-range="changeDateRange"
    />

    <div class="chart-dates-wrapper">
      <div class="chart">
        <chart-component
            :results="countResults"
            :date-range="dateRange"
            :is-ref-zones-visible="isRefZonesVisible"
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
              :value="isRefZonesVisible"
              @change-value="changeRefZonesVisible"
          />
        </div>
      </div>

      <choose-specific-dates
          class="specific-dates"
          :results="data.results"
          @change-visible="changeVisible"
      />
    </div>

    <main-btn
        class="chart__btn chart__btn--media-small"
        :text="'Скачать график в .jpeg'"
        :bcg-color="'transparent'"
        :type="'small'"
        :height="56"
    >
      <template v-slot:icon>
        <icon name="download-icon" class="chart__btn-icon"/>
      </template>
    </main-btn>

    <look-dynamic/>

    <last-analyzes :results="mainData.results"/>

    <chart-mobile-filter
        :is-filter-open="isFilterOpen"
        :results="mainData.results"
        @apply-changes="changeResults"
        @close-modal="toggleFilterModal(false)"
    />
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
  import { isAfter, isBefore, subDays } from 'date-fns';
  import LaboratoryDesignation from '@/components/LaboratoryDesignation.vue';
  import BackBtn from '@/components/UI/buttons/BackBtn.vue';
  import ChartMobileFilter from '@/components/modals/ChartMobileFilter/ChartMobileFilter.vue';

  interface IChangeVisibleObject {
    e: boolean;
    index: number;
  }

  @Component({
    components: {
      ChartMobileFilter,
      BackBtn,
      LaboratoryDesignation,
      ChartControl,
      ChooseSpecificDates,
      CheckboxInput,
      MainBtn,
      LookDynamic,
      LastAnalyzes,
      InfoHeader,
      ChartComponent,
    },
  })
  export default class AnalyzesPage extends Vue {
    isRefZonesVisible = true;
    dateRange: Date[] = [subDays(new Date(), 180), new Date()];
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
          visible: true,
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
          visible: true,
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
          visible: true,
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
          visible: true,
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
          visible: true,
        },
        {
          'date': '2020-08-25',
          'value': 1.45,
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
          visible: true,
        },
        {
          'date': '2020-9-25',
          'value': 1.41,
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
          visible: true,
        },
      ],
    };
    data: IChart.IChart = JSON.parse(JSON.stringify(this.mainData));
    laboratoryList: Array<string> = ['Все'];
    isFilterOpen = false;

    get countResults() {
      this.filterDateResults;
      // this.filterLaboratoryResults;
      return this.filterVisibleResults;
    }

    get filterVisibleResults() {
      return this.data.results.filter(result => result.visible === true);
    }

    get filterDateResults() {
      const filteredResults: IChart.IChartItem[] = [];

      this.mainData.results.forEach(result => {
        if (isBefore(subDays(new Date(result.date), 0), this.dateRange[1])
          && isAfter(subDays(new Date(result.date), 0), this.dateRange[0])) {
          filteredResults.push(result);
        }
      });

      this.data.results = filteredResults;
      return this.data.results;
    }

    get filterLaboratoryResults() {
      if (this.laboratoryList[0] === 'Все') {
        return this.data.results;
      }

      this.data.results = this.data.results.filter(result => result.laboratory.name === this.laboratoryList[0]);
      return this.data.results;
    }

    get countAllLaboratory() {
      const laboratoryList: Array<string> = [];
      laboratoryList.push('Все');

      this.mainData.results.forEach(result => {
        laboratoryList.push(result.laboratory.name);
      });

      const uniqLaboratoryList: Array<string> = [];

      new Set(laboratoryList).forEach(laboratory => {
        uniqLaboratoryList.push(laboratory);
      });

      return uniqLaboratoryList;
    }

    changeDateRange(val: Date[]) {
      this.dateRange = val;
    }

    changeRefZonesVisible(val: boolean) {
      this.isRefZonesVisible = val;
    }

    changeVisible(obj: IChangeVisibleObject) {
      const { e, index } = obj;

      this.data.results[index].visible = e;
    }

    chooseLaboratory(val: Array<string>) {
      this.laboratoryList = val;
    }

    toggleFilterModal(val: boolean) {
      this.isFilterOpen = val;
    }

    changeResults(newResults: IChart.IChartItem[]) {
      // this.data.results = newResults;
    }
  }
</script>

<style lang="scss" scoped>
  .analyzes-page {
    .back-btn {
      display: none;
      @include media-breakpoint-up($breakpoint-sm) {
        display: block;
        position: absolute;
        top: 30px;
      }
    }

    .middle-title {
      margin-top: 60px;
      display: block;
      font-weight: 500;
      font-size: 20px;
      line-height: 120%;
      color: $black-02;
      @include media-breakpoint-up($breakpoint-lg) {
        margin-top: 48px;
      }
    }

    .options-wrapper {
      display: none;
      @include media-breakpoint-up($breakpoint-lg) {
        max-width: 722px;
        width: 100%;
        margin-top: 34px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      &__filter-btn {
        box-shadow: 0 4px 15px $shadow-color;
      }

      &__filter-btn-icon {
        width: 24px;
        height: 24px;
        color: $accent-color;
      }
    }

    .chart-dates-wrapper {
      margin-top: 40px;
      display: flex;
      align-items: flex-start;
      @include media-breakpoint-up($breakpoint-lg) {
        margin-top: 12px;
      }
    }

    .chart {
      width: 100%;
      max-width: 722px;
      padding-bottom: 24px;
      background-color: $light-white;
      border-radius: 15px;

      &__btn--media-small {
        display: none;
        @include media-breakpoint-up($breakpoint-lg) {
          display: block;
        }
      }

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
        @include media-breakpoint-up($breakpoint-lg) {
          display: none;
        }
      }
    }

    .specific-dates {
      @include media-breakpoint-up($breakpoint-lg) {
        display: none;
      }
    }

    .control {
      @include media-breakpoint-up($breakpoint-lg) {
        display: none;
      }
    }

    .laboratory-designation {
      display: none;
      @include media-breakpoint-up($breakpoint-lg) {
        margin-top: 36px;
        display: flex;
      }
    }
  }
</style>
