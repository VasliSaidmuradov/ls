<template>
  <q-dialog :value="isVisible"
            @before-hide="onCancel">
    <div class="modal" :class="$store.state.confirm.class">
      <span class="modal__title" v-if="$store.state.confirm.title">
        {{$store.state.confirm.title}}
      </span>

      <span class="modal__desk" v-if="$store.state.confirm.text">
        {{$store.state.confirm.text}}
      </span>

      <div class="modal__btn-wrapper">
        <main-btn
            class="modal__btn1"
            v-close-popup
            :type="$store.state.confirm.cancel.type"
            :bcg-color="$store.state.confirm.cancel.bgColor"
            :borderColor="$store.state.confirm.cancel.borderColor"
            @click-btn="onCancel"
            :text="$store.state.confirm.cancel.text">
          <icon v-if="$store.state.confirm.cancel.icon"
                :name="$store.state.confirm.cancel.icon"
                v-slot:icon>

          </icon>
        </main-btn>

        <main-btn
            class="modal__btn2"
            v-close-popup
            :type="$store.state.confirm.confirm.type"
            :bcg-color="$store.state.confirm.confirm.bgColor"
            :borderColor="$store.state.confirm.confirm.borderColor"
            @click-btn="onConfirm"
            :text="$store.state.confirm.confirm.text">

          <icon v-if="$store.state.confirm.confirm.icon"
                :name="$store.state.confirm.confirm.icon"
                v-slot:icon>

          </icon>
        </main-btn>
      </div>
    </div>
  </q-dialog>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator';
import MainBtn from '@/components/UI/buttons/MainBtn.vue';

@Component({
  components: {
    MainBtn
  },
})
export default class ConfirmModal extends Vue {

  get isVisible() {
    return this.$store.state.confirm.isVisible;
  }

  onCancel() {
    this.$store.dispatch('confirm/cancel');
  }

  onConfirm () {
    this.$store.dispatch('confirm/confirm');
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
    margin-bottom: 20px;
  }

  &__btn-wrapper {
    margin-top: 20px;
    display: flex;
  }

  &__btn2 {
    margin-left: 29px;
  }
}
</style>
