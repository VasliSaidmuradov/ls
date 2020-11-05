<template>
  <div class="aside__content">

    <div class="aside__content-logo">
      <a href="/">
        <img src="../assets/logo.svg" alt="logo">
      </a>
    </div>

    <div class="aside__content-menu">
      <ul class="aside__content-list">
        <li class="aside__content-item active">
          <icon name="home-icon"></icon>
          <span>Главная</span>
        </li>
        <li class="aside__content-item">
          <icon name="analyzes-icon"></icon>
          <span>Анализы</span>
        </li>
        <li class="aside__content-item">
          <icon name="manual-icon"></icon>
          <span>Приемы</span>
        </li>
        <li class="aside__content-item">
          <icon name="storage-icon"></icon>
          <span>Хранилище</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class Aside extends Vue {

}
</script>

<style lang="scss">
@import "../styles/vars";

.aside {
  &__content {
    width: 100%;
    height: 100%;
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
  }

  &__content-item {
    padding: 13px 11px;
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

    span {
      margin-top: 5px;
      display: block;
    }

    &.active {
      color: $accent-color;
      background-color: $light-white;
      box-shadow: 0px 4px 15px $shadow-color;
      border-radius: 15px;
      padding: 25px;

      span {
        display: none;
      }
    }

    &:first-child {
      margin-top: 0;
    }
  }
}

</style>
