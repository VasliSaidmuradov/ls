<template>
  <div class="chart-control">
    <span class="title">Динамика показателя</span>

    <div class="control-wrapper">
      <main-select
          class="select"
          :options="options"
          :value="laboratoryValue"
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
            :value="dateValue"
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

  interface IDatePeriod {
    from: string;
    to: string;
  }

  @Component({
    components: { MainBtn, PeriodsComponent, LaboratoryDesignation, MainSelect },
  })
  export default class ChartControl extends Vue {
    @Prop() laboratoryValue: string;

    options = ['ЛабСтори', 'Helex', 'Все'];
    isDateModalOpen = false;
    dateValue = '';

    toggleDateModal(val: boolean) {
      this.isDateModalOpen = val;
    }

    @Emit('change-date-range')
    changePeriod(obj: IDatePeriod) {
      return [subDays(new Date(obj.from), 0), subDays(new Date(obj.to), 0)];
    }

    @Emit('change-date-range')
    changeRadioDateId(id: number) {
      switch (id) {
        case 1:
          return [subDays(new Date(), 30), new Date()];
        case 2:
          return [subDays(new Date(), 90), new Date()];
        case 3:
          return [subDays(new Date(), 180), new Date()];
        case 4:
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

    .title {
      font-weight: 500;
      font-size: 20px;
      line-height: 120%;
      color: $black-02;
    }

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
