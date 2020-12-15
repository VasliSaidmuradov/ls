<template>
  <div class="select">
    <q-expansion-item class="select__content" @before-hide="onSelect">
      <template v-slot:header>
        <span class="select__value-icon" :class="{'active': checkedArr.length}">
          {{checkedArr.length ? `Выбрано: ${checkedArr.length} категории` : 'Выберите группу'}}
        </span>
      </template>
      <div class="select__options scrollable">
        <div class="select__options-list select__options-list-first">
          <CheckboxInput :value="checkBoxValues.check1" @change-value="onCheckChange('check1')" label="Гематологические исследования"/>
          <CheckboxInput :value="checkBoxValues.check2" @change-value="onCheckChange('check2')" label="Лабораторная диагностика заболеваний верхних дыхательных путей, вызванных вирусом SARS-CoV-2 Covid -19"/>
          <CheckboxInput :value="checkBoxValues.check3" @change-value="onCheckChange('check3')" label="Биохимические исследования крови"/>
          <CheckboxInput :value="checkBoxValues.check4" @change-value="onCheckChange('check4')" label="Лабораторная диагностика электролитов"/>
        </div>
        <h5 class="select__options-title">Гормональные исследования</h5>
        <div class="select__options-list select__options-list-second">
          <CheckboxInput :value="checkBoxValues.check5" @change-value="onCheckChange('check5')" label="Гематологические исследования"/>
          <CheckboxInput :value="checkBoxValues.check6" @change-value="onCheckChange('check6')" label="Лабораторная диагностика заболеваний верхних дыхательных путей, вызванных вирусом SARS-CoV-2 Covid -19"/>
          <CheckboxInput :value="checkBoxValues.check7" @change-value="onCheckChange('check7')" label="Биохимические исследования крови"/>
          <CheckboxInput :value="checkBoxValues.check8" @change-value="onCheckChange('check8')" label="Лабораторная диагностика электролитов"/>
        </div>
      </div>
    </q-expansion-item>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Emit } from 'vue-property-decorator';
import MainSelect from '@/components/UI/MainSelect.vue';
import CheckboxInput from '@/components/UI/inputs/CheckboxInput.vue';
import MainBtn from '@/components/UI/buttons/MainBtn.vue';


interface ICheckArr {
  check1: boolean;
  check2: boolean;
  check3: boolean;
  check4: boolean;
  check5: boolean;
  check6: boolean;
  check7: boolean;
  check8: boolean;
}

@Component({
  components: {
    MainSelect,
    CheckboxInput,
    MainBtn
  }
})
export default class AnalyzesSelect extends Vue {
  isGrouping = false;
  checkBoxValues: ICheckArr = {
    check1: false,
    check2: false,
    check3: false,
    check4: false,
    check5: false,
    check6: false,
    check7: false,
    check8: false,
  };
  checkedArr: boolean[] = [];

  onCheckChange(key: keyof ICheckArr) {
    this.checkBoxValues[key] = !this.checkBoxValues[key];
    this.$store.commit('analyzes/setPropertyInStore', {name: 'checkBoxValues', value: this.checkBoxValues});
  }
  @Emit('select')
  onSelect() {
    this.checkedArr = Object.values(this.checkBoxValues).filter(item => item);
    return true;
  }
}
</script>

<style lang="scss" scoped>
.select {
  display: flex;
  width: 100%;
  align-items: center;
  border: 1px solid $light-stroke;
  border-radius: 12px;
  margin-right: 55px;

  ::v-deep.q-expansion-item--expanded {
    background-color: $light-white;
    border-radius: 12px 12px 0 0;

    .select__options {
      border-top: none;
    }
  }

  &__checkbox {
    margin-top: 15px;
  }

  &__value-text {
    font-size: 14px;
    line-height: 130%;
    color: $black-03;
  }

  &__content {
    padding: 15px 15px 15px 20px;
    border-radius: 12px;
    width: 100%;

    ::v-deep.q-item {
      padding: 0;
      min-height: auto;
    }

    ::v-deep.q-item__section {
      color: $accent-color;
      margin-left: auto;
      padding: 0;
    }

    ::v-deep.q-expansion-item__content {
      position: absolute;
      z-index: 1;
      width: calc(100% + 37px);
      left: -21px;
      margin-top: 6px;
    }

    ::v-deep.select__options-title {
      margin: 25px 0;
      font-weight: bold;
      font-size: 12px;
      line-height: 15px;
      color: $black-02;
    }

    ::v-deep.select__options-list {

      .checkbox-wrapper {
        display: flex;
        align-items: flex-start;
        margin-bottom: 15px;

        .label {
          font-size: 12px;
          line-height: 150%;
          color: $black-03;
          margin-left: 12px;
        }
      }

      .checkbox-block {
        min-width: 16px;
      }
    }
  }

  &__options {
    padding: 15px 15px 15px 20px;
    width: 100%;
    background: $light-white;
    box-sizing: border-box;
    border-radius: 0 0 12px 12px;
    max-width: 540px;
    max-height: 300px;
    overflow-y: auto;
    border: 1px solid $light-stroke;
  }
  }

</style>
