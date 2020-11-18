<template>
  <q-dialog :value="isFileListSliderModalOpen" @hide="closeModal">
    <div class="modal">
      <q-btn class="modal__close" v-close-popup>
        <icon name="close-icon" class="modal__close-icon"/>
      </q-btn>

      <img src="@/assets/file.jpg" alt="" v-if="currentPage === 1">

      <div class="modal__pdf-block" v-else>
        <img src="@/assets/Pdf.png" alt="" class="modal__pdf-block-pdf-icon">
        <span class="modal__pdf-block-title">PDF-файл</span>

        <q-btn class="modal__pdf-block-btn">
          <icon name="next-icon" class="modal__pdf-block-btn-icon"/>
          <span class="modal__pdf-block-btn-text">Открыть в новой вкладке</span>
        </q-btn>
      </div>

      <div class="modal__action-block-wrapper">
        <div class="modal__action-block">
          <q-btn
              class="modal__action-block-btn"
              @click="btnPrevClick"
              :disable="currentPage === 1"
          >
            <icon name="next-icon" class="modal__action-block-btn-icon"/>
          </q-btn>

          <div class="modal__action-block-middle-wrapper">
            <icon name="delete-icon" class="modal__action-block-delete-icon"/>
            <icon name="download-icon" class="modal__action-block-download-icon"/>
          </div>

          <q-btn
              class="modal__action-block-btn"
              @click="btnNextClick"
              :disable="currentPage === countPages.length + 1"
          >
            <icon name="next-icon" class="modal__action-block-btn-icon modal__action-block-btn-icon--right"/>
          </q-btn>
        </div>
      </div>
    </div>
  </q-dialog>
</template>

<script lang="ts">
  import {Component, Emit, Prop, Vue} from 'vue-property-decorator'

  @Component({})
  export default class FileListSliderModal extends Vue {
    @Prop({required: true}) isFileListSliderModalOpen: boolean

    countPages = "2"
    currentPage = 1

    @Emit('close-modal')
    closeModal() {
      return false
    }

    btnPrevClick() {
      this.currentPage--
    }

    btnNextClick() {
      this.currentPage++
    }
  }
</script>

<style lang="scss" scoped>
  .modal {
    max-width: 495px;
    position: relative;
    overflow: initial;
    box-shadow: none;

    &__close {
      position: absolute;
      top: 12px;
      right: -62px;
      width: 34px;
      height: 34px;
      background-color: $light-white;

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

    &__pdf-block {
      width: 245px;
      margin: 200px 0 170px 0;
      display: flex;
      flex-direction: column;
      padding: 20px;
      border-radius: 15px;
      background-color: $light-background;
    }

    &__pdf-block-pdf-icon {
      align-self: center;
    }

    &__pdf-block-title {
      display: block;
      align-self: center;
      margin-top: 13px;
      font-size: 12px;
      line-height: 150%;
    }

    &__pdf-block-btn {
      height: 42px;
      margin-top: 20px;
      border-radius: 16px;
      border: 1px silud $light-stroke;
    }

    &__pdf-block-btn-icon {
      width: 4px;
      height: 8px;
      color: $accent-color;
      transform: rotate(180deg);
    }

    &__pdf-block-btn-text {
      margin-left: 14px;
      text-transform: none;
      color: $accent-color;
      font-size: 12px;
      line-height: 150%;
    }

    &__action-block-wrapper {
      width: 100%;
      position: absolute;
      bottom: 20px;
      display: flex;
      justify-content: center;
    }

    &__action-block {
      width: 206px;
      height: 50px;
      padding: 0 18px;
      display: flex;
      align-items: center;
      background-color: $light-background;
      border-radius: 100px;
    }

    &__action-block-btn {
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

    &__action-block-btn-icon {
      width: 4px;
      height: 8px;
      color: $light-white;

      &--right {
        transform: rotate(180deg);
      }
    }

    &__action-block-middle-wrapper {
      width: 84px;
      height: 32px;
      background-color: $light-white;
      border-radius: 12px;
      margin: 0 11px;
      display: flex;
      align-items: center;
      justify-content: space-around;
    }

    &__action-block-delete-icon {
      cursor: pointer;
      width: 12px;
      height: 14px;
      color: $black-05;
    }

    &__action-block-download-icon {
      cursor: pointer;
      width: 24px;
      height: 24px;
    }
  }
</style>
