<template>
  <q-dialog :value="isDialogModalOpen" @hide="closeModal">
    <div class="modal">
      <span class="modal__title">{{title}}</span>

      <div class="modal__btn-wrapper">
        <slot name="btn1"></slot>

        <main-btn
            class="modal__btn2"
            v-close-popup
            :type="'small'"
            :bcg-color="'#ffffff'"
            :text="btn2Text"
        />
      </div>
    </div>
  </q-dialog>
</template>

<script lang="ts">
  import { Component, Emit, Prop, Vue } from 'vue-property-decorator';
  import MainBtn from '@/components/UI/buttons/MainBtn.vue';

  @Component({
    components: { MainBtn },
  })
  export default class DialogModal extends Vue {
    @Prop({ required: true }) isDialogModalOpen: boolean;
    @Prop() title: string;
    @Prop() btn2Text: string;

    @Emit('close-modal')
    closeModal() {
      return false;
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

    &__btn2 {
      margin-left: 29px;
    }
  }
</style>
