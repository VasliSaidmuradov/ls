<template>
  <q-dialog :value="isFileModalOpen" @hide="closeModal">
    <div class="modal">
      <q-btn class="modal__close" v-close-popup>
        <icon name="close-icon" class="modal__close-icon"/>
      </q-btn>

      <div
          class="modal__back-btn"
          v-if="type === 2"
          @click="toggleDialogModal(true)"
      >
        <icon name="next-icon" class="modal__back-btn-icon"/>
        <span class="modal__back-btn-text">Назад</span>
      </div>

      <span class="modal__title">
          При добавлении нескольких файлов, они будут считаться одним документом внутри приложения.
        </span>

      <span class="modal__subtitle">
        Например, вам пришли результаты Биохимического анализа крови в нескольких PDF — вы можете объединить
        их в один документ.
      </span>

      <form class="modal__file" ref="file-form">
        <input type="file" id="file" class="modal__file-input">
        <label class="modal__file-block" for="file" @click.prevent="clickAddFile">
          <icon name="cloud-icon" class="modal__file-block-icon"/>
          <span class="modal__file-block-title">Перетяните или нажмите, чтобы добавить файл</span>
          <span class="modal__file-block-subtitle">Файлы до 3мб</span>
        </label>
      </form>

      <span class="modal__bottom-text" v-if="type === 1">
        Мы умеем расшифровывать анализы из PDF, картинок или фотографий результатов анализов
      </span>
    </div>

    <dialog-modal
        :is-dialog-modal-open="isDialogModalOpen"
        :title="'Если вы вернетесь на шаг назад, то прикрепленные файлы удаляться. Вернуться? '"
        :btn1-text="'Вернуться'"
        :btn2-text="'Остаться'"
        :btn-confirm-color-type="'blue'"
        @click-confirm-btn="clickConfirmBtnDialogModal"
        @close-modal="toggleDialogModal"
    />
  </q-dialog>
</template>

<script lang="ts">
  import {Component, Emit, Prop, Vue} from 'vue-property-decorator'
  import DialogModal from "@/components/modals/DialogModal.vue";

  @Component({
    components: {DialogModal}
  })
  export default class AddFileModal extends Vue {
    @Prop({required: true}) isFileModalOpen: boolean

    isDialogModalOpen = false
    type = 1

    @Emit('close-modal')
    closeModal() {
      return false
    }

    clickAddFile() {
      this.type = 2
    }

    toggleDialogModal(val: boolean) {
      this.isDialogModalOpen = val
    }

    clickConfirmBtnDialogModal() {
      this.type = 1
      this.toggleDialogModal(false)
    }
  }
</script>

<style lang="scss" scoped>
  .modal {
    max-width: 759px;
    background-color: $light-white;
    border-radius: 15px;
    padding: 40px 62px;
    position: relative;

    &__close {
      position: absolute;
      top: 12px;
      right: 12px;
      width: 34px;
      height: 34px;

      & /deep/ .q-btn__wrapper {
        padding: 0;
      }

      & /deep/ .q-btn__wrapper:before {
        box-shadow: 0 4px 15px $shadow-color;
      }
    }

    &__close-icon {
      width: 8.28px;
      height: 8.28px;
      color: $accent-color;
    }

    &__back-btn {
      cursor: pointer;
      margin-bottom: 20px;
      display: flex;
      align-items: center;
    }

    &__back-btn-icon {
      width: 4px;
      height: 8px;
      color: $accent-color;
    }

    &__back-btn-text {
      margin-left: 16px;
      font-size: 12px;
      line-height: 150%;
    }

    &__title {
      max-width: 470px;
      display: block;

      font-size: 16px;
      line-height: 22px;
      color: $gray-01;
    }

    &__subtitle {
      max-width: 498px;
      margin-top: 10px;
      color: $black-04;
      display: block;
      font-weight: 500;
      font-size: 14px;
      line-height: 20px;
    }

    &__file {
      width: 635px;
      height: 187px;
      margin-top: 26px;
      border: 1px dashed $black-04;
      border-radius: 26px;
    }

    &__file-input {
      display: none;
    }

    &__file-block {
      padding: 60px 150px;
      display: flex;
      flex-direction: column;
      cursor: pointer;
    }

    &__file-block-icon {
      align-self: center;
      color: $accent-color;
      width: 24px;
      height: 24px;
    }

    &__file-block-title {
      margin-top: 4px;
      display: block;
      letter-spacing: 0.45px;
      font-weight: 500;
      font-size: 14px;
      line-height: 140%;
      color: $accent-color;
    }

    &__file-block-subtitle {
      align-self: center;
      margin-top: 4px;
      display: block;
      font-weight: 500;
      font-size: 12px;
      line-height: 15px;
      color: $black-04;
    }

    &__bottom-text {
      margin-top: 8px;
      display: block;
      font-weight: 500;
      font-size: 12px;
      line-height: 15px;
      text-align: center;
    }
  }
</style>
