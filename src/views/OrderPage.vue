<template>
  <div class="order-page layout">
    <div class="order-page__header">
      <span class="order-page__header-desk">{{orderedService.rubric_name}}</span>
      <h4 class="order-page__header-title" :class="{'active': unfurlText}">
        {{orderedService.name}}
      </h4>

      <MainBtn class="order-page__header-unfurlText"
               :class="{'active': unfurlText}"
               type="small"
               @click-btn="onUnfurlText"
               bcg-color="transparent"
               :text="unfurlText ? 'Свернуть название' : 'Развернуть название'">
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
          <MainBtn
              class="order-page__documents-actions-storage"
              text="Выбрать из хранилища"
              border-color="#7C74E9"
              bcg-color="transparent"
              @click-btn="toggleSelectDocumentModal(true)"
          >
            <template v-slot:icon>
              <icon name="storage-icon"></icon>
            </template>
          </MainBtn>
          <MainBtn
              text="Загрузить новые"
              class="order-page__documents-actions-upload"
              type="btn-small"
              bcg-color="transparent"
              @click-btn="toggleFileModal(true)"
          >
            <template v-slot:icon>
              <icon name="cloud-icon"></icon>
            </template>
          </MainBtn>
        </div>
      </div>

      <!-- SLIDER -->
      <div v-if="documentsList.length" class="order-page__documents-slider">
        <q-carousel
            v-model="slideId"
            ref="slider"
            transition-prev="scale"
            transition-next="scale"
            swipeable
            control-color="white"
            height="auto"
            class="bg-white text-white shadow-1 rounded-borders"
        >
          <q-carousel-slide v-for="document in documentsList" :key="document.id" :name="document.id">
            <SlideCard :slideInfo="document" />
          </q-carousel-slide>
        </q-carousel>
        <div class="order-page__documents-slider-control">
          <div class="order-page__documents-slider-pagination">
            <div
              class="order-page__documents-slider-pagination-item"
              :class="{'active': doc.id === slideId}"
              v-for="doc in documentsList"
              :key="doc.id"
              @click="setSlide(doc.id)"
            ></div>
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
      <!-- SLIDER END -->
      <!-- {{ documentsList }} -->
    </div>

    <span class="table__title">Результаты</span>

    <table class="table">
      <tr class="table__tr" v-for="(result, index) in orderedService.results" :key="index">
        <td class="table__name">
          {{result.name}}
        </td>
        <td class="table__value" :style="{color: result.status === 1 ? '#63C58A' : '#DFDFEB'}">
          {{result.value}}
        </td>
        <td class="table__unit">
          {{result.unit}}
        </td>
        <td class="table__ranges">
          {{getRanges(result.ranges)}}
        </td>
        <td class="table__status">
          <div class="table__status-main-wrapper">
            <div class="table__status-wrapper">
              <icon :name="countStatusIcon(result.status)"/>
              <span class="table__status-text">{{ getCurrentOrderStatus(result.status) }}</span>
            </div>
          </div>
        </td>
      </tr>
    </table>

    <!--visible if max-width = 1000px-->
    <div class="block__item-wrapper">
      <div class="block__item" v-for="(result, index) in orderedService.results" :key="index">
        <div class="block__item-header">
          <span class="block__item-name">{{result.name}}</span>
          <div class="block__item-value-ranges-wrapper">
            <span class="block__item-value" :style="{color: result.status === 1 && '#63C58A'}">
             {{result.value || '0,0'}}
            </span>
            <span class="block__item-ranges">{{getRanges(result.ranges)}}</span>
          </div>
        </div>
        <div class="block__item-middle">
          <span class="block__item-units">{{result.unit}}</span>
        </div>
        <div class="block__item-status-wrapper">
          <icon :name="countStatusIcon(result.status)"/>
          <span class="block__item-status-text">{{ getCurrentOrderStatus(result.status) }}</span>
        </div>
      </div>
    </div>

    <SelectDocumentsModal
      :isSelectDocumentModalOpen="isSelectDocumentModalOpen"
      :documentsList="allDocumentsList"
      :orderedService="orderedService"
      @close-modal="toggleSelectDocumentModal(false)"
    />

    <AddFileModal
      :isFileModalOpen="isFileModalOpen"
      @close-modal="toggleFileModal(false)"
    />
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Watch } from 'vue-property-decorator';
  import { QCarousel } from 'quasar';
  import AnalyzesMixin from '@/mixins/analyzes-mixin';
  import MainBtn from '@/components/UI/buttons/MainBtn.vue';
  import SlideCard from '@/components/analyzes/SlideCard.vue';
  import SelectDocumentsModal from '@/components/modals/SelectDocumentsModal.vue';
  import AddFileModal from '@/components/modals/addFileModal/AddFileModal.vue';
  import { mapState, mapActions } from 'vuex';

  export interface IRefs {
    slider: QCarousel;
  }

  @Component({
    components: {
      AddFileModal,
      SelectDocumentsModal,
      SlideCard,
      MainBtn
    },
    computed: {
      ...mapState('orders', ['orderedService']),
    },
    methods: {
      ...mapActions('orders', ['getOrderedService']),
    }
  })
  export default class OrderPage extends AnalyzesMixin {
    isSelectDocumentModalOpen: boolean = false;
    isFileModalOpen: boolean = false;
    slideId: number | null= null;
    unfurlText = false;
    cardsData = [];

    @Watch('orderedService', { deep: true })
    setCardsData(val, oldVal) {
      this.cardsData = [
        {
          title: 'Дата сдачи',
          desk: this.orderedService.date,
        },
        {
          title: 'Всего показателей',
          desk: `${this.orderedService?.results?.length} штук`,
        },
        {
          title: 'Стоимость',
          desk: `${this.orderedService?.price}₽`,
        },
        // {
        //   title: 'Метод и оборудование',
        //   desk: this.orderedService.analyzer || '-',
        // },
      ]
    }

    @Watch('documentsList', { deep: true })
    setSliderId(val) {
      this.slideId =this.documentsList[0].id;
    }

    $refs: IRefs & Vue['$refs'];
    created() {
      this.getOrderedService(this.$route.params.id);
      this.$store.dispatch('staticVariables/getOrderStatuses');
      this.$store.dispatch('staticVariables/getDocumentTypes');
    }

    get orderStatuses() {
      return this.$store.state.staticVariables.orderStatuses;
    }
    get sliderList() {
      return this.orderedService
    }
    get documentsList() {
      return this.$store.state.documents.documentsList;
    }
    get allDocumentsList() {
      return this.$store.state.documents.allDocumentsList;
    }

    getCurrentOrderStatus(statusId) {
      const statuses = [...this.orderStatuses];
      const status = statuses.find(el => el.value === statusId);
      return status?.description;
    }

    setSlide(slideId: number) {
      this.$refs.slider.goTo(slideId);
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
    countStatusIcon(status: number) {
      const processIcon = 'doc-process-icon';
      const errorIcon = 'doc-error-icon';
      const successIcon = 'doc-success-icon';
      switch (status) {
        case 1:
          return errorIcon;
        case 2:
          return errorIcon;
        case 3:
          return processIcon;
        case 4:
          return processIcon;
        case 5:
          return successIcon;
      }
    }

    toggleSelectDocumentModal(val: boolean) {
      this.isSelectDocumentModalOpen = val;
    }

    toggleFileModal(val: boolean) {
      this.isFileModalOpen = val;
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
        transform: rotate(-90deg);
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
          transform: rotate(90deg);
        }
      }
    }

    &__header-card {
      padding: 22px 24px;
      display: flex;
      flex-direction: column;
      background: $light-white;
      box-shadow: 0 4px 15px $shadow-color;
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

    .table {
      margin-top: 10px;
      border-collapse: separate;
      border-spacing: 0 20px;
      max-width: 1040px;
      width: 100%;

      @include media-breakpoint-up(1000px) {
        display: none;
      }

      &__title {
        margin-top: 50px;
        font-weight: 500;
        font-size: 16px;
        line-height: 130%;
        color: $black-01;

        @include media-breakpoint-up(1000px) {
          margin-top: 40px;
        }
      }

      td:first-child {
        text-align: left;
        padding-left: 20px;
        border-bottom-left-radius: 10px;
        border-top-left-radius: 10px;
      }

      td:last-child {
        border-bottom-right-radius: 10px;
        border-top-right-radius: 10px;
      }

      &__tr {
        height: 54px;
        border-radius: 10px;
        background-color: $light-white;
        box-shadow: 0 4px 15px $shadow-color;
      }

      &__name {
        color: $black-02;
        font-weight: normal;
        font-size: 14px;
        line-height: 130%;
      }

      &__value {
        min-width: 100px;
        font-weight: 600;
        font-size: 14px;
        line-height: 130%;
      }

      &__unit {
        min-width: 100px;
        color: $black-02;
        font-weight: normal;
        font-size: 14px;
        line-height: 130%;
      }

      &__ranges {
        min-width: 100px;
        color: $black-03;
        font-weight: normal;
        font-size: 14px;
        line-height: 130%;
      }

      &__status-main-wrapper {
        display: flex;
      }

      &__status-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 34px;
        padding: 0 8px;
        background-color: $light-background;
        border-radius: 10px;
      }

      &__status-text {
        margin-left: 12px;
        display: block;
        color: $black-02;
        font-size: 12px;
        line-height: 15px;
      }
    }

    .block__item + .block__item {
      margin-top: 8px;
    }

    .block__item {
      display: flex;
      flex-direction: column;
      margin-top: 20px;
      padding: 14px 13px;
      border-radius: 20px;
      background-color: $light-white;
      box-shadow: 0 4px 15px $shadow-color;

      &-wrapper {
        display: none;
        @include media-breakpoint-up(1000px) {
          display: block;
        }
      }

      &-header {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
      }

      &-name {
        max-width: 180px;
        font-weight: 600;
        font-size: 14px;
        line-height: 130%;
        color: $black-02;
      }

      &-value-ranges-wrapper {
        display: flex;
        flex-direction: column;
      }

      &-value {
        align-self: flex-end;
        font-weight: 600;
        font-size: 14px;
        line-height: 130%;
      }

      &-ranges {
        align-self: flex-end;
        margin-top: 4px;
        font-size: 12px;
        line-height: 15px;
        color: $black-03;
      }

      &-middle {
        margin-top: 6px;
        font-weight: normal;
        font-size: 12px;
        line-height: 15px;
        color: $black-02;
      }

      &-status-wrapper {
        margin-top: 26px;
        align-self: flex-start;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 34px;
        padding: 0 8px;
        background-color: $light-background;
        border-radius: 10px;
      }

      &-status-text {
        margin-left: 12px;
        display: block;
        color: $black-02;
        font-size: 12px;
        line-height: 15px;
      }
    }
  }

</style>
