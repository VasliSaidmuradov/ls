<template>
  <div class="third-type">
    <q-date
        range
        v-model="periodValue"
        @input="changePeriod"
    />
  </div>
</template>

<script lang="ts">
  import { Component, Emit, Vue } from 'vue-property-decorator';
  import { IChart } from '@/interfaces/chart.interface';
  import { subDays } from 'date-fns';
  import MainBtn from '@/components/UI/buttons/MainBtn.vue';
  import BackBtn from '@/components/UI/buttons/BackBtn.vue';

  @Component({
    components: { BackBtn, MainBtn },
  })
  export default class ThirdType extends Vue {
    periodValue: IChart.IDatePeriod = {
      from: '',
      to: '',
    };

    @Emit('change-date-range')
    changePeriod(obj: IChart.IDatePeriod) {
      return [subDays(new Date(obj.from), 0), subDays(new Date(obj.to), 0)];
    }
  }
</script>

<style lang="scss" scoped>
  .third-type {
    ::v-deep.q-date {
      min-width: 240px;
      width: 100%;
    }
  }
</style>
