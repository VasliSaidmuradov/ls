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
              {{ `+${dashboardDocuments.length}` }}
            </span>
          </span>
          <span class="added-doc__exp-header-text">
            <span class="added-doc__exp-header-text-count">
              {{ `+${dashboardDocuments.length}` }}
            </span>
            Недавно добавленные документы
          </span>
        </div>
      </template>

      <div class="added-doc__exp-body">
        <div
          v-for="doc in dashboardDocuments"
          :key="doc.id"
          class="added-doc__exp-item"
          :class="`added-doc__exp-item--${doc.type}`"
          @click="goToDocumentPage(doc.id)"
        >
          <div v-if="doc.files" class="added-doc__exp-item-img">
            <span class="added-doc__exp-item-icon">
              <icon :name="getStatus(doc.files[0].status)"></icon>
            </span>
            <div class="img-wrap">
              <img :src="doc.files[0].file_link" />
            </div>
          </div>

          <div class="added-doc__exp-item-text">
            <span class="added-doc__exp-item-text-title">{{ getDocType(doc.type_doc) }}</span>
            <span class="added-doc__exp-item-text-date">{{ $date(doc.date, 'dd.MM.yyyy') }}</span>
          </div>
        </div>
      </div>
    </q-expansion-item>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { ILayout } from '@/interfaces/layout.interface';
import Breakpoint = ILayout.Breakpoint;
import { IRouter } from '@/interfaces/router.interface';
import ROUTE_NAME = IRouter.ROUTE_NAME;
import { QExpansionItem } from 'quasar';
import { IStaticVariables } from '@/interfaces/static-variables.interface';


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
      this.$router.push({ name: ROUTE_NAME.STORAGE_PAGE });
    }
  }

  statusIcons: { [key: string]: string } = {
    1: 'doc-error-icon',
    2: 'doc-error-icon',
    3: 'doc-progress-icon',
    4: 'doc-success-icon', //'doc-question-icon',
    5: 'doc-success-icon',
  };

  get isMobile(): boolean {
    return window.screen.width <= Breakpoint.MOBILE_SMALL;
  }
  get dashboardDocuments() {
    return this.$store.state.dashboard.documents;
  }
  get documentTypes() {
    return this.$store.state.staticVariables.documentTypes;
  }
  get orderStatuse() {
    return this.$store.state.staticVariables.orderStatuses;
  }

  getDocType(docType: number): string {
    return this.documentTypes.find((el: IStaticVariables.Items) => el.value === docType)?.description;
  }
  getStatus(status: number): string {
    return this.statusIcons[`${status}`];
  }
  goToDocumentPage(id: number) {
    this.$router.push({ path: `/analyzes/${id}`})
  }
}
</script>

<style lang="scss" scoped>
.added-doc {
  &__exp {
    background: #ffffff;
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
    cursor: pointer;

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
          background: linear-gradient(0deg, rgba(15, 15, 15, 0.6), rgba(15, 15, 15, 0.6)), #c4c4c4;
          border-radius: 8px;
          opacity: 0.6;
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
      height: 88px;
      border-radius: 8px;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
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
