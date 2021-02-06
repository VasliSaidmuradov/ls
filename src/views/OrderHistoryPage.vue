<template>
  <div class="order-history layout">
    <h4 class="order-history__title">История заказов</h4>
    <div class="order-history__desk">
      Здесь собраны только те анализы, которые вы сдавали в ЛабСтори. Как загруженные вручную, так и те, что пришли из
      нашей системы.
    </div>

    <div class="order-history__content">
      <div class="order-history__content-row" v-for="item in orderedServices" :key="item.date">
        <div class="order-history__content-row-date">
          <span class="order-history__content-row-date-icon">
            <icon name="calendar-icon"></icon>
          </span>
          <span class="order-history__content-row-date-text">{{ item.date }}</span>
        </div>
        <div class="order-history__content-list">
          <LatestResultsCard :data="order" v-for="order in item.orders" :key="order.id" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import LatestResultsCard from '@/components/indexPage/LatestResultsCard.vue';

@Component({
  components: {
    LatestResultsCard,
  },
})
export default class OrderHistoryPage extends Vue {
  created() {
    this.$store.dispatch('orders/getOrderedServices');
  }
  get orderedServices() {
    return this.$store.getters['orders/getOrderedServicesList'];
  }
}
</script>

<style lang="scss" scoped>
.order-history {
  &__title {
    font-weight: 500;
    font-size: 36px;
    line-height: 130%;
    color: $black-01;
    margin-top: 0;
    margin-bottom: 25px;
  }

  &__desk {
    font-size: 16px;
    line-height: 22px;
    color: $gray-01;
    width: 40%;

    @include media-breakpoint-up($breakpoint-md) {
      width: 100%;
    }
  }

  &__content {
    margin-top: 70px;
    display: flex;
    flex-direction: column;
  }

  &__content-row {
    margin-bottom: 50px;
  }

  &__content-list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 25px;

    @include media-breakpoint-up($breakpoint-pre-md) {
      grid-template-columns: repeat(2, 1fr) !important;
    }

    @include media-breakpoint-up($breakpoint-sm) {
      grid-template-columns: repeat(1, 1fr) !important;
    }
  }

  &__content-row-date {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }

  &__content-row-date-icon {
    color: $accent-color;
  }

  &__content-row-date-text {
    font-size: 12px;
    line-height: 150%;
    color: $accent-color;
    margin-right: 8px;
  }

  &__content-list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 20px;
  }
}
</style>
