<template>
  <div class="registration-form registration-form--other">
    <q-form v-if="currentStep !== steps.HAS_LOGIN" class="form-layout registration-form__form">
      <template v-if="currentStep === steps.CHECK_USER">
        <CheckUserRegister v-if="pageMode === authType.REGISTER"
                           :onCodeSend="onCodeSend"/>
        <CheckUserLogin :isLoginedById="isLoginedById"
                        v-if="pageMode === authType.LOGIN"
                        :onHasDuplicate="onHasDuplicate"
                        :onCodeSend="onCodeSend" />
      </template>
      <LoginById v-if="currentStep === steps.LOGIN_BY_ID"
                 :onLogined="onLoginByUserIdSuccess"
                  :hasDuplicate="hasDuplicate"/>
      <CheckAcceptCode
          :isLoginedById="isLoginedById"
          :checkedValue="checkedValue"
          :codeData="codeData"
          v-if="currentStep === steps.CHECK_PHONE" />
      <PasswordChange isCreatePassword
                      v-if="currentStep === steps.SET_PASSWORD"/>
    </q-form>
    <HasLogin v-if="currentStep === steps.HAS_LOGIN" :onCodeSend="onCodeSend"/>
  </div>
</template>

<script lang="ts">
import {Component, Mixins, Watch} from 'vue-property-decorator';
import BaseFormMixins from '@/mixins/base-form-mixins';
import Name from '@/components/userSetting/Name.vue';
import Surname from '@/components/userSetting/Surname.vue';
import {IAuth, IAuthApi, IAuthForOtherUser} from '@/interfaces/auth.interface';
import CheckAcceptCode from '@/components/auth/CheckPhone.vue';
import PasswordChange from '@/components/userSetting/PasswordChange.vue';
import CheckUserRegister from '@/components/auth/CheckUserRegister.vue';
import CheckUserLogin from '@/components/auth/CheckUserLogin.vue';
import LoginById from '@/components/auth/LoginById.vue';
import AuthMixin from '@/mixins/auth-mixin';
import {IRouter} from '@/interfaces/router.interface';
import IAppRoute = IRouter.IAppRoute;
import HasLogin from '@/components/auth/HasLogin.vue';


@Component({
  components: {
    Name,
    Surname,
    CheckAcceptCode,
    PasswordChange,
    CheckUserRegister,
    CheckUserLogin,
    LoginById,
    HasLogin
  }
})
export default class AuthFormOtherUser extends Mixins(BaseFormMixins, AuthMixin) {
  steps = IAuthForOtherUser.RegistrationSteps;
  codeData: IAuthApi.ISendCodeResponse;
  authType = IAuthApi.AuthType;
  checkedValue: string = '';
  isLoginedById: boolean | undefined = false;
  hasDuplicate: boolean | undefined = false;

  $route: IAppRoute<{pageMode: IAuth.AuthMode}>

  get currentStep(): IAuthForOtherUser.RegistrationSteps {
    return this.$store.state.auth.currentAuthStep;
  }

  get pageMode(): IAuth.AuthMode {
    return this.$route.query.pageMode;
  }

  get isLabstoryUser(): boolean {
    return this.$store.state.auth.isLabstoryPatient;
  }

  onCodeSend({codeData, checkedValue}: {checkedValue: string; codeData: IAuthApi.ISendCodeResponse}, isLoginedById?: boolean) {
    this.codeData = codeData;
    this.checkedValue = checkedValue;
    this.isLoginedById = isLoginedById;
    this.changeStep(IAuthForOtherUser.RegistrationSteps.CHECK_PHONE);
  }

  onLoginByUserIdSuccess() {
    this.isLoginedById = true;
    this.changeStep(IAuthForOtherUser.RegistrationSteps.HAS_LOGIN)
  }

  onHasDuplicate() {
    this.hasDuplicate = true;
    this.changeStep(IAuthForOtherUser.RegistrationSteps.LOGIN_BY_ID);
  }

  @Watch('isLabstoryUser')
  onUserStatusChange() {
    this.isLoginedById = false;
    this.hasDuplicate = false;
  }
}
</script>

<style lang="scss" scoped>
.registration-form {
  &__form {
    max-width: 580px;
  }
}

</style>
