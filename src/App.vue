<template>
  <div class="main-layout">
    <q-layout @resize="onResize" :view="activePattern" container style="height: 100%" class="no-shadow">
      <q-header class="bg-white no-shadow header">
        <Header />
      </q-header>

      <q-drawer
          :breakpoint="breakpoint.MOBILE"
          v-model="drawer"
          show-if-above
          :width="100"
          content-class="bg-white aside-left">
        <Aside />
      </q-drawer>

      <q-page-container class="no-shadow">
        <q-page class="no-shadow">
          <router-view />
          <FloatingActionBtn v-if="activePattern === layoutPattern.MOBILE"/>
        </q-page>
      </q-page-container>

      <q-footer class="footer">
        <q-toolbar>
          <Footer />
        </q-toolbar>
      </q-footer>
    </q-layout>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import Header from '@/components/layout/Header.vue';
import Aside from '@/components/layout/Aside.vue';
import Footer from '@/components/layout/Footer.vue';
import FloatingActionBtn from '@/components/FloatingActionBtn.vue';
import {ILayout} from '@/interfaces/layout.interface';
import LayoutPattern = ILayout.LayoutPattern;
import Breakpoint = ILayout.Breakpoint;

@Component({
    components: {
      Header,
      Aside,
      Footer,
      FloatingActionBtn
    }
  })

  export default class App extends Vue {


    activePattern: LayoutPattern = LayoutPattern.DESKTOP;
    breakpoint = Breakpoint;
    layoutPattern = LayoutPattern;
    drawer = false;


    mounted() {
      this.setPattern(window.screen.width)
    }

    onResize() {
      this.setPattern(window.screen.width);
    }


    setPattern(windowSize: number) {
      this.activePattern = windowSize <= Breakpoint.MOBILE ? LayoutPattern.MOBILE : LayoutPattern.DESKTOP;
    }
  }
</script>

<style lang="scss">

.main-layout {
  height: 100vh;

  .aside-left {
    position: relative;
  }

  .q-drawer--left {
    box-shadow: 0px 4px 15px $shadow-color;
    border-radius: 0px 35px 35px 0px;
    top: 0 !important;
  }

  .q-page {
    background: $light-background;
  }

  .q-drawer-container {
    position: relative;
    z-index: 2001;
  }

  .footer {
    display: none;
    box-shadow: 0px 4px 15px $shadow-color;
    border-radius: 10px 10px 0px 0px;
    background-color: $light-white;

    @include media-breakpoint-up($breakpoint-sm) {
      display: flex;
    }
  }

  .q-header {
    display: block;

     @include media-breakpoint-up($breakpoint-sm) {
      display: none;
    }
  }
}
</style>
