<template>
  <div class="layout dynamics-analyzes">
    <span class="title">Динамика анализов</span>
    <span class="subtitle">
      Вы можете выбрать до 4 разных  биомаркеров и посмотреть их динамикуза определенное время.
    </span>

    <div class="input-analyzes" @click="toggleSelectAnalyzesModal(true)">
      <div class="input-analyzes__icon-wrapper">
        <icon name="search-icon" class="input-analyzes__icon"/>
      </div>
      <span class="input-analyzes__text">Начните вводить анализ</span>
    </div>

    <selected-analyzes-list
        class="selected-analyzes-list"
    />

    <select-analyzes-modal
        :is-select-analyzes-modal-open="isSelectAnalyzesModalOpen"
        @close-modal="toggleSelectAnalyzesModal(false)"
    />
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import SelectedAnalyzesList from '@/components/dynamicsAnalyzes/SelectedAnalyzesList.vue';
  import SelectAnalyzesModal from '@/components/modals/SelectAnalyzesModal.vue';

  @Component({
    components: { SelectAnalyzesModal, SelectedAnalyzesList },
  })
  export default class DynamicsAnalyzes extends Vue {
    isSelectAnalyzesModalOpen = false;

    toggleSelectAnalyzesModal(val: boolean) {
      this.isSelectAnalyzesModalOpen = val;
    }
  }
</script>

<style lang="scss">
  .dynamics-analyzes {
    .title {
      display: block;
      font-weight: 500;
      font-size: 36px;
      line-height: 130%;
      color: $black-01;
    }

    .subtitle {
      max-width: 446px;
      margin-top: 20px;
      display: block;
      font-weight: normal;
      font-size: 16px;
      line-height: 22px;
      color: $black-02;
    }

    .input-analyzes {
      width: 100%;
      max-width: 934px;
      height: 56px;
      margin-top: 38px;
      padding: 0 15px;
      display: flex;
      align-items: center;
      background-color: $light-white;
      border-radius: 15px;
      user-select: none;
      cursor: pointer;

      &__icon-wrapper {
        width: 25px;
        height: 25px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 10px;
        background-color: $light-white;
        box-shadow: 0 4px 15px $shadow-color;
      }

      &__icon {
        color: $accent-color;
        width: 9px !important;
        height: 9px !important;
      }

      &__text {
        margin-left: 12px;
        font-weight: normal;
        font-size: 14px;
        line-height: 130%;
        color: $black-03;
      }
    }

    .selected-analyzes-list {
      margin-top: 18px;
    }
  }
</style>
