<template>
  <div class="main-layout">
    <q-layout @resize="onResize" :view="activePattern" container style="height: 100%" class="no-shadow">
      <q-header class="bg-white no-shadow header">
        <Header/>
      </q-header>

      <q-drawer
          :breakpoint="breakpoint.MOBILE"
          v-model="drawer"
          show-if-above
          :width="100"
          content-class="bg-white aside-left">
        <Aside/>
      </q-drawer>

      <q-page-container class="no-shadow">
        <q-page class="no-shadow">
          <slot/>
          <FloatingActionBtn v-if="activePattern === layoutPattern.MOBILE" class="sticky-control"/>
        </q-page>
      </q-page-container>

      <q-footer class="footer">
        <q-toolbar>
          <Footer/>
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
import { cookeTokenKey } from '@/interfaces/auth.interface';
import { IRouter } from '@/interfaces/router.interface.ts';

const ROUTE_NAME = IRouter.ROUTE_NAME;

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

export default class DefaultLayout extends Vue {
  activePattern: LayoutPattern = LayoutPattern.DESKTOP;
  breakpoint = Breakpoint;
  layoutPattern = LayoutPattern;
  drawer = false;

  async mounted() {
    this.setPattern(window.screen.width)

    if (this.$cookies.get(cookeTokenKey) || this.$store.state.auth.token) {
      this.$store.commit('auth/setPropertyInStore', {name: 'isLoggedIn', value: true});
    }

    if (!this.isUserLoggedIn) {
      this.$router.push({name: ROUTE_NAME.AUTH_PAGE});
    }
  }
  get isUserLoggedIn() {
    return this.$store.state.auth.isLoggedIn;
  }

  onResize() {
    this.setPattern(window.screen.width);
  }

  setPattern(windowSize: number) {
    this.activePattern = windowSize <= Breakpoint.MOBILE ? LayoutPattern.MOBILE : LayoutPattern.DESKTOP;
  }
}
</script>

<style lang="scss" scoped>
.main-layout {
  height: 100vh;

  .aside-left {
    position: relative;
  }

  .q-drawer--left {
    box-shadow: 0 4px 15px $shadow-color;
    border-radius: 0 35px 35px 0;
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
    box-shadow: 0 4px 15px $shadow-color;
    border-radius: 10px 10px 0 0;
    background-color: $light-white;

    @include media-breakpoint-up($breakpoint-sm) {
      display: flex;
      width: 100vw;
    }
  }

  .q-header {
    display: block;

    @include media-breakpoint-up($breakpoint-sm) {
      display: none;
    }
  }

  .sticky-control {
    z-index: 999;
  }
}
</style>
