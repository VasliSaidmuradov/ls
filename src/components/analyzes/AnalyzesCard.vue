<template>
  <div class="analyzes-card" :class="{'analyzes-card--edit': isEditMode}">
   <div class="analyzes-card__left">
     <div class="analyzes-card__title">
       <span>{{dataClone.name}}</span>
     </div>
     <div class="analyzes-card__values">
       <div class="analyzes-card__values-results">
         <div class="default">
           {{dataClone.result ? dataClone.result : '-'}}
         </div>
         <div class="edit">
           <div class="form-input">
             <q-input v-model="dataClone.result" type="number" ref="result" :rules="rules"/>
           </div>
         </div>
       </div>
       <div class="analyzes-card__values-units">
         <div class="default">
           {{dataClone.units}}
         </div>
         <div class="edit">
           <MainSelect :value="dataClone.units"
                       :options="unitsOptions"
                       @input-select="update('units', $event)">
           </MainSelect>
         </div>
       </div>
       <div class="analyzes-card__values-ranges">
         <div class="default">
           {{getRanges(dataClone.ranges)}}
         </div>
         <div class="edit">
           <div class="form-input">
             <q-input v-model="dataClone.range" ref="range" :rules="rules">
               <template v-slot:append>
                 <div class="comment" @click.stop.prevent="addComment">
                    <span class="comment-icon">
                      <icon name="comment-icon"></icon>
                    </span>


                   <q-tooltip :content-style="{backgroundColor: '#7C74E9', color: '#fff'}">
                     Добавить комментарий
                   </q-tooltip>
                 </div>
               </template>
             </q-input>
           </div>
         </div>
       </div>
     </div>
   </div>
    <div class="analyzes-card__right">
      <div class="analyzes-card__date">
        <div class="analyzes-card__date-lab">
          <div class="default">
            {{dataClone.lab}}
          </div>
          <div class="edit">
            <MainSelect :value="dataClone.lab"
                        :options="labOptions"
                        @input-select="update('lab', $event)">

            </MainSelect>
          </div>
        </div>

        <div class="analyzes-card__date-value">
          <div class="default">
            {{$date(dataClone.date, 'yyyy MMMM dd')}}
          </div>
          <div class="edit">
            <InputDate :value="dataClone.date" :propRules="rules" ref="date" @change-value="update('date', new Date($event))"/>
          </div>
        </div>
      </div>

      <div class="analyzes-card__actions">
        <button class="analyzes-card__actions-btn analyzes-card__actions-btn--edit" @click="isEditMode ? saveChanges() : editAnalyzes()">
          <icon :name="isEditMode ? 'check-icon' : 'edit-icon'"></icon>
        </button>
        <button class="analyzes-card__actions-btn analyzes-card__actions--delete" @click="deleteAnalyze">
          <icon name="delete-icon"></icon>
        </button>

        <div class="mobile-actions">
          <ul class="mobile-actions__list" v-if="showMobileActionsMenu">
            <li class="mobile-actions__list-item" @click="editAnalyzes">
              <span class="mobile-actions__list-item-icon">
                <icon name="edit-icon"></icon>
              </span>
              <span class="mobile-actions__list-item-text">
                Редактировать
              </span>
            </li>
            <li class="mobile-actions__list-item" @click="addComment">
              <span class="mobile-actions__list-item-icon">
                <icon name="comment-icon"></icon>
              </span>
              <span class="mobile-actions__list-item-text">
                Комментарий
              </span>
            </li>
            <li class="mobile-actions__list-item" @click="deleteAnalyze">
              <span class="mobile-actions__list-item-icon">
                <icon name="delete-icon"></icon>
              </span>
              <span class="mobile-actions__list-item-text">
                Удалить
              </span>
            </li>
          </ul>
          <span @click="toggleMobileActionsMenu" class="mobile-actions-btn">
            <icon name="dots-icon"></icon>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue, Prop, Mixins} from 'vue-property-decorator';
import {IAnalyzes} from '@/interfaces/analyzes.interface';
import AnalyzesMixin from '@/mixins/analyzes-mixin';
import MainSelect from '@/components/UI/MainSelect.vue';
import InputDate from '@/components/InputDate.vue';
import {bus} from '@/plugins/bus';
import {ILayout} from '@/interfaces/layout.interface';
import BaseFormMixins from '@/mixins/base-form-mixins';
import {QInput} from 'quasar';

interface IRefs {
  result: QInput;
  range: QInput;
  date: InputDate;
}

@Component({
  components: {
    MainSelect,
    InputDate
  }
})
export default class AnalyzesCard extends Mixins(AnalyzesMixin, BaseFormMixins) {

  @Prop({required: true}) data: IAnalyzes.IAddedAnalyzes;
  dataClone: IAnalyzes.IAddedAnalyzes  = {};
  isEditMode = false;

  rules: Function[] = []

  unitsOptions = ['МЕ/л', 'МЕ/r', 'МЕ/лd'];
  labOptions = ['dada', '2321', '3131']

  showMobileActionsMenu = false;

  $refs: IRefs & Vue['$refs'];

  created() {
    this.dataClone = Object.assign({range: this.getRanges(this.data?.ranges)}, this.data);

    this.rules.push(this.inputRules.required);
  }

  deleteAnalyze() {
    this.$store.dispatch('confirm/open', {
      text: 'Определение концентрации Витамина B9 (фолиевая кислота) в сыворотке крови',
      title: 'Вы точно хотите удалить добавленный анализ?',
      class: 'delete-analyzes',
      confirm: {
        rootAction: 'analyzes/deleteAnalyzes',
        payload: this.data?.id,
        text: 'Удалить',
        type: 'main-btn-primary',
        bgColor: 'transparent',
      },
      cancel: {
        text: 'Не удалять',
        type: 'main-btn-primary',
      }
    })
  }

  toggleMobileActionsMenu() {
    this.showMobileActionsMenu = !this.showMobileActionsMenu;
  }

  addComment() {
    bus.$emit(IAnalyzes.BusEvents.OPEN_ADD_ANALYZES_COMMENT, this.data.id);
  }

  editAnalyzes() {
    if (window.screen.width <= ILayout.Breakpoint.PRE_MD) {
      bus.$emit(IAnalyzes.BusEvents.EDIT_ANALYZES, this.dataClone);
      return;
    }

    this.isEditMode = true;
  }

  validate() {
    return [
        this.$refs.date.validate(),
        this.$refs.result.validate(),
        this.$refs.range.validate(),
    ].includes(false)
  }

  saveChanges() {
    if (this.validate()) return;

    new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 1000)
    }).then((status) => {
      if (status) {
        this.isEditMode = false;
      }
    })
  }

  update(key: string, value: string | any) {
    this.$set(this.dataClone, key, value);
  }

}
</script>

<style lang="scss" scoped>
.analyzes-card {
  padding: 18px 20px;
  background: $light-white;
  box-shadow: 0px 4px 15px $shadow-color;
  border-radius: 10px;
  margin-bottom: 18px;
  display: flex;
  align-items: center;

  &:last-child {
    margin-bottom: 0;
  }

  &__left {
    display: flex;
    align-items: center;
    width: auto;

    @include media-breakpoint-up($breakpoint-lg) {
      width: 60%;
    }

    @include media-breakpoint-up($breakpoint-md) {
      display: flex;
      width: 100%;
      margin-bottom: 25px;
    }
  }

  &__right {
    display: flex;
    align-items: center;
    width: 100%;

    @include media-breakpoint-up($breakpoint-lg) {
      width: 40%;
    }

    @include media-breakpoint-up($breakpoint-md) {
      display: flex;
      width: 100%;
    }
  }

  .edit {
    display: none;
  }

  &__title {
    font-size: 14px;
    line-height: 130%;
    color: $black-02;
    max-width: 280px;
    min-width: 280px;
    font-weight: 600;
    margin-right: 20px;

    span {
      @include trim-text(3);
    }

    @include media-breakpoint-up($breakpoint-lg) {
      min-width: 200px;
      max-width: 50%;
      font-size: 12px;
      @include trim-text(2);

      span {
        @include trim-text(2);
      }
    }

    @include media-breakpoint-up($breakpoint-pre-md) {
      max-width: 180px;
      min-width: 180px;
      font-size: 12px;

      span {
        @include trim-text(2);
      }
    }

    @include media-breakpoint-up($breakpoint-md) {
      font-size: 14px;
      max-width: 100%;
    }

    @include media-breakpoint-up($breakpoint-xs) {
      max-width: 150px;
      min-width: 110px;
    }
  }

  &__values {
    display: flex;
    align-items: center;

    @include media-breakpoint-up($breakpoint-md) {
      flex-direction: column;
      margin-left: auto;
    }
  }

  &__values-results {
    .default, .edit {
      font-size: 14px;
      line-height: 130%;
      color: $status-green;
      min-width: 100px;
      max-width: 100px;
      margin-right: 20px;
    }

    .edit {
      border-radius: 12px;
      min-width: 130px;
      max-width: 130px;
      margin-right: 12px;

      ::v-deep input {
        border-radius: 12px;
      }
    }

    @include media-breakpoint-up($breakpoint-lg) {
      .default, .edit {
        max-width: 80px;
        min-width: 80px;
        font-size: 12px;
      }
    }

    @include media-breakpoint-up($breakpoint-md) {
      .default {
        font-size: 14px;
        margin-right: 0;
        display: flex;
        justify-content: flex-end;
      }
    }

    @include media-breakpoint-up($breakpoint-xs) {
      .default {
        max-width: 60px;
        min-width: 60px;
      }
    }
  }

  &__values-units {
    .default, .edit {
      font-size: 14px;
      line-height: 130%;
      color: $black-02;
      min-width: 100px;
      max-width: 100px;
      margin-right: 20px;
    }

    .edit {
      border-radius: 12px;
      min-width: 130px;
      max-width: 130px;
      margin-right: 12px;

      ::v-deep input {
        border-radius: 12px;
      }

      ::v-deep.q-field__append {
        margin-left: 0;
      }
    }

    @include media-breakpoint-up($breakpoint-lg) {
      .default {
        max-width: 80px;
        min-width: 80px;
        font-size: 12px;
      }
    }

    @include media-breakpoint-up($breakpoint-md) {
      .default {
        display: none;
      }
    }
  }

  &__values-ranges {
    .default, .edit {
      font-size: 14px;
      line-height: 130%;
      color: $black-03;
      min-width: 160px;
      max-width: 160px;
      margin-right: 20px;
    }

    .edit {
      max-width: 190px;
      min-width: 190px;
      margin-right: 12px;
      border-radius: 12px;
    }

    @include media-breakpoint-up($breakpoint-lg) {
      .default {
        max-width: 100px;
        min-width: 100px;
        font-size: 12px;
      }

      .edit {
        max-width: 120px;
        min-width: 120px;
        font-size: 12px;
      }
    }

    @include media-breakpoint-up($breakpoint-md) {
      .default {
        font-size: 14px;
        margin-right: 0;
        margin-top: 5px;
        display: flex;
        justify-content: flex-end;
      }
    }

    @include media-breakpoint-up($breakpoint-xs) {
      .default {
        font-size: 12px;
        max-width: 60px;
        min-width: 60px;
      }
    }
  }

  &__date {
    display: flex;
    align-items: center;
  }

  &__date-lab {
    .default, .edit {
      margin-right: 90px;
      font-size: 14px;
      line-height: 130%;
      color: $black-02;
      min-width: 140px;
      max-width: 140px;
    }

    .edit {
      margin-right: 12px;
      min-width: 165px;
      max-width: 165px;

      ::v-deep.q-field__append {
        margin-left: 0;
      }
    }

    @include media-breakpoint-up($breakpoint-lg) {
      .default {
        max-width: 80px;
        min-width: 80px;
        font-size: 12px;
        margin-right: 40px;
      }
    }

    @include media-breakpoint-up($breakpoint-md) {
      .default {
        font-size: 14px;
      }
    }

    @include media-breakpoint-up($breakpoint-xs) {
      .default {
        font-size: 12px;
        margin-right: 10px;
      }
    }
  }

  &__date-value {
    .default, .edit {
      font-size: 14px;
      line-height: 130%;
      color: $black-04;
    }

    .edit {
      border-radius: 12px;
    }

    @include media-breakpoint-up($breakpoint-lg) {
      .default {
        font-size: 12px;

      }
    }

    @include media-breakpoint-up($breakpoint-md) {
      .default {
        font-size: 14px;
      }
    }

    @include media-breakpoint-up($breakpoint-xs) {
      .default {
        font-size: 12px;
      }
    }
  }

  &__actions {
    margin: auto 0 auto auto;
    display: flex;
    align-items: center;
    height: 100%;
    padding-left: 20px;

    .analyzes-card__actions-btn {
      background-color: transparent;
      border: none;
      display: flex;
      align-items: center;
      outline: none;
      cursor: pointer;

      svg {
        color: $black-07;
        opacity: .5;
        width: 10px;
        height: 10px;
      }

      &:first-child {
        margin-right: 20px;
      }
    }

    .mobile-actions {
      display: none;
    }

    @include media-breakpoint-up($breakpoint-xs) {
      .mobile-actions {
        display: block;
        position: relative;

        &__list {
          position: absolute;
          right: -26px;
          bottom: 32px;
          background: $light-white;
          box-shadow: 0px 4px 15px $shadow-color;
          border-radius: 16px;
          padding: 10px;

          &:after {
            content: '';
            position: absolute; /* Абсолютное позиционирование */
            right: 25px;
            bottom: -13px;
            border: 6px solid transparent; /* Прозрачные границы */
            border-top: 6px solid $light-white; /* Добавляем треугольник */
          }
        }

        &__list-item {
          display: flex;
          align-items: center;
          padding: 12px 7px;
          border-bottom: 1px solid $black-05;

          &:last-child {
            border: none;
          }
        }

        &__list-item-icon  {
          color: $accent-color;
          margin-right: 13px;

          svg {
            width: 10px;
            height: 10px;
          }
        }

        &__list-item-text {
          font-size: 12px;
          line-height: 150%;
          color: $black-02;
        }
      }

      .analyzes-card__actions-btn {
        display: none;
      }

      .mobile-actions-btn {
        color: $accent-color;
      }
    }
  }

  &--edit {
    background-color: transparent;
    box-shadow: none;

    .analyzes-card__title {
      background-color: $light-white;
      padding: 15px;
      max-width: 250px;
      min-width: 250px;

      span {
        @include trim-text(2);
      }

      @include media-breakpoint-up($breakpoint-lg) {
        max-width: 180px;
        min-width: 180px;
      }
    }

    .analyzes-card__actions-btn--edit {

      svg {
        color: $status-green;
      }
    }

    .default {
      display: none;
    }

    .edit {
      background-color: $light-white;
      display: block;
    }

    ::v-deep.comment {
      cursor: pointer;


      svg {
        color: #fff;

        path {
          //fill: #000;
        }
      }
    }
  }

  @include media-breakpoint-up($breakpoint-md) {
    flex-direction: column;
    align-items:flex-start;
  }
}
</style>

//style for modal
<style lang="scss">
.delete-analyzes {

  .modal__btn1 {
    padding: 8px 12px;
    border-radius: 16px;
    font-size: 12px;
    line-height: 150%;
    color: $light-white;
  }

  .modal__btn2 {
    padding: 8px 12px;
    border-radius: 16px;
    font-size: 12px;
    line-height: 150%;
    color: $status-red;
    border: 1px solid $status-red;
  }
}
</style>
