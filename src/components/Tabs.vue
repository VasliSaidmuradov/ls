<template>
  <div class="tabs">
    <q-tabs
        v-model="tabActive"
        @input="tabsChange"
        class="tabs__header"
        align="left">
      <q-tab v-for="(tab, index) in data" :name="tab.name" :label="tab.label" :key="index" />
    </q-tabs>

    <q-tab-panels
        v-model="tabActive"
        class="tabs__body"
        animated>
      <q-tab-panel v-for="(tab, index) in data" :name="tab.name" :key="index">
        <slot :name="tab.name"></slot>
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';

@Component({})
export default class Tabs extends Vue {
  @Prop() data: any;
  @Prop() onTabChange: any;
  tabActive = this.data[0].name;


  tabsChange(activeTab: string) {
    this.onTabChange(activeTab)
  }
}
</script>

<style lang="scss">
@import '../styles/vars';

.tabs {
  &__header {
    width: fit-content;
    border: 1px solid $light-stroke;
    box-sizing: border-box;
    border-radius: 22px;
    padding: 8px;
    margin-bottom: 40px;

    .q-tab--active {
      color: #fff;
      background-color: $accent-color;

      .q-tab__indicator {
        display: none !important;
      }

      .q-tab {
        padding: 25px 13px;
        font-weight: 500;
        font-size: 13px;
        color: #424056;
      }
    }
  }

  &__body {
    background-color: transparent !important;
  }
}
</style>
