<template>
  <div class="index-page layout">
    <h2 class="index-page__title">Добрый день, Роман</h2>
    <div class="index-page__content">
      <div class="index-page__content-top">
        <div class="index-page__content-top-analyzes">
          <AnalyzesCard />
        </div>

        <div class="index-page__content-top-research">
          <AddResearch class="add-research"/>
          <div class="index-page__content-top-research-add-doc">
            <AddedDocuments />
          </div>
        </div>
      </div>
      <div class="index-page__content-bottom">
        <div class="index-page__content-bottom-tabs">
          <Tabs :data="tabsData" :onTabChange="onTabChange" :activeTab="activeTab"/>
        </div>
      </div>
    </div>

    <AddAnalyzesModal :isShow="addAnalyzesModalState" @close="addAnalyzesModalClose"/>
    <AddComment :isShow="addCommentModalState" @close="addCommentClose"/>
    <EditAnalyzes :isShow="editAnalyzesModalState" :editData="editData" @close="editModalClose"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AnalyzesCard from '@/components/indexPage/AnalyzesCard.vue';
import AddResearch from '@/components/indexPage/AddResearch.vue';
import AddedDocuments from '@/components/indexPage/AddedDocuments.vue';
import Tabs from '@/components/Tabs.vue';
import {IDashBoard} from '@/interfaces/dashboard.interface';
import {ITabs} from '@/interfaces/tabs.interface';
import LatestResults from '@/components/indexPage/LatestResults.vue';
import Benchmarks from '@/components/indexPage/Benchmarks.vue';
import AddAnalyzesModal from '@/components/modals/AddAnalyzes.vue';
import {bus} from '@/plugins/bus';
import {IAnalyzes} from '@/interfaces/analyzes.interface';
import AddComment from '@/components/modals/AddComment.vue';
import EditAnalyzes from '@/components/modals/EditAnalyzes.vue';



@Component({
  components: {
    AnalyzesCard,
    AddResearch,
    AddedDocuments,
    Tabs,
    AddAnalyzesModal,
    AddComment,
    EditAnalyzes
  }
})
export default class IndexPage extends Vue {

  tabsData: ITabs.ITabItem[] = [
    {
      label: 'Последние результаты',
      name: IDashBoard.TabsName.LATEST_RESULTS,
      componentName: LatestResults,
    }, {
      label: 'Показатели',
      name: IDashBoard.TabsName.BENCHMARKS,
      componentName: Benchmarks,
    },
  ];

  addAnalyzesModalState = false;
  editAnalyzesModalState = false;
  addCommentModalState = false;
  editData = {};

  activeTab = IDashBoard.TabsName.BENCHMARKS;

  mounted() {
    bus.$on(IAnalyzes.BusEvents.OPEN_ADD_ANALYZES_MODAL, () => this.addAnalyzesModalState = !this.addAnalyzesModalState);
    bus.$on(IAnalyzes.BusEvents.OPEN_ADD_ANALYZES_COMMENT, (id: string | number) => {
      this.addCommentModalState = !this.addCommentModalState;
      this.$store.commit('analyzes/setPropertyInStore', {name: 'commentAnalyzesId', value: id});
    });
    bus.$on(IAnalyzes.BusEvents.EDIT_ANALYZES, (data: IAnalyzes.IAddedAnalyzes) => {
      this.editData = data;
      this.editAnalyzesModalState = !this.editAnalyzesModalState;
    });
  }

  changeAddModalState() {
    this.addAnalyzesModalState = !this.addAnalyzesModalState;
  }

  addAnalyzesModalClose(value: boolean) {
    this.addAnalyzesModalState = value;
  }

  onTabChange(value: IDashBoard.TabsName) {
    this.activeTab = value;
  }

  editModalClose(value: boolean) {
    this.editAnalyzesModalState = value
  }

  addCommentClose(value: boolean) {
    this.addCommentModalState = value;
  }

  destroy() {
    bus.$off(IAnalyzes.BusEvents.OPEN_ADD_ANALYZES_MODAL);
    bus.$off(IAnalyzes.BusEvents.OPEN_ADD_ANALYZES_COMMENT);
    bus.$off(IAnalyzes.BusEvents.EDIT_ANALYZES);
  }
}
</script>

<style lang="scss" scoped>
.index-page {

  &__content {
    display: flex;
    flex-direction: column;
  }

  &__title {
    font-weight: 500;
    font-size: 36px;
    line-height: 130%;
    color: $black-01;
  }

  &__content-top {
    display: flex;

    @include media-breakpoint-up($breakpoint-pre-md) {
      flex-direction: column;
    }
  }

  &__content-top-analyzes {
    width: calc(60% - 20px);
    margin-right: 20px;

    @include media-breakpoint-up($breakpoint-lg) {
      width: calc(50% - 20px);
    }

    @include media-breakpoint-up($breakpoint-pre-md) {
      margin-right: 0;
      margin-bottom: 20px;
      width: 100%;
    }
  }

  &__content-top-research {
    width: 40%;

    @include media-breakpoint-up($breakpoint-lg) {
      width: 50%;
    }

    @include media-breakpoint-up($breakpoint-pre-md) {
      width: 100%;
    }

    @include media-breakpoint-up($breakpoint-sm) {
      .add-research {
        display: none;
      }
    }
  }

  &__content-top-research-add-doc {
    margin-top: 20px;
  }

  &__content-bottom {
    margin-top: 90px;
  }

  &__content-bottom-tabs {
    width: 100%;

    ::v-deep.q-tab-panel {
      padding: 0;
    }

    @include media-breakpoint-up($breakpoint-sm) {
      width: 100%;

      ::v-deep .q-tab__label {
        font-size: 12px;
      }

      ::v-deep.tabs__header .q-tab {
        padding: 8px 15px;
      }
    }
  }

}

</style>
