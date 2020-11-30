<template>
  <div class="analyzes-page layout">
    <chart-component
        :x-data="xData"
        :main-data="mainData"
    />
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import ChartComponent from '@/components/ChartComponent.vue';

  @Component({
    components: { ChartComponent },
  })
  export default class AnalyzesPage extends Vue {
    mainData = {
      'name': 'Аполипопротеид В', // Название биомаркера
      'results': [
        {
          'date': '2020-04-12', // Дата сдачи
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
      ],
    };
    xData: Array<string> = [];

    mounted() {
      this.xData = ['Апрель', 'Май', 'Июнь', 'Июль.', 'Авг.', 'Сент.'];
    }
  }
</script>

<style lang="scss">


</style>
