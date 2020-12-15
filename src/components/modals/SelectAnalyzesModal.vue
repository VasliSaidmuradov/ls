<template>
  <q-dialog :value="isSelectAnalyzesModalOpen" @hide="closeModal">
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

      <span class="modal__title">Выбрать показатели для сравнения</span>

      <div class="input-wrapper">
        <input
            class="input-wrapper__input"
            type="text"
            id="input"
            v-model="inputValue"
        >
        <label for="input" class="input-wrapper__label">
          <icon name="search-icon" class="input-wrapper__icon"/>
        </label>
      </div>

      <span class="selected__title">Сейчас выбраны:</span>

      <selected-analyzes-list
          class="selected__analyzes-list"
      />

      <span class="selected__description">Максимум 4 показателя</span>

      <div class="table__description-wrapper">
        <span class="table__title">Лабораторная диагностика функций щитовидной железы</span>
        <span class="table__subtitle">Гормональные исследования</span>
      </div>


      <div class="table__wrapper">
        <table class="table">
          <tr class="table__tr" v-for="table in 8" :key="table">
            <td class="table__checkbox">
              <checkbox-input :value="true"/>
            </td>
            <td class="table__analyze">
              Соотношение своб. ПСА к общему
            </td>
            <td colspan="table__value">
              21,42 %
            </td>
            <td class="table__ref">
              > 18
            </td>
            <td class="table__date">
              02 июля 2020
            </td>
          </tr>
        </table>
      </div>

      <!--v-if max-width = 1000px-->
      <div class="block__wrapper">
        <div class="block__item" v-for="block in 8" :key="block">
          <span class="block__title">Определение концентрации 25ОН-витамина D в сыворотке крови</span>

          <button class="block__action-btn">
            <span class="block__action-btn-icon">+</span>
            <span class="block__action-btn-text">Добавить анализ</span>
          </button>
        </div>
      </div>

      <main-btn
          class="go-comparison-btn"
          type="primary"
          border-color="#7C74E9"
          width="224"
          height="56"
          text="Перейти к сравнению"
      >
        <template v-slot:icon>
          <icon name="next-icon" class="go-comparison-btn-icon"/>
        </template>
      </main-btn>
    </div>
  </q-dialog>
</template>

<script lang="ts">
  import { Component, Emit, Prop, Vue } from 'vue-property-decorator';
  import MainBtn from '@/components/UI/buttons/MainBtn.vue';
  import SelectedAnalyzesList from '@/components/dynamicsAnalyzes/SelectedAnalyzesList.vue';
  import CheckboxInput from '@/components/UI/inputs/CheckboxInput.vue';

  @Component({
    components: { CheckboxInput, SelectedAnalyzesList, MainBtn },
  })
  export default class SelectAnalyzesModal extends Vue {
    @Prop({ required: true }) isSelectAnalyzesModalOpen: boolean;

    inputValue = '';

    @Emit('close-modal')
    closeModal() {
      return false;
    }
  }
</script>

<style lang="scss" scoped>
  .modal {
    max-width: none;
    width: 100%;
    padding: 60px 26px 30px 60px;
    position: relative;
    background-color: $light-white;
    border-radius: 8px;

    @include media-breakpoint-up(1000px) {
      padding: 40px 20px 17px 20px;
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
      letter-spacing: 0.6px;
      line-height: 130%;
    }

    .input-wrapper {
      margin-top: 40px;
      position: relative;

      &__label {
        width: 100%;
        height: 56px;
        padding-left: 20px;
        position: absolute;
        top: 0;
        left: 0;
        display: flex;
        align-items: center;
        cursor: text;
      }

      &__icon {
        color: $accent-color;
        width: 13px !important;
        height: 13px !important;
      }

      &__input {
        width: 100%;
        height: 56px;
        padding: 0 52px;
        border: 1px solid $light-stroke;
        background-color: $light-white;
        border-radius: 15px;

        &:focus {
          box-shadow: 0 4px 15px $shadow-color;
          border-radius: 18px;
          border-color: $light-stroke;
          outline: none;
        }
      }
    }

    .selected {
      &__title {
        margin-top: 24px;
        display: block;
        font-weight: 600;
        font-size: 14px;
        line-height: 130%;
        color: $gray-01;
      }

      &__analyzes-list {
        margin-top: 10px;
        margin-right: -26px;

        @include media-breakpoint-up(1000px) {
          margin-right: -20px;
        }
      }

      &__description {
        margin-top: 10px;
        display: block;
        font-weight: normal;
        font-size: 14px;
        line-height: 20px;
        color: $black-04;
      }
    }

    .table {
      width: 100%;
      overflow-y: scroll;
      border-collapse: separate;
      border-spacing: 0 10px;

      &__wrapper {
        margin-top: 20px;
        max-height: 340px;
        padding-right: 60px;
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

        @include media-breakpoint-up(1000px) {
          display: none;
        }
      }

      &__description-wrapper {
        margin-top: 35px;
        display: flex;
        @include media-breakpoint-up(1000px) {
          display: none;
        }
      }

      &__title {
        display: block;
        font-weight: 600;
        font-size: 14px;
        line-height: 130%;
        color: $black-01;
      }

      &__subtitle {
        margin-left: 60px;
        display: block;
        font-weight: normal;
        font-size: 14px;
        line-height: 130%;
        color: $black-04;
      }

      td:first-child, th:first-child {
        padding-left: 20px;
      }

      td:first-child {
        width: 50px;
        background-color: $light-background;
      }

      td {
        background-color: $light-white;
        height: 60px;
      }

      td:nth-child(2) {
        padding-left: 30px;
        border-bottom-left-radius: 10px;
        border-top-left-radius: 10px;
      }

      td:last-child {
        text-align: center;
        border-bottom-right-radius: 10px;
        border-top-right-radius: 10px;
      }

      &__header-item {
        text-align: left;
        color: $black-04;
        font-weight: normal;
        font-size: 14px;
        line-height: 130%;
      }

      &__tr {
        border-radius: 10px;
      }

      &__analyze {
        color: $black-02;
        font-weight: normal;
        font-size: 14px;
        line-height: 130%;
      }

      &__value {
        font-weight: 600;
        font-size: 14px;
        line-height: 130%;
      }

      &__ref {
        color: $black-03;
        font-weight: normal;
        font-size: 14px;
        line-height: 130%;
      }

      &__date {
        color: $black-04;
        font-weight: normal;
        font-size: 14px;
        line-height: 130%;
      }
    }

    .block__item + .block__item {
      margin-top: 10px;
    }

    .block {
      &__wrapper {
        max-height: 484px;
        margin-top: 22px;
        padding-right: 14px;
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

      &__item {
        padding: 18px;
        background-color: $light-background;
        border-radius: 20px;
      }

      &__title {
        display: block;
        max-width: 264px;
        font-weight: normal;
        font-size: 14px;
        line-height: 130%;
        color: $black-02;
      }

      &__action-btn {
        margin-top: 12px;
        background-color: transparent;
        border: none;
        cursor: pointer;

        &-icon {
          color: $accent-color;
        }

        &-text {
          margin-left: 13px;
          font-weight: normal;
          font-size: 12px;
          line-height: 150%;
          color: $black-02;
        }
      }
    }

    .go-comparison-btn {
      margin-top: 30px;
      @include media-breakpoint-up(1000px) {
        margin-top: 17px;
      }

      &-icon {
        width: 4px;
        height: 8px;
        color: $accent-color;
        transform: rotate(180deg);
      }
    }
  }
</style>
