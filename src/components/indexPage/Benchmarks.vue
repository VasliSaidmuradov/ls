<template>
  <div class="benchmarks">
    <BenchmarksCard v-for="benchmark in data" :key="benchmark.id" :benchmark="benchmark"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BenchmarksCard from '@/components/indexPage/BenchmarksCard.vue';
import {IDashBoard} from '@/interfaces/dashboard.interface';

@Component({
  components: {
    BenchmarksCard
  }
})
export default class Benchmarks extends Vue {
  data: IDashBoard.IBenchmarks[] = [
    {
      id: 1,
      name: 'Соотношение своб. ПСА к общему',
      unit: '%',
      value: 21.42,
      ranges: {
        min: 0,
        max: 20,
      },
      date: new Date(),
    }, {
      id: 2,
      name: 'ПСА свободный',
      unit: '%',
      value: 21.42,
      ranges: {
        min: null,
        max: 10,
      },
      date: new Date(),
    }, {
      id: 3,
      name: 'ПСА общий',
      unit: 'нг/мл',
      value: 2.1,
      ranges: {
        min: 0,
        max: 4,
      },
      date: new Date(),
    },
    {
      id: 4,
      name: 'Тироксин общий, а целое название вообще длинное в две строки',
      unit: 'нмоль/л',
      value: 210.01,
      ranges: {
        min: 73,
        max: 155,
      },
      date: new Date(),
    }, {
      id: 5,
      name: 'Соотношение своб. ПСА к общему',
      unit: '%',
      value: 21.42,
      ranges: {
        min: 0,
        max: 20,
      },
      date: new Date(),
    }, {
      id: 6,
      name: 'Тироксин общий, а целое название вообще длинное в две строки',
      unit: 'нмоль/л',
      value: 210.01,
      ranges: {
        min: 73,
        max: 155,
      },
      date: new Date(),
    }, {
      id: 7,
      name: 'Тироксин общий, а целое название вообще длинное в две строки',
      unit: 'нмоль/л',
      value: 210.01,
      ranges: {
        min: 73,
        max: null,
      },
      date: new Date(),
    },
  ]

}
</script>

<style lang="scss" scoped>
.benchmarks {
  display: flex;
  flex-direction: column;
}

</style>
