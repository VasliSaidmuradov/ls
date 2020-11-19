<template>
  <div class="document-page layout">
    <div class="document-page__header">
      <div class="document-page__header-wrapper">
        <span class="document-page__header-event-text">Анализ</span>
        <span class="document-page__header-file-text">PDF</span>
        <span class="document-page__header-date-text">Загрузка 22.05.2020</span>
      </div>

      <div class="document-page__header-wrapper">
        <icon name="process-icon" class="document-page__header-icon"/>
        <span class="document-page__header-status-text">Документ загружается</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';

  @Component({})
  export default class StorageSingleDocumentPage extends Vue {

  }
</script>

<style lang="scss" scoped>
  .layout {
    padding-top: 70px;
    padding-bottom: 97px;
  }

  .document-page {
    &__header {
      max-width: 838px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      &-wrapper {
        display: flex;
        align-items: center;
      }

      &-event-text {
        font-weight: 600;
        font-size: 14px;
        line-height: 130%;
        color: $black-01;
      }

      &-file-text {
        margin-left: 15px;
        color: $black-04;
        font-size: 14px;
        line-height: 130%;
      }

      &-date-text {
        margin-left: 15px;
        color: $black-04;
        font-size: 14px;
        line-height: 130%;
      }

      &-icon {
        width: 18px;
        height: 18px;
      }

      &-status-text {
        margin-left: 14px;
        font-size: 12px;
        line-height: 15px;
        color: $black-01;
        letter-spacing: 0.5px;
      }
    }
  }
</style>
