<template>
  <div class="benchmarks-card">
    <div class="benchmarks-card__content">
      <div class="benchmarks-card__content-name">
        <span class="benchmarks-card__content-name-value">{{benchmark.name}}</span>
        <span class="benchmarks-card__content-name-value-unit">{{benchmark.unit}}</span>
      </div>
      <div class="benchmarks-card__content-value">
        <div class="benchmarks-card__content-value-left">
          <span class="benchmarks-card__content-value-left-value">
            {{benchmark.value}}
          </span>
          <span class="benchmarks-card__content-value-left-unit">
            {{benchmark.unit}}
          </span>
        </div>
        <div class="benchmarks-card__content-value-right">
          <span class="benchmarks-card__content-value-right-ranges">
            {{getRanges(benchmark.ranges)}}
          </span>
        </div>
      </div>
    </div>
    <div class="benchmarks-card__date">
      <span class="benchmarks-card__date-value">
        {{$date(benchmark.date, 'dd MMMM yyyy')}}
      </span>
      <button class="benchmarks-card__date-btn">
        <span class="benchmarks-card__date-btn-icon">
          <icon name="next-icon"></icon>
        </span>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import {IDashBoard} from '@/interfaces/dashboard.interface';
import AnalyzesMixin from '@/mixins/analyzes-mixin';

@Component({})
export default class BenchmarksCard extends AnalyzesMixin {
  @Prop({required: true}) benchmark: IDashBoard.IBenchmarks;
}
</script>

<style lang="scss" scoped>
.benchmarks-card {
  padding: 20px;
  background: $light-white;
  box-shadow: 0px 4px 15px $shadow-color;
  border-radius: 10px;
  display: flex;
  align-items: center;
  margin-bottom: 9px;
  cursor: pointer;
  margin-right: 10px;

  &:last-child {
    margin-bottom: 0;
  }

  &__content {
    display: flex;
    align-items: center;
    width: calc(80% - 20px);
    margin-right: 20px;

    @include media-breakpoint-up($breakpoint-md) {
      justify-content: space-between;
    }

    @include media-breakpoint-up($breakpoint-md) {
      margin-right: 0;
      width: 100%;
    }
  }

  &__content-name {
    min-width: calc(100% - (180px + 120px));
    max-width: calc(100% - (180px + 120px));
    margin-right: 40px;

    @include media-breakpoint-up($breakpoint-lg) {
      min-width: calc(100% - (120px + 120px));
      max-width: calc(100% - (120px + 120px));
      margin-right: 20px;
    }

    @include media-breakpoint-up($breakpoint-md) {
      max-width: 70%;
      min-width: auto;
    }
  }

  &__content-name-value {
    font-size: 14px;
    line-height: 130%;
    color: $black-02;
    display: block;
    @include trim-text(2);

    @include media-breakpoint-up($breakpoint-lg) {
      font-size: 12px;
    }

    @include media-breakpoint-up($breakpoint-md) {
      font-size: 14px;
    }
  }

  &__content-value {
    display: flex;
    align-items: center;

    @include media-breakpoint-up($breakpoint-md) {
      flex-direction: column;
      align-items: flex-end;
    }
  }

  &__content-value-left {
    display: flex;
    align-items: center;
    color: $status-green;
    font-weight: 600;
    font-size: 14px;
    line-height: 17px;
    min-width: 120px;
    max-width: 120px;
    margin-right: 40px;

    @include media-breakpoint-up($breakpoint-lg) {
      font-size: 12px;
      min-width: 100px;
      max-width: 100px;
    }

    @include media-breakpoint-up($breakpoint-md) {
      font-size: 14px;
      max-width: 100%;
      min-width: auto;
      margin-right: 0;
    }
  }

  &__content-value-left-value {
    margin-right: 10px;
    display: block;

    @include media-breakpoint-up($breakpoint-md) {
      margin-right: 0;
    }
  }

  &__content-value-left-unit {

    @include media-breakpoint-up($breakpoint-md) {
      display: none;
    }
  }

  &__content-value-right {
    min-width: 120px;
    max-width: 120px;
    font-size: 14px;
    line-height: 130%;
    color: $black-03;

    @include media-breakpoint-up($breakpoint-lg) {
      font-size: 12px;
      min-width: 100px;
      max-width: 100px;
    }

    @include media-breakpoint-up($breakpoint-md) {
      font-size: 14px;
      max-width: 100%;
      min-width: auto;
      margin-right: 0;
      margin-top: 10px;
    }
  }

  &__date {
    width: 20%;
    display: flex;
    align-items: center;
    position: relative;

    @include media-breakpoint-up($breakpoint-md) {
      width: 100%;
      margin-top: 20px;
      justify-content: space-between;
    }
  }

  &__date-value {
    font-size: 14px;
    line-height: 130%;
    color: $black-04;

    @include media-breakpoint-up($breakpoint-lg) {
      font-size: 12px;
    }

    @include media-breakpoint-up($breakpoint-md) {
      font-size: 14px;
    }
  }

  &__date-btn {
    display: flex;
    background-color: $accent-color;
    border: none;
    border-radius: 8px;
    padding: 8px 10px;
    position: absolute;
    right: -30px;
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
    }
  }

  &__date-btn-icon {
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
    .benchmarks-card__date-btn {
      opacity: 1;
    }
  }

  &__content-name-value-unit {
    display: none;
    margin-top: 5px;
    font-size: 12px;
    line-height: 15px;
    color: $black-02  ;

    @include media-breakpoint-up($breakpoint-md) {
      display: block;
    }

    @include media-breakpoint-up($breakpoint-md) {
      font-size: 14px;
    }
  }

  @include media-breakpoint-up($breakpoint-md) {
    flex-direction: column;
    align-items: flex-start;
    padding: 11px 13px;
    margin-right: 0;
  }
}

</style>
