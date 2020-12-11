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
        <label for="input" class="input-wrapper__label">
          <icon name="search-icon" class="input-wrapper__icon"/>
        </label>
        <input
            class="input-wrapper__input"
            type="text"
            id="input"
            v-model="inputValue"
        >
      </div>

      <span class="selected__title">Сейчас выбраны:</span>

      <selected-analyzes-list
          class="selected__analyzes-list"
      />

      <span class="selected__description">Максимум 4 показателя</span>
    </div>
  </q-dialog>
</template>

<script lang="ts">
  import { Component, Emit, Prop, Vue } from 'vue-property-decorator';
  import MainBtn from '@/components/UI/buttons/MainBtn.vue';
  import SelectedAnalyzesList from '@/components/dynamicsAnalyzes/SelectedAnalyzesList.vue';

  @Component({
    components: { SelectedAnalyzesList, MainBtn },
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
    background-color: $light-background;
    border-radius: 8px;

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
        display: flex;
        align-items: center;
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
        box-shadow: 0 4px 15px $shadow-color;
        border-radius: 15px;

        &:focus {
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
  }
</style>
