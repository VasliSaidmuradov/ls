<template>
  <div class="latest-result-card" @click="goToOrderPage(data.id)">
    <div class="latest-result-card__top">
      <div class="latest-result-card__top-left">
        <span class="latest-result-card__category">{{ data.rubric_name }}</span>
        <h4 class="latest-result-card__title">{{ data.name }} {{ data.id }}</h4>
        <div class="latest-result-card__desk">
          {{ bioMarkers }}
        </div>
        <div class="latest-result-card__date">
          <span class="latest-result-card__date-icon">
            <icon name="calendar-icon"></icon>
          </span>
          {{ $date(new Date(data.date), 'dd.MM.yyyy') }}
        </div>
      </div>
      <div class="latest-result-card__top-right">
        <button class="latest-result-card__btn">
          <span class="latest-result-card__btn-icon">
            <icon name="next-icon"></icon>
          </span>
        </button>
      </div>
    </div>
    <div class="latest-result-card__bottom">
      <div class="latest-result-card__bottom-left" v-if="data.results.length">
        <span class="latest-result-card__bottom-left-desk"> Всего {{ data.results.length }} показателей: </span>
        <div class="latest-result-card__bottom-left-branch">
          <span
            v-for="(item, index) in bioMarkersStatus"
            :key="index + Math.random()"
            class="latest-result-card__bottom-left-branch-value"
            :class="`latest-result-card__bottom-left-branch-value--${+index}`"
          >
            {{ item.length }}
          </span>
        </div>
      </div>
      <div class="latest-result-card__bottom-right" v-if="isOrderNew(data.date)">Новый!</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { IDashBoard } from '@/interfaces/dashboard.interface';

@Component({})
export default class LatestResultsCard extends Vue {
  @Prop() data: IDashBoard.ILatestResult;

  created() {
    this.$store.dispatch('staticVariables/getOrderStatuses');
  }

  get bioMarkers(): string {
    return this.data?.results?.map((item: { name: string }) => item.name).join(',') || '-';
  }
  get bioMarkersStatus() {
    return this.groupBy(this.data.results, 'status');
  }
  get orderStatuses() {
    return this.$store.state.staticVariables.orderStatuses;
  }

  goToOrderPage(id: number) {
    this.$router.push({ path: `/order-page/${id}` });
  }
  groupBy(items: any[], key: string) {
    return items.reduce(
      (result, item) => ({
        ...result,
        [item[key]]: [...(result[item[key]] || []), item],
      }),
      {}
    );
  }
  isOrderNew(date: Date): boolean {
    const TWO_DAYS = 2 * 24 * 60 * 60 * 1000;
    return TWO_DAYS >= Date.parse(`${new Date()}`) - Date.parse(`${date}`);
  }
}
</script>

<style lang="scss" scoped>
.latest-result-card {
  background: $light-white;
  box-shadow: 0px 4px 15px $shadow-color;
  border-radius: 20px;
  padding: 20px;
  cursor: pointer;

  &__top {
    display: flex;
  }

  &__top-left {
    width: 85%;
  }

  &__category {
    font-weight: 500;
    font-size: 12px;
    line-height: 15px;
    color: $accent-orange;
  }

  &__title {
    font-weight: 500;
    font-size: 16px;
    line-height: 130%;
    color: $black-02;
    margin-top: 18px;
    margin-bottom: 10px;
    @include trim-text(3);

    @include media-breakpoint-up($breakpoint-xs) {
      font-size: 14px;
    }
  }

  &__desk {
    font-size: 14px;
    line-height: 130%;
    color: $black-04;
    margin-bottom: 18px;
    @include trim-text(2);

    @include media-breakpoint-up($breakpoint-xs) {
      font-size: 12px;
    }
  }

  &__date {
    display: flex;
    align-items: center;
    font-weight: 500;
    font-size: 12px;
    line-height: 15px;
    color: $accent-color;
  }

  &__date-icon {
    margin-right: 7px;

    svg {
      transform: scale(1.5);
    }
  }

  &__top-right {
    margin-left: auto;
  }

  &__btn {
    background-color: transparent;
    padding: 12px 14px;
    border: 1px solid $light-stroke;
    border-radius: 12px;
    cursor: pointer;
    outline: none;
  }

  &__btn-icon {
    transform: rotate(180deg);
    color: $accent-color;
    display: flex;
    align-items: center;

    svg {
      width: 4px;
      height: 8px;
    }
  }

  &__bottom {
    display: flex;
    justify-content: space-between;
    margin-top: 25px;
    align-items: center;

    @include media-breakpoint-up($breakpoint-lg) {
      flex-direction: column;
      align-items: flex-start;
    }

    @include media-breakpoint-up($breakpoint-lg) {
      flex-direction: row;
      align-items: center;
    }

    @include media-breakpoint-up($breakpoint-xs) {
      flex-direction: column;
      align-items: flex-start;
    }
  }

  &__bottom-right {
    font-weight: 700;
    font-size: 12px;
    line-height: 15px;
    color: $accent-color;
    margin-left: 20px;

    @include media-breakpoint-up($breakpoint-lg) {
      margin-left: 0;
      margin-top: 10px;
    }

    @include media-breakpoint-up($breakpoint-lg) {
      margin-left: 20px;
      margin-top: 0px;
    }

    @include media-breakpoint-up($breakpoint-xs) {
      margin-left: 0;
      margin-top: 10px;
    }
  }

  &__bottom-left {
    display: flex;
    align-items: center;
  }

  &__bottom-left-desk {
    font-weight: 500;
    font-size: 12px;
    line-height: 15px;
    color: $black-04;
    margin-right: 10px;
  }

  &__bottom-left-branch {
    display: flex;
    span {
      display: block;
      padding: 8px 14px;
      border-radius: 16px;
      font-weight: 500;
      font-size: 12px;
      line-height: 15px;
      color: $light-white;
      position: relative;
    }
    &-value--5 {
      background-color: $status-green;
      z-index: 3;
    }
    &-value--4 {
      background-color: $black-04;
      z-index: 1;
      margin-left: 32px;
    }
    &-value--3 {
      background-color: $status-yellow;
      margin-left: 8px;
      z-index: 2;
    }
    &-value--2 {
      background-color: $status-red;
      margin-left: 16px;
      z-index: 2;
    }
    &-value--1 {
      background-color: $status-red;
      margin-left: 24px;
      z-index: 2;
    }
    &-value--0 {
      display: none;
      color: $black-04;
    }
  }
}
</style>
