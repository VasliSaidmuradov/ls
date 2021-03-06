<template>
  <div class="header__content layout-header">
    <BackBtn :type="2" @go-back="goBack"/>

    <div class="header__content-user">
      <main-btn
          class="header__content-user-research-btn"
          :type="'secondary'"
          :text="'Загрузить исследование'"
          :height="56"
          :bcg-color="'transparent'"
      >
        <template v-slot:icon>
          <icon name="add-icon" class="header__content-user-research-btn-icon"/>
        </template>
      </main-btn>

      <div class="header__content-user-notice">
        <div class="header__content-user-notice-badge">
          +12
        </div>
        <q-btn class="header__content-user-notice-btn">
          <div class="icon">
            <icon name="notice"></icon>
          </div>
        </q-btn>
      </div>
      <div class="header__content-user-picture" @click="togglePopup">
        <q-avatar square size="34px" rounded>
          <img :src="require('@/assets/image-placeholder-350x350.png')" alt="avatar">
        </q-avatar>
      </div>

      <q-popup-proxy no-parent-event ref="userCardPopup" :value="showPopup" :target="userCardPopupIsActive">
        <UserCard isPopup :onCLose="userCardClose"></UserCard>
      </q-popup-proxy>
    </div>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import UserCard from '@/components/userCard/UserCard.vue';
  import {IRouter} from '@/interfaces/router.interface';
  import BackBtn from '@/components/UI/buttons/BackBtn.vue';
  import ROUTE_NAME = IRouter.ROUTE_NAME;
  import MainBtn from "@/components/UI/buttons/MainBtn.vue";

  @Component({
    components: {
      MainBtn,
      UserCard,
      BackBtn
    }
  })
  export default class Header extends Vue {

    showPopup = false;

    get userCardPopupIsActive(): boolean {
      return this.$route.name !== ROUTE_NAME.PAGE_PERSONAL_AREA;
    }

    userCardClose() {
      this.showPopup = false;
    }

    goBack() {
      this.$router.go(-1)
    }

    togglePopup() {
      this.showPopup = !this.showPopup;
    }
  }
</script>

<style lang="scss">
  .header {
    &__content {
      height: 66px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    &__content-user {
      cursor: pointer;
      display: flex;
      align-items: center;
      height: 100%;
      justify-content: center;
    }

    &__content-user-research-btn {
      margin-right: 70px;
    }

    &__content-user-research-btn-icon {
      width: 10px;
      height: 10px;
      color: $light-white;
    }

    &__content-user-picture {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: flex;
      align-items: center;
      margin-left: 5px;
    }

    &__content-user-notice {
      position: relative;
      color: $accent-color;
      display: flex;
      align-items: flex-end;
      height: auto;
      margin-right: 25px;
    }

    &__content-user-notice-btn {
      &.q-btn {
        width: 34px;
        height: 34px;
        background: #FFFFFF;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
        border-radius: 10px;

        .q-btn__wrapper {
          padding: 0 !important;

          &:before {
            display: none;
          }
        }
      }
    }

    &__content-user-notice-badge {
      font-size: 9px;
      line-height: 11px;
      font-weight: 700;
      color: $accent-color;
      display: flex;
      align-items: center;
      position: relative;
      margin-right: 5px;

      &:after {
        content: '';
        display: block;
        width: 4px;
        height: 4px;
        background-color: $accent-color;
        border-radius: 100%;
        position: absolute;
        right: -10px;
        z-index: 999;
      }
    }
  }
</style>
