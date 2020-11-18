<template>
  <div class="password-change-page layout">
    <BasePageHeader title="Сменить пароль" />

    <div class="password-change-page__content">
      <PasswordChange />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BasePageHeader from '../components/BasePageHeader.vue';
import PasswordChange from '@/components/userSetting/PasswordChange.vue';

@Component({
  components: {
    PasswordChange,
    BasePageHeader
  }
})
export default class PasswordChangePage extends Vue {

}
</script>

<style lang="scss">


.password-change-page {

  &__content {
    .password-change__btn {
      background-color: transparent;
      padding: 8px;
      border-radius: 22px;
      border: 1px solid $light-stroke;

      .q-btn__wrapper {
        padding: 0 !important;
      }
    }

    .password-change__btn-icon {
      display: flex;
      width: 32px;
      height: 40px;
      background: #7C74E9;
      border-radius: 16px;
      align-items: center;
      justify-content: center;
      margin-right: 12px;
    }

    .password-change__btn-text {
      color: $black-02;
      margin-right: 15px;
    }
  }
}

</style>
