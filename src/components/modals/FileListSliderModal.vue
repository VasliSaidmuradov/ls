<template>
  <q-dialog :value="isFileListSliderModalOpen" @hide="closeModal">
    <div class="modal">

      <main-btn
          v-close-popup
          class="modal__close-btn"
          :type="'only-icon'"
          :bcg-color="'#ffffff'"
          :width="34"
          :height="34"
      >
        <template v-slot:icon>
          <icon name="close-icon" class="modal__close-btn-icon"/>
        </template>
      </main-btn>

      <img src="@/assets/file.jpg" class="modal__file-img" alt="" v-if="currentPage === 1">

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
          <main-btn
            class="modal__action-block-btn"
            :type="'only-icon'"
            :disabled="currentPage === 1"
            :width="32"
            :height="32"
            @click-btn="btnPrevClick"
          >
            <template v-slot:icon>
              <icon name="next-icon" class="modal__action-block-btn-icon"/>
            </template>
          </main-btn>

          <div class="modal__action-block-middle-wrapper">
            <icon name="delete-icon" class="modal__action-block-delete-icon"/>
            <icon name="download-icon" class="modal__action-block-download-icon"/>
          </div>

          <main-btn
              class="modal__action-block-btn"
              :type="'only-icon'"
              :disabled="currentPage === countPages.length + 1"
              :width="32"
              :height="32"
              @click-btn="btnNextClick"
          >
            <template v-slot:icon>
              <icon name="next-icon" class="modal__action-block-btn-icon modal__action-block-btn-icon-right"/>
            </template>
          </main-btn>
        </div>
      </div>
    </div>
  </q-dialog>
</template>

<script lang="ts">
  import {Component, Emit, Prop, Vue} from 'vue-property-decorator'
  import MainBtn from '@/components/UI/buttons/MainBtn.vue';

  @Component({
    components: { MainBtn }
  })
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

    @include media-breakpoint-up($breakpoint-sm) {
      max-width: 320px;
    }

    &__close-btn {
      position: absolute;
      top: 12px;
      right: -62px;
      @include media-breakpoint-up($breakpoint-sm) {
        right: -35px;
      }

      & ::v-deep .q-btn__wrapper:before {
        box-shadow: 0 4px 15px $shadow-color;
      }

      &-icon {
        width: 8.28px;
        height: 8.28px;
        color: $accent-color;
      }
    }

    &__file-img {
      @include media-breakpoint-up($breakpoint-sm) {
        max-width: 240px;
      }
    }

    &__pdf-block {
      width: 245px;
      margin: 200px 0 170px 0;
      display: flex;
      flex-direction: column;
      padding: 20px;
      border-radius: 15px;
      background-color: $light-background;

      &-pdf-icon {
        align-self: center;
      }

      &-title {
        display: block;
        align-self: center;
        margin-top: 13px;
        font-size: 12px;
        line-height: 150%;
      }

      &-btn {
        height: 42px;
        margin-top: 20px;
        border-radius: 16px;
        border: 1px solid $light-stroke;
      }

      &-btn-icon {
        width: 4px;
        height: 8px;
        color: $accent-color;
        transform: rotate(180deg);
      }

      &-btn-text {
        margin-left: 14px;
        text-transform: none;
        color: $accent-color;
        font-size: 12px;
        line-height: 150%;
      }
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

      &-btn-icon {
        width: 4px;
        height: 8px;
        color: $light-white;

        &-right {
          transform: rotate(180deg);
        }
      }

      &-middle-wrapper {
        width: 84px;
        height: 32px;
        background-color: $light-white;
        border-radius: 12px;
        margin: 0 11px;
        display: flex;
        align-items: center;
        justify-content: space-around;
      }

      &-delete-icon {
        cursor: pointer;
        width: 12px;
        height: 14px;
        color: $black-05;
      }

      &-download-icon {
        cursor: pointer;
        width: 24px;
        height: 24px;
      }
    }
  }
</style>
