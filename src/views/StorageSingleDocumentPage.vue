<template>
  <div class="document-page layout">
    <div class="document-page__header">
      <div class="document-page__header-wrapper">
        <span class="document-page__header-event-text">Анализ</span>
        <span
            class="document-page__header-date-text">Загрузка {{$date(new Date(document.created_at), 'dd.MM.yyyy')}}</span>
      </div>

      <div class="document-page__header-wrapper">
        <icon name="doc-process-icon" class="document-page__header-icon"/>
        <span class="document-page__header-status-text">Документ загружается</span>
      </div>
    </div>

    <info-block/>

    <div class="document-page__file-wrapper">
      <file-item/>
    </div>

    <div class="document-page__content-added" v-if="addedAnalyzes.length">
      <span class="document-page__content-added-title">Добавлены</span>
      <ul class="document-page__table-header" style="list-style: none;">
        <li class="document-page__table-header-item">Биомаркер</li>
        <li class="document-page__table-header-item">Значение</li>
        <li class="document-page__table-header-item">Ед. изм.</li>
        <li class="document-page__table-header-item">Референс. значения</li>
        <li class="document-page__table-header-item">Лаборатория</li>
        <li class="document-page__table-header-item">Дата</li>
      </ul>
      <ul class="document-page__content-added-list">
        <li class="document-page__content-added-item" style="list-style: none;">
          <StorageAnalyzesCard v-for="item in addedAnalyzes" :data="item" :key="item.id"/>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import InfoBlock from '@/components/storageSingleDocumentPage/InfoBlock.vue';
  import FileItem from '@/components/storageSingleDocumentPage/FileItem.vue';
  import { IAnalyzes } from '@/interfaces/analyzes.interface';
  import StorageAnalyzesCard from '@/components/storagePage/StorageAnalyzesCard.vue';
  import { IRouter } from '@/interfaces/router.interface';
  import { IStorage } from '@/interfaces/storage.interface';
  import ROUTE_NAME = IRouter.ROUTE_NAME;

  @Component({
    components: { StorageAnalyzesCard, FileItem, InfoBlock },
  })
  export default class StorageSingleDocumentPage extends Vue {
    addedAnalyzes: IAnalyzes.IAddedAnalyzes[] = [
      {
        id: Math.random().toString(36).substring(2, 7),
        date: new Date(),
        result: 43.54,
        lab: 'Лаборатория',
        name: 'повторяет функционал приведённого.',
        ranges: {
          min: 30,
          max: null,
        },
        units: 'МЕ/л',
      },
      {
        id: Math.random().toString(36).substring(2, 7),
        date: new Date(),
        result: 43.54,
        lab: 'Лаборатория',
        name: 'повторяет функционал приведённого.',
        ranges: {
          min: 30,
          max: null,
        },
        units: 'МЕ/л',
      },
      {
        id: Math.random().toString(36).substring(2, 7),
        date: new Date(),
        result: 43.54,
        lab: 'Лаборатория',
        name: 'повторяет функционал приведённого.',
        ranges: {
          min: 30,
          max: null,
        },
        units: 'МЕ/л',
      },
      {
        id: Math.random().toString(36).substring(2, 7),
        date: new Date(),
        result: 43.54,
        lab: 'Лаборатория',
        name: 'повторяет функционал приведённого.',
        ranges: {
          min: 30,
          max: null,
        },
        units: 'МЕ/л',
      },
    ];

    get document(): IStorage.IDocument {
      return this.$store.state.storage.document;
    };

    async mounted() {
      const isResult = await this.$store.dispatch('storage/loadDocument', this.$route.params.id);
      !isResult && await this.$router.push({ name: ROUTE_NAME.STORAGE_PAGE });

      await this.$store.dispatch('storage/getDocumentTypes')
    }
  }
</script>

<style lang="scss" scoped>
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

    &__file-wrapper {
      margin-top: 30px;
      display: flex;
      align-items: center;
    }

    &__content-added {
      margin-top: 75px;
    }

    &__table-header {
      padding: 0;
      margin: 0;
      margin-top: 20px;
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      font-size: 14px;
      line-height: 130%;
      color: $black-04;

      @include media-breakpoint-up(1160px) {
        display: none;
      }
    }

    &__table-header-item {
      &:first-of-type {
        margin-left: -170px;
      }

      &:nth-of-type(2) {
        margin-left: 20px;
      }

      &:nth-of-type(3) {
        margin-left: -150px;
      }

      &:nth-of-type(4) {
        margin-left: -150px;
      }

      &:nth-of-type(5) {
        margin-left: -120px;
      }
    }

    &__content-added-title {
      color: $accent-color;
      font-weight: 600;
      font-size: 14px;
      line-height: 130%;
    }

    &__content-added-list {
      padding: 0;
      margin: 0;
      margin-top: 19px;
    }
  }
</style>
