<template>
  <div class="check-user check-user__login">
    <div class="form-input form-input--bordered check-user__input">
      <label for="phoneOrMail" class="form-label">Введите email или номер телефона</label>
      <q-input
          v-model="phoneOrMail"
          :rules="tryEmail ? [...rules, inputRules.validEmail] : rules"
          for="phoneOrMail"
          :mask="tryEmail ? false : '###########'"
          id="phoneOrMail"
          ref="phoneOrMail"
          placeholder="Начните вводить email или номер"
      ></q-input>

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

    <button v-if="isLabstoryUser && !hasPassword" class="check-user__login-id-btn"
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
import {IAuthApi, IAuthForOtherUser} from '@/interfaces/auth.interface';
import BaseFormMixins from '@/mixins/base-form-mixins';
import AuthMixin from '@/mixins/auth-mixin';
import {QInput} from 'quasar';

@Component({})
export default class CheckUserLogin extends Mixins(BaseFormMixins, AuthMixin) {
  @Prop({required: true}) onCodeSend: Function;
  @Prop({default: false}) isLoginedById: boolean;

  phoneOrMail: string = '';
  hasPassword: boolean = false;
  password: string = '';
  pwd: boolean = true;
  rules: Function[] = [];
  tryEmail: boolean = false;


  mounted() {
    this.rules.push(this.inputRules.required);
  }

  get isLabstoryUser(): boolean {
    return this.$store.state.auth.isLabstoryPatient;
  }

  get userAccountInfo(): IAuthApi.ICheckUserResponse {
    return this.$store.state.auth.userAccountInfo;
  }

  validate(): boolean {
    return [
      (this.$refs.phoneOrMail as QInput).validate(),
      this.hasPassword ? (this.$refs.password as QInput).validate() : true
    ].includes(false)
  }

  checkUser() {
    if (this.validate()) return;

    this.$store.dispatch('auth/checkUser', {value: this.phoneOrMail, type: this.getFiledType(this.phoneOrMail)})
      .then(() => this.afterCheckUser());
  }

  passwordLogin() {
    return true;
    // do login with password
  }

  afterCheckUser() {
    if (this.userAccountInfo.user_exist) {
      this.checkDuplicates();
    } else {
      if (this.isLabstoryUser) {
        this.tryEmail = true;
      } else {
        this.$store.dispatch('error/showErrorNotice', {message: 'Неверный email или номер телефона'})
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
    this.$store.dispatch('auth/sendCheckCode', {value: this.phoneOrMail, type: this.getFiledType(this.phoneOrMail)})
      .then((res: IAuthApi.ISendCodeResponse) => {
        this.onCodeSend(this.convertSendData(res, this.phoneOrMail), this.isLoginedById)
      });
  }

  checkDuplicates() {
    if (this.userAccountInfo.has_duplicates) {
      // openDuplicateStep
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
    background-color: transparent;
    border: none;
    display: flex;
    align-items: center;
    cursor: pointer;
    outline: none;
    font-size: 12px;
    color: $black-02;
    margin-top: 25px;

    .icon {
      margin-right: 16px;
      color: $accent-color;
      display: flex;
      align-items: center;
      transform: rotate(180deg);

      svg {
        width: 4px;
        height: 8px;
      }
    }
  }

  &__email-desk {
    max-width: 360px;
    font-size: 14px;
    line-height: 20px;
    color: $black-02;
    margin-top: 30px;
  }
}

</style>
