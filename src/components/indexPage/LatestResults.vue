<template>
  <div class="latest-result">
    <LatestResultsCard v-for="(item, index) in data" :key="index" :data="item"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {IDashBoard} from '@/interfaces/dashboard.interface';
import LatestResultsCard from '@/components/indexPage/LatestResultsCard.vue';

@Component({
  components: {
    LatestResultsCard
  }
})
export default class LatestResults extends Vue {
  data: IDashBoard.ILatestResult[] = [{
      id: 1,
      category: 'Гормональные исследования',
      name: 'Иммуноблот антинуклеарных антител с комментарием, (антитела против антигенов Sm, RNP/Sm, PSA, GFR< BDS',
      biomarkers: [
        {
          name: 'Определение мочевины в сыворотке крови',
          status: 'Исследуется'
        }, {
          name: 'Определение общего белка',
          status: 'Исследуется'
        }, {
          name: 'Определение мочевины в сыворотке крови',
          status: 'Готово'
        }
      ],
      date: new Date(),
      is_new: true,
    }, {
      id: 2,
      category: 'Гормональные исследования',
      name: 'Иммуноблот антинуклеарных антител с комментарием, (антитела против антигенов Sm, RNP/Sm, PSA, GFR< BDS',
      biomarkers: [
        {
          name: 'Определение мочевины в сыворотке крови',
          status: 'Исследуется'
        }, {
          name: 'Определение общего белка',
          status: 'Исследуется'
        }, {
          name: 'Определение мочевины в сыворотке крови',
          status: 'Готово'
        }
      ],
      date: new Date(),
      is_new: true,
    }, {
      id: 3,
      category: 'Гормональные исследования',
      name: 'Иммуноблот антинуклеарных антител с комментарием, (антитела против антигенов Sm, RNP/Sm, PSA, GFR< BDS',
      biomarkers: [
        {
          name: 'Определение мочевины в сыворотке крови',
          status: 'Исследуется'
        }, {
          name: 'Определение общего белка',
          status: 'Исследуется'
        }, {
          name: 'Определение мочевины в сыворотке крови',
          status: 'Готово'
        }
      ],
      date: new Date(),
      is_new: true,
    }, {
      id: 4,
      category: 'Гормональные исследования',
      name: 'Иммуноблот антинуклеарных антител с комментарием, (антитела против антигенов Sm, RNP/Sm, PSA, GFR< BDS',
      biomarkers: [
        {
          name: 'Определение мочевины в сыворотке крови',
          status: 'Исследуется'
        }, {
          name: 'Определение общего белка',
          status: 'Исследуется'
        }, {
          name: 'Определение мочевины в сыворотке крови',
          status: 'Готово'
        }
      ],
      date: new Date(),
      is_new: true,
    },]
}
</script>

<style lang="scss" scoped>
.latest-result {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 24px;

  @include media-breakpoint-up($breakpoint-pre-md) {
    grid-template-columns: 1fr 1fr;
  }
  @include media-breakpoint-up($breakpoint-sm) {
    grid-template-columns: 1fr;
  }
}

</style>
