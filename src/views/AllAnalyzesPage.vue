<template>
  <div class="all-analyzes layout">
    <!-- <button @click="createAnalyze">ADD ANALYZE</button> -->
    <h4 class="all-analyzes__title">Все анализы</h4>

    <div class="all-analyzes__tabs">
      <div class="all-analyzes__tabs-content">
        <div class="all-analyzes__tabs-content-btn">
          <MainBtn text="История заказов"
                   border-color="#7C74E9"
                   bcg-color="transparent"
                   @click-btn="goToHistoryPage"
                   class="history-btn">
            <template v-slot:icon>
              <icon name="arrow-circle-icon"></icon>
            </template>
          </MainBtn>
        </div>
        <Tabs :data="tabsData" :onTabChange="onTabChange" :activeTab="activeTab"/>
      </div>
    </div>
    <AnalyzesFilter :isShow="showFilter" @close-modal="showFilterClose"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Tabs from '@/components/Tabs.vue';
import {IAnalyzes} from '@/interfaces/analyzes.interface';
import AllAnalyzes from '@/components/analyzes/AllAnalyzes.vue';
import AnalyzesByCategory from '@/components/analyzes/AnalyzesByCategory.vue';
import MainBtn from '@/components/UI/buttons/MainBtn.vue';
import {IRouter} from '@/interfaces/router.interface';
import ROUTE_NAME = IRouter.ROUTE_NAME;
import AnalyzesFilter from '@/components/modals/AnalyzesFilter.vue';
import {bus} from '@/plugins/bus';
@Component({
  components: {
    Tabs,
    MainBtn,
    AnalyzesFilter
  }
})
export default class AllAnalyzesPage extends Vue {

  activeTab = IAnalyzes.TabsName.ALL_ANALYZES

  tabsData = [
    {
      name: IAnalyzes.TabsName.ALL_ANALYZES,
      label: 'Все анализы',
      componentName: AnalyzesByCategory,
    },
    {
      name: IAnalyzes.TabsName.BY_CATEGORY,
      label: 'По категориям',
      componentName: AllAnalyzes,
    }
  ]

  showFilter = false;

  async mounted() {
    // this.$store.dispatch('analyzes/analyzeBiomarkers');
    await this.$store.dispatch('analyzes/analyzeRubrics');
    await this.$store.dispatch('analyzes/setCheckBoxValues');
    await this.$store.dispatch('analyzes/analyzeResultsList');

    bus.$on(IAnalyzes.BusEvents.SHOW_FILTER, () => this.showFilter = true);
  }

  showFilterClose() {
    this.showFilter = false;
  }

  onTabChange(value: IAnalyzes.TabsName) {
    this.activeTab = value;
  }

  goToHistoryPage() {
    this.$router.push({name: ROUTE_NAME.ORDER_HISTORY});
  }

  destroyed() {
    bus.$off(IAnalyzes.BusEvents.SHOW_FILTER);
  }

  createAnalyze() {
    this.$store.dispatch('analyzes/createAnalyze', null, { root: true });
  }
}
</script>

<style lang="scss" scoped>
.all-analyzes {
  &__title {
    font-weight: 500;
    font-size: 36px;
    line-height: 130%;
    color: $black-02;
    margin-top: 0;
    margin-bottom: 40px;
  }

  &__tabs-content {
    position: relative;
  }

  &__tabs-content-btn {
    position: absolute;
    right: 500px;
    top: 10px;

    ::v-deep.history-btn {
      padding: 8px;

      .main-btn__text {
        font-weight: 500;
        font-size: 14px;
        line-height: 140%;
        color: $black-02;
      }

      .main-btn__icon-wrapper {
        background-color: $accent-color;
      }
    }

    @include media-breakpoint-up($breakpoint-lg) {
      right: 0;
    }

    @include media-breakpoint-up($breakpoint-sm) {
      position: unset;
      margin-bottom: 20px;
    }
  }
}

</style>
