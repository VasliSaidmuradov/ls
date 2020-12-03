<template>
  <div id="app">
    <component :is="layout">
      <router-view/>
    </component>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {ILayout} from '@/interfaces/layout.interface';
import LayoutType = ILayout.LayoutType;

  @Component({})

  export default class App extends Vue {
    get layout() {
      return this.$route.meta.layout || LayoutType.DEFAULT;
    }
  }
</script>

<style lang="scss">

</style>
