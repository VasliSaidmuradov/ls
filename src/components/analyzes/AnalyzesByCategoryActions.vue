<template>
  <div class="analyzes-by-category-actions">
    <span class="fake-select__label">
      Группы анализов
    </span>
    <div class="fake-select">
      <div class="fake-select__select">
        <AnalyzesSelect @select="onSelect"/>
      </div>
      <div class="analyzes-by-category-actions__sort">
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
      </div>

      <MainBtn class="analyzes-by-category-actions__mobile" type="only-icon" bcg-color="#fff" @click-btn="showFilters">
        <template v-slot:icon>
          <icon name="filter-icon"></icon>
        </template>
      </MainBtn>

      <div class="analyzes-by-category-actions__sort-compare">
        <MainBtn text="Сравнить анализы"
                 @click-btn="setCompareMode"
                 border-color="transparent"
                 bcg-color="transparent">
          <template v-slot:icon>
            <icon name="compare-icon"></icon>
          </template>
        </MainBtn>
      </div>
    </div>

    <div class="fake-select__checkbox">
      <CheckboxInput :value="isGrouping" label="Включить группировку" @change-value="groupingChange"/>
      <MainBtn type="small"
               v-if="checkedArr.length"
               @click-btn="resetFilters"
               text="Сбросить группировку"
               bcg-color="transparent"
               class="reset-category">
        <template v-slot:icon>
          <icon name="close-icon"></icon>
        </template>
      </MainBtn>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import MainSelect from '@/components/UI/MainSelect.vue';
import CheckboxInput from '@/components/UI/inputs/CheckboxInput.vue';
import MainBtn from '@/components/UI/buttons/MainBtn.vue';
import {IAnalyzes} from '@/interfaces/analyzes.interface';
import {bus} from '@/plugins/bus';
import AnalyzesSelect from '@/components/analyzes/AnalyzesSelect.vue';

@Component({
  components: {
    MainSelect,
    CheckboxInput,
    MainBtn,
    AnalyzesSelect
  }
})
export default class AnalyzesByCategoryActions extends Vue {
  isGrouping = false;
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

  checkedArr: boolean[] = [];

  get compareMode(): boolean {
    return this.$store.state.analyzes.compareMode;
  }

  get checkBoxValues(): IAnalyzes.ICheckArr {
    return this.$store.state.analyzes.checkBoxValues;
  }

  onCheckChange(key: keyof IAnalyzes.ICheckArr) {
    this.checkBoxValues[key] = !this.checkBoxValues[key];
  }

  inputSelect(value: string) {
    this.sortedValue = value;
  }

  resetFilters() {
    const items: IAnalyzes.ICheckArr = this.checkBoxValues;
    for (const key in this.checkBoxValues) {
      items[key as keyof IAnalyzes.ICheckArr] = false;
    }

    this.$store.commit('analyzes/setPropertyInStore', {name: 'checkBoxValues', value: items});

    this.onSelect();
  }

  showFilters() {
    bus.$emit(IAnalyzes.BusEvents.SHOW_FILTER);
  }

  onSelect() {
    this.checkedArr = Object.values(this.checkBoxValues).filter(item => item);
    this.isGrouping = Boolean(this.checkedArr.length);

    bus.$emit(IAnalyzes.BusEvents.SET_CATEGORY, Boolean(this.checkedArr.length));
  }

  setCompareMode() {
    this.$store.commit('analyzes/setPropertyInStore', {name: 'compareMode', value: !this.compareMode})
  }

  groupingChange() {
    this.isGrouping = !this.isGrouping;
    const items: IAnalyzes.ICheckArr = this.checkBoxValues;

    if (!this.checkedArr.length) {
      for (const key in this.checkBoxValues) {
        items[key as keyof IAnalyzes.ICheckArr] = true;
      }

      this.$store.commit('analyzes/setPropertyInStore', {name: 'checkBoxValues', value: items});

      this.onSelect();
    }
  }
}
</script>

<style lang="scss" scoped>
.analyzes-by-category-actions {
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  .fake-select {
    display: flex;
    width: 100%;
    align-items: center;

    &__label {
      font-weight: 500;
      font-size: 13px;
      line-height: 130%;
      color: $black-01;
      margin-bottom: 15px;

      @include media-breakpoint-up($breakpoint-lg) {
        display: none;
      }
    }

    &__select {
      width: 40%;
      margin-right: 20px;

      @include media-breakpoint-up($breakpoint-lg) {
        display: none;
      }
    }

    &__checkbox {
      margin-top: 15px;
      display: flex;
      align-items: center;

      @include media-breakpoint-up($breakpoint-xs) {
        flex-direction: column;
        align-items: flex-start;
      }
    }
  }

  .reset-category {
    margin-left: 54px;

    ::v-deep.main-btn__icon-wrapper {
      color: $status-red;
      margin-right: 13px;

      svg {
        width: 8px;
        height: 8px;
      }
    }

    ::v-deep.main-btn__text {
      font-size: 12px;
      line-height: 150%;
      color: $black-02;
    }

    @include media-breakpoint-up($breakpoint-xs) {
      margin-left: 0;
      margin-top: 10px;
    }
  }

  &__sort-compare {
    margin-left: auto;

    ::v-deep.main-btn__icon-wrapper {
      background-color: $accent-color;
      color: $light-white;
      margin-right: 12px;
    }

    ::v-deep.main-btn__text {
      font-size: 12px;
      line-height: 150%;
      color: $black-02;
    }
  }

  &__sort {
    @include media-breakpoint-up($breakpoint-lg) {
      display: none;
    }
  }

  &__mobile {
    display: none;
    width: 52px;
    height: 42px;
    background: $light-white;
    box-shadow: 0px 4px 15px $shadow-color;
    border-radius: 16px;

    ::v-deep.main-btn__icon-wrapper {
      color: $accent-color;
    }


    @include media-breakpoint-up($breakpoint-lg) {
      display: flex;
    }
  }
}

</style>
