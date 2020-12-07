<template>
  <div class="chart-control">
    <span class="title">Динамика показателя</span>

    <div class="control-wrapper">
      <main-select
          class="select"
          :options="options"
          :value="value"
          :border-color="'#E9E8FF'"
          :width="310"
      />

      <laboratory-designation/>

      <periods-component/>

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
            @input="changeValue"
        />
      </q-dialog>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import MainSelect from '@/components/UI/MainSelect.vue';
  import LaboratoryDesignation from '@/components/LaboratoryDesignation.vue';
  import PeriodsComponent from '@/components/PeriodsComponent.vue';
  import MainBtn from '@/components/UI/buttons/MainBtn.vue';


  @Component({
    components: { MainBtn, PeriodsComponent, LaboratoryDesignation, MainSelect },
  })
  export default class AnalyzesPage extends Vue {
    options = ['ss', 'pp'];
    value = 'ss';
    isDateModalOpen = false;
    dateValue = '';

    toggleDateModal(val: boolean) {
      this.isDateModalOpen = val;
    }

    changeValue(value: string) {
      this.dateValue = value;
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
