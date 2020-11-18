<template>
  <div class="footer__content">
    <ul class="footer__menu">
      <li class="footer__menu-item" :class="`footer__menu-item--${item.name}`" v-for="(item, index) in menu" :key="index">
        <router-link class="footer__menu-link" :to="item.link">
          <span class="footer__menu-icon">
            <icon :name="item.icon"></icon>
          </span>
          <span class="footer__menu-text">
            {{item.text}}
          </span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {IMenu} from '@/interfaces/layout.interface';
import MAIN_MENU = IMenu.MAIN_MENU;


@Component({})
export default class Footer extends Vue {
  menu = MAIN_MENU;
}
</script>

<style lang="scss">
.footer {

  &__content {
    width: 100%;
  }

  &__menu {
    padding: 5px;
    margin: 0;
    display: flex;
    list-style-type: none;
    display: flex;
    justify-content: center;
    margin: 0 -5px;
  }

  &__menu-item {
    display: flex;
    flex-direction: column;
    height: 100%;
    margin: 0 5px;
  }

  &__menu-link {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 60px;
    height: 60px;
    text-decoration: none;
    color: $accent-color;


    &.router-link-active {
      background: $light-background;
      border-radius: 12px;
    }
  }

  &__menu-text {
    font-weight: 500;
    font-size: 10px;
    line-height: 12px;
    color: $black-02;
    margin-top: 5px;
  }

  &__menu-icon {
    height: 20px;
    display: block;
  }
}
</style>
