<template>
  <div class="chart-control">

    <div class="control-wrapper">
      <main-select
          class="select"
          :options="laboratoryOptions"
          :value="laboratoryList"
          :multiple="true"
          :border-color="'#E9E8FF'"
          :width="310"
          @input-select="inputSelect"
      />

      <laboratory-designation/>

      <periods-component
          @change-value="changeRadioDateId"
      />

      <main-btn
          type="primary"
          text="Выберите период"
          border-color="#E9E8FF"
          width="196"
          height="56"
          @click-btn="toggleDateModal(true)"
      >
        <template v-slot:icon>
          <icon name="calendar-icon" class="btn-icon"/>
        </template>
      </main-btn>

      <q-dialog
          @hide="toggleDateModal(false)"
          v-model="isDateModalOpen"
      >
        <q-date
            range
            v-model="periodValue"
            @input="changePeriod"
        />
      </q-dialog>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Emit, Prop, Vue } from 'vue-property-decorator';
  import MainSelect from '@/components/UI/MainSelect.vue';
  import LaboratoryDesignation from '@/components/LaboratoryDesignation.vue';
  import PeriodsComponent from '@/components/PeriodsComponent.vue';
  import MainBtn from '@/components/UI/buttons/MainBtn.vue';
  import { subDays } from 'date-fns';
  import { IChart } from '@/interfaces/chart.interface';

  @Component({
    components: { MainBtn, PeriodsComponent, LaboratoryDesignation, MainSelect },
  })
  export default class ChartControl extends Vue {
    @Prop() laboratoryList: Array<string>;
    @Prop() laboratoryOptions: Array<string>

    isDateModalOpen = false;
    periodValue: IChart.IDatePeriod = {
      from: '',
      to: '',
    };

    toggleDateModal(val: boolean) {
      this.isDateModalOpen = val;
    }

    @Emit('change-date-range')
    changePeriod(obj: IChart.IDatePeriod) {
      return [subDays(new Date(obj.from), 0), subDays(new Date(obj.to), 0)];
    }

    @Emit('change-date-range')
    changeRadioDateId(index: number) {
      switch (index) {
        case 0:
          return [subDays(new Date(), 30), new Date()];
        case 1:
          return [subDays(new Date(), 90), new Date()];
        case 2:
          return [subDays(new Date(), 180), new Date()];
        case 3:
          return [subDays(new Date(), 365), new Date()];
      }
    }

    @Emit('choose-laboratory')
    inputSelect(val: string) {
      return val;
    }
  }
</script>

<style lang="scss" scoped>
  .chart-control {
    margin-top: 60px;

    .control-wrapper {
      margin-top: 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .btn-icon {
      color: $accent-color;
      width: 24px;
      height: 24px;
    }
  }
</style>
