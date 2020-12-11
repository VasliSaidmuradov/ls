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

      <laboratory-designation/>
    </div>

    <div class="chart__wrapper">
      <div class="chart__item" v-for="(chart, index) in mainData" :key="index">
        <div class="chart__top-wrapper">
          <div class="chart__top">
            <span class="chart__title">{{chart.name}}</span>

            <main-btn
                class="chart__right-btn"
                type="only-icon"
                border-color="#E9E8FF"
                bcg-color="#ffffff"
                width="20"
                height="20"
            >
              <template v-slot:icon>
                <icon name="next-icon" class="chart__right-btn-icon"/>
              </template>
            </main-btn>

            <main-btn
                class="chart__top-btn"
                type="only-icon"
                border-color="#E9E8FF"
                bcg-color="#ffffff"
                width="20"
                height="20"
            >
              <template v-slot:icon>
                <icon name="next-icon" class="chart__top-btn-icon"/>
              </template>
            </main-btn>
          </div>
        </div>

        <chart-component
            :date-range="dateRange"
            :is-ref-zones-visible="isRefZonesVisible"
            :results="chart.results"
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

  @Component({
    components: {
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

    toggleSelectAnalyzesModal(val: boolean) {
      this.isSelectAnalyzesModalOpen = val;
    }

    toggleDateModal(val: boolean) {
      this.isDateModalOpen = val;
    }

    changeRefZonesVisible(val: boolean) {
      this.isRefZonesVisible = val;
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
    }

    .first-control-wrapper {
      display: flex;
      align-items: center;
      margin-top: 60px;
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
    }

    .select-ref-wrapper {
      display: flex;
      align-items: center;
    }

    .select {
      margin-right: 45px;
    }

    .chart {
      &__wrapper {
        margin-top: 25px;
      }

      &__item {
        width: 800px;
        padding-top: 22px;
        background-color: $light-white;
        border-radius: 15px;
      }

      &__top-wrapper {
        display: flex;
        justify-content: flex-end;
      }

      &__top {
        display: flex;
        align-items: center;
      }

      &__title {
        margin-right: 15px;
        font-weight: 500;
        font-size: 12px;
        line-height: 15px;
        color: $black-02;
      }

      &__right-btn {
        margin-right: 5px;
        border-radius: 5px;

        &-icon {
          width: 4px;
          height: 8px;
          color: $accent-color;
          transform: rotate(180deg);
        }
      }

      &__top-btn {
        margin-right: 20px;
        border-radius: 5px;

        &-icon {
          width: 4px;
          height: 8px;
          color: $accent-color;
          transform: rotate(90deg);
        }
      }
    }
  }
</style>
