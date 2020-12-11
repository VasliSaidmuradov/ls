<template>
  <div class="selected-analyzes">
    <div class="analyze-item" v-for="(analyze,index) in selectedAnalyzesList" :key="index">
      <div class="analyze-item__icon-wrapper">
        <icon name="clip-icon" class="analyze-item__icon"/>
      </div>
      <span class="analyze-item__text">{{analyze}}</span>
      <icon name="close-icon" class="analyze-item__delete-icon"/>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  @Component({
  })
  export default class SelectedAnalyzesList extends Vue {
    selectedAnalyzesList: Array<string> = ['Тиреотропный гормон', 'Тироксин общий', 'ПСА свободный', 'Соотношение своб. ПСА к общему ПСА'];
  }
</script>

<style lang="scss">
  .selected-analyzes {
    display: flex;
    align-items: center;

    .analyze-item {
      height: 38px;
      padding: 0 12px;
      margin-right: 14px;
      display: flex;
      align-items: center;
      background-color: $accent-color;
      border-radius: 12px;
      user-select: none;

      &__icon-wrapper {
        width: 22px;
        height: 22px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: $light-white;
        border-radius: 50%;
      }

      &__icon {
        color: $accent-color;
        width: 10px;
        height: 10px;
      }

      &__text {
        display: block;
        margin-left: 8px;
        font-weight: normal;
        font-size: 12px;
        line-height: 150%;
        color: $light-white;
      }

      &__delete-icon {
        width: 7px;
        height: 7px;
        margin-left: 9px;
        color: $light-white;
        cursor: pointer;
      }
    }
  }
</style>
