<template>
  <div class="order-page layout">
    <div class="order-page__header">
      <span class="order-page__header-desk">Гормональные исследования</span>
      <h4 class="order-page__header-title" :class="{'active': unfurlText}">
        Иммуноблот антинуклеарных антител с комментарием, (антитела против антигенов Sm, RNP/Sm
        Иммуноблот антинуклеарных антител с комментарием, (антитела против антигенов Sm, RNP/Sm
        Иммуноблот антинуклеарных антител с комментарием, (антитела против антигенов Sm, RNP/Sm
        Иммуноблот антинуклеарных антител с комментарием, (антитела против антигенов Sm, RNP/Sm
      </h4>

      <MainBtn class="order-page__header-unfurlText"
               :class="{'active': unfurlText}"
               type="small"
               @click-btn="onUnfurlText"
               bcg-color="transparent"
               text="Развернуть название">
        <template v-slot:icon>
          <icon name="next-icon"></icon>
        </template>
      </MainBtn>

      <div class="order-page__header-cards">
        <div class="order-page__header-card" v-for="(card, index) in cardsData" :key="index">
          <h6 class="order-page__header-card-title">{{card.title}}</h6>
          <span class="order-page__header-card-desk">{{card.desk}}</span>
        </div>
      </div>
    </div>

    <div class="order-page__documents">
      <div class="order-page__documents-upload">
        <h6 class="order-page__documents-title">
          Прикрепить документ
        </h6>
        <div class="order-page__documents-desk">
          Вы можете прикрепить к заказу документы с расшифровкой анализов: загрузить новый или выбрать существующий
        </div>

        <div class="order-page__documents-actions">
          <MainBtn class="order-page__documents-actions-storage"
                   text="Выбрать из хранилища"
                   border-color="#7C74E9"
                   bcg-color="transparent">
            <template v-slot:icon>
              <icon name="storage-icon"></icon>
            </template>
          </MainBtn>
          <MainBtn text="Загрузить новые"
                   class="order-page__documents-actions-upload"
                   type="btn-small"
                   bcg-color="transparent">
            <template v-slot:icon>
              <icon name="cloud-icon"></icon>
            </template>
          </MainBtn>
        </div>
      </div>

      <div class="order-page__documents-slider">
        <q-carousel
            v-model="slide"
            ref="slider"
            transition-prev="scale"
            transition-next="scale"
            swipeable
            control-color="white"
            height="auto"
            class="bg-white text-white shadow-1 rounded-borders"
        >
          <q-carousel-slide v-for="index in 5" :key="index" :name="index">
            <SlideCard />
          </q-carousel-slide>
        </q-carousel>
        <div class="order-page__documents-slider-control">
          <div class="order-page__documents-slider-pagination">
            <div class="order-page__documents-slider-pagination-item"
                 :class="{'active': index === slide}"
                 v-for="index in 5"
                 :key="index"
                 @click="setSlide(index)"></div>
          </div>

          <div class="order-page__documents-slider-btns">
            <MainBtn type="only-icon"
                     bcg-color="transparent"
                     class="order-page__documents-slider-btns-prev"
                     @click-btn="prevSlide"
                     border-color="#E9E8FF">
              <template v-slot:icon>
                <icon name="next-icon"></icon>
              </template>
            </MainBtn>
            <MainBtn type="only-icon"
                     bcg-color="transparent"
                     @click-btn="nextSlide"
                     class="order-page__documents-slider-btns-next"
                     border-color="#E9E8FF">
              <template v-slot:icon>
                <icon name="next-icon"></icon>
              </template>
            </MainBtn>
          </div>
        </div>
      </div>
    </div>
    <div class="order-page__content">
      <div class="order-page__content-item" v-for="(item, index) in contentData" :key="index">
        <div class="order-page__content-item-left">
          <div class="order-page__content-item-title">
            {{item.title}}
          </div>
          <div class="order-page__content-item-left-result">
            <div class="order-page__content-item-result">
              {{item.result}}
            </div>
            <div class="order-page__content-item-unit">
              {{item.unit}}
            </div>
            <div class="order-page__content-item-ranges">
              {{getRanges(item.ranges)}}
            </div>
          </div>
        </div>
        <div class="order-page__content-item-status">
            <span class="order-page__content-item-status-icon">
              <icon :name="item.status.icon"></icon>
            </span>
          <span class="order-page__content-item-status-text">
              {{item.status.text}}
            </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import MainBtn from '@/components/UI/buttons/MainBtn.vue';
import SlideCard from '@/components/analyzes/SlideCard.vue';
import {QCarousel} from 'quasar';
import AnalyzesMixin from '@/mixins/analyzes-mixin';
export interface IRefs {
  slider: QCarousel;
}

@Component({
  components: {
    MainBtn,
    SlideCard
  }
})
export default class OrderPage extends AnalyzesMixin {

  slide = 1;
  unfurlText = false;
  cardsData = [
    {
      title: 'Дата сдачи',
      desk: '22.05.2020'
    }, {
      title: 'Всего показателей',
      desk: '7 штук'
    }, {
      title: 'Стоимость',
      desk: '1 800₽'
    }, {
      title: 'Метод и оборудование',
      desk: 'Liaison'
    }
  ]

  contentData = [
    {
      title: 'Витамин D',
      result: '56.67',
      unit: 'МЕ/мл',
      ranges: {
        min: 20,
        max: null,
      },
      status: {
        text: 'Готово',
        icon: 'doc-success-icon',
      },
    }, {
      title: 'Витамин D',
      result: '56.67',
      unit: 'МЕ/мл',
      ranges: {
        min: 20,
        max: null,
      },
      status: {
        text: 'Готово',
        icon: 'doc-success-icon',
      },
    }, {
      title: 'Витамин D',
      result: '56.67',
      unit: 'МЕ/мл',
      ranges: {
        min: 20,
        max: null,
      },
      status: {
        text: 'Готово',
        icon: 'doc-success-icon',
      },
    }, {
      title: 'Витамин D',
      result: '56.67',
      unit: 'МЕ/мл',
      ranges: {
        min: 20,
        max: null,
      },
      status: {
        text: 'Готово',
        icon: 'doc-success-icon',
      },
    }, {
      title: 'Витамин D',
      result: '56.67',
      unit: 'МЕ/мл',
      ranges: {
        min: 20,
        max: null,
      },
      status: {
        text: 'Готово',
        icon: 'doc-success-icon',
      },
    }
  ]

  $refs: IRefs & Vue['$refs']


  setSlide(slide: number) {
    this.$refs.slider.goTo(slide);
  }

  prevSlide() {
    this.$refs.slider.previous();
  }

  nextSlide() {
    this.$refs.slider.next();
  }

  onUnfurlText() {
    this.unfurlText = !this.unfurlText;
  }
}
</script>

<style lang="scss" scoped>
.order-page {
  display: flex;
  flex-direction: column;

  &__header {
    width: 70%;

    @include media-breakpoint-up($breakpoint-pre-md) {
      width: 100%;
    }
  }

  &__header-desk {
    font-weight: 500;
    font-size: 12px;
    line-height: 15px;
    color: $accent-orange;
  }

  &__header-title {
    font-weight: 500;
    font-size: 36px;
    line-height: 130%;
    color: $black-01;
    @include trim-text(3);
    margin-top: 24px;
    margin-bottom: 12px;

    &.active {
      -webkit-line-clamp: unset;
    }

    @include media-breakpoint-up($breakpoint-sm) {
      font-size: 26px;
    }
  }

  &__header-cards {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    margin-top: 35px;
    grid-gap: 20px;

    @include media-breakpoint-up($breakpoint-sm) {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  &__header-unfurlText {

    ::v-deep.main-btn__icon-wrapper {
      transform: rotate(90deg);
      transition: .4s;
      margin-right: 14px;

      svg {
        width: 4px;
        height: 8px;
        color: $black-04;
      }
    }

    ::v-deep.main-btn__text {
      font-size: 12px;
      line-height: 150%;
      color: $gray-03;
    }

    &.active {
      ::v-deep.main-btn__icon-wrapper {
        transform: rotate(-90deg);
      }
    }
  }

  &__header-card {
    padding: 22px 24px;
    display: flex;
    flex-direction: column;
    background: $light-white;
    box-shadow: 0px 4px 15px $shadow-color;
    border-radius: 16px;
  }

  &__header-card-title {
    margin-bottom: 8px;
    margin-top: 0;
    font-weight: 500;
    font-size: 12px;
    line-height: 15px;
    color: $accent-color;
  }

  &__header-card-desk {
    font-size: 14px;
    line-height: 130%;
    color: $black-01;
  }

  &__documents-actions-upload {
    margin-left: 28px;

    ::v-deep.main-btn__icon-wrapper {
      color: $accent-color;
      margin-right: 9px;
    }

    ::v-deep.main-btn__text {
      font-weight: 400;
    }
  }

  &__documents-actions-storage {
    padding: 8px;

    ::v-deep.main-btn__icon-wrapper {
      background-color: $accent-color;
      color: $light-white;
    }

    ::v-deep.main-btn__text {
      color: $black-02;
    }

    @include media-breakpoint-up($breakpoint-xs) {
      margin-bottom: 20px;
    }
  }

  &__documents {
    display: flex;
    margin-top: 60px;

    @include media-breakpoint-up($breakpoint-pre-md) {
      flex-direction: column;
    }
  }

  &__documents-upload {
    display: flex;
    flex-direction: column;
    width: 40%;
    margin-right: 60px;

    @include media-breakpoint-up($breakpoint-lg) {
      width: 50%;
    }

    @include media-breakpoint-up($breakpoint-pre-md) {
      width: 100%;
      margin-bottom: 10px;
    }
  }

  &__documents-title {
    margin-bottom: 10px;
    font-weight: 600;
    font-size: 14px;
    line-height: 130%;
    color: $gray-01;
  }

  &__documents-desk {
    font-size: 14px;
    line-height: 20px;
    color: $gray-01;
    margin-bottom: 25px;
  }

  &__documents-actions {
    display: flex;
    align-items: center;

    @include media-breakpoint-up($breakpoint-xs) {
      flex-direction: column;
      align-items: flex-start;
    }
  }

  &__documents-slider {
    width: 60%;

    @include media-breakpoint-up($breakpoint-lg) {
      width: 50%;
    }

    @include media-breakpoint-up($breakpoint-pre-md) {
      width: 100%;
      margin-top: 20px;
    }
  }

  &__documents-slider-control {
    display: flex;
    align-items: center;
    margin-top: 25px;
  }

  &__documents-slider-pagination {
    display: flex;
    align-items: center;
    margin-right: 30px;
  }

  &__documents-slider-pagination-item {
    width: 10px;
    height: 10px;
    background: $light;
    border-radius: 100%;
    margin-right: 8px;
    cursor: pointer;

    &:last-child {
      margin-right: 0;
    }

    &.active {
      background: $accent-color;
    }
  }

  &__documents-slider-btns {
    display: flex;
    align-items: center;

    ::v-deep.main-btn {
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;

      .main-btn__icon-wrapper {
        color: $accent-color;
        svg {
          width: 4px;
          height: 8px;
        }
      }
    }

    ::v-deep.order-page__documents-slider-btns-next {
      transform: rotate(180deg);
      margin-left: 10px;
    }
  }

  &__content {
    margin-top: 60px;
    display: flex;
    flex-direction: column;
  }

  &__content-item {
    display: flex;
    align-items: center;
    padding: 18px 20px;
    background: $light-white;
    box-shadow: 0px 4px 15px $shadow-color;
    border-radius: 10px;
    margin-bottom: 20px;


    &:last-child {
      margin-bottom: 0;
    }

    @include media-breakpoint-up($breakpoint-sm) {
      flex-direction: column;
      align-items: flex-start;
    }
  }

  &__content-item-left {
    display: flex;
    align-items: center;
    width: 100%;

    @include media-breakpoint-up($breakpoint-sm) {
      justify-content: space-between;
    }
  }

  &__content-item-left-result {
    display: flex;
    align-items: center;

    @include media-breakpoint-up($breakpoint-sm) {
      flex-direction: column;
      align-items: flex-end;
    }
  }

  &__content-item-title {
    font-size: 14px;
    line-height: 130%;
    color: $black-02;
    min-width: 30%;
    max-width: 30%;
  }

  &__content-item-result {
    min-width: 100px;
    max-width: 100px;
    margin-right: 20px;
    font-weight: 600;
    font-size: 14px;
    line-height: 130%;
    color: $status-green;

    @include media-breakpoint-up($breakpoint-sm) {
      margin-right: 0;
      display: flex;
      justify-content: flex-end;
    }
  }

  &__content-item-unit {
    min-width: 100px;
    max-width: 100px;
    margin-right: 20px;
    font-size: 14px;
    line-height: 130%;
    color: $black-02;

    @include media-breakpoint-up($breakpoint-sm) {
      display: none;
    }
  }


  &__content-item-ranges {
    min-width: 160px;
    max-width: 160px;
    margin-right: 20px;
    font-size: 14px;
    line-height: 130%;
    color: $black-03;

    @include media-breakpoint-up($breakpoint-sm) {
      margin-right: 0;
      display: flex;
      justify-content: flex-end;
      margin-top: 5px;
    }
  }

  &__content-item-status {
    margin-left: auto;
    padding: 8px;
    display: flex;
    align-items: center;
    margin-right: 80px;

    @include media-breakpoint-up($breakpoint-sm) {
      margin-left: 0;
    }
  }

  &__content-item-status-icon {
    margin-right: 12px;
  }

  &__content-item-status-text {
    font-size: 12px;
    line-height: 15px;
    color: $black-02;
  }
}

</style>
