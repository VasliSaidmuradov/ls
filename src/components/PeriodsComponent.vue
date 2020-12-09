<template>
  <div class="periods">
    <div
        class="period__item"
        v-for="(period, index) in periodList"
        :key="index"
    >
      <input
          class="period__input"
          type="radio"
          name="period"
          :id="`${index}-radio`"
          :value="index"
          v-model="picked"
          @change="changeValue"
      >
      <label :for="`${index}-radio`" class="period__label">{{period}}</label>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Emit, Vue, Watch } from 'vue-property-decorator';


  @Component({})
  export default class PeriodsComponent extends Vue {
    picked = 2;
    periodList = ['1 месяц', '3 м.', '6 м.', '1 год'];

    @Watch('picked')
    @Emit('change-value')
    changeValue() {
      return this.picked;
    }

  }
</script>

<style lang="scss" scoped>
  .periods {
    display: flex;
    align-items: center;

    .period__item + .period__item {
      margin-left: 10px;
    }

    .period {
      &__item {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      &__input {
        display: none;
      }

      &__label {
        padding: 20px;
        cursor: pointer;
        display: block;
        border: 1px solid $light-stroke;
        border-radius: 15px;
        user-select: none;
        color: $black-02;
        font-weight: 500;
        font-size: 14px;
        line-height: 140%;
      }
    }

    .period__input:checked + .period__label {
      background-color: $light-stroke;
    }
  }
</style>
