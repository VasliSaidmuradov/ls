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
            :value="'ss'"
            :placeholder="'Введите название документа'"
            id="documentName"
        />
      </div>

      <div class="modal__input-wrapper">
        <input-date
            class="modal__date modal__input form-input form-input--empty"
            :label="'Дата исследования'"
            :value="date"
            :placeholder="'Дата исследования'"
            @change-value="changeDate"
        />

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
      </div>

      <div class="modal__btn-wrapper">
        <q-btn class="modal__btn1">
          <span class="modal__btn1-text">Сохранить</span>
        </q-btn>

        <q-btn class="modal__btn2" flat v-close-popup>
          <span class="modal__btn2-text">Пропустить</span>
        </q-btn>
      </div>
    </div>
  </q-dialog>
</template>

<script lang="ts">
  import {Component, Emit, Prop, Vue} from 'vue-property-decorator'
  import InputDate from "@/components/InputDate.vue";

  @Component({
    components: {InputDate}
  })
  export default class DialogModal extends Vue {
    @Prop({required: true}) isEditDocumentModalOpen: boolean

    date: Date | string = new Date()
    selectValue = 'Узи'
    selectOptionList: Array<string> = ['Узи', 'Осмотр легких с помощью лазера из космоса']


    @Emit('close-modal')
    closeModal() {
      return false
    }

    changeDate(value: string) {
      this.date = value
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

      /deep/ .q-field__inner {
        width: 245px;
        border: 1px solid $light-stroke;
      }

      /deep/ .q-field__append {
        padding-right: 5px;
      }
    }

    &__btn-wrapper {
      display: flex;
      margin-top: 20px;
    }

    &__btn1 {
      border-radius: 16px;
      background-color: $accent-color;

      &-text {
        text-transform: none;
        color: $light-white;
        font-size: 12px;
        line-height: 150%;
      }
    }

    &__btn2 {
      margin-left: 30px;

      /deep/ .q-btn__wrapper {
        min-height: initial;
        padding: 0;
      }

      &-text {
        text-transform: none;
        cursor: pointer;
        font-size: 12px;
        line-height: 150%;
      }
    }

    &__btn2.q-hoverable:hover {
      /deep/.q-focus-helper {
        background: $light-white;
      }
    }
  }
</style>
