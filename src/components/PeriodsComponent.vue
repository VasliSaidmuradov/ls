<template>
  <div class="periods">
    <div
        class="period__item"
        v-for="period in periodList"
        :key="`${period.id}-radio`"
    >
      <input
          class="period__input"
          type="radio"
          name="period"
          :id="period.id"
          v-model="value"
      >
      <label :for="period.id" class="period__label">{{period.text}}</label>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';


  @Component({})
  export default class PeriodsComponent extends Vue {
    value = {}
    periodList = [
      {
        id: 1,
        text: '1 месяц',
      },
      {
        id: 2,
        text: '3 м.',
      },
      {
        id: 3,
        text: '6 м.',
      },
      {
        id: 4,
        text: '1 год',
      },
    ];
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
