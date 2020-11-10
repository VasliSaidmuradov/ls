<template>
  <div class="personal-area layout">
    <div class="personal-area__content">
      <div class="personal-area__tabs">
        <h4 class="personal-area__title">Добрый день, Роман!</h4>
        <Tabs
            :data="tabsData"
            :activeTab="activeTab"
            :onTabChange="onTabChange"
        >
          <template v-for="(item, index) in tabsData" v-slot:[item.name]>
            <component :is="item.componentName" :key="index"/>
          </template>
        </Tabs>
      </div>

      <div class="personal-area__user-card">
        <UserCard />
      </div>

      <div class="personal-area__mobile-menu">
        <h4 class="personal-area__mobile-title">Добрый день, Роман!</h4>
        <ul class="personal-area__mobile-list">
          <li class="personal-area__mobile-item" v-for="(item, index) in mobileMenuData" :key="index">
            <router-link :to="item.link" class="personal-area__mobile-link">
              <span class="personal-area__mobile-icon personal-area__mobile-icon--left">
                <icon :name="item.icon"></icon>
              </span>
              <span class="personal-area__mobile-text">{{item.text}}</span>
              <span class="personal-area__mobile-icon personal-area__mobile-icon--right">
                <icon name="next-icon"></icon>
              </span>
            </router-link>
          </li>
        </ul>

        <div class="personal-area__mobile-menu-back">
          <q-btn @click="goToHomePage" class="personal-area__mobile-menu-back-btn button1 button1--flooded">
            <span class="personal-area__mobile-menu-back-icon">
              <icon name="next-icon"></icon>
            </span>
            <span class="personal-area__mobile-menu-back-text">Выйти из кабинета</span>
          </q-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue, Watch} from 'vue-property-decorator';
import {IPersonalArea} from '@/interfaces/personal-area.interface.ts';
import UserSettings from '@/components/UserSettings.vue';
import Tabs from '@/components/Tabs.vue';
import UserCard from '@/components/UserCard.vue';
import MedicalCart from '@/components/MedicalCard.vue';
import {IMenu} from '@/interfaces/layout.interface';
import PERSONAL_AREA_MENU = IMenu.PERSONAL_AREA_MENU;
import {IRouter} from '@/interfaces/router.interface';
import ROUTE_NAME = IRouter.ROUTE_NAME;

@Component({
  components: {
    UserSettings,
    Tabs,
    UserCard,
    MedicalCart,
  }
})
export default class PersonalArea extends Vue {
  tabsData = [
    {
      name: IPersonalArea.TabsName.USER_SETTINGS,
      label: 'Настройки пользователя',
      componentName: UserSettings,
    },
    {
      name: IPersonalArea.TabsName.MEDICAL_CARD,
      label: 'Медицинская карта',
      componentName: MedicalCart,
    },
  ];

  activeTab: string = IPersonalArea.TabsName.USER_SETTINGS;

  mobileMenuData = PERSONAL_AREA_MENU;

  mounted() {
    this.onQueryChange();
  }



  onTabChange(data: IPersonalArea.TabsName | string) {
    this.activeTab = data;
  }

  goToHomePage() {
    this.$router.push({name: ROUTE_NAME.INDEX_PAGE})
  }

  get activeTabFromRoute(): string {
     return (this.$route.query.activeTab as string);
  }

  @Watch('activeTabFromRoute')
  onQueryChange() {
    if (this.activeTabFromRoute) {
      this.onTabChange(this.activeTabFromRoute)
    }
  }
}
</script>

<style lang="scss">
@import '../styles/vars';

  .personal-area {
    width: 100%;
    height: 100%;

    &__content {
      display: flex;

      @media (max-width: $breakpoint-md) {
        flex-direction: column-reverse;
      }
    }

    &__tabs {
      margin-right: 240px;
      width: calc(100% - (240px + 35%));

      @media (max-width: $breakpoint-lg) {
        margin-right: 100px;
        width: calc(100% - (100px + 350px));
      }

      @media (max-width: $breakpoint-md) {
        margin-right: 0;
        width: 100%;
      }

      @media (max-width: $breakpoint-sm) {
        display: none;
      }
    }

    &__user-card {
      width: 35%;

      @media (max-width: $breakpoint-md) {
        width: 100%;
        margin-bottom: 40px;
      }

      @media (max-width: $breakpoint-sm) {
        display: none;
      }
    }

    &__title {
      font-weight: 500;
      font-size: 36px;
      line-height: 130%;
      color: #333333;
      margin-bottom: 40px;
      margin-top: 0;
    }

    &__mobile-menu {
      display: none;

      @media (max-width: $breakpoint-sm) {
        display: flex;
        flex-direction: column;
      }
    }

    &__mobile-list {
      padding: 0;
      margin: 0;
      width: 100%;
    }

    &__mobile-item {
      margin-bottom: 16px;
      list-style-type: none;
      display: block;
      width: 100%;

      &:last-child {
        margin-bottom: 0;
      }
    }

    &__mobile-link {
      display: flex;
      width: 100%;
      align-items: center;
      color: $accent-color;
      padding: 24px 28px;
      border-radius: 16px;
      background-color: $light-white;
      text-decoration: none;
    }


    &__mobile-text {
      margin: 0 24px 0px 19px;
      font-weight: 500;
      font-size: 14px;
      line-height: 140%;
      color: $black-02;
    }

    &__mobile-icon {

      &--right {
        margin-left: auto;
        display: block;
        transform: rotate(180deg);
      }
    }

    &__mobile-title {
      margin-top: 0;
      margin-bottom: 30px;
      font-weight: 500;
      font-size: 30px;
      line-height: 130%;
      color: $gray-01;
    }

    &__mobile-menu-back {
      margin-top: 36px;
    }

    &__mobile-menu-back-btn {
      display: flex;
      align-items: center;

      &.q-btn {
        padding: 12px;
      }
    }

    &__mobile-menu-back-icon {
      margin-right: 20px;
      width: 4px;
      height: 8px;
      display: flex;
      margin-top: -9px;
    }
  }

</style>
