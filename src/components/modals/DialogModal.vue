<template>
  <q-dialog :value="isDialogModalOpen" @hide="closeModal">
    <div class="modal">
      <span class="modal__title">{{title}}</span>

      <div class="modal__btn-wrapper">
        <q-btn
            class="modal__btn1"
            :class="`modal__btn1--${btnConfirmColorType}`"
            @click="clickConfirmBtn"
        >
          <icon
              :name="countBtn1Icon"
              class="modal__btn1-icon"
              :class="`modal__btn1--${btnConfirmColorType}-icon`"
              v-if="btn1WithIcon"
          />
          <span class="modal__btn1-text">{{btn1Text}}</span>
        </q-btn>

        <q-btn class="modal__btn2" flat v-close-popup>
          <span class="modal__btn2-text">{{btn2Text}}</span>
        </q-btn>
      </div>
    </div>
  </q-dialog>
</template>

<script lang="ts">
  import {Component, Emit, Prop, Vue} from 'vue-property-decorator'

  @Component({})
  export default class DialogModal extends Vue {
    @Prop({required: true}) isDialogModalOpen: boolean
    @Prop() title: string
    @Prop() btn1Text: string
    @Prop() btn2Text: string
    @Prop({default: 'red'}) btnConfirmColorType: string
    @Prop() btn1WithIcon: boolean
    @Prop() btn2WithIcon: boolean

    @Emit('close-modal')
    closeModal() {
      return false
    }

    @Emit('click-confirm-btn')
    clickConfirmBtn() {
      return false
    }

    get countBtn1Icon() {
      return this.btnConfirmColorType === 'red' ? 'delete-icon' : 'next-icon'
    }
  }
</script>

<style lang="scss" scoped>
  .modal {
    background-color: $light-white;
    border-radius: 8px;
    padding: 30px 24px;
    max-width: 308px;

    &__title {
      display: block;
      font-weight: 500;
      font-size: 16px;
      letter-spacing: 0.6px;
      line-height: 130%;
    }

    &__btn-wrapper {
      margin-top: 20px;
    }

    &__btn1 {
      border-radius: 16px;

      &--red {
        background-color: $red-color;
      }

      &--blue {
        background-color: $accent-color;
      }

      &-icon {
        margin-right: 10px;
      }

      &--red-icon {
        width: 12px;
        height: 14px;
        color: $light-white;
      }

      &--blue-icon {
        width: 4px;
        height: 8px;
        color: $light-white;
      }

      &-text {
        text-transform: none;
        color: $light-white;
        font-size: 12px;
        line-height: 150%;
      }
    }

    &__btn2 {
      margin-left: 29px;

      ::v-deep .q-btn__wrapper {
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
      ::v-deep .q-focus-helper {
        background: $light-white;
      }
    }
  }
</style>
