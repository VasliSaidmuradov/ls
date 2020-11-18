<template>
  <div class="auth-other-patient">
    <Tabs
          :activeTab="activeTab"
          :onTabChange="onTabsChange"
          :data="tabsData">
      <template v-for="(item, index) in tabsData" v-slot:[item.name]>
        <component :is="item.componentName" :key="index"/>
      </template>
    </Tabs>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Tabs from '@/components/Tabs.vue';
import RegistrationFormOtherUser from '@/components/auth/RegistrationFormOtherUser.vue';
import {IAuthForOtherUser} from '@/interfaces/auth.interface';
import AuthFormForOtherUser from './AuthFormForOtherUser.vue';

@Component({
  components: {
    Tabs
  }
})
export default class AuthPageForOtherUser extends Vue {

  tabsData = [
    {
      name: IAuthForOtherUser.TabsName.REGISTRATION,
      label: 'Регистрация',
      componentName: RegistrationFormOtherUser,
    },
    {
      name: IAuthForOtherUser.TabsName.AUTHORIZATION,
      label: 'Войти',
      componentName: AuthFormForOtherUser,
    },
  ];

  activeTab: IAuthForOtherUser.TabsName = IAuthForOtherUser.TabsName.REGISTRATION;

  onTabsChange(activeTab: IAuthForOtherUser.TabsName) {
    this.activeTab = activeTab;
  }
}
</script>

<style lang="scss">


</style>
