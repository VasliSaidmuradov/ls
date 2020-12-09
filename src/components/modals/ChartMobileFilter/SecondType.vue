<template>
  <div class="second-type">
    <back-btn
        class="back-btn"
        @go-back="changeType"
    />

    <template v-if="localType === 1">
      <span class="title">Выберите период</span>

      <div
          class="period"
          :class="{'period--active': index === active}"
          v-for="(period, index) in periodList"
          :key="index"
          @click="active = index"
      >
        {{period}}
      </div>

      <div
          class="period"
          :class="{'period--active': active === periodList.length}"
          @click="localType = 2"
      >
        <span class="period-title">Произвольный период</span>
        <span class="period-value">
        C 25 марта 2019 по 12 января  2020
      </span>
      </div>
    </template>

    <third-type
        v-if="localType === 2"
    />

    <main-btn
        class="btn-accept"
        type="small-bg"
        width="122"
        height="42"
        text="Применить"
    >
      <template v-slot:icon>
        <icon name="gull-icon" class="btn-accept-icon"/>
      </template>
    </main-btn>
  </div>
</template>

<script lang="ts">
  import { Component, Emit, Vue } from 'vue-property-decorator';
  import { IChart } from '@/interfaces/chart.interface';
  import BackBtn from '@/components/UI/buttons/BackBtn.vue';
  import MainBtn from '@/components/UI/buttons/MainBtn.vue';
  import ThirdType from '@/components/modals/ChartMobileFilter/ThirdType.vue';

  @Component({
    components: { ThirdType, MainBtn, BackBtn },
  })
  export default class SecondType extends Vue {
    localType = 1
    active = 2;
    periodList = ['1 месяц', '3 м.', '6 м.', '1 год'];
    periodValue: IChart.IDatePeriod = {
      from: '',
      to: '',
    };

    changeType() {
      if (this.localType === 1) {
        this.changeMainType()
      }

      this.localType = 1
    }

    @Emit('change-type')
    changeMainType() {
     return 0
    }
  }
</script>

<style lang="scss" scoped>
  .second-type {
    .title {
      display: block;
      color: $black-02;
      font-weight: 600;
      font-size: 14px;
      line-height: 130%;
    }

    .period {
      padding: 11px 17px;
      margin-top: 12px;
      cursor: pointer;

      &--active {
        background-color: $light-background;
        border-radius: 10px;
      }

      &-title {
        font-weight: normal;
        font-size: 12px;
        line-height: 150%;
        color: $black-03;
      }

      &-value {
        display: block;
        margin-top: 4px;
        color: $black-01;
        font-weight: normal;
        font-size: 12px;
        line-height: 15px;
      }
    }

    .back-btn {
      margin-bottom: 35px;
    }

    .btn-accept {
      margin-top: 35px;

      &-icon {
        width: 12px;
        height: 12px;
        color: $light-white;
      }
    }
  }
</style>
