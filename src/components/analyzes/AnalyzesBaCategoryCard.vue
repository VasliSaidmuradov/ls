<template>
  <div class="analyzes-by-category-card">
    <div class="analyzes-by-category-card__compare" v-if="isCompareMode">
      <CheckboxInput :value="comparingItems.includes(data.id)" @change-value="compareChange(data.id)" label="Добавить в сравнение"/>
    </div>
    <div class="analyzes-by-category-card__wrap" @click="go(data.id)" :class="{'analyzes-by-category-card--compare':isCompareMode}">
      <div class="analyzes-by-category-card__right">
        <div class="analyzes-by-category-card__right-name">
          <div class="analyzes-by-category-card__right-name-value">
            {{data.biomarker}}
          </div>
          <div class="analyzes-by-category-card__right-result">
          <span class="analyzes-by-category-card__right-result-current">
            <span class="value">{{data.value}}</span><span class="unit"> / {{data.unit}}</span>
          </span>
          <span v-if="data.prev_result" class="analyzes-by-category-card__right-result-prev">
            <span class="value">{{data.prev_result}}</span>
            <span class="unit"> / {{data.unit}}</span>
          </span>
          </div>
        </div>
        <div class="analyzes-by-category-card__right-values">
          <div class="analyzes-by-category-card__right-values-ranges">
            <span class="value">{{getRanges(data.ranges)}}</span>
            <span class="unit">{{data.unit}}</span>
          </div>
        </div>
      </div>
      <div class="analyzes-by-category-card__left">
        <div class="analyzes-by-category-card__right-values-lab">
          {{data.laboratory}}
        </div>
        <div class="analyzes-by-category-card__left-date">
          <!-- {{$date(data.date, 'dd MMMM yyyy')}} -->
          {{ data.date }}
        </div>

        <button class="analyzes-by-category-card__left-btn">
        <span class="analyzes-by-category-card__left-btn-icon">
          <icon name="next-icon"></icon>
        </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import AnalyzesMixin from '@/mixins/analyzes-mixin';
import CheckboxInput from '@/components/UI/inputs/CheckboxInput.vue';

@Component({
  components: {
    CheckboxInput
  }
})
export default class AnalyzesBaCategoryCard extends AnalyzesMixin {
  @Prop() data: any

  get isCompareMode(): boolean {
    return this.$store.state.analyzes.compareMode;
  }
  get comparingItems(): number[] {
    return this.$store.state.analyzes.comparingItems;
  }

  compareChange(id) {
    this.$store.commit('analyzes/setComparingItems', id);
  }
  go(id) {
    this.$router.push({path: `/analyzes/${id}`});
  }
}
</script>

<style lang="scss" scoped>
.analyzes-by-category-card {
  display: flex;
  align-items: center;
  border-radius: 10px;
  margin-bottom: 5px;
  margin-right: 10px;
  cursor: pointer;

  &__wrap {
    display: flex;
    padding: 15px 0px 15px 20px;
    background: $light-white;
    // box-shadow: 0px 4px 15px $shadow-color;
    border-radius: 10px;
    width: 100%;

    @include media-breakpoint-up($breakpoint-md) {
      flex-direction: column;
    }
  }

  &__compare {
    margin-right: 20px;

    ::v-deep.checkbox-wrapper {
      .label {
        display: none;

        @include media-breakpoint-up($breakpoint-md) {
          display: block;
        }
      }
    }

    @include media-breakpoint-up($breakpoint-md) {
      margin-bottom: 20px;
    }
  }

  &__right {
    display: flex;

    @include media-breakpoint-up($breakpoint-md) {
      justify-content: space-between;
      margin-bottom: 10px;
    }
  }


  &__right-name-value {
    min-width: 280px;
    max-width: 280px;
    font-size: 14px;
    line-height: 130%;
    color: $black-02;
    margin-right: 20px;

    @include media-breakpoint-up($breakpoint-lg) {
      min-width: 160px;
      max-width: 160px;
      margin-right: 20px;
      font-size: 12px;
    }

    @include media-breakpoint-up($breakpoint-md) {
      font-size: 14px;
    }
  }

  &__right-result {
    display: flex;
    flex-direction: column;
    min-width: 170px;
    max-width: 170px;
    margin-right: 65px;

    @include media-breakpoint-up($breakpoint-lg) {
      margin-right: 20px;
      font-size: 12px;
      min-width: 120px;
      max-width: 120px;
    }

    @include media-breakpoint-up($breakpoint-md) {
      font-size: 14px;
      margin-top: 5px;
    }
  }

  &__right-result-current {
    font-weight: 600;
    font-size: 14px;
    line-height: 130%;
    color: $status-green;

    @include media-breakpoint-up($breakpoint-md) {
      .unit {
        display: none;
      }
    }
  }

  &__right-result-prev {
    font-weight: 500;
    font-size: 12px;
    line-height: 15px;
    color: $black-04;
    margin-top: 5px;

    @include media-breakpoint-up($breakpoint-md) {
      .unit {
        display: none;
      }
    }
  }

  &__right-values-ranges {
    font-size: 14px;
    line-height: 130%;
    color: $black-03;
    min-width: 120px;
    max-width: 120px;
    margin-right: 40px;

    .unit {
      display: none;
    }

    @include media-breakpoint-up($breakpoint-lg) {
      margin-right: 20px;
      font-size: 12px;
      min-width: 100px;
      max-width: 100px;
    }

    @include media-breakpoint-up($breakpoint-md) {
      display: flex;
      align-items: flex-end;
      flex-direction: column;

      .unit {
        display: block;
        margin-top: 5px;
      }
    }

    @include media-breakpoint-up($breakpoint-sm) {
      margin-right: 20px;
      margin-left: 20px;
      min-width: 0;
    }
  }

  &__right-values-lab {
    font-size: 14px;
    line-height: 130%;
    color: $black-02;

    @include media-breakpoint-up($breakpoint-md) {
      font-size: 12px;
    }
  }

  &__right-name {
    display: flex;

    @include media-breakpoint-up($breakpoint-md) {
      flex-direction: column;
    }
  }

  &__right-values {
    display: flex;
  }

  &__left {
    display: flex;
    align-items: center;
    position: relative;
    width: 100%;
  }

  &__left-date {
    font-size: 14px;
    line-height: 130%;
    color: $black-04;
    margin-right: 100px;
    margin-left: auto;


    @include media-breakpoint-up($breakpoint-md) {
      margin-right: 20px;
      font-size: 12px;
    }
  }

  &__left-btn {
    display: flex;
    background-color: $accent-color;
    border: none;
    border-radius: 8px;
    padding: 8px 10px;
    position: absolute;
    right: -10px;
    outline: none;
    opacity: 0;
    transition: .5s;

    @include media-breakpoint-up($breakpoint-md) {
      opacity: 1;
      position: relative;
      right: unset;
      padding: 12px 14px;
      background-color: transparent;
      border: 1px solid $light-stroke;
      margin-right: 20px;
    }
  }

  &__left-btn-icon {
    display: flex;
    align-items: center;
    color: $light-white;
    transform: rotate(180deg);

    @include media-breakpoint-up($breakpoint-md) {
      color: $accent-color;
    }

    svg {
      width: 4px;
      height: 8px;
    }
  }

  &:hover {
    .analyzes-by-category-card__left-btn {
      opacity: 1;
    }
  }

  &--compare {
    opacity: .6;
  }

  @include media-breakpoint-up($breakpoint-md) {
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 10px;
  }
}

</style>
