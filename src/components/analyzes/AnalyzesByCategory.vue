<template>
  <div class="analyzes-by-category">
    <div class="analyzes-by-category__header">
      <AnalyzesByCategoryActions @setFilter="setFilters"/>
    </div>
    <div v-if="isCompareMode" class="analyzes-by-category__compare-btns">
      <div class="analyzes-by-category__go-compare">
        <MainBtn text="Перейти к сравнению"
                 @click-btn="go('/')"
                 border-color="transparent"
                 bcg-color="transparent">
          <template v-slot:icon>
            <icon name="compare-icon"></icon>
          </template>
        </MainBtn>
      </div>
      <div class="analyzes-by-category__checkbox">
        <MainBtn type="small"
                 v-if="true"
                 @click-btn="resetCompareMode"
                 text="Сбросить группировку"
                 bcg-color="transparent"
                 class="reset-category">
          <template v-slot:icon>
            <icon name="close-icon"></icon>
          </template>
        </MainBtn>
      </div>
    </div>
    <div class="analyzes-by-category__content">
      <div class="analyzes-by-category__content-header"
           v-if="!isGrouped"
           :class="{'analyzes-by-category__content-header--compare': compareMode}">
        <span class="analyzes-by-category__content-header-item
              analyzes-by-category__content-header-item--value">
          Биомаркер
        </span>
        <span class="analyzes-by-category__content-header-item
               analyzes-by-category__content-header-item--results">
          Значение, ед.и.
        </span>
        <span class="analyzes-by-category__content-header-item
              analyzes-by-category__content-header-item--ranges">
          Реф. значения
        </span>
        <span class="analyzes-by-category__content-header-item
              analyzes-by-category__content-header-item-lab">
          Лаборатория
        </span>
        <span class="analyzes-by-category__content-header-item
              analyzes-by-category__content-header-item--date">
          Дата сдачи
        </span>
      </div>
      <div class="analyzes-by-category__content-value">
        <div class="" v-for="analyze in isGrouped ? filteredResults : analyzeResults" :key="`${analyze.id}${Math.random()}`">
          <template v-if="isGrouped">
            <h4 class="analyzes-by-category__content-value-category">{{ analyzeRubrics.find(el => analyze.rubrics.includes(el.id)) }}</h4>
            <div class="analyzes-by-category__content-value-content">
              <AnalyzesBaCategoryCard :data="analyze"/>
              {{ analyze }}
            </div>
          </template>
          <template v-else>
            <AnalyzesBaCategoryCard :data="analyze"/>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import AnalyzesByCategoryActions from '@/components/analyzes/AnalyzesByCategoryActions.vue';
import AnalyzesBaCategoryCard from '@/components/analyzes/AnalyzesBaCategoryCard.vue';
import {bus} from '@/plugins/bus';
import {IAnalyzes} from '@/interfaces/analyzes.interface';
import MainBtn from '@/components/UI/buttons/MainBtn.vue';

@Component({
  components: {
    AnalyzesByCategoryActions,
    AnalyzesBaCategoryCard,
    MainBtn,
  }
})
export default class AnalyzesByCategory extends Vue {
  printableData: any = [];
  isGrouped: boolean = false;
  filteredResults: [] = [...this.analyzeResults];

  async mounted() {
    await this.$store.dispatch('analyzes/analyzeRubrics');
    filteredResults: [] = [...this.analyzeResults];
    bus.$on(IAnalyzes.BusEvents.SET_CATEGORY, (status: boolean) => this.isGrouped = status);
    console.log('RUBRICS: ', this.analyzeRubrics);
  }

  // @Watch('isGrouped')
  // function(val: boolean) {
  //   console.log('isGrouped: ', val);
  // }

  get compareMode(): boolean {
    return this.$store.state.analyzes.compareMode;
  }
  get biomarkerList() {
    return this.$store.state.analyzes.analyzeBiomarkerList?.biomarkers;
  }
  get analyzeResults() {
    return this.$store.state.analyzes.analyzeResultsList;
  }
  get analyzeRubrics() {
    return this.$store.state.analyzes.analyzeRubricsList;
  }
  get getSelectedRubricIds() {
    return this.$store.getters['analyzes/getSelectedRubricIds'];
  }
  get isCompareMode() {
    return this.$store.state.analyzes.compareMode;
  }

  destroyed() {
    this.$store.commit('analyzes/setPropertyInStore', {name: 'selectedRubricIds', value: []});
    bus.$off(IAnalyzes.BusEvents.SET_CATEGORY);
  }
  setFilters() {
    this.filteredResults = [];
    const results = [...this.analyzeResults];
    const rubricIds = [...this.getSelectedRubricIds];
    for (const id of rubricIds) {
      results.forEach(result => {
        if (result.rubrics.includes(id)) {
          this.filteredResults.push(result);
        }
      })
    }
  }
  go(name) {

    this.$router.push({ name });
  }
  resetCompareMode() {
    this.$store.commit('analyzes/setPropertyInStore', { name: 'compareMode', value: false });
    this.$store.commit('analyzes/setPropertyInStore', { name: 'comparingItems', value: [] });
  }
}
</script>

<style lang="scss" scoped>
.analyzes-by-category {

  &__compare-btns {
    display: flex;
    align-items: center;
    margin-top: 50px;
    padding: 0 35px;
  }
  &__go-compare {
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

  &__checkbox {
    display: flex;
    align-items: center;
    margin-left: 50px;

    @include media-breakpoint-up($breakpoint-xs) {
      flex-direction: column;
      align-items: flex-start;
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
        display: none;
      }
    }
  }

  &__content {
    margin-top: 45px;
    min-height: 300px;
  }

  &__content-header {
    margin-bottom: 20px;
    display: flex;
    align-items: center;

    &--compare {
      margin-left: 40px;
    }

    @include media-breakpoint-up($breakpoint-md) {
      display: none;
    }
  }

  &__content-header-item {
    font-size: 14px;
    line-height: 130%;
    color: $black-02;
    display: block;
    opacity: .7;

    &--value {
      min-width: 280px;
      max-width: 280px;
      padding-left: 20px;
      margin-right: 40px;

      @include media-breakpoint-up($breakpoint-lg) {
        min-width: 160px;
        max-width: 160px;
        margin-right: 20px;
      }
    }

    &--results {
      min-width: 170px;
      max-width: 170px;
      margin-right: 65px;

      @include media-breakpoint-up($breakpoint-lg) {
        margin-right: 20px;
        min-width: 120px;
        max-width: 120px;
      }
    }

    &--ranges {
      min-width: 120px;
      max-width: 120px;
      margin-right: 40px;

      @include media-breakpoint-up($breakpoint-lg) {
        margin-right: 20px;
        min-width: 100px;
        max-width: 100px;
      }
    }

    &--date {
      margin-left: auto;
      margin-right: 165px;
    }
  }

  &__content-value-category {
    font-weight: 600;
    font-size: 14px;
    line-height: 130%;
    color: $black-01;
    margin-bottom: 20px;
    margin-top: 0;

    @include media-breakpoint-up($breakpoint-sm) {
      font-weight: 400;
    }
  }

  &__content-value-content {
    margin-bottom: 40px;
  }
}

</style>
