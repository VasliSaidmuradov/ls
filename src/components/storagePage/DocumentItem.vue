<template>
  <div class="document-item" :class="{'cursor-pointer': document.type_doc === 1}" @click="goToSingleDocumentPage">
    <div class="document-item__header">
      <div class="document-item__header-date-wrapper">
        <icon name="calendar-icon" class="document-item__header-calendar-icon"/>
        <span class="document-item__header-date">{{document.date}}</span>
      </div>
      <div v-if="document.type_doc === 1">
        <!-- class tooltip you can find in styles/quasar.scss-->
        <q-tooltip
            content-class="tooltip"
            anchor="center right"
            self="center left"
            :max-width="'193px'"
        >
          Произошла ошибка. Некоторые страницы из документы не получилось расшифровать
        </q-tooltip>
        <icon name="doc-error-icon" class="document-item__header-status-icon"/>
      </div>

      <icon name="delete-icon" class="document-item__header-delete-icon" v-else @click="toggleDialogModal(true)"/>
    </div>

    <div class="document-item__name-edit-wrapper">
      <p class="document-item__name">{{document.name}}</p>
      <icon
          name="edit-icon"
          class="document-item__edit-icon"
          v-if="document.type_doc === 0"
          @click="toggleEditDocumentModal(true)"
      />
    </div>

    <p class="document-item__loaded-at">Загружено {{$date(new Date(document.created_at), 'dd.MM.yyyy')}}</p>

    <div class="document-item__footer">
      <div class="document-item__footer-left">
        <div class="document-item__footer-img-wrapper" @click.stop="document.files.length && toggleFileListSliderModal(true)">
          <img src="@/assets/Doc.jpg" alt="">
        </div>
        <div class="document-item__footer-text-wrapper">
          <span class="document-item__footer-event-name">Анализ</span>
          <span class="document-item__footer-list-count">{{document.files.length}} страницы</span>
        </div>
      </div>

      <main-btn
          class="document-item__footer-btn"
          v-if="document.type_doc === 1"
          :type="'only-icon'"
          :width="32"
          :height="32"
          :bcg-color="'#ffffff'"
          :border-color="'#E9E8FF'"
      >
        <template v-slot:icon>
          <icon name="next-icon" class="document-item__footer-btn-icon"/>
        </template>
      </main-btn>

      <icon name="download-icon" class="document-item__footer-download-icon" v-else/>
    </div>

    <dialog-modal
        :is-dialog-modal-open="isDialogModalOpen"
        :title="'Вы точно хотите удалить документ? '"
        :btn2-text="'Отмена'"
        @close-modal="toggleDialogModal"
    >
      <template v-slot:btn1>
        <main-btn
            class="document-item__delete-document-modal-btn"
            :type="'small-bg'"
            :text="'Удалить'"
            :width="105"
            :height="42"
            :bcg-color="'#FF7C7C'"
            @click-btn="deleteDocument"
        >
          <template v-slot:icon>
            <icon
                name="delete-icon"
                class="document-item__delete-document-modal-btn-icon"
            />
          </template>
        </main-btn>
      </template>
    </dialog-modal>

    <edit-document-modal
        :is-edit-document-modal-open="isEditDocumentModalOpen"
        :document="document"
        @close-modal="toggleEditDocumentModal"
        @edit-document="editDocument"
    />

    <file-list-slider-modal
        :is-file-list-slider-modal-open="isFileListSliderModalOpen"
        :file-list="document.files"
        :document-id="document.id"
        @close-modal="toggleFileListSliderModal"
    />
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import { IStorage } from '@/interfaces/storage.interface';
  import DialogModal from '@/components/modals/DialogModal.vue';
  import EditDocumentModal from '@/components/modals/EditDocumentModal.vue';
  import { IRouter } from '@/interfaces/router.interface';
  import FileListSliderModal from '@/components/modals/FileListSliderModal.vue';
  import MainBtn from '@/components/UI/buttons/MainBtn.vue';
  import { format } from 'date-fns';
  import { serverDateFormat } from '@/interfaces/api.interface';
  import ROUTE_NAME = IRouter.ROUTE_NAME;

  @Component({
    components: { MainBtn, FileListSliderModal, EditDocumentModal, DialogModal },
  })
  export default class DocumentItem extends Vue {
    @Prop() document: IStorage.IDocument;

    isDialogModalOpen = false;
    isEditDocumentModalOpen = false;
    isFileListSliderModalOpen = false;

    toggleDialogModal(val: boolean) {
      this.isDialogModalOpen = val;
    }

    toggleEditDocumentModal(val: boolean) {
      this.isEditDocumentModalOpen = val;
    }

    toggleFileListSliderModal(val: boolean) {
      this.isFileListSliderModalOpen = val;
    }

    deleteDocument() {
      const isResult = this.$store.dispatch('storage/deleteDocument', this.document.id);

      isResult && this.toggleDialogModal(false);
    }

    editDocument(obj: { name: string; date: Date }) {
      const { name, date } = obj;
      const payload = {
        name,
        date: format(new Date(date), serverDateFormat),
        id: this.document.id,
        type_doc: 0,
      };

      const isResult = this.$store.dispatch('storage/editDocument', payload);
      isResult && this.toggleEditDocumentModal(false);
    }

    goToSingleDocumentPage() {
      if (this.document.type_doc === 1) {
        this.$router.push({ name: ROUTE_NAME.STORAGE_SINGLE_DOCUMENT_PAGE, params: { id: `${this.document.id}` } });
      }
    }
  }
</script>

<style lang="scss" scoped>
  .document-item {
    padding: 8px 10px 16px 16px;
    border-radius: 20px;
    background-color: $light-white;
    box-shadow: 0 4px 15px $shadow-color;

    &__header {
      display: flex;
      justify-content: space-between;

      &-date-wrapper {
        margin-left: -5px;
        margin-top: 10px;
        display: flex;
        align-items: center;
      }

      &-calendar-icon {
        color: $accent-color;
        width: 22px;
        height: 22px;
      }

      &-date {
        color: $accent-color;
        font-weight: 500;
        font-size: 12px;
        line-height: 15px;
      }

      &-status-icon {
        margin-top: 7px;
        width: 18px;
        height: 18px;
      }

      &-delete-icon {
        cursor: pointer;
        margin-top: 7px;
        width: 12px;
        height: 14px;
        color: $black-05;
      }
    }

    &__name-edit-wrapper {
      display: flex;
      justify-content: space-between;
      margin-top: 8px;
    }

    &__name {
      max-width: 218px;
      font-size: 14px;
      line-height: 130%;
      margin-bottom: 5px;
    }

    &__edit-icon {
      cursor: pointer;
      width: 10px;
      height: 11px;
      color: $black-05;
    }

    &__loaded-at {
      margin-bottom: 0;
      font-size: 12px;
      line-height: 15px;
      color: $black-04;
    }

    &__footer {
      margin-top: 28px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      &-left {
        display: flex;
        align-items: center;
      }

      &-img-wrapper {
        cursor: pointer;
        z-index: 1;
        border-radius: 4px;
        position: relative;
        width: 30px;
        height: 42px;

        &:before {
          content: none;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 3;
          color: $light-white;
        }

        &:after {
          content: none;
          position: absolute;
          background: rgba(22, 20, 44, 0.4);
          z-index: 2;
          border-radius: 4px;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
      }

      &-img-wrapper:hover {
        &:before {
          content: '+';
        }

        &:after {
          content: '';
        }
      }

      &-text-wrapper {
        margin-left: 8px;
      }

      &-event-name {
        display: block;
        font-weight: 500;
        font-size: 12px;
        line-height: 15px;
      }

      &-list-count {
        margin-top: 4px;
        display: block;
        font-weight: 500;
        font-size: 12px;
        line-height: 15px;
        color: $black-04;
      }

      &-btn-icon {
        transform: rotate(180deg);
        width: 4px;
        height: 8px;
        color: $accent-color;
      }

      &-download-icon {
        color: $accent-color;
        align-self: flex-end;
        width: 24px;
        height: 24px;
      }
    }

    &__delete-document-modal-btn {
      &-icon {
        width: 12px;
        height: 14px;
        color: $light-white;
      }
    }
  }
</style>
