<template>
  <div class="latest-result">
    <LatestResultsCard v-for="order in orderedServices" :key="order.id" :data="order" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { IDashBoard } from '@/interfaces/dashboard.interface';
import LatestResultsCard from '@/components/indexPage/LatestResultsCard.vue';

@Component({
  components: {
    LatestResultsCard,
  },
})
export default class LatestResults extends Vue {
  data: IDashBoard.ILatestResult[] = [];


  get orderedServices() {
    return this.$store.state.dashboard.orderedServices;
  }
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
