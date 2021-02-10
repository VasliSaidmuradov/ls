<template>
  <q-dialog :value="isFileModalOpen" @hide="closeModal">
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
          <icon name="close-icon" class="modal__close-btn-icon" />
        </template>
      </main-btn>

      <back-btn class="modal__back-btn" v-if="modalVisibleType === 2" @go-back="toggleGoBackModal(true)" />
      <span class="modal__title">
        При добавлении нескольких файлов, они будут считаться одним документом внутри приложения.
      </span>

      <span class="modal__subtitle">
        Например, вам пришли результаты Биохимического анализа крови в нескольких PDF — вы можете объединить их в один
        документ.
      </span>

      <file-form v-if="modalVisibleType === 1" :type="modalVisibleType" @add-files="addFiles" />

      <div v-if="modalVisibleType === 2">
        <main-select
          v-if="!isAnalyzeDownload"
          class="modal__select"
          :value="selectValue"
          :options="documentTypes"
          :option-label="'description'"
          :select-label="'Тип исследования'"
          :border-color="'#E9E8FF'"
          :bcg-color="'#F9F9FC'"
          :max-width="310"
          @input-select="inputSelect"
        />

        <q-checkbox
          v-if="decipherAnalyzes && selectValue === 'Анализ'"
          class="form-checkbox form-checkbox--with-label"
          label="Расшифровать анализы"
          v-model="isCheckboxValue"
        />

        <div class="modal__input-wrapper">
          <div class="modal__input form-input form-input--empty">
            <q-input placeholder="Введите название документа" v-model="documentName" />
            <span class="modal__input-postscript">Необязательно для заполнения</span>
          </div>
          <div class="modal__input-block">
            <input-date
              class="modal__date modal__input form-input form-input--empty"
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
        <p class="modal__count-documents">
          1 документ, <span class="modal__count-files">{{ fileList.length }} файлов</span>
        </p>

        <div class="modal__file-wrapper">
          <div class="modal__file-scroll-block">
            <div class="modal__file-scroll-block-item" v-for="(file, fileIndex) in fileList" :key="fileIndex">
              <preview-img :file="file" />
              <icon name="delete-icon" class="modal__file-scroll-block-icon" @click="clickDeleteIcon(fileIndex)" />
            </div>
          </div>

          <file-form
            v-if="modalVisibleType === 2"
            :type="modalVisibleType"
            :title="'Добавить еще файл'"
            @add-files="addFiles"
          />
        </div>

        <main-btn
          class="modal__load-btn"
          :type="'primary'"
          :text="'Загрузить документ'"
          :border-color="'#7C74E9'"
          :width="214"
          :height="56"
          :disabled="isBtnDisabled"
          @click-btn="loadDocument"
        >
          <template v-slot:icon>
            <icon name="cloud-icon" class="modal__load-btn-icon" />
          </template>
        </main-btn>
      </div>
    </div>

    <dialog-modal
      :is-dialog-modal-open="isGoBackModalOpen"
      :title="'Если вы вернетесь на шаг назад, то прикрепленные файлы удалятся. Вернуться? '"
      :btn2-text="'Остаться'"
      @close-modal="toggleGoBackModal"
    >
      <template v-slot:btn1>
        <main-btn
          class="modal__back-modal-btn"
          :type="'small-bg'"
          :text="'Вернуться'"
          :width="119"
          :height="42"
          :bcg-color="'#7C74E9'"
          @click-btn="goBack"
        >
          <template v-slot:icon>
            <icon name="next-icon" class="modal__back-modal-btn-icon" />
          </template>
        </main-btn>
      </template>
    </dialog-modal>

    <dialog-modal
      :is-dialog-modal-open="isDeleteFileModalOpen"
      :title="'Вы точно хотите удалить файл? '"
      :btn2-text="'Отмена'"
      @close-modal="toggleDeleteFileModal"
    >
      <template v-slot:btn1>
        <main-btn
          class="modal__delete-file-modal-btn"
          :type="'small-bg'"
          :text="'Удалить'"
          :width="105"
          :height="42"
          :bcg-color="'#FF7C7C'"
          @click-btn="deleteFile"
        >
          <template v-slot:icon>
            <icon name="delete-icon" class="modal__delete-file-modal-btn-icon" />
          </template>
        </main-btn>
      </template>
    </dialog-modal>
  </q-dialog>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue, Watch } from 'vue-property-decorator';
import DialogModal from '@/components/modals/DialogModal.vue';
import InputDate from '@/components/InputDate.vue';
import FileForm from '@/components/modals/addFileModal/FileForm.vue';
import PreviewImg from '@/components/modals/addFileModal/PreviewImg.vue';
import MainBtn from '@/components/UI/buttons/MainBtn.vue';
import BackBtn from '@/components/UI/buttons/BackBtn.vue';
import MainSelect from '@/components/UI/MainSelect.vue';
import { format } from 'date-fns';
import { serverDateFormat } from '@/interfaces/api.interface';
import { IStorage } from '@/interfaces/storage.interface';

@Component({
  components: { MainSelect, BackBtn, MainBtn, PreviewImg, FileForm, InputDate, DialogModal },
})
export default class AddFileModal extends Vue {
  @Prop({ required: true }) isFileModalOpen: boolean;
  @Prop() decipherAnalyzes: boolean;
  @Prop({ default: false }) isAnalyzeDownload: boolean;

  isGoBackModalOpen = false;
  isDeleteFileModalOpen = false;
  deletedFileIndex: number;
  modalVisibleType = 1;
  date = new Date();
  isCheckboxValue = false;
  selectValue: IStorage.IDocumentType | '' = '';
  fileList: File[] = [];
  documentName = '';
  isBtnDisabled = false;

  get documentTypes(): IStorage.IDocumentType[] {
    return this.$store.state.storage.documentTypes;
  }

  @Watch('fileList')
  fileListChanged() {
    this.fileList.length ? (this.modalVisibleType = 2) : (this.modalVisibleType = 1);
  }
  @Watch('documentTypes', { deep: true })
  function(val: IStorage.IDocumentType[]) {
    if (this.isAnalyzeDownload) {
      this.selectValue = val.find((el: IStorage.IDocumentType) => el.value === 1)!;
    }
  }

  addFiles(files: File[]) {
    files.forEach((file: File) => {
      this.validateFile(file)
        ? this.fileList.push(file)
        : this.$store.dispatch('error/showErrorNotice', { message: 'Неферный формат файла' }, { root: true });
    });
  }

  validateFile(file: File): boolean {
    return file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'application/pdf';
  }

  clickDeleteIcon(index: number) {
    this.deletedFileIndex = index;
    this.toggleDeleteFileModal(true);
  }

  deleteFile() {
    this.fileList.splice(this.deletedFileIndex, 1);
    this.toggleDeleteFileModal(false);
  }

  changeDate(value: Date) {
    this.date = value;
  }

  toggleGoBackModal(val: boolean) {
    this.isGoBackModalOpen = val;
  }

  toggleDeleteFileModal(val: boolean) {
    this.isDeleteFileModalOpen = val;
  }

  goBack() {
    this.toggleGoBackModal(false);
    this.fileList = [];
  }

  inputSelect(value: IStorage.IDocumentType) {
    this.selectValue = value;
  }

  clearData() {
    this.selectValue = '';
    this.isCheckboxValue = false;
    this.fileList = [];
    this.date = new Date();
    this.documentName = '';
  }

  async loadDocument() {
    if (!this.selectValue) {
      await this.$store.dispatch('error/showErrorNotice', { message: 'Выберите тип исследования' }, { root: true });
      return;
    }

    this.isBtnDisabled = true;
    const payload = {
      name: this.documentName,
      date: format(new Date(this.date), serverDateFormat),
      type_doc: this.selectValue.value,
      allow_processing: this.selectValue.value === 1 ? this.isCheckboxValue : false,
      fileList: this.fileList,
    };

    const isResult = await this.$store.dispatch('storage/createDocument', payload);
    this.isBtnDisabled = false;
    isResult && this.closeModal();
    isResult && this.clearData();
  }

  @Emit('close-modal')
  closeModal() {
    return false;
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

  &__close-btn {
    position: absolute;
    top: 12px;
    right: 12px;

    & ::v-deep .q-btn__wrapper:before {
      box-shadow: 0 4px 15px $shadow-color;
    }

    &-icon {
      width: 8.28px;
      height: 8.28px;
      color: $accent-color;
    }
  }

  &__back-btn {
    margin-bottom: 10px;
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
      width: 240px;
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
    margin-top: 34px;
    margin-bottom: 14px;
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
    margin-top: 40px;

    &-icon {
      width: 24px;
      height: 24px;
      color: $accent-color;
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

    @include media-breakpoint-up($breakpoint-sm) {
      max-width: 239px;
      margin-bottom: 30px;
    }

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

  &__back-modal-btn {
    &-icon {
      width: 4px;
      height: 8px;
      color: $light-white;
    }
  }

  &__delete-file-modal-btn {
    &-icon {
      width: 12px;
      height: 14px;
      color: $light-white;
    }
  }
}
</style>
