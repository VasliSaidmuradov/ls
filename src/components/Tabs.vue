<template>
  <div class="tabs">
    <q-tabs
        :value="activeTab"
        @input="tabsChange"
        class="tabs__header"
        align="left">
      <q-tab v-for="(tab, index) in data" :name="tab.name" :label="tab.label" :key="index" />
    </q-tabs>

    <q-tab-panels
        :value="activeTab"
        class="tabs__body"
        animated>
      <q-tab-panel v-for="(tab, index) in data" :name="tab.name" :key="index" class="scrollable">
        <component v-bind:is="tab.componentName"></component>
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';
import {ITabs} from '@/interfaces/tabs.interface';

@Component({})
export default class Tabs extends Vue {
  @Prop() data: ITabs.ITabItem[];
  @Prop() onTabChange: Function | undefined;
  @Prop() activeTab: string;


  tabsChange(activeTab: string) {
    if(this.onTabChange) this.onTabChange(activeTab)
  }
}
</script>

<style lang="scss">
.tabs {
  &__header {
    width: fit-content;
    border: 1px solid $light-stroke;
    box-sizing: border-box;
    border-radius: 22px;
    padding: 8px;
    margin-bottom: 40px;

    .q-tab {
      padding: 10px 25px;
      font-weight: 500;
      font-size: 13px;
      color: #424056;

      .q-tab__label {
        text-transform: none;
      }
    }

    .q-tab--active {
      color: #fff;
      background-color: $accent-color;

      .q-tab__indicator {
        display: none !important;
      }
    }
  }

  &__body {
    background-color: transparent !important;
  }
}
</style>
