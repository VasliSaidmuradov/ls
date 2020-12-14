<template>
  <q-dialog :value="isShow" @hide="closeModal">
    <div class="modal">
      <q-carousel v-model="slide" ref="slider" height="auto">
        <q-carousel-slide name="first">
          <h6 class="modal__title">Фильтр</h6>
          <div class="modal__select" @click="goToSelect">
            <div class="modal__select-select">
              <span class="modal__select-select-text">Выберите группу</span>
              <icon name="next-icon"></icon>
            </div>
            <span class="modal__select-desk">Выбрано: 3 группы</span>
          </div>

          <div class="modal__check">
            <CheckboxInput label="Включить группировку"/>
          </div>

          <div class="modal__sort">
            <main-select
                :value="sortedValue"
                :options="selectOptionList"
                :border-color="'#E9E8FF'"
                @input-select="inputSelect"
            >
              <template v-slot:prepend>
                <icon name="sort-icon"/>
              </template>
            </main-select>

            <span class="modal__select-desk">По алфавиту: А – Б</span>
          </div>

          <div class="modal__actions">
            <MainBtn text="Применить" type="small" class="modal__actions-accept">
              <template v-slot:icon>
                <icon name="check-icon"></icon>
              </template>
            </MainBtn>
            <MainBtn text="Сбросить фильтр" type="small" bcg-color="transparent" class="modal__actions-close">
              <template v-slot:icon>
                <icon name="close-icon"></icon>
              </template>
            </MainBtn>
          </div>
        </q-carousel-slide>

        <q-carousel-slide name="second">
          <div class="second__back">
            <BackBtn @go-back="goBack"/>
          </div>
          <h6 class="second__title">Выберите группу</h6>
          <div class="second__options scrollable">
            <div class="second__options-list second__options-list-first">
              <CheckboxInput :value="checkBoxValues.check1" @change-value="onCheckChange('check1')" label="Гематологические исследования"/>
              <CheckboxInput :value="checkBoxValues.check2" @change-value="onCheckChange('check2')" label="Лабораторная диагностика заболеваний верхних дыхательных путей, вызванных вирусом SARS-CoV-2 Covid -19"/>
              <CheckboxInput :value="checkBoxValues.check3" @change-value="onCheckChange('check3')" label="Биохимические исследования крови"/>
              <CheckboxInput :value="checkBoxValues.check4" @change-value="onCheckChange('check4')" label="Лабораторная диагностика электролитов"/>
            </div>
            <h5 class="second__options-title">Гормональные исследования</h5>
            <div class="second__options-list second__options-list-second">
              <CheckboxInput :value="checkBoxValues.check5" @change-value="onCheckChange('check5')" label="Гематологические исследования"/>
              <CheckboxInput :value="checkBoxValues.check6" @change-value="onCheckChange('check6')" label="Лабораторная диагностика заболеваний верхних дыхательных путей, вызванных вирусом SARS-CoV-2 Covid -19"/>
              <CheckboxInput :value="checkBoxValues.check7" @change-value="onCheckChange('check7')" label="Биохимические исследования крови"/>
              <CheckboxInput :value="checkBoxValues.check8" @change-value="onCheckChange('check8')" label="Лабораторная диагностика электролитов"/>
            </div>
          </div>

          <div class="modal__actions">
            <MainBtn text="Применить" type="small" class="modal__actions-accept">
              <template v-slot:icon>
                <icon name="check-icon"></icon>
              </template>
            </MainBtn>
            <MainBtn text="Сбросить группировку" type="small" bcg-color="transparent" class="modal__actions-close">
              <template v-slot:icon>
                <icon name="close-icon"></icon>
              </template>
            </MainBtn>
          </div>
        </q-carousel-slide>
      </q-carousel>
    </div>
  </q-dialog>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator';
import InputDate from '@/components/InputDate.vue';
import MainBtn from '@/components/UI/buttons/MainBtn.vue';
import MainSelect from '@/components/UI/MainSelect.vue';
import AnalyzesSelect from '@/components/analyzes/AnalyzesSelect.vue';
import CheckboxInput from '@/components/UI/inputs/CheckboxInput.vue';
import {QCarousel} from 'quasar';
import {IAnalyzes} from '@/interfaces/analyzes.interface';
import ICheckArr = IAnalyzes.ICheckArr;
import BackBtn from '@/components/UI/buttons/BackBtn.vue';

export interface IRefs {
  slider: QCarousel;
}

@Component({
  components: {
    MainSelect,
    MainBtn,
    InputDate,
    AnalyzesSelect,
    CheckboxInput,
    BackBtn
  },
})
export default class AnalyzesFilter extends Vue {
  @Prop({ required: true }) isShow: boolean;
  sortedValue = 'Сортировать'
  selectOptionList: Array<string> = [
    'Сортировать',
    'По дате загрузки по убыванию',
    'По дате загрузки по возрастанию',
    ' По дате исследования по убыванию',
    'По дате исследования по возрастанию',
    ' По типу исследования',
    'Сначала расшифрованные',
    'Сначала нерасшифрованные',
  ];

  slide = 'first';

  get checkBoxValues(): ICheckArr {
    return this.$store.state.analyzes.checkBoxValues;
  }

  onCheckChange(key: keyof ICheckArr) {
    const items = this.checkBoxValues;
    items[key] = !items[key];
    this.$store.commit('analyzes/setPropertyInStore', {name: 'checkBoxValues', value: items});
  }

  inputSelect(value: string) {
    this.sortedValue = value;
  }

  $refs: IRefs & Vue['$refs'];

  goToSelect() {
    this.$refs.slider.goTo('second');
  }

  goBack() {
    this.$refs.slider.goTo('first');
  }

  @Emit('close-modal')
  closeModal() {
    return false;
  }
}
</script>

<style lang="scss" scoped>
.modal {
  padding: 30px 20px;
  background: $light-white;
  border-radius: 25px 25px 0px 0px;
  width: 360px;

  ::v-deep.q-carousel__slide {
    padding: 0;
  }

  &__title {
    margin-top: 0;
    font-weight: 600;
    font-size: 14px;
    line-height: 130%;
    color: $black-02;
    margin-bottom: 15px;
  }

  &__select {
    margin-bottom: 10px;
  }

  &__select-select {
    padding: 18px;
    background: $light-background;
    border-radius: 16px;
    display: flex;
    align-items: center;

    svg {
      width: 4px;
      height: 8px;
      color: $accent-color;
      transform: rotate(180deg);
    }
  }

  &__select-select-text {
    font-weight: 500;
    font-size: 14px;
    line-height: 140%;
    color: $black-02;
    margin-right: auto;
  }

  &__select-desk {
    margin-bottom: 12px;
    font-size: 12px;
    line-height: 15px;
    color: $black-04;
  }

  &__check {
    margin-bottom: 24px;
  }

  &__sort {
    margin-bottom: 10px;
  }

  &__actions {
    display: flex;
    align-items: center;
    padding-bottom: 30px;
  }

  &__actions-accept {
    margin-right: 33px;
    border-radius: 12px;
    padding: 0 10px;
    height: 42px;
    display: flex;
    align-items: center;

    ::v-deep.main-btn__icon-wrapper {
      svg {
        width: 8px;
        height: 11px;
        color: $light-white;
        margin-right: 5px;
      }
    }

    ::v-deep.main-btn__text {
      font-size: 12px;
      line-height: 150%;
      color: $light-white;
    }
  }

  &__actions-close {
    ::v-deep.main-btn__icon-wrapper {
      svg {
        width: 8px;
        height: 8px;
        color: $status-red;
        margin-right: 5px;
      }
    }

    ::v-deep.main-btn__text {
      font-size: 12px;
      line-height: 150%;
      color: $black-02
    }
  }
}

.second {
  &__title {
    font-weight: 600;
    font-size: 14px;
    line-height: 130%;
    color: $black-02;
    margin-top: 0;
    margin-bottom: 24px;
  }

  &__back {
    margin-bottom: 32px;
  }

  &__options {
    max-height: 300px;
    overflow-y: auto;
    margin-bottom: 20px;

    ::v-deep.checkbox-wrapper {
      display: flex;
      margin-bottom: 15px;

      .label {
        font-size: 12px;
        line-height: 150%;
        color: $black-03;
      }

      .checkbox-block {
        min-width: 16px;
      }
    }
  }

  &__options-title {
    font-weight: 500;
    font-size: 12px;
    line-height: 15px;
    color: $black-02;
  }
}
</style>
