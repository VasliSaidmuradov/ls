<template>
  <div class="user-settings" :class="{'user-settings--page layout layout--mobile': isProfilePage}">
    <div class="user-settings__header" v-if="isProfilePage">
      <BasePageHeader title="Данные профиля"/>
    </div>

    <div class="user-settings__avatar" v-if="isProfilePage">
      <UserCardAvatar />
    </div>

    <q-form ref="form">
      <div class="user-settings__base-field">
       <div class="user-settings__base-field-item">
         <Surname />
       </div>
        <div class="user-settings__base-field-item">
          <Name />
        </div>
        <div class="user-settings__base-field-item">
          <Patronym />
        </div>
        <div class="user-settings__base-field-item">
          <Mail />
        </div>
      </div>
      <div class="user-settings__password" v-if="!isProfilePage">
        <Password />
      </div>
      <div class="user-settings__phone">
        <span>{{dialCode}}</span>
        <VuePhoneNumberInput v-model="phone" >
          <template v-slot:arrow>
            <span class="user-settings__phone-icon"><icon name="next-icon"></icon></span>
          </template>
        </VuePhoneNumberInput>
      </div>
<!--      в первом релизе этого быть не должно -->
<!--      <div class="user-settings__insurance">-->
<!--        <h4 class="user-settings__insurance-title">Страховые полисы</h4>-->
<!--        <div class="user-settings__insurance-content">-->
<!--          <div class="user-settings__base-field-item">-->
<!--            <Oms />-->
<!--          </div>-->
<!--          <div class="user-settings__base-field-item">-->
<!--            <Dms />-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
    </q-form>

    <div class="user-settings__legal">
      <LegalInformation />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import VuePhoneNumberInput from 'vue-phone-number-input';
import 'vue-phone-number-input/dist/vue-phone-number-input.css';
import Name from '@/components/userSetting/Name.vue';
import Mail from '@/components/userSetting/Mail.vue';
import Surname from '@/components/userSetting/Surname.vue';
import Patronym from '@/components/medicalCard/Patronym.vue';
import Oms from '@/components/userSetting/Oms.vue';
import Dms from '@/components/userSetting/Dms.vue';
import Password from '@/components/userSetting/Password.vue';
import {IRouter} from '@/interfaces/router.interface';
import ROUTE_NAME = IRouter.ROUTE_NAME;
import BasePageHeader from '@/components/BasePageHeader.vue';
import UserCardAvatar from '@/components/userCard/UserCardAvatar.vue';
import LegalInformation from '@/components/userSetting/LegalInformation.vue';

  @Component({
    components: {
      VuePhoneNumberInput,
      Name,
      Mail,
      Surname,
      Patronym,
      Oms,
      Dms,
      Password,
      BasePageHeader,
      UserCardAvatar,
      LegalInformation
    }
  })

  export default class UserSettings extends Vue {
    dialCode = '';

    onPhoneInput({number, isValid, country}: any) {
      this.dialCode = country.dialCode;
    }

    get phone(): string {
      return this.$store.state.userCard.phone;
    }

    set phone(value: string) {
      this.$store.commit('userCard/setPropertyInStore', {name: 'phone', value});
    }

    get isProfilePage(): boolean {
      return this.$route.name === ROUTE_NAME.PROFILE_PAGE;
    }
  }
</script>


<style lang="scss">


  .user-settings {

    &__input {
      margin-bottom: 25px;
    }

    &__base-field-item {
      margin-bottom: 25px;
    }

    &__insurance-title {
      margin-top: 60px;
      margin-bottom: 35px;
      font-weight: 500;
      font-size: 16px;
      line-height: 130%;
      color: $black-01;
    }

    &__insurance-label {
      font-weight: 500;
      font-size: 13px;
      line-height: 130%;
      color: $black-02;
      margin-bottom: 8px;
      display: block;
    }

    &__phone {
      border-radius: 15px;
      height: 56px;
      background-color: $light-white;
      display: flex;
      align-items: center;
      padding: 12px;
      margin-top: 24px;

      div.select-country-container {
        border-radius: 25px;
        width: 100px !important;
        min-width: 100px !important;
        flex: 0 !important;
        background-color: $light-background;
      }

      .country-selector__input {
        background-color: $light-background;
        border-radius: 25px !important;
        padding-left: 40px !important;
        padding-top: 3px !important;
        border: none !important;
        box-shadow: none !important;
        font-weight: 500;
        font-size: 14px;
        line-height: 130%;
        color: $gray-02;
      }

      .country-selector__country-flag {
        top: 50%;
        transform: translate(0, -50%);
      }

      .country-selector__label {
        display: none;
      }

      .input-tel {

        .input-tel__input {
          border: none !important;
          box-shadow: none !important;
          padding-top: 0 !important;
          padding-left: 10px;
        }

        .input-tel__label {
          display: none;
        }
      }

      .vue-phone-number-input {
        flex-wrap: nowrap;
        width: 100%;
      }
    }

    &__phone-icon {
      color: $accent-color;
      transform: rotate(270deg);
      display: block;
      margin-right: 10px;

      svg {
        height: 10px;
        width: 8px;
      }
    }

    &--page {
      padding: 50px 20px;
    }

    &__avatar {
      margin: 25px 0;
      width: 98px;
    }

    &__legal {
      margin-top: 60px;
    }
  }
</style>
