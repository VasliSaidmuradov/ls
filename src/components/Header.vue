<template>
    <div class="header__content">
      <div class="header__content-back">
        <q-btn unelevated class="button1--border" padding="8px 10px" @click="back()" text-color="accent">
          <icon name="next-icon"></icon>
        </q-btn>
        <span class="header__content-back-text">Назад</span>
      </div>

      <div class="header__content-user">
        <div class="header__content-user-notice">
          <q-badge floating>4</q-badge>
          <div class="icon">
            <icon name="notice"></icon>
          </div>
        </div>
        <div class="header__content-user-picture">
          <q-avatar square size="34px" rounded>
            <img src="https://www.vsekastingi.ru/storage/2018/10/29/casting_284261.jpg" alt="avatar">
          </q-avatar>
        </div>

        <q-popup-proxy ref="userCardPopup" :target="userCardPopupIsActive">
          <UserCard isPopup :onCLose="userCardClose"></UserCard>
        </q-popup-proxy>
      </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import UserCard from '@/components/UserCard.vue';
import {QPopupProxy} from 'quasar';
import {IRouter} from '@/interfaces/router.interface';
import ROUTE_NAME = IRouter.ROUTE_NAME;

@Component({
  components: {
    UserCard
  }
})
export default class Header extends Vue {

  back() {
    window.history.back();
  }

  userCardClose() {
    (this.$refs.userCardPopup as QPopupProxy).hide();
  }

  get userCardPopupIsActive(): boolean {
    return this.$route.name !== ROUTE_NAME.PAGE_PERSONAL_AREA;
  }
}
</script>

<style lang="scss">
@import "../styles/vars";

  .header {
    &__content {
      height: 66px;
      padding-left: 100px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }


    &__content-back {
      padding-left: 45px;
      display: flex;
      align-items: center;
    }

    &__content-back-text {
      margin-left: 10px;
      display: block;
      font-size: 14px;
      color: #333;
    }

    &__content-user {
      margin-right: 60px;
      cursor: pointer;
      display: flex;
      align-items: center;
      height: 100%;
      justify-content: center;
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
      height: 100%;
      display: flex;
      align-items: center;
      width: 60px;

      .q-badge {
        background-color: $light-stroke;
        color: #333;
        font-size: 10px;
        line-height: 12px;
        font-weight: 700;
        border-radius: 100%;
        margin-top: 10px;
        width: 22px;
        height: 22px;
        align-items: center;
        justify-content: center;
        padding: 0;
      }
    }
  }
</style>
