<template>
  <q-dialog :value="isDialogModalOpen">
    <div class="modal">
        <span class="modal__title">
          Вы точно хотите удалить документ?
        </span>

      <div class="modal__btn-wrapper">
        <q-btn class="modal__btn1">
          <icon name="delete-icon" class="modal__btn1-icon"/>
          <span class="modal__btn1-text">Удалить</span>
        </q-btn>

        <q-btn class="modal__btn2" flat @click="closeDialogModal">
          <span class="modal__btn2-text">Отмена</span>
        </q-btn>
      </div>
    </div>
  </q-dialog>
</template>

<script lang="ts">
  import {Component, Emit, Prop, Vue} from 'vue-property-decorator'

  @Component({})
  export default class DialogModal extends Vue {
    @Prop() isDialogModalOpen: boolean

    @Emit('close-dialog-modal')
    closeDialogModal() {
      return false
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
     line-height: 130%;
   }

  &__btn-wrapper {
     margin-top: 20px;
   }

  &__btn1 {
     border-radius: 16px;
     background-color: $red-color;
   }

  &__btn1-icon {
     width: 12px;
     height: 14px;
     color: $light-white;
   }

  &__btn1-text {
     text-transform: none;
     margin-left: 10px;
     color: $light-white;
     font-size: 12px;
     line-height: 150%;
   }

  &__btn2 {
     margin-left: 29px;

  /deep/.q-btn__wrapper {
    min-height: initial;
    padding: 0;
  }
  }

  &__btn2-text {
     text-transform: none;
     cursor: pointer;
     font-size: 12px;
     line-height: 150%;
   }
  }
</style>
