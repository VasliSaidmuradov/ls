<template>
    <div class="header__content layout">
      <div class="header__content-back">
        <BackBtn />
      </div>

      <div class="header__content-user">
        <div class="header__content-user-research">
          <q-btn class="header__content-user-research-btn">
            <div class="header__content-user-append-icon">
              <icon name="add-icon"></icon>
            </div>
          </q-btn>
          <span class="header__content-user-research-text">Загрузить исследование</span>
        </div>
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
            <img src="https://www.vsekastingi.ru/storage/2018/10/29/casting_284261.jpg" alt="avatar">
          </q-avatar>
        </div>

        <q-popup-proxy no-parent-event ref="userCardPopup" :value="showPopup" :target="userCardPopupIsActive">
          <UserCard isPopup :onCLose="userCardClose"></UserCard>
        </q-popup-proxy>
      </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import UserCard from '@/components/userCard/UserCard.vue';
import {QPopupProxy} from 'quasar';
import {IRouter} from '@/interfaces/router.interface';
import ROUTE_NAME = IRouter.ROUTE_NAME;
import BackBtn from '@/components/BackBtn.vue';

@Component({
  components: {
    UserCard,
    BackBtn
  }
})
export default class Header extends Vue {

  showPopup = false;

  userCardClose() {
    this.showPopup = false;
  }

  togglePopup() {
    this.showPopup = !this.showPopup;
  }

  get userCardPopupIsActive(): boolean {
    return this.$route.name !== ROUTE_NAME.PAGE_PERSONAL_AREA;
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


    &__content-back {
      color: $accent-color;
    }

    &__content-back-text {
      margin-left: 10px;
      display: block;
      font-size: 14px;
      color: #333;
    }

    &__content-user {
      cursor: pointer;
      display: flex;
      align-items: center;
      height: 100%;
      justify-content: center;
    }

    &__content-user-research {
      display: flex;
      align-items: center;
      margin-right: 70px;
    }

    &__content-user-research-btn {
      &.q-btn {
        .q-btn__wrapper {
          padding: 0 !important;

          &:before {
            display: none;
          }
        }
      }
    }

    &__content-user-append-icon {
      width: 42px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: $accent-color;
      color: $light-white;
      border-radius: 16px;

      svg {
        width: 10px;
        height: 10px;
      }
    }

    &__content-user-research-text {
      font-size: 12px;
      line-height: 150%;
      color: $black-02;
      display: block;
      white-space: nowrap;
      margin-left: 12px;
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
