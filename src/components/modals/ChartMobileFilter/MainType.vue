<template>
  <div class="main-type">
    <span class="title">Фильтр</span>

    <div class="main-block-wrapper" v-for="(item, index) in mainItemList" :key="index">
      <div class="main-block" @click="clickItem(index)">
        <span class="main-block-text">{{item}}</span>
        <icon name="next-icon" class="main-block-icon"/>
      </div>

      <span class="main-block-wrapper-text">ЛабСтори, Helix, Invitro</span>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Emit, Vue } from 'vue-property-decorator';
  import MainBtn from '@/components/UI/buttons/MainBtn.vue';

  @Component({
    components: { MainBtn },
  })
  export default class MainType extends Vue {
    mainItemList: string[] = ['Выберите лабораторию', 'Выберите период', 'Выберите конкретные даты'];

    @Emit('change-type')
    clickItem(index: number) {
      return index + 1;
    }
  }
</script>

<style lang="scss" scoped>
  .main-type {
    .main-block-wrapper + .main-block-wrapper {
      margin-top: 24px;
    }

    .main-block-wrapper {
      margin-top: 16px;

      &-text {
        display: block;
        margin-top: 10px;
        font-weight: normal;
        font-size: 12px;
        line-height: 15px;
        color: $black-04;
      }
    }

    .main-block {
      height: 56px;
      padding: 0 24px 0 18px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: $light-background;
      border-radius: 16px;
      cursor: pointer;
      user-select: none;

      &-text {
        font-weight: 500;
        font-size: 14px;
        line-height: 140%;
        color: $black-02;
      }

      &-icon {
        color: $accent-color;
        width: 4px;
        height: 8px;
        transform: rotate(180deg);
      }
    }
  }
</style>
