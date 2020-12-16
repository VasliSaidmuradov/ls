<template>
  <q-dialog :value="isSelectDocumentModalOpen" @hide="closeModal">
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

      <span class="modal__title">Добавить документ</span>
      <span class="modal__subtitle">Вы можете добавить только нерасшифрованные документы, чтобы избежать дублирования
        результатов анализов в приложении.</span>

      <!--main-wrapper-->
      <div class="document__main-wrapper">
        <div class="document__wrapper">
          <div class="document-item" v-for="(document, index) in documentList" :key="index">
            <div class="document-item__header-date-wrapper">
              <icon name="calendar-icon" class="document-item__header-calendar-icon"/>
              <span class="document-item__header-date">11.03.2020</span>
            </div>

            <p class="document-item__name">{{document.name}}</p>

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

              <checkbox-input
                  class="document-item__footer-checkbox"
                  :value="document.checked"
                  @change-value="changeCheckboxValue($event, index)"
              />
            </div>
          </div>
        </div>
      </div>
      <!--/main-wrapper-->

      <div class="modal__footer">
        <main-btn
            class="modal__footer-btn"
            :type="'primary'"
            :width="221"
            :height="56"
            :border-color="'#7C74E9'"
            :text="'Добавить документы'"
        >
          <template v-slot:icon>
            <icon name="next-icon" class="modal__footer-btn-icon"/>
          </template>
        </main-btn>

        <span class="modal__count">Выбрано:{{countSelected}} документа</span>
      </div>
    </div>
  </q-dialog>
</template>

<script lang="ts">
  import { Component, Emit, Prop, Vue } from 'vue-property-decorator';
  import MainBtn from '@/components/UI/buttons/MainBtn.vue';
  import CheckboxInput from '@/components/UI/inputs/CheckboxInput.vue';

  @Component({
    components: { CheckboxInput, MainBtn },
  })
  export default class SelectDocumentsModal extends Vue {
    @Prop({ required: true }) isSelectDocumentModalOpen: boolean;

    documentList = [
      {
        name: 'Биохический анализ крови с подсчетом лейкцитарн. форм.',
        id: '1',
        checked: false,
      },
      {
        name: 'УЗИ живота',
        id: '2',
        checked: false,
      },
      {
        name: 'Биохический анализ крови с подсчетом лейкцитарн. форм.',
        id: '3',
        checked: false,
      },
      {
        name: 'УЗИ живота',
        id: '4',
        checked: false,
      },
      {
        name: 'Биохический анализ крови с подсчетом лейкцитарн. форм.',
        id: '5',
        checked: false,
      },
      {
        name: 'УЗИ живота',
        id: '6',
        checked: false,
      },
      {
        name: 'Биохический анализ крови с подсчетом лейкцитарн. форм.',
        id: '1',
        checked: false,
      },
      {
        name: 'УЗИ живота',
        id: '2',
        checked: false,
      },
      {
        name: 'Биохический анализ крови с подсчетом лейкцитарн. форм.',
        id: '3',
        checked: false,
      },
      {
        name: 'УЗИ живота',
        id: '4',
        checked: false,
      },
      {
        name: 'Биохический анализ крови с подсчетом лейкцитарн. форм.',
        id: '5',
        checked: false,
      },
      {
        name: 'УЗИ живота',
        id: '6',
        checked: false,
      },
    ];

    get countSelected() {
      return this.documentList.filter(item => item.checked).length;
    }

    @Emit('close-modal')
    closeModal() {
      return false;
    }

    changeCheckboxValue(val: boolean, index: number) {
      this.documentList[index].checked = val;
    }
  }
</script>

<style lang="scss" scoped>
  .modal {
    max-width: 1400px;
    width: 100%;
    padding: 60px 25px 28px 60px;
    position: relative;
    background-color: $light-background;
    border-radius: 8px;

    @include media-breakpoint-up($breakpoint-sm) {
      padding: 43px 20px 43px 20px;
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

    &__title {
      display: block;
      font-weight: 500;
      font-size: 16px;
      line-height: 130%;
    }

    &__subtitle {
      margin-top: 18px;
      display: block;
      color: $black-01;
      max-width: 488px;
      font-weight: normal;
      font-size: 14px;
      line-height: 20px;
    }

    .document__main-wrapper {
      margin-top: 40px;
      max-height: 470px;
      overflow: auto;

      &::-webkit-scrollbar {
        width: 2px;
      }

      &::-webkit-scrollbar-track {
        background-color: $black-04;
      }

      &::-webkit-scrollbar-thumb {
        border-radius: 8px;
        background-color: $accent-color;
      }
    }

    .document__wrapper {
      padding-right: 55px;
      display: grid;
      grid-column-gap: 22px;
      grid-row-gap: 22px;
      grid-template-columns: repeat(4, 1fr);
      @include media-breakpoint-up($breakpoint-sm) {
        padding-right: 0;
      }

      @include media-breakpoint-up($breakpoint-lg) {
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        grid-row-gap: 20px;
      }

      @include media-breakpoint-up($breakpoint-sm) {
        grid-row-gap: 20px;
      }
    }

    .document-item {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 8px 10px 16px 16px;
      border-radius: 20px;
      background-color: $light-white;
      box-shadow: 0 4px 15px $shadow-color;

      &__header {
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
      }

      &__name {
        margin-top: 8px;
        margin-bottom: 5px;
        max-width: 218px;
        font-size: 14px;
        line-height: 130%;
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
          border-radius: 4px;
          width: 30px;
          height: 42px;
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

        &-checkbox {
          align-self: flex-end;
        }
      }
    }

    &__footer {
      margin-top: 20px;
      display: flex;
      align-items: center;

      @include media-breakpoint-up($breakpoint-sm) {
       flex-direction: column;
        align-items: flex-start;
      }
    }

    &__footer-btn-icon {
      transform: rotate(180deg);
      color: $accent-color;
      width: 4px;
      height: 8px;
    }

    &__count {
      margin-left: 35px;
      font-weight: 600;
      font-size: 14px;
      line-height: 130%;
      color: $gray-01;

      @include media-breakpoint-up($breakpoint-sm) {
        margin-left: 0;
        margin-top: 14px;
      }
    }
  }
</style>
