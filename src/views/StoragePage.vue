<template>
  <div class="storage-page layout">
    <div class="storage-page__header">
      <div class="storage-page__header-left">
        <span class="storage-page__header-title">Ваши документы</span>
        <span class="storage-page__header-subtitle">Вы можете загружать документы только следующих форматов: .pdf, .jpeg, .png
          и размером до 5мб.</span>
      </div>

      <main-btn
          class="storage-page__header-btn"
          :type="'primary'"
          :text="'Загрузить документ'"
          :border-color="'#7C74E9'"
          :width="214"
          :height="56"
          @click-btn="clickBtnLoadDocument"
      >
        <template v-slot:icon>
          <icon name="add-icon" class="storage-page__header-btn-icon"/>
        </template>
      </main-btn>
    </div>

    <div class="storage-page__middle-block">
      <span class="storage-page__middle-block-title">Всего {{documentList.length}} документов:</span>

      <div class="storage-page__middle-block-right">
        <q-checkbox
            class="form-checkbox form-checkbox--with-label"
            label="Только расшифрованные документы"
            v-model="isCheckboxValue"
        />

        <div class="form-select storage-page__middle-block-select">
          <q-select hide-dropdown-icon v-model="selectValue" :options="selectOptionList">
            <template v-slot:prepend>
              <icon name="sort-icon" class="storage-page__middle-block-select-prepend-icon"/>
            </template>
            <template v-slot:append>
              <div class="select-icon">
                <icon name="select-icon" class="storage-page__middle-block-select-append-icon"/>
              </div>
            </template>
          </q-select>
        </div>
      </div>
    </div>

    <div class="storage-page__document-wrapper">
      <document-item
          v-for="(document, index) in documentList"
          :key="index"
          :document="document"
      />
    </div>

    <add-file-modal
        :is-file-modal-open="isFileModalOpen"
        @close-modal="toggleFileModal"
    />
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import DocumentItem from "@/components/storagePage/DocumentItem.vue";
  import {IStorage} from "@/interfaces/storage.interface";
  import AddFileModal from "@/components/modals/addFileModal/AddFileModal.vue";
  import MainBtn from "@/components/UI/buttons/MainBtn.vue";

  @Component({
    components: {MainBtn, AddFileModal, DocumentItem}
  })
  export default class StoragePage extends Vue {
    isCheckboxValue = false
    isFileModalOpen = false
    selectValue = 'Сортировать'
    selectOptionList: Array<string> = [
      'Сортировать',
      'По дате загрузки по убыванию',
      'По дате загрузки по возрастанию',
      ' По дате исследования по убыванию',
      'По дате исследования по возрастанию',
      ' По типу исследования',
      'Сначала расшифрованные',
      'Сначала нерасшифрованные'
    ]
    documentList: IStorage.IDocument[] = [
      {
        name: 'Биохический анализ крови с подсчетом лейкцитарн. форм.',
        type: 1,
        id: '1',
      },
      {
        name: 'УЗИ живота',
        type: 2,
        id: '2',
      },
      {
        name: 'Биохический анализ крови с подсчетом лейкцитарн. форм.',
        type: 1,
        id: '3',
      },
      {
        name: 'УЗИ живота',
        type: 2,
        id: '4',
      },
      {
        name: 'Биохический анализ крови с подсчетом лейкцитарн. форм.',
        type: 1,
        id: '5',
      },
      {
        name: 'УЗИ живота',
        type: 2,
        id: '6'
      },
    ]

    clickBtnLoadDocument() {
      this.toggleFileModal(true)
    }

    toggleFileModal(val: boolean) {
      this.isFileModalOpen = val
    }
  }
</script>

<style lang="scss" scoped>
  .storage-page {
    &__header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;

      @include media-breakpoint-up($breakpoint-md) {
        flex-direction: column;
      }

      &-title {
        display: block;
        font-weight: 500;
        font-size: 36px;
        line-height: 130%;

        @include media-breakpoint-up($breakpoint-md) {
          font-size: 30px;
        }
      }

      &-subtitle {
        margin-top: 20px;
        display: block;
        font-size: 16px;
        line-height: 22px;
        max-width: 432px;
      }

      &-btn {
        @include media-breakpoint-up($breakpoint-md) {
          margin-top: 20px;
        }

        &-icon {
          width: 10px;
          height: 10px;
          color: $accent-color;
        }
      }
    }

    &__middle-block {
      margin-top: 60px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      @include media-breakpoint-up($breakpoint-md) {
        margin-top: 46px;
        flex-direction: column-reverse;
        align-items: flex-start;
      }

      &-title {
        display: block;
        font-weight: 600;
        font-size: 14px;
        line-height: 130%;

        @include media-breakpoint-up($breakpoint-md) {
          margin-top: 50px;
        }
      }

      &-right {
        display: flex;
        align-items: center;

        @include media-breakpoint-up($breakpoint-md) {
          flex-direction: column-reverse;
          align-items: flex-start;
        }

        .form-checkbox {
          margin-right: 30px;

          @include media-breakpoint-up($breakpoint-md) {
            margin-top: 20px;
            margin-right: 0;
            margin-left: -6px;
          }
        }
      }

      &-select {
        /deep/ .q-field__inner {
          width: 245px;
          border: 1px solid $light-stroke;
        }

        /deep/ .q-field__prepend {
          padding-left: 15px;
          padding-right: 10px;
        }

        /deep/ .q-field__append {
          padding-right: 5px;
        }

        /deep/ .q-field__native {
          padding: 0;
        }
      }

      &-select-prepend-icon {
        width: 24px;
        height: 24px;
      }

      &-select-append-icon {
        width: 12px;
        height: 12px;
      }
    }

    &__document-wrapper {
      margin-top: 24px;
      display: grid;
      grid-column-gap: 20px;
      grid-row-gap: 40px;
      align-items: start;
      grid-template-columns: repeat(4, 1fr);

      @include media-breakpoint-up($breakpoint-lg) {
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        grid-row-gap: 20px;
      }

      @include media-breakpoint-up($breakpoint-sm) {
        grid-row-gap: 12px;
      }
    }
  }
</style>
