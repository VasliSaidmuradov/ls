<template>
  <div class="analyzes-page layout">
    <chart-component
        :data="mainData"
        :date-range="dateRange"
    />

    <button @click="clickBtn1">1</button>
    <button @click="clickBtn2">2</button>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import ChartComponent from '@/components/ChartComponent.vue';
  import { IChart } from '@/interfaces/chart.interface';

  @Component({
    components: { ChartComponent },
  })
  export default class AnalyzesPage extends Vue {
    dateRange: Date[] = [new Date(2020, 3, 1), new Date(2020, 7, 30)];
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
              'max': 1.4,
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
          'date': '2020-06-30',
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
      ],
    };

    clickBtn1() {
      this.dateRange = [new Date(2020, 3, 1), new Date(2020, 7, 30)];
      this.mainData = {
        'name': 'Аполипопротеид В', // Название биомаркера
        'results': [
          {
            'date': '2020-04-12', // Дата сдачи  //12 апреля 2020
            'value': 0.1, // Результат анализа
            'analyzer': { // Аппарат на котором проводилось исследование
              'name': 'AU 680',
              'ranges': { // Реф. зоны этого аппарата
                'min': 0.6,
                'max': 1.4,
              },
            },
            'laboratory': {
              'name': 'ЛабСтори', // Лаборатория в которой проводилось исследование
              'units': 'г/л', // Ед. изм.
            },
          },
          {
            'date': '2020-05-18',//18 мая 2020
            'value': 0.56,
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
            'date': '2020-06-25',//25 июня 2020
            'value': 0.78,
            'analyzer': { // Тут пример, когда анализ сдавался в другой лаборатори и в ней использовался другой аппарат с другими реф. зонами
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
            'date': '2020-07-28',//28 июля 2020
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
            'date': '2020-08-16',//16 августа 2020
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
            'date': '2020-08-25',//25 августа 2020
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
    }

    clickBtn2() {
      this.dateRange = [new Date(2020, 2, 1), new Date(2020, 2, 30)];
      this.mainData = {
        'name': 'Аполипопротеид В', // Название биомаркера
        'results': [
          {
            'date': '2020-03-12', // Дата сдачи  //1 марта 2020
            'value': 0.1, // Результат анализа
            'analyzer': { // Аппарат на котором проводилось исследование
              'name': 'AU 680',
              'ranges': { // Реф. зоны этого аппарата
                'min': 0.6,
                'max': 1.4,
              },
            },
            'laboratory': {
              'name': 'ЛабСтори', // Лаборатория в которой проводилось исследование
              'units': 'г/л', // Ед. изм.
            },
          },
          // {
          //   'date': '2020-03-18',//18 марта2020
          //   'value': 0.56,
          //   'analyzer': {
          //     'name': 'AU 680',
          //     'ranges': {
          //       'min': 0.6,
          //       'max': 1.4,
          //     },
          //   },
          //   'laboratory': {
          //     'name': 'ЛабСтори',
          //     'units': 'г/л',
          //   },
          // },
          // {
          //   'date': '2020-03-25',//25 марта 2020
          //   'value': 0.78,
          //   'analyzer': { // Тут пример, когда анализ сдавался в другой лаборатори и в ней использовался другой аппарат с другими реф. зонами
          //     'name': 'GTX 1080',
          //     'ranges': {
          //       'min': 0.7,
          //       'max': 1.5,
          //     },
          //   },
          //   'laboratory': {
          //     'name': 'Helex',
          //     'units': 'г/л',
          //   },
          // },
        ],
      };
    }

  }
</script>

<style lang="scss">


</style>
