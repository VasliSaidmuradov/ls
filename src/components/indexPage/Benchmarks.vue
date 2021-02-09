<template>
  <div class="benchmarks">
    <BenchmarksCard v-for="benchmark in dashboardResults" :key="benchmark.id" :benchmark="benchmark" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BenchmarksCard from '@/components/indexPage/BenchmarksCard.vue';
import { IAnalyzes } from '@/interfaces/analyzes.interface';

@Component({
  components: {
    BenchmarksCard,
  },
})
export default class Benchmarks extends Vue {
  get dashboardResults(): IAnalyzes.IAnalyzeResult[] {
    return this.$store.state.dashboard.results;
  }
}
</script>

<style lang="scss" scoped>
.benchmarks {
  display: flex;
  flex-direction: column;
}
</style>
