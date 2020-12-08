<template>
  <q-dialog :value="isShow" @hide="closeModal">
    <div class="edit-modal">
     <div class="edit-modal__content">
        <div class="form-input form-input--bordered edit-modal__item">
          <label for="name" class="form-label">Редактировать показатель</label>
          <q-input for="name" id="name" readonly v-model="editData.name" />
        </div>

       <div class="form-select edit-modal__item edit-modal__item--select">
         <q-select v-model="editData.units" :options="unitsOptions"/>
       </div>

       <div class="form-input form-input--bordered edit-modal__item">
         <label for="result" class="form-label">Результат</label>
         <q-input for="result" id="result" ref="result" v-model="editData.result" />
       </div>

       <div class="form-input form-input--bordered edit-modal__item">
         <label for="range" class="form-label">Результат</label>
         <q-input for="range" ref="range" id="range" v-model="editData.range" />
       </div>

       <div class="edit-modal__item">
         <MainBtn class="edit-comment"
                  text="Добавить комментарий"
                  type="main-btn-small"
                  bcg-color="transparent"
                  @click-btn="addComment">
           <template v-slot:icon>
             <icon name="comment-icon"></icon>
           </template>
         </MainBtn>
       </div>

       <div class="edit-modal__item">
         <MainBtn text="Сохранить" @click-btn="save" bcg-color="transparent" border-color="#7C74E9" class="save-btn">
           <template v-slot:icon>
             <icon name="check-icon"></icon>
           </template>
         </MainBtn>
       </div>
     </div>
    </div>
  </q-dialog>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator';
import MainBtn from '@/components/UI/buttons/MainBtn.vue';
import {IAnalyzes} from '@/interfaces/analyzes.interface';
import {bus} from '@/plugins/bus';
import {QInput} from 'quasar';
import InputDate from '@/components/InputDate.vue';

interface IRefs {
  result: QInput;
  range: QInput;
  date: InputDate;
}


@Component({
  components: { MainBtn },
})
export default class EditAnalyzes extends Vue {
  @Prop({ required: true }) isShow: boolean;
  @Prop({ required: true }) editData: IAnalyzes.IAddedAnalyzes;

  unitsOptions = ['МЕ/л', 'МЕ/r', 'МЕ/лd'];

  $refs: IRefs & Vue['$refs'];

  addComment() {
    bus.$emit(IAnalyzes.BusEvents.OPEN_ADD_ANALYZES_COMMENT, this.editData.id);
  }

  validate() {
    return [
      this.$refs.result.validate(),
      this.$refs.range.validate(),
    ].includes(false)
  }

  save() {
    if (this.validate()) return;

    // @todo add logic after BE ready
    console.log('save')
  }

  @Emit('close')
  closeModal() {
    return false;
  }
}
</script>

<style lang="scss" scoped>

.edit-modal {
  background: $light-white;
  box-shadow: 0px 4px 15px $shadow-color;
  border-radius: 20px;
  padding: 34px 24px;

  &__item {
    margin-bottom: 15px;

    &--select {
      ::v-deep.q-field__inner {
        border: 1px solid $light-stroke;
      }
    }
  }

  ::v-deep.edit-comment {
    .main-btn__text {
      font-size: 12px;
      line-height: 150%;
      color: $black-02;
    }

    .main-btn__icon-wrapper {
      margin-right: 10px;

      svg {
        color: $light-white;
      }
    }
  }

  ::v-deep.save-btn {
    padding: 8px;

    .main-btn__icon-wrapper {
      background-color: $accent-color;
      color: #fff;

      svg {
        width: 8px;
        height: 8px;
      }
    }

    .main-btn__text {
      font-weight: 500;
      font-size: 14px;
      line-height: 140%;
      color: $black-02;
    }
  }
}
</style>
