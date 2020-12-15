<template>
  <div class="latest-result-card" @click="goToOrderPage">
    <div class="latest-result-card__top">
      <div class="latest-result-card__top-left">
        <span class="latest-result-card__category">{{data.category}}</span>
        <h4 class="latest-result-card__title">{{data.name}}</h4>
        <div class="latest-result-card__desk">
          {{data.description}}
        </div>
        <div class="latest-result-card__date">
          <span class="latest-result-card__date-icon">
            <icon name="calendar-icon"></icon>
          </span>
          {{$date(data.date, 'dd.MM.yyyy')}}
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
      <div class="latest-result-card__bottom-left">
        <span class="latest-result-card__bottom-left-desk">
          Всего 12 показателей:
        </span>
        <div class="latest-result-card__bottom-left-branch">
          <span v-for="item in 3" :key="item" class="latest-result-card__bottom-left-branch-value">
            {{item}}
          </span>
        </div>
      </div>
      <div class="latest-result-card__bottom-right">
        {{data.is_new ? 'Новый!' : 'что то'}}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import {IDashBoard} from '@/interfaces/dashboard.interface';
import {IRouter} from '@/interfaces/router.interface';
import ROUTE_NAME = IRouter.ROUTE_NAME;

@Component({})
export default class LatestResultsCard extends Vue {
  @Prop() data: IDashBoard.ILatestResult;

  goToOrderPage() {
    this.$router.push({name: ROUTE_NAME.ORDER_PAGE})
  }
}
</script>

<style lang="scss" scoped>
.latest-result-card {
  background: $light-white;
  box-shadow: 0px 4px 15px $shadow-color;
  border-radius: 20px;
  padding: 20px;

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
      transform: scale(1.50);
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


      &:nth-child(1) {
        background-color: $status-green;
        z-index: 3;
      }

      &:nth-child(2) {
        background-color: $status-red;
        margin-left: -8px;
        z-index: 2;
      }

      &:nth-child(3) {
        background-color: $black-04;
        margin-left: -8px;
        z-index: 1;
      }
    }
  }
}

</style>
