<template>
  <q-dialog :value="isShow" @before-hide="onClose">
    <div class="add-comment">
      <div class="add-comment__header">
        <h4 class="add-comment__header-title">Комментарий к референсным зонам</h4>
        <p class="add-comment__header-desk">
          У многих анализов есть дополнительная информация по интерпретации норм. Комментарий будет сохранен и применится для всех результатов по этому анализу
        </p>
      </div>

      <div class="add-comment__body">
        <p class="add-comment__body-desk">Определение концентрации витамина С (аскорбиновая кислота) в сыворотке крови</p>
        <div class="form-input form-input--area">
          <q-input type="textarea"
                   v-model="comment"
                   :class="{'form-input--empty': !comment}"
                   ref="reaction"/>
        </div>
      </div>

      <div class="add-comment__footer">
        <MainBtn class="add-comment__footer-add" text="Добавить" type="main-btn-primary"/>
        <MainBtn class="add-comment__footer-delete"
                 text="Удалить комментарий"
                 bcg-color="transparent"
                 type="main-btn-primary">
          <template v-slot:icon>
            <icon name="close-icon"></icon>
          </template>
        </MainBtn>
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
export default class AddComment extends Vue {
  @Prop({required: true, default: () => false}) isShow: boolean;

  comment: string = '';

  @Emit('close')
  onClose() {
    return false;
  }
}
</script>

<style lang="scss" scoped>
.add-comment {
  padding: 45px 40px;
  background: $light-white;
  border-radius: 8px;

  &__header {
    margin-bottom: 25px;
  }

  &__header-title {
    font-weight: 500;
    font-size: 16px;
    line-height: 130%;
    color: $black-01;
    margin-top: 0;
    margin-bottom: 10px;
  }

  &__header-desk {
    font-size: 14px;
    line-height: 130%;
    color: $black-01;
    margin: 0;
  }

  &__body {
    display: flex;
    flex-direction: column;
  }

  &__body-desk {
    margin-bottom: 20px;
    margin-top: 0;
    font-weight: 600;
    font-size: 14px;
    line-height: 130%;
    color: $accent-color;
  }

  &__footer {
    margin-top: 20px;
  }

  &__footer-add {
    border-radius: 16px;
    margin-right: 32px;

    ::v-deep.q-btn__content {
      padding: 14px 12px;
      font-size: 12px;
      line-height: 150%;
      color: $light-white;
    }
  }

  &__footer-delete {
    ::v-deep.q-btn__content {
      font-size: 12px;
      line-height: 150%;
      color: $black-02;
    }

    ::v-deep.main-btn__icon-wrapper {
      margin-right: 13px;
      svg {
        width: 8px;
        height: 8px;
        color: $status-red;
      }
    }
  }
}
</style>
