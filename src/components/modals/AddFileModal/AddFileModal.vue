<template>
  <q-dialog :value="isFileModalOpen" @hide="closeModal">
    <div class="modal">
      <q-btn class="modal__close" v-close-popup>
        <icon name="close-icon" class="modal__close-icon"/>
      </q-btn>

      <div
          class="modal__back-btn"
          v-if="modalVisibleType === 2"
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

      <file-form
          v-if="modalVisibleType === 1"
          :type="modalVisibleType"
          @add-files="addFiles"
      />

      <div v-if="modalVisibleType === 2">
        <div class="form-select modal__select">
          <label class="form-label" for="eventName">Тип исследования</label>
          <q-select hide-dropdown-icon id="eventName" v-model="selectValue" :options="selectOptionList">
            <template v-slot:append>
              <div class="select-icon">
                <icon name="select-icon" class="modal__select-icon"/>
              </div>
            </template>
          </q-select>
        </div>

        <q-checkbox
            class="form-checkbox form-checkbox--with-label"
            label="Расшифровать анализы"
            v-model="isCheckboxValue"
        />

        <div class="modal__input-wrapper">
          <div class="modal__input form-input form-input--empty">
            <q-input
                :value="''"
                placeholder="Введите название документа"
            />
            <span class="modal__input-postscript">Необязательно для заполнения</span>
          </div>

          <div class="modal__input-block">
            <input-date
                class="modal__date modal__input form-input form-input--empty"
                :value="date"
                :placeholder="'Дата исследования'"
                @change-value="changeDate"
            />
            <span class="modal__input-postscript">Необязательно для заполнения</span>
          </div>

        </div>
      </div>

      <span class="modal__bottom-text" v-if="modalVisibleType === 1">
        Мы умеем расшифровывать анализы из PDF, картинок или фотографий результатов анализов
      </span>

      <div v-if="modalVisibleType === 2">
        <p class="modal__count-documents">1 документ, <span class="modal__count-files">{{fileList.length}} файлов</span></p>

        <div class="modal__file-wrapper">
          <div class="modal__file-scroll-block">
            <div class="modal__file-scroll-block-item" v-for="(file, fileIndex) in fileList" :key="fileIndex">
              <img src="@/assets/Doc.jpg" width="86px" height="126px" alt="">
              <icon name="delete-icon" class="modal__file-scroll-block-icon" @click="deleteFile(fileIndex)"/>
            </div>
          </div>

          <file-form
              v-if="modalVisibleType === 2"
              :type="modalVisibleType"
              :title="'Добавить еще файл'"
              @add-files="addFiles"
          />
        </div>


        <q-btn class="modal__load-btn">
          <div class="modal__load-btn-icon-wrapper">
            <icon name="cloud-icon" class="modal__load-btn-icon"/>
          </div>
          <span class="modal__load-btn-text">Загрузить документ</span>
        </q-btn>
      </div>
    </div>

    <dialog-modal
        :btn1-with-icon="true"
        :is-dialog-modal-open="isDialogModalOpen"
        :title="'Если вы вернетесь на шаг назад, то прикрепленные файлы удалятся. Вернуться? '"
        :btn1-text="'Вернуться'"
        :btn2-text="'Остаться'"
        :btn-confirm-color-type="'blue'"
        @click-confirm-btn="clickConfirmBtnDialogModal"
        @close-modal="toggleDialogModal"
    />
  </q-dialog>
</template>

<script lang="ts">
  import {Component, Emit, Prop, Vue, Watch} from 'vue-property-decorator'
  import DialogModal from "@/components/modals/DialogModal.vue";
  import InputDate from "@/components/InputDate.vue";
  import FileForm from "@/components/modals/AddFileModal/FileForm.vue";

  @Component({
    components: {FileForm, InputDate, DialogModal}
  })
  export default class AddFileModal extends Vue {
    @Prop({required: true}) isFileModalOpen: boolean

    isDialogModalOpen = false
    modalVisibleType = 1
    date = ''
    selectValue = 'Узи'
    isCheckboxValue = false
    selectOptionList: Array<string> = ['Узи', 'Осмотр легких с помощью лазера из космоса']
    fileList: FileList[] = []

    @Watch('fileList', {
      deep: true
    })
    fileListChanged() {
      this.fileList.length
        ? this.modalVisibleType = 2
        : this.modalVisibleType = 1
    }

    addFiles(files: FileList[]) {
      files.forEach((file: FileList) => {
        this.fileList.push(file)
      })
    }

    deleteFile(index: number) {
      this.fileList.splice(index, 1)
    }

    changeDate(value: string) {
      this.date = value
    }

    toggleDialogModal(val: boolean) {
      this.isDialogModalOpen = val
    }

    clickConfirmBtnDialogModal() {
      this.toggleDialogModal(false)
      this.fileList = []
    }

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

    @include media-breakpoint-up($breakpoint-sm) {
      padding: 40px 25px;
    }

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

      &-icon {
        width: 8.28px;
        height: 8.28px;
        color: $accent-color;
      }
    }

    &__back-btn {
      cursor: pointer;
      margin-bottom: 20px;
      display: flex;
      align-items: center;

      &-icon {
        width: 4px;
        height: 8px;
        color: $accent-color;
      }

      &-text {
        margin-left: 16px;
        font-size: 12px;
        line-height: 150%;
      }
    }

    &__title {
      max-width: 640px;
      display: block;
      letter-spacing: 0.5px;
      font-size: 16px;
      line-height: 22px;
      color: $gray-01;

      @include media-breakpoint-up($breakpoint-sm) {
        margin-top: 10px;
      }
    }

    &__subtitle {
      max-width: 640px;
      margin-top: 10px;
      margin-bottom: 26px;
      color: $black-04;
      display: block;
      letter-spacing: 0.5px;
      font-weight: 500;
      font-size: 14px;
      line-height: 20px;
    }

    &__input {
    width: 310px;

      @include media-breakpoint-up($breakpoint-sm) {
        width: 242px;
      }

      &-wrapper {
        margin-top: 20px;
        display: flex;
        align-items: flex-end;

        @include media-breakpoint-up($breakpoint-sm) {
          flex-direction: column-reverse;
          align-items: flex-start;
        }
      }

      &-block {
        margin-left: 10px;

        @include media-breakpoint-up($breakpoint-sm) {
          margin-left: 0;
          margin-bottom: 14px;
        }
      }

      &-postscript {
        display: block;
        margin-top: 8px;
        font-size: 12px;
        line-height: 150%;
        color: $black-04;
        letter-spacing: 0.6px;
      }
    }

    .modal__date {
      max-width: 310px;
    }

    &__select {
      max-width: 310px;
      margin-top: 34px;
      margin-bottom: 14px;

      /deep/ .q-field__inner {
        background: $light-background;
      }

      /deep/ .q-field__append {
        padding-right: 5px;
      }
    }

    &__bottom-text {
      margin-top: 8px;
      display: block;
      font-weight: 500;
      font-size: 12px;
      line-height: 15px;
      max-width: 635px;
      text-align: center;
    }

    &__load-btn {
      height: 56px;
      border-radius: 22px;
      background-color: $accent-color;
      margin-top: 43px;

      /deep/ .q-btn__wrapper {
        padding: 8px 20px 8px 8px;
      }

      &-icon-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: $light-white;
        border-radius: 16px;
        width: 34px;
        height: 40px;
      }

      &-icon {
        width: 24px;
        height: 24px;
        color: $accent-color;
      }

      &-text {
        margin-left: 12px;
        font-weight: 500;
        font-size: 14px;
        line-height: 140%;
        color: $light-white;
        text-transform: none;
      }
    }

    &__count-documents {
      margin: 24px 0 34px 0;
      font-weight: bold;
      font-size: 12px;
      line-height: 15px;
    }

    &__count-files {
      font-weight: 400;
      font-size: 12px;
      line-height: 15px;
    }

    &__file-wrapper {
      display: flex;
      align-items: center;
      justify-content: space-between;

      @include media-breakpoint-up($breakpoint-sm) {
        flex-direction: column;
        align-items: flex-start;
      }
    }

    &__file-scroll-block {
      max-width: 420px;
      padding-bottom: 12px;
      overflow: auto;
      display: flex;
      align-items: center;

      &::-webkit-scrollbar {
        height: 2px;
      }

      &::-webkit-scrollbar-track {
        background-color: $black-04;
      }

      &::-webkit-scrollbar-thumb {
        border-radius: 8px;
        background-color: $accent-color;
      }

      &-item {
        display: flex;
        margin-right: 20px;
      }

      &-icon {
        width: 12px;
        height: 14px;
        cursor: pointer;
        margin-left: 6px;
        color: $red-color;
      }
    }
  }
</style>
