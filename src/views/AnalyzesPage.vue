<template>
  <div class="analyzes-page layout">
    <chart-component
        :data="mainData"
        :date-range="dateRange"
    />
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
      ],
    };
  }
</script>

<style lang="scss">


</style>
