<template>
  <div class="aside__content scrollable">

    <div class="aside__content-logo">
      <a href="/">
        <img src="../../assets/logo.svg" alt="logo">
      </a>
    </div>

    <div class="aside__content-menu">
      <ul class="aside__content-list">
        <template v-for="(item, index) in menu">
          <li v-if="item.name !== routeName.PAGE_PERSONAL_AREA"
              class="aside__content-item"
              :class="`aside__content-item--${item.name}`"
              :key="index">
            <router-link :to="item.link">
              <span class="aside__content-item-icon">
                <icon :name="item.icon"></icon>
              </span>
              <span class="aside__content-item-text">
                {{item.text}}
              </span>
            </router-link>
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {IMenu} from '@/interfaces/layout.interface';
import MAIN_MENU = IMenu.MAIN_MENU;
import {IRouter} from '@/interfaces/router.interface';
import ROUTE_NAME = IRouter.ROUTE_NAME;

@Component({})
export default class Aside extends Vue {
  routeName = ROUTE_NAME;
  menu = MAIN_MENU;
}
</script>

<style lang="scss">
@import "../../styles/vars";

.aside {
  &__content {
    width: 100%;
    height: 100vh;
    overflow-y: auto;
    flex-direction: column;
    background-color: $accent-color;
  }

  &__content-logo {
    padding: 19px 17px 0px 19px;
  }

  &__content-menu {
    margin-top: 100px;
  }

  &__content-list {
    display: flex;
    flex-direction: column;
    padding: 0 17px;
    margin: 0;
    overflow: auto;
  }

  &__content-item {
    list-style-type: none;

    .router-link-exact-active {
      color: $accent-color;
      background-color: $light-white;
      box-shadow: 0px 4px 15px $shadow-color;
      border-radius: 15px;

      .aside__content-item-text {
        display: none;
      }
    }

    a {
      width: 66px;
      height: 66px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      list-style-type: none;
      margin-top: 40px;
      font-weight: 500;
      font-size: 11px;
      line-height: 13px;
      color: $light-white;
      cursor: pointer;
      text-decoration: none;
    }

    &:first-child {
      margin-top: 0;
    }
  }


  &__content-item-icon {
    display: flex;
    align-items: center;
    margin: 0;
  }

  &__content-item-text {
    margin-top: 5px;
    display: block;
  }
}

</style>
