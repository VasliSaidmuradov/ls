<template>
  <div class="personal-area">
    <div class="personal-area__content">
      <div class="personal-area__tabs">
        <h4 class="personal-area__title">Добрый день, Роман!</h4>
        <Tabs
            :data="tabsData"
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
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import {IPersonalArea} from '@/interfaces/personal-area.interface.ts';
import UserSettings from '@/components/UserSettings.vue';
import Tabs from '@/components/Tabs.vue';
import UserCard from '@/components/UserCard.vue';

@Component({
  components: {
    UserSettings,
    Tabs,
    UserCard,
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
      name: IPersonalArea.TabsName.MEDICAL_CART,
      label: 'Медицинская карта',
      componentName: UserSettings,
    },
  ]



  onTabChange(data: string) {
    console.log(data)
  }
}
</script>

<style lang="scss">
@import '../styles/vars';

  .personal-area {
    background: #f9f9fc;
    width: 100%;
    height: 100%;
    padding: 80px 95px;

    &__content {
      display: flex;
    }

    &__tabs {
      margin-right: 240px;
      width: calc(100% - (240px + 35%));
    }

    &__user-card {
      width: 35%;
    }
  }

</style>
