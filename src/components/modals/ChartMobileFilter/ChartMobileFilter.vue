<template>
  <q-dialog
      :position="'bottom'"
      :value="isFilterOpen"
      @hide="closeModal"
  >
    <div class="modal">
      <icon name="close-icon" class="modal__close" v-close-popup/>

      <main-type
          v-if="type === 0"
          @change-type="changeType"
      />

      <first-type
          :laboratory-list="countAllLaboratory"
          v-if="type === 1"
          @change-type="changeType"
      />

      <second-type
          v-if="type === 2"
          @change-type="changeType"
      />

      <fourth-type
          :results="results"
          v-if="type === 3"
          @change-type="changeType"
      />

      <div class="modal__footer" v-if="type === 0">
        <main-btn
            class="modal__footer-btn-accept"
            type="small-bg"
            width="122"
            height="42"
            text="Применить"
            @click-btn="applyChanges"
        >
          <template v-slot:icon>
            <icon name="gull-icon" class="modal__footer-btn-accept-icon"/>
          </template>
        </main-btn>

        <main-btn
            v-if="type === 0"
            class="modal__footer-btn-reset"
            type="small"
            bcg-color="#ffffff"
            height="42"
            text="Сбросить фильтр"
            @click-btn="resetResults"
        >
          <template v-slot:icon>
            <icon name="close-icon" class="modal__footer-btn-reset-icon"/>
          </template>
        </main-btn>
      </div>
    </div>
  </q-dialog>
</template>

<script lang="ts">
  import { Component, Emit, Prop, Vue } from 'vue-property-decorator';
  import MainBtn from '@/components/UI/buttons/MainBtn.vue';
  import MainType from '@/components/modals/ChartMobileFilter/MainType.vue';
  import FirstType from '@/components/modals/ChartMobileFilter/FirstType.vue';
  import { IChart } from '@/interfaces/chart.interface';
  import SecondType from '@/components/modals/ChartMobileFilter/SecondType.vue';
  import ThirdType from '@/components/modals/ChartMobileFilter/ThirdType.vue';
  import FourthType from '@/components/modals/ChartMobileFilter/FourthType.vue';

  @Component({
    components: { FourthType, ThirdType, SecondType, FirstType, MainType, MainBtn },
  })
  export default class ChartMobileFilter extends Vue {

    @Prop({ required: true }) isFilterOpen: boolean;
    @Prop() results: IChart.IChartItem[];

    type = 0;

    get countAllLaboratory() {
      const laboratoryList: Array<string> = [];
      laboratoryList.push('Все');

      this.results.forEach(result => {
        laboratoryList.push(result.laboratory.name);
      });

      return new Set(laboratoryList);
    }

    @Emit('close-modal')
    closeModal() {
      return false;
    }

    changeType(val: number) {
      this.type = val;
    }

    @Emit('apply-changes')
    applyChanges() {
      // return this.copyResults;
    }

    resetResults() {
      // this.copyResults = JSON.parse(JSON.stringify(this.results));
    }
  }
</script>

<style lang="scss" scoped>
  .modal {
    position: relative;
    width: 100%;
    margin: 0 20px;
    background-color: $light-white;
    border-radius: 25px 25px 0 0;
    padding: 30px 20px 50px 20px;

    &__close {
      position: absolute;
      top: 22px;
      right: 22px;
      width: 11px;
      height: 11px;
      color: $accent-color;
      cursor: pointer;
    }

    &__title {
      font-weight: 600;
      font-size: 14px;
      line-height: 130%;
    }

    &__footer {
      margin-top: 35px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      &-btn-accept-icon {
        width: 12px;
        height: 12px;
        color: $light-white;
      }

      &-btn-reset-icon {
        color: $red-color;
        width: 9px;
        height: 9px;
      }
    }
  }
</style>
