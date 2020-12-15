<template>
  <div class="layout dynamics-analyzes">
    <span class="title">Динамика анализов</span>
    <span class="subtitle">
      Вы можете выбрать до 4 разных  биомаркеров и посмотреть их динамикуза определенное время.
    </span>

    <div class="input-analyzes" @click="toggleSelectAnalyzesModal(true)">
      <div class="input-analyzes__icon-wrapper">
        <icon name="search-icon" class="input-analyzes__icon"/>
      </div>
      <span class="input-analyzes__text">Начните вводить анализ</span>
    </div>

    <selected-analyzes-list
        class="selected-analyzes-list"
    />

    <div class="first-control-wrapper">
      <periods-component/>

      <main-btn
          class="date-btn"
          type="primary"
          text="Выберите период"
          border-color="#E9E8FF"
          width="196"
          height="56"
          @click-btn="toggleDateModal(true)"
      >
        <template v-slot:icon>
          <icon name="calendar-icon" class="date-btn-icon"/>
        </template>
      </main-btn>
    </div>

    <div class="second-control-wrapper">
      <div class="select-ref-wrapper">
        <main-select
            class="select"
            :options="laboratoryOptions"
            :value="laboratoryList"
            :multiple="true"
            :select-label="'Выберите лабораторию'"
            :border-color="'#E9E8FF'"
            :width="310"
        />

        <main-toggle
            label="Референсная зона"
            :value="isRefZonesVisible"
            @change-value="changeRefZonesVisible"
        />
      </div>

      <laboratory-designation class="laboratory-designation"/>

      <main-btn
          class="second-control-wrapper__btn"
          bcg-color="#ffffff"
          type="only-icon"
          width="52"
          height="43"
          @click-btn="toggleFilterModal(true)"
      >
        <template v-slot:icon>
          <icon name="filter-icon" class="second-control-wrapper__btn-icon"/>
        </template>
      </main-btn>
    </div>

    <div class="chart__main-wrapper">
      <div class="chart__item" v-for="(chart, index) in mainData" :key="index">
        <div class="chart__top">
          <span class="chart__title">{{chart.name}}</span>

          <div class="chart__top-btn-wrapper">
            <main-btn
                class="chart__first-btn"
                type="only-icon"
                border-color="#E9E8FF"
                bcg-color="#ffffff"
                width="20"
                height="20"
                @click-btn="clickLeftRightBtn(index)"
            >
              <template v-slot:icon>
                <icon
                    name="next-icon"
                    class="chart__first-btn-icon"
                    :class="countArrowBtnLeftRight(index)"
                />
              </template>
            </main-btn>

            <main-btn
                class="chart__second-btn"
                type="only-icon"
                border-color="#E9E8FF"
                bcg-color="#ffffff"
                width="20"
                height="20"
                @click-btn="clickTopBottomBtn(index)"
            >
              <template v-slot:icon>
                <icon
                    name="next-icon"
                    class="chart__second-btn-icon"
                    :class="countArrowBtnTopBottom(index)"
                />
              </template>
            </main-btn>
          </div>

          <!--v-if pre-md breakpoint-->
          <div class="chart__top-btn-wrapper chart__top-btn-wrapper--mobile">
            <main-btn
                class="chart__first-btn"
                type="only-icon"
                border-color="#E9E8FF"
                bcg-color="#ffffff"
                width="20"
                height="20"
                :disabled="index === mainData.length - 1"
                @click-btn="clickBottomBtnMobile(index)"
            >
              <template v-slot:icon>
                <icon
                    name="next-icon"
                    class="chart__second-btn-icon chart__second-btn-icon--bottom"
                />
              </template>
            </main-btn>

            <main-btn
                class="chart__second-btn"
                type="only-icon"
                border-color="#E9E8FF"
                bcg-color="#ffffff"
                width="20"
                height="20"
                :disabled="index === 0"
                @click-btn="clickTopBtnMobile(index)"
            >
              <template v-slot:icon>
                <icon
                    name="next-icon"
                    class="chart__second-btn-icon chart__second-btn-icon--top"
                />
              </template>
            </main-btn>
          </div>
        </div>

        <chart-component
            :date-range="dateRange"
            :is-ref-zones-visible="isRefZonesVisible"
            :results="chart.results"
            :width="616"
            :height="300"
        />
      </div>
    </div>

    <select-analyzes-modal
        :is-select-analyzes-modal-open="isSelectAnalyzesModalOpen"
        @close-modal="toggleSelectAnalyzesModal(false)"
    />

    <q-dialog
        @hide="toggleDateModal(false)"
        v-model="isDateModalOpen"
    >
      <q-date
          range
          v-model="periodValue"
      />
    </q-dialog>

    <chart-mobile-filter
        :is-filter-open="isFilterOpen"
        :results="mainData[0].results"
        @close-modal="toggleFilterModal(false)"
    />
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import SelectedAnalyzesList from '@/components/dynamicsAnalyzes/SelectedAnalyzesList.vue';
  import SelectAnalyzesModal from '@/components/modals/SelectAnalyzesModal.vue';
  import PeriodsComponent from '@/components/PeriodsComponent.vue';
  import MainBtn from '@/components/UI/buttons/MainBtn.vue';
  import MainSelect from '@/components/UI/MainSelect.vue';
  import MainToggle from '@/components/UI/MainToggle.vue';
  import LaboratoryDesignation from '@/components/LaboratoryDesignation.vue';
  import { subDays } from 'date-fns';
  import { IChart } from '@/interfaces/chart.interface';
  import ChartComponent from '@/components/ChartComponent.vue';
  import ChartMobileFilter from '@/components/modals/ChartMobileFilter/ChartMobileFilter.vue';

  @Component({
    components: {
      ChartMobileFilter,
      ChartComponent,
      LaboratoryDesignation,
      MainToggle,
      MainSelect,
      MainBtn,
      PeriodsComponent,
      SelectAnalyzesModal,
      SelectedAnalyzesList,
    },
  })
  export default class DynamicsAnalyzes extends Vue {
    isSelectAnalyzesModalOpen = false;
    periodValue = '';
    isDateModalOpen = false;
    laboratoryOptions = ['ss', 'gg'];
    laboratoryList = ['ss'];
    isRefZonesVisible = false;
    dateRange: Date[] = [subDays(new Date(), 180), new Date()];
    mainData: IChart.IChart[] = [
      {
        name: 'Аполипопротеид A',
        results: [
          {
            'date': '2020-04-12',
            'value': 0.5,
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
      },
      {
        name: 'Аполипопротеид B',
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
      }, {
        name: 'Аполипопротеид C',
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
        ],
      }, {
        name: 'Аполипопротеид D',
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
      }];
    isFilterOpen = false;

    toggleSelectAnalyzesModal(val: boolean) {
      this.isSelectAnalyzesModalOpen = val;
    }

    toggleDateModal(val: boolean) {
      this.isDateModalOpen = val;
    }

    toggleFilterModal(val: boolean) {
      this.isFilterOpen = val;
    }

    changeRefZonesVisible(val: boolean) {
      this.isRefZonesVisible = val;
    }

    countArrowBtnLeftRight(index: number) {
      const rightClass = 'chart__first-btn-icon--right';
      const leftClass = 'chart__first-btn-icon--left';
      let returnedClass = '';

      index % 2 === 0
        ? returnedClass = rightClass
        : returnedClass = leftClass;

      return returnedClass;
    }

    countArrowBtnTopBottom(index: number) {
      const topClass = 'chart__second-btn-icon--top';
      const bottomClass = 'chart__second-btn-icon--bottom';

      if (index === 0 || index === 1) {
        return bottomClass;
      }

      return topClass;
    }

    clickLeftRightBtn(index: number) {
      let timeResults: IChart.IChartItem[] = [];
      let timeName = '';

      if (index === 0) {
        timeResults = this.mainData[0].results;
        this.mainData[0].results = this.mainData[1].results;
        this.mainData[1].results = timeResults;
        timeName = this.mainData[0].name;
        this.mainData[0].name = this.mainData[1].name;
        this.mainData[1].name = timeName;
      } else if (index === 1) {
        timeResults = this.mainData[1].results;
        this.mainData[1].results = this.mainData[0].results;
        this.mainData[0].results = timeResults;
        timeName = this.mainData[1].name;
        this.mainData[1].name = this.mainData[0].name;
        this.mainData[0].name = timeName;
      } else if (index === 2) {
        timeResults = this.mainData[2].results;
        this.mainData[2].results = this.mainData[3].results;
        this.mainData[3].results = timeResults;
        timeName = this.mainData[2].name;
        this.mainData[2].name = this.mainData[3].name;
        this.mainData[3].name = timeName;
      } else if (index === 3) {
        timeResults = this.mainData[3].results;
        this.mainData[3].results = this.mainData[2].results;
        this.mainData[2].results = timeResults;
        timeName = this.mainData[3].name;
        this.mainData[3].name = this.mainData[2].name;
        this.mainData[2].name = timeName;
      }
    }

    clickTopBottomBtn(index: number) {
      let timeResults: IChart.IChartItem[] = [];
      let timeName = '';

      if (index === 0) {
        timeResults = this.mainData[0].results;
        this.mainData[0].results = this.mainData[2].results;
        this.mainData[2].results = timeResults;
        timeName = this.mainData[0].name;
        this.mainData[0].name = this.mainData[2].name;
        this.mainData[2].name = timeName;
      } else if (index === 1) {
        timeResults = this.mainData[1].results;
        this.mainData[1].results = this.mainData[3].results;
        this.mainData[3].results = timeResults;
        timeName = this.mainData[1].name;
        this.mainData[1].name = this.mainData[3].name;
        this.mainData[3].name = timeName;
      } else if (index === 2) {
        timeResults = this.mainData[2].results;
        this.mainData[2].results = this.mainData[0].results;
        this.mainData[0].results = timeResults;
        timeName = this.mainData[2].name;
        this.mainData[2].name = this.mainData[0].name;
        this.mainData[0].name = timeName;
      } else if (index === 3) {
        timeResults = this.mainData[3].results;
        this.mainData[3].results = this.mainData[1].results;
        this.mainData[1].results = timeResults;
        timeName = this.mainData[3].name;
        this.mainData[3].name = this.mainData[1].name;
        this.mainData[1].name = timeName;
      }
    }

    clickBottomBtnMobile(index: number) {
      let timeResults: IChart.IChartItem[] = [];
      let timeName = '';
      const item: IChart.IChart = this.mainData[index];
      const nextItem: IChart.IChart = this.mainData[index + 1];

      timeResults = item.results;
      item.results = nextItem.results;
      nextItem.results = timeResults;
      timeName = item.name;
      item.name = nextItem.name;
      nextItem.name = timeName;
    }

    clickTopBtnMobile(index: number) {
      let timeResults: IChart.IChartItem[] = [];
      let timeName = '';
      const item: IChart.IChart = this.mainData[index];
      const prevItem: IChart.IChart = this.mainData[index - 1];

      timeResults = item.results;
      item.results = prevItem.results;
      prevItem.results = timeResults;
      timeName = item.name;
      item.name = prevItem.name;
      prevItem.name = timeName;
    }
  }
</script>

<style lang="scss">
  .dynamics-analyzes {
    .title {
      display: block;
      font-weight: 500;
      font-size: 36px;
      line-height: 130%;
      color: $black-01;
    }

    .subtitle {
      max-width: 446px;
      margin-top: 20px;
      display: block;
      font-weight: normal;
      font-size: 16px;
      line-height: 22px;
      color: $black-02;
    }

    .input-analyzes {
      width: 100%;
      max-width: 934px;
      height: 56px;
      margin-top: 38px;
      padding: 0 15px;
      display: flex;
      align-items: center;
      background-color: $light-white;
      border-radius: 15px;
      user-select: none;
      cursor: pointer;

      &__icon-wrapper {
        width: 25px;
        height: 25px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 10px;
        background-color: $light-white;
        box-shadow: 0 4px 15px $shadow-color;
      }

      &__icon {
        color: $accent-color;
        width: 9px !important;
        height: 9px !important;
      }

      &__text {
        margin-left: 12px;
        font-weight: normal;
        font-size: 14px;
        line-height: 130%;
        color: $black-03;
      }
    }

    .selected-analyzes-list {
      margin-top: 18px;
      margin-right: -44px;

      @include media-breakpoint-up($breakpoint-lg) {
        margin-right: -30px;
      }

      @include media-breakpoint-up($breakpoint-sm) {
        margin-right: -20px;
      }
    }

    .first-control-wrapper {
      display: flex;
      align-items: center;
      margin-top: 60px;

      @include media-breakpoint-up($breakpoint-lg) {
        display: none;
      }
    }

    .date-btn {
      margin-left: 22px;

      &-icon {
        color: $accent-color;
        width: 24px;
        height: 24px;
      }
    }

    .second-control-wrapper {
      margin-top: 40px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      &__btn {
        box-shadow: 0 4px 15px $shadow-color;
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
    }

    .select-ref-wrapper {
      display: flex;
      align-items: center;
    }

    .select {
      margin-right: 45px;
    }

    .chart {
      &__main-wrapper {
        margin-top: 25px;
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 20px;
        @include media-breakpoint-up($breakpoint-pre-md) {
          grid-template-columns: 1fr;
          grid-gap: 10px;
        }
      }

      &__item {
        padding-top: 22px;
        background-color: $light-white;
        border-radius: 15px;
      }

      &__top {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        @include media-breakpoint-up($breakpoint-pre-md) {
          justify-content: space-between;
        }
      }

      &__top-btn-wrapper {
        display: flex;
        align-items: center;
        @include media-breakpoint-up($breakpoint-pre-md) {
          display: none;
        }

        &--mobile {
          display: none;
          @include media-breakpoint-up($breakpoint-pre-md) {
            display: flex;
          }
        }
      }

      &__title {
        margin: 0 15px;
        font-weight: 500;
        font-size: 12px;
        line-height: 15px;
        color: $black-02;
      }

      &__first-btn {
        margin-right: 5px;
        border-radius: 5px;

        &-icon {
          width: 4px;
          height: 8px;
          color: $accent-color;
        }

        &-icon--right {
          transform: rotate(180deg);
        }

        &-icon--left {
          transform: rotate(0deg);
        }
      }

      &__second-btn {
        margin-right: 20px;
        border-radius: 5px;

        &-icon {
          width: 4px;
          height: 8px;
          color: $accent-color;
        }

        &-icon--top {
          transform: rotate(90deg);
        }

        &-icon--bottom {
          transform: rotate(-90deg);
        }
      }
    }

    .select {
      @include media-breakpoint-up($breakpoint-lg) {
        display: none;
      }
    }

    .laboratory-designation {
      @include media-breakpoint-up($breakpoint-lg) {
        display: none;
      }
    }
  }
</style>
