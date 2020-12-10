<template>
  <div class="laboratory-designation">
    <div
        class="designation__item"
        v-for="(designation, index) in designationList"
        :key="index"
    >
      <icon :name="designation.icon" class="designation__icon"/>
      <span class="designation__text">{{designation.text}}</span>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';


  @Component({})
  export default class LaboratoryDesignation extends Vue {
    designationList = [
      {
        text: 'ЛабСтори',
        icon: 'circle-icon',
      },
      {
        text: 'другая лаборатория',
        icon: 'star-icon',
      },
    ]
  }
</script>

<style lang="scss" scoped>
  .laboratory-designation {
    display: flex;
    align-items: center;

    .designation__item + .designation__item {
      margin-left: 6px;
    }

    .designation {
      &__item {
        background-color: $light-white;
        border-radius: 100px;
        padding: 8px 10px;
        display: flex;
        align-items: center;
      }

      &__text {
        margin-left: 5px;
        color: $black-03;
        font-weight: normal;
        font-size: 12px;
        line-height: 15px;
      }

      &__icon {
        width: 20px;
        height: 20px;
        color: $accent-color;
      }
    }
  }
</style>
