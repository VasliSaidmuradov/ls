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
            :options="selectOptionList.map(el => el.text)"
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

      <div v-if="!isCompareMode" class="analyzes-by-category-actions__sort-compare">
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
      <MainBtn type="small"
               v-if="checkedArr"
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
import { Component, Vue, Emit } from 'vue-property-decorator';
import MainSelect from '@/components/UI/MainSelect.vue';
import CheckboxInput from '@/components/UI/inputs/CheckboxInput.vue';
import MainBtn from '@/components/UI/buttons/MainBtn.vue';
import {IAnalyzes} from '@/interfaces/analyzes.interface';
import {bus} from '@/plugins/bus';
import AnalyzesSelect from '@/components/analyzes/AnalyzesSelect.vue';

type SelectOption = {
  key: string;
  text: string;
}

@Component({
  components: {
    MainSelect,
    CheckboxInput,
    MainBtn,
    AnalyzesSelect
  }
})
export default class AnalyzesByCategoryActions extends Vue {
  sortedValue = 'Сортировать'
  selectOptionList: SelectOption[] = [
    { key: 'default', text: 'Сортировать'},
    { key: 'desc', text: 'По дате загрузки по убыванию' },
    { key: 'asc', text: 'По дате загрузки по возрастанию' },
    { key: 'labstory', text: 'Сначала лабстори' },
    { key: 'otherLabs', text: 'Сначала другие клиники' },
    { key: 'positive', text: 'Сначала положительные результаты' },
    { key: 'negative', text: 'Сначала отрицательные результаты' },
  ];
  checkboxState: { [key: string]: boolean } = {}

  mounted() {}
  destoyed() {
    this.resetFilters();
  }

  get isCompareMode(): boolean {
    return this.$store.state.analyzes.compareMode;
  }
  get checkBoxValues(): { [key: string]: boolean } {
    this.checkboxState = {...this.$store.state.analyzes.checkBoxValues};
    return this.$store.state.analyzes.checkBoxValues;
  }
  get analyzeResultsList() {
    return this.$store.state.analyzes.analyzeResultsList;
  }
  get defaultAnalyzeResultsList() {
    return this.$store.state.analyzes.defaultAnalyzeResultsList;
  }
  get checkedArr(): number {
    return this.$store.getters['analyzes/checkedArr'];
  }

  onCheckChange(key: number) {
    this.checkboxState[key] = !this.checkboxState[key];
  }
  inputSelect(value: string) {
    const selected = this.selectOptionList.find(el => el.text === value);
    const { key, text } = selected as SelectOption;

    this.sortedValue = text;
    this.sort(key);
  }
  sort(key: string) {
    const analyzes = [...this.analyzeResultsList];
    let result = [];

    if (key === 'default') {
      result = this.defaultAnalyzeResultsList;
    } else if (key === 'desc') {
      result = [...analyzes.sort((a, b) => Date.parse(b.date) - Date.parse(a.date))];
    } else if (key === 'asc') {
      result = [...analyzes.sort((a, b) => Date.parse(a.date) - Date.parse(b.date))];
    } else if (key === 'labstory') {
      result = [...analyzes
        .sort((c, d) => Date.parse(d.date) - Date.parse(c.date))
        .sort((a, b) => a.laboratory_id - b.laboratory_id)
      ];
    } else if (key === 'otherLabs') {
      result = [...analyzes
        .sort((c, d) => Date.parse(d.date) - Date.parse(c.date))
        .sort((a, b) => b.laboratory_id - a.laboratory_id)
      ];
    } else if (key === 'positive') {
      result = [...analyzes
        .sort((c, d) => Date.parse(d.date) - Date.parse(c.date))
        .sort((a, b) => a.laboratory_id - b.laboratory_id)
        .sort((a, b) => {
        const { min: aMin, max: aMax } = a.ranges;
        const { min: bMin, max: bMax } = b.ranges;

        const isPosA = aMin <= a.value && a.value <= aMax;
        const isPosB = bMin <= b.value && b.value <= bMax;

        return +isPosB - +isPosA;
      })]
    } else if (key === 'negative') {
      result = [...analyzes
        .sort((c, d) => Date.parse(d.date) - Date.parse(c.date))
        .sort((a, b) => a.laboratory_id - b.laboratory_id)
        .sort((a, b) => {
        const { min: aMin, max: aMax } = a.ranges;
        const { min: bMin, max: bMax } = b.ranges;

        const isPosA = aMin <= a.value && a.value <= aMax;
        const isPosB = bMin <= b.value && b.value <= bMax;

        return +isPosA - +isPosB;
      })]
    }

    this.$store.commit('analyzes/setPropertyInStore', { name: 'analyzeResultsList', value: result });
  }
  showFilters() {
    bus.$emit(IAnalyzes.BusEvents.SHOW_FILTER);
  }

  @Emit('setFilter')
  onSelect() {
    bus.$emit(IAnalyzes.BusEvents.SET_CATEGORY, Boolean(this.checkedArr));
  }

  setCompareMode() {
    this.$store.commit('analyzes/setPropertyInStore', {name: 'compareMode', value: !this.isCompareMode});
  }

  resetFilters() {
    const items = this.checkboxState;
    for (const key in items) {
      items[key] = false;
    }
    this.$store.commit('analyzes/setPropertyInStore', {name: 'checkBoxValues', value: items});
    this.$store.commit('analyzes/setPropertyInStore', {name: 'selectedRubricIds', value: []});
    this.onSelect();
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
        // display: none;
        flex-direction: column;
        align-items: flex-start;
      }
    }
  }

  .reset-category {
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
