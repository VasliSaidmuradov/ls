<template>
  <q-dialog :value="isFileModalOpen" @hide="closeModal">
    <div class="modal">
      <q-btn class="modal__close" v-close-popup>
        <icon name="close-icon" class="modal__close-icon"/>
      </q-btn>

      <span class="modal__title" >
          При добавлении нескольких файлов, они будут считаться одним документом внутри приложения.
        </span>

      <span class="modal__subtitle">
        Например, вам пришли результаты Биохимического анализа крови в нескольких PDF — вы можете объединить
        их в один документ.
      </span>

      <form class="modal__file" ref="file-form">
        <input type="file" id="file" class="modal__file-input">
        <label class="modal__file-block" for="file">
          <icon name="cloud-icon" class="modal__file-block-icon"/>
          <span class="modal__file-block-title">Перетяните или нажмите, чтобы добавить файл</span>
          <span class="modal__file-block-subtitle">Файлы до 3мб</span>
        </label>
      </form>

      <span class="modal__bottom-text">
        Мы умеем расшифровывать анализы из PDF, картинок или фотографий результатов анализов
      </span>
    </div>
  </q-dialog>
</template>

<script lang="ts">
  import {Component, Emit, Prop, Vue} from 'vue-property-decorator'
  import LoadDocumentModal from "@/components/modals/LoadDocumentModal.vue";

  @Component({
    components: {LoadDocumentModal}
  })
  export default class AddFileModal extends Vue {
    @Prop({required: true}) isFileModalOpen: boolean

    @Emit('close-modal')
    closeModal() {
      return false
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
      align-self: flex-end;
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
