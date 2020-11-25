<template>
  <div class="check-user check-user__login">

    <div class="check-user__login-type">
      <q-btn-toggle v-model="loginType"
                    rounded
                    class="check-user__login-type-btn"
                    :options="loginTypeOptions"/>
    </div>
    <div class="form-input form-input--bordered check-user__input">
      <template v-if="loginTypes.PHONE === loginType">
        <label for="phone" class="form-label">Введите номер телефона</label>
        <q-input
            v-model="phone"
            :rules="rules"
            for="phone"
            mask="###########"
            id="phone"
            ref="phone"
            placeholder="Начните вводить номер"
        ></q-input>
      </template>

      <template v-if="loginTypes.EMAIL === loginType">
        <label for="email" class="form-label">Введите номер email</label>
        <q-input
            v-model="email"
            :rules="[...rules, inputRules.validEmail]"
            for="email"
            id="email"
            ref="email"
            placeholder="Начните вводить email"
        ></q-input>
      </template>

      <p v-if="!hasPassword && isLabstoryUser" class="check-user__input-desk">Авторизуясь, вы принимаете условия <a href="#">«Пользовательского соглашения»</a></p>
    </div>

    <div class="check-user__email-desk" v-if="tryEmail && !hasPassword">
      К сожалению, мы не смогли найти пользователя с таким номером телефона, попробуйте ввести email или войдите через ID пациента
    </div>

    <div v-if="hasPassword" class="form-input form-input--bordered check-user__input--password">
      <label for="password" class="form-label">Введите пароль</label>
      <q-input
          v-model="password"
          :rules="rules"
          for="password"
          id="password"
          ref="password"
          :type="pwd ? 'password' : 'text'"
          placeholder="Пароль от кабинета"
      >
        <q-icon
            :name="pwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer pwd-icon"
            @click="changePwd('repeatPassword')" />
      </q-input>
    </div>

    <q-btn class="button1--bordered-with-icon button1 check-user__check-user-btn"
           :class="{'check-user__check-user-btn--email': tryEmail}"
           v-if="!hasPassword"
           @click="isLoginedById ? sendCode() :checkUser()">
        <span class="check-user__check-user-btn-icon icon">
          <icon :name="tryEmail ? 'mail-icon' : 'send-icon'"></icon>
        </span>
      <span class="check-user__check-user-btn-text">
        {{tryEmail ? 'Войти через email' : 'Продолжить'}}
      </span>
    </q-btn>

    <button v-if="isLabstoryUser && !hasPassword" class="check-user__login-id-btn button1--simple-with-icon"
            @click.stop="loginById">
      <span class="icon"><icon name="next-icon"></icon></span>
      <span>Войти через ID</span>
    </button>

    <q-btn class="button1--bordered-with-icon button1 check-user__check-user-btn"
           v-if="hasPassword"
           @click="passwordLogin">
        <span class="check-user__check-user-btn-icon icon">
          <icon name="exit-icon"></icon>
        </span>
      <span class="check-user__check-user-btn-text">
        Войти
      </span>
    </q-btn>
  </div>
</template>

<script lang="ts">
import {Component, Mixins, Prop} from 'vue-property-decorator';
import {IAuth, IAuthApi, IAuthForOtherUser} from '@/interfaces/auth.interface';
import BaseFormMixins from '@/mixins/base-form-mixins';
import AuthMixin from '@/mixins/auth-mixin';
import {QInput} from 'quasar';
import {IRouter} from '@/interfaces/router.interface';

interface IRefs {
  email: QInput;
  phone: QInput;
  password: QInput;
}

@Component({})
export default class CheckUserLogin extends Mixins(BaseFormMixins, AuthMixin) {

  @Prop({required: true}) onCodeSend: Function;
  @Prop({default: false}) isLoginedById: boolean;
  @Prop({required: true}) onHasDuplicate: Function;

  email: string = '';
  phone: string = '';
  hasPassword: boolean = false;
  password: string = '';
  pwd: boolean = true;
  rules: Function[] = [];
  tryEmail: boolean = false;

  $refs: IRefs & Vue['$refs'];
  $route: IRouter.IAppRoute<{pageMode: IAuth.AuthMode}>

  loginTypeOptions = [
    {
      label: 'Телефон',
      value: IAuthApi.CheckUserParamsType.PHONE,
    }, {
      label: 'Почта',
      value: IAuthApi.CheckUserParamsType.EMAIL,
    }];

  loginType = IAuthApi.CheckUserParamsType.PHONE;
  loginTypes = IAuthApi.CheckUserParamsType;

  mounted() {
    this.rules.push(this.inputRules.required);
  }

  get isLabstoryUser(): boolean {
    return this.$store.state.auth.isLabstoryPatient;
  }

  get userAccountInfo(): IAuthApi.ICheckUserResponse {
    return this.$store.state.auth.userAccountInfo;
  }

  get loginFiled(): string {
    return this.loginType === this.loginTypes.EMAIL ? this.email : this.phone;
  }

  get authType(): IAuth.AuthMode {
    return this.$route.query.pageMode;
  }

  validate(): boolean {
    return [
      this.loginType === this.loginTypes.EMAIL ? this.$refs.email.validate() : this.$refs.phone.validate(),
      this.hasPassword ? (this.$refs.password as QInput).validate() : true,
    ].includes(false)
  }

  checkUser() {
    if (this.validate()) return;
    this.$store.dispatch('auth/checkUser', {value: this.loginFiled, type: this.loginType})
      .then(() => this.afterCheckUser());
  }

  passwordLogin() {
    if (this.validate()) return;
    this.$store.dispatch('auth/authUser', {data: this.createLoginData(), authType: this.authType})
  }

  createLoginData(): IAuthApi.ILoginInputData {
    return {
      [this.loginType]: this.loginFiled,
      password: this.password,
    }
  }

  afterCheckUser() {
    if (this.userAccountInfo.user_exist) {
      this.checkDuplicates();
    } else {
      if (this.isLabstoryUser) {
        this.tryEmail = true;
      } else {
        this.$store.dispatch('error/showErrorNotice', {message: 'Такого аккаунта нет в системе'})
      }
    }
  }

  checkPassword() {
    if (this.userAccountInfo.has_password) {
      this.hasPassword = true;
    } else {
      this.sendCode();
    }
  }

  sendCode() {
    this.$store.dispatch('auth/sendCheckCode', {value: this.loginFiled, type: this.loginType})
      .then((res: IAuthApi.ISendCodeResponse) => {
        if (res?.ttl) {
          this.onCodeSend(this.convertSendData(res, this.loginFiled), this.isLoginedById)
        }
      });
  }

  checkDuplicates() {
    if (this.userAccountInfo.only_patient_id) {
      this.onHasDuplicate();
    } else {
      this.checkPassword();
    }
  }

  changePwd() {
    this.pwd = !this.pwd;
  }

  loginById() {
    this.changeStep(IAuthForOtherUser.RegistrationSteps.LOGIN_BY_ID)
  }
}
</script>

<style lang="scss" scoped>
.check-user {
  &__form {
    max-width: 560px;
  }

  &__check-user-btn {
    margin-top: 30px;

    &--email {

      .icon {
        svg {
          width: 20px;
          height: 12px;
          margin-left: -6px;
          margin-top: -5px;
        }
      }
    }
  }

  &__input {

    &--password {
      margin-top: 30px;
    }
  }

  &__input-desk {
    margin-top: 15px;
    font-size: 12px;
    line-height: 15px;
    color: $black-04;
    margin-bottom: 0;

    a {
      color: $black-04;
    }
  }

  &__login-id-btn {
    margin-top: 25px;
  }

  &__email-desk {
    max-width: 360px;
    font-size: 14px;
    line-height: 20px;
    color: $black-02;
    margin-top: 30px;
  }

  &__login-type {
    box-shadow: unset;
    padding: 3px;
    border: 1px solid $light-stroke;
    border-radius: 22px;
    width: fit-content;
    margin-bottom: 20px;

    /deep/ .q-btn {
      text-transform: none !important;
      font-weight: 500;
      font-size: 14px;
      line-height: 140%;
      border-radius: 18px !important;
      background-color: transparent;

      .q-btn__wrapper {
        padding: 12px 24px;
        box-shadow: unset;
        background-color: transparent;

        &:before {
          display: none;
        }
      }

      &.bg-primary {
        background: $accent-color !important;
      }
    }
  }

  &__login-type-btn {
    box-shadow: none;
  }
}

</style>
