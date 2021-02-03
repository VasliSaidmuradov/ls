<template>
  <div class="added-doc">
    <q-expansion-item
        icon="explore"
        ref="dock"
        class="added-doc__exp"
        style="border-radius: 15px"
        @before-show="beforeShow"
    >
      <template v-slot:header>
        <div class="added-doc__exp-header">
          <span class="added-doc__exp-header-icon">
            <icon name="paper-icon"></icon>
            <span class="added-doc__exp-header-icon-count">
              +2
            </span>
          </span>
          <span class="added-doc__exp-header-text">
            <span class="added-doc__exp-header-text-count">
              +2
            </span>
            Недавно добавленные документы
          </span>
        </div>
      </template>

      <div class="added-doc__exp-body">
        <div v-for="(doc, index) in docsData"
             :key="index" class="added-doc__exp-item"
             :class="`added-doc__exp-item--${doc.type}`">
          <div class="added-doc__exp-item-img">
            <span class="added-doc__exp-item-icon">
              <icon :name="doc.icon"></icon>
            </span>
            <div class="img-wrap">
              <img src="../../assets/indexPage/doc-example.png">
            </div>
          </div>

          <div class="added-doc__exp-item-text">
            <span class="added-doc__exp-item-text-title">{{doc.text}}</span>
            <span class="added-doc__exp-item-text-date">{{$date(doc.date, 'dd.MM.yyyy')}}</span>
          </div>
        </div>
      </div>
    </q-expansion-item>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {ILayout} from '@/interfaces/layout.interface';
import Breakpoint = ILayout.Breakpoint;
import {IRouter} from '@/interfaces/router.interface';
import ROUTE_NAME = IRouter.ROUTE_NAME;
import {QExpansionItem} from 'quasar';

enum DocsType {
  PROGRESS = 'progress',
  SUCCESS = 'success',
  ERROR = 'error',
  QUESTION = 'question'
}

interface IRefs {
  dock: QExpansionItem;
}

@Component({})
export default class AddedDocuments extends Vue {

  breakPoint = ILayout.Breakpoint;

  $refs: IRefs & Vue['$refs'];

  beforeShow() {
    if (this.isMobile) {
      this.$refs.dock.hide();
      this.$router.push({name: ROUTE_NAME.STORAGE_PAGE})
    }
  }

  docsData = [{
      icon: 'doc-progress-icon',
      text: 'Анализ',
      date: new Date(),
      type: DocsType.PROGRESS
    }, {
      icon: 'doc-error-icon',
      img: 'doc-example.png',
      text: 'Прием',
      date: new Date(),
      type: DocsType.ERROR
    }, {
      icon: 'doc-success-icon',
      text: 'УЗИ',
      date: new Date(),
      type: DocsType.SUCCESS
    }, {
      icon: 'doc-question-icon',
      text: 'УЗИ',
      date: new Date(),
      type: DocsType.QUESTION
    },];

  get isMobile(): boolean {
    return window.screen.width <= Breakpoint.MOBILE_SMALL;
  }
}
</script>

<style lang="scss" scoped>
.added-doc {

  &__exp {
    background: #FFFFFF;
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.03);
    border-radius: 15px;

    ::v-deep.q-item {
      padding: 15px;
    }

    ::v-deep.q-item__section {
      margin-left: auto;
      padding: 10px 8px;
      border: 1px solid $light-stroke;
      border-radius: 12px;

      i {
        font-size: 12px;
        color: $accent-color;
      }

      @include media-breakpoint-up($breakpoint-xs) {
        padding: 0;
        border: none;
      }
    }
  }

  &__exp-header {
    display: flex;
    align-items: center;
  }

  &__exp-header-text {
    font-weight: 500;
    font-size: 14px;
    line-height: 140%;
    color: $black;

    @include media-breakpoint-up($breakpoint-xs) {
      display: flex;
      font-size: 12px;
    }
  }

  &__exp-header-icon {
    color: $status-green;
    margin-right: 12px;
  }

  &__exp-body {
    padding: 25px 40px;
    display: flex;
    align-items: center;
  }

  &__exp-item {
    width: calc(66px + 33px);
    margin: 0 16px;
    box-sizing: border-box;

    &--error {
      .img-wrap {
        width: 60px;
        border-radius: 8px;
        position: relative;

        &:before {
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          display: block;
          background: linear-gradient(0deg, rgba(15, 15, 15, 0.6), rgba(15, 15, 15, 0.6)), #C4C4C4;
          border-radius: 8px;
          opacity: .6;
        }
      }
    }
  }

  &__exp-item-text {
    display: flex;
    flex-direction: column;
    margin-top: 11px;

    span {
      display: block;
    }
  }

  &__exp-item-text-title {
    font-weight: 500;
    font-size: 12px;
    line-height: 15px;
    color: $black-06;
  }

  &__exp-item-text-date {
    font-size: 12px;
    line-height: 18px;
    color: $black-04;
  }

  &__exp-item-img {
    position: relative;

    .img-wrap {
      width: 60px;
      border-radius: 8px;
    }
  }

  &__exp-item-icon {
    position: absolute;
    top: -9px;
    left: -9px;
    z-index: 1;
  }

  &__exp-header-text-count {
    display: none;

    @include media-breakpoint-up($breakpoint-xs) {
      display: block;
      margin-right: 5px;
    }
  }

  &__exp-header-icon-count {
    @include media-breakpoint-up($breakpoint-xs) {
      display: none;
    }
  }
}

</style>
