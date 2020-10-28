<template>
  <div class="layout main-layout">
    <q-layout view="hHh Lpr lff" container style="height: 100%" class="no-shadow">
      <q-header class="bg-white no-shadow header">
        <Header />
      </q-header>

      <q-drawer
          v-model="drawer"
          show-if-above
          :width="100"
          content-class="bg-white aside-left">
        <Aside />
      </q-drawer>

      <q-page-container class="no-shadow">
        <q-page class="no-shadow">
          <router-view />
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import Header from '@/components/Header.vue';
import Aside from '@/components/Aside.vue';

  @Component({
    components: {
      Header,
      Aside
    }
  })

  export default class App extends Vue {
    drawer = false;
  }
</script>

<style lang="scss">
.main-layout {
  height: 100vh;

  .aside-left {
    border-radius: 0px 35px 35px 0px;
  }

  .q-drawer--left {
    box-shadow: 0px 4px 15px rgba(22, 20, 44, 0.06);
    border-radius: 0px 35px 35px 0px;
    top: 0 !important;
  }

  .q-drawer-container {
    position: relative;
    z-index: 2001;
  }
}
</style>
