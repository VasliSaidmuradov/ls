<template>
  <q-dialog :value="isEditDocumentModalOpen" @hide="closeModal">
    <div class="modal">
      <icon name="close-icon" class="modal__close" v-close-popup/>

      <span class="modal__title">
          Заполните документ, чтобы было проще
        </span>

      <span class="modal__subtitle">Придумайте короткое название, выберите тип и дату <br> исследования</span>

      <div class="modal__input form-input form-input--empty">
        <label class="form-label" for="documentName">Название документа</label>
        <q-input
            v-model="documentData.name"
            :placeholder="'Введите название документа'"
            id="documentName"
        />
      </div>

      <div class="modal__input-wrapper">
        <input-date
            class="modal__date modal__input form-input form-input--empty"
            :label="'Дата исследования'"
            :value="documentData.date"
            :placeholder="'Дата исследования'"
            @change-value="changeDate"
        />

        <main-select
            class="modal__select"
            :value="selectValue"
            :options="documentTypes"
            :option-label="'description'"
            :label-title="'Тип исследования'"
            :border-color="'#E9E8FF'"
            :max-width="310"
            @input-select="inputSelect"
        />
      </div>

      <div class="modal__btn-wrapper">
        <main-btn
            :width="91"
            :height="42"
            :type="'small-bg'"
            :text="'Сохранить'"
            @click-btn="editDocument"
        />

        <main-btn
            class="modal__btn2"
            v-close-popup
            :type="'small'"
            :bcg-color="'#ffffff'"
            :text="'Пропустить'"
        />
      </div>
    </div>
  </q-dialog>
</template>

<script lang="ts">
  import { Component, Emit, Prop, Vue } from 'vue-property-decorator';
  import InputDate from '@/components/InputDate.vue';
  import MainBtn from '@/components/UI/buttons/MainBtn.vue';
  import MainSelect from '@/components/UI/MainSelect.vue';
  import { IStorage } from '@/interfaces/storage.interface';
  import IDocument = IStorage.IDocument;
  import IDocumentType = IStorage.IDocumentType;

  @Component({
    components: { MainSelect, MainBtn, InputDate },
  })
  export default class DialogModal extends Vue {
    @Prop({ required: true }) isEditDocumentModalOpen: boolean;
    @Prop({ required: true }) document: IDocument;

    // selectValue = ;
    documentData: IDocument = JSON.parse(JSON.stringify(this.document));

    get documentTypes() {
      return this.$store.state.storage.documentTypes;
    }

    get selectValue() {
      const findItem = this.documentTypes.find((documentType: IDocumentType) => documentType.value === this.documentData.type_doc);
      return findItem ? findItem.description : '';
    }

    @Emit('close-modal')
    closeModal() {
      return false;
    }

    @Emit('edit-document')
    editDocument() {
      const { date, name, type_doc } = this.documentData;
      return {
        date,
        name,
        type_doc,
      };
    }

    inputSelect(value: IDocumentType) {
      if (this.document.type_doc === 1) {
        this.$store.dispatch('error/showErrorNotice',
          { message: 'Расшифрованные анализы будут отвязаны от документа, но сохраняться в системе' },
          { root: true },
        );
      }

      this.documentData.type_doc = value.value;
    }

    changeDate(value: string) {
      this.documentData.date = value;
    }
  }
</script>

<style lang="scss" scoped>
  .modal {
    background-color: $light-white;
    border-radius: 8px;
    padding: 46px 40px;
    max-width: 535px;
    position: relative;

    &__close {
      position: absolute;
      top: 12px;
      right: 12px;
      width: 9px;
      height: 9px;
      color: $accent-color;
      cursor: pointer;
    }

    &__title {
      display: block;
      font-weight: 500;
      font-size: 16px;
      line-height: 130%;
    }

    &__subtitle {
      display: block;
      margin-top: 10px;
      font-size: 14px;
      line-height: 130%;
    }

    &__input {
      max-width: 455px;
      width: 100%;
      margin-top: 24px;
    }

    &__input-wrapper {
      margin-top: 20px;
      display: flex;
      align-items: flex-end;

      @include media-breakpoint-up($breakpoint-sm) {
        flex-direction: column;
        align-items: flex-start;
      }
    }

    .modal__date {
      max-width: 160px;
    }

    &__select {
      margin-left: 20px;
      width: 100%;

      @include media-breakpoint-up($breakpoint-sm) {
        margin-top: 20px;
        margin-left: 0;
      }
    }

    &__btn-wrapper {
      display: flex;
      margin-top: 20px;
    }

    &__btn2 {
      margin-left: 30px;
    }
  }
</style>
