<template>
  <div class="document-item" :class="{'cursor-pointer': document.type === 1}" @click="goToSingleDocumentPage">
    <div class="document-item__header">
      <div class="document-item__header-date-wrapper">
        <icon name="calendar-icon" class="document-item__header-calendar-icon"/>
        <span class="document-item__header-date">11.03.2020</span>
      </div>
      <div v-if="document.type === 1">
        <!-- class tooltip you can find in styles/quasar.scss-->
        <q-tooltip
            content-class="tooltip"
            anchor="center right"
            self="center left"
            :max-width="'193px'"
        >
          Произошла ошибка. Некоторые страницы из документы не получилось расшифровать
        </q-tooltip>
        <icon name="cancel-icon" class="document-item__header-status-icon"/>
      </div>

      <icon name="delete-icon" class="document-item__header-delete-icon" v-else @click="toggleDialogModal(true)"/>
    </div>

    <div class="document-item__name-edit-wrapper">
      <p class="document-item__name">{{document.name}}</p>
      <icon
          name="edit-icon"
          class="document-item__edit-icon"
          v-if="document.type === 2"
          @click="toggleEditDocumentModal(true)"
      />
    </div>

    <p class="document-item__loaded-at">Загружено 22.05.2020</p>

    <div class="document-item__footer">
      <div class="document-item__footer-left">
        <div class="document-item__footer-img-wrapper">
          <img src="@/assets/Doc.jpg" alt="">
        </div>
        <div class="document-item__footer-text-wrapper">
          <span class="document-item__footer-event-name">Анализ</span>
          <span class="document-item__footer-list-count">4 страницы</span>
        </div>
      </div>

      <q-btn class="document-item__footer-btn" v-if="document.type === 1">
        <icon name="next-icon" class="document-item__footer-btn-icon"/>
      </q-btn>
      <icon name="download-icon" class="document-item__footer-download-icon" v-else/>
    </div>

    <dialog-modal
        :is-dialog-modal-open="isDialogModalOpen"
        @close-modal="toggleDialogModal"
    />

    <edit-document-modal
        :is-edit-document-modal-open="isEditDocumentModalOpen"
        @close-modal="toggleEditDocumentModal"
    />
  </div>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator'
  import {IStorage} from "@/interfaces/storage.interface";
  import DialogModal from "@/components/modals/DialogModal.vue";
  import EditDocumentModal from "@/components/modals/EditDocumentModal.vue";
  import {IRouter} from "@/interfaces/router.interface";
  import ROUTE_NAME = IRouter.ROUTE_NAME;

  @Component({
    components: {EditDocumentModal, DialogModal}
  })
  export default class DocumentItem extends Vue {
    @Prop() document: IStorage.IDocument

    isDialogModalOpen = false
    isEditDocumentModalOpen = false

    toggleDialogModal(val: boolean) {
      this.isDialogModalOpen = val
    }

    toggleEditDocumentModal(val: boolean) {
      this.isEditDocumentModalOpen = val
    }

    goToSingleDocumentPage() {
      if (this.document.type === 1) {
        this.$router.push({name: ROUTE_NAME.STORAGE_SINGLE_DOCUMENT_PAGE, params: {id: this.document.id}})
      }
    }
  }
</script>

<style lang="scss" scoped>
  .document-item {
    width: 298px;
    padding: 8px 10px 16px 16px;
    border-radius: 20px;
    background-color: $light-white;
    box-shadow: 0 4px 15px $shadow-color;

    &__header {
      display: flex;
      justify-content: space-between;
    }

    &__header-date-wrapper {
      margin-top: 10px;
      display: flex;
      align-items: center;
    }

    &__header-calendar-icon {
      width: 22px;
      height: 22px;
    }

    &__header-date {
      margin-top: 4px;
      color: $accent-color;
      font-weight: 500;
      font-size: 12px;
      line-height: 15px;
    }

    &__header-status-icon {
      margin-top: 7px;
      width: 18px;
      height: 18px;
    }

    &__header-delete-icon {
      cursor: pointer;
      margin-top: 7px;
      width: 12px;
      height: 14px;
      color: $black-05;
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
    }

    &__footer-left {
      display: flex;
      align-items: center;
    }

    &__footer-img-wrapper {
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

    &__footer-img-wrapper:hover {
      &:before {
        content: '+';
      }

      &:after {
        content: '';
      }
    }

    &__footer-text-wrapper {
      margin-left: 8px;
    }

    &__footer-event-name {
      display: block;
      font-weight: 500;
      font-size: 12px;
      line-height: 15px;
    }

    &__footer-list-count {
      margin-top: 4px;
      display: block;
      font-weight: 500;
      font-size: 12px;
      line-height: 15px;
      color: $black-04;
    }

    &__footer-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: $accent-color;
      border-radius: 10px;
      width: 32px;
      height: 32px;

      /deep/ .q-btn__wrapper {
        padding: 0 !important;

        svg {
          width: 4px;
        }
      }
    }

    &__footer-btn-icon {
      transform: rotate(180deg);
      width: 4px;
      height: 8px;
      color: $light-white;
    }

    &__footer-download-icon {
      align-self: flex-end;
      width: 24px;
      height: 24px;
    }
  }
</style>
