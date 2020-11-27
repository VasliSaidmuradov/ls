<template>
  <div class="password-change">

    <h3 class="password-change__title" v-if="isCreatePassword">Придумайте пароль</h3>
    <div
        v-if="!isCreatePassword"
        class="password-change__input form-input"
        :class="{'form-input--empty': !password}"
    >
      <q-input
          rounded
          v-model="password"
          placeholder="Введите пароль"
          :type="pwdObject.oldPassword ? 'password': 'text'"
          :borderless="false"
      >
        <q-icon
            :name="pwdObject.oldPassword ? 'visibility_off' : 'visibility'"
            class="cursor-pointer pwd-icon"
            @click="changePwd('oldPassword')"/>
      </q-input>
    </div>

    <div
        class="password-change__input form-input"
        :class="{'form-input--empty': !newPassword}"
    >
      <q-input
          rounded
          v-model="newPassword"
          ref="newPassword"
          :rules="rules"
          placeholder="Введите новый пароль"
          :type="pwdObject.newPassword ? 'password': 'text'"
          :borderless="false"
      >
        <q-icon
            :name="pwdObject.newPassword ? 'visibility_off' : 'visibility'"
            class="cursor-pointer pwd-icon"
            @click="changePwd('newPassword')"/>
      </q-input>

      <div class="password-change__meter">
        <passwordMeter @score="onScore" :password="newPassword"></passwordMeter>
        <div class="password__strength" :class="newPassword ? passwordStrength: ''">
          <span v-for="index in 3" :key="index"></span>
        </div>

        <div class="password-change__meter-desk"
             v-if="passwordStrengthText[passwordStrength] && newPassword"
             v-html="passwordStrengthText[passwordStrength]"></div>
      </div>
    </div>

    <div
        class="password-change__input form-input"
        :class="{'form-input--empty': !repeatPassword}"
    >
      <q-input
          rounded
          v-model="repeatPassword"
          ref="repeatPassword"
          :rules="[newPasswordValidate, ...rules]"
          placeholder="Повторите пароль"
          :type="pwdObject.repeatPassword ? 'password': 'text'"
          :borderless="false"
      >
        <q-icon
            :name="pwdObject.repeatPassword ? 'visibility_off' : 'visibility'"
            class="cursor-pointer pwd-icon"
            @click="changePwd('repeatPassword')"/>
      </q-input>
    </div>

    <q-btn v-if="!isCreatePassword"
           padding="14px 13px"
           unelevated
           class="password-change__btn password-change__btn--flooded">
      <span class="password-change__btn-icon">
        <icon name="cloud-icon"></icon>
      </span>
      <span class="password-change__btn-text">Сохранить новый пароль</span>
    </q-btn>

    <q-btn
        v-if="isCreatePassword"
        padding="8px"
        @click="createNewPassword"
        class="password-change__create-btn button1 button1--bordered-with-icon">

      <span class="password-change__create-btn-icon icon">
        <icon name="exit-icon"></icon>
      </span>
      <span class="password-change__create-btn-text">Войти</span>
    </q-btn>
  </div>

</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import { IUserCard } from '../../interfaces/user-card.interface';
  import passwordMeter from 'vue-simple-password-meter';
  import BaseFormMixins from '@/mixins/base-form-mixins';
  import { QInput } from 'quasar';

  interface IRefs {
    newPassword: QInput;
    repeatPassword: QInput;
  }

  @Component({
    components: {
      passwordMeter,
    },
  })
  export default class PasswordChange extends BaseFormMixins {

    @Prop({ default: false, type: Boolean }) isCreatePassword: boolean;

    pwdObject = {
      oldPassword: true,
      newPassword: true,
      repeatPassword: true,
    };

    newPassword = '';
    repeatPassword = '';
    passwordStrength = '';

    rules: Function[] = [];

    passwordStrengthStatus = IUserCard.PasswordStrength;

    passwordStrengthText = {
      [IUserCard.PasswordStrength.RISKY]: `<h6>Слабый пароль</h6><p>Пароль должен быть не менее 8 символов и содержать заглавные и строчные буквы, цифры и специальные символы</p>`,
      [IUserCard.PasswordStrength.QUESSABLE]: `<h6>Средний пароль</h6><p>Пароль должен быть не менее 8 символов и содержать заглавные и строчные буквы, цифры и специальные символы</p>`,
      [IUserCard.PasswordStrength.SECURE]: `<h6>Надежный пароль</h6><p>Пароль должен быть не менее 8 символов и содержать заглавные и строчные буквы, цифры и специальные символы</p>`,
    };

    $refs: IRefs & Vue['$refs'];

    mounted() {
      this.rules.push(this.inputRules.required);
    }

    newPasswordValidate(val: string) {
      return val === this.repeatPassword || 'Пароли не совпадают';
    }

    get password(): string {
      return this.$store.state.userCard.password;
    }

    set password(value: string) {
      this.$store.commit('userCard/setPropertyInStore', { name: 'password', value });
    }


    onScore({ score, strength }: { score: number; strength: string }) {
      if (Object.keys(this.passwordStrengthText).includes(strength)) this.passwordStrength = strength;
    }

    changePwd(pwd: keyof { oldPassword: boolean; newPassword: boolean; repeatPassword: boolean }) {
      this.pwdObject[pwd] = !this.pwdObject[pwd];
    }

    validate() {
      return [
        this.$refs.newPassword.validate(),
        this.$refs.repeatPassword.validate(),
      ].includes(false);
    }

    createNewPassword() {
      if (this.validate()) return;
      this.$store.dispatch('auth/changePatientsData', {
        changedData: { password: this.newPassword },
        id: this.$store.state.userCard.patient.id,
      });
    }
  }
</script>

<style lang="scss">


  .password-change {
    .password-change__input {
      .q-field__append {
        right: 40px;
      }
    }

    &__meter {
      margin-top: 10px;

      .po-password-strength-bar {
        opacity: 0;
        position: absolute;
      }

      .password__strength {
        display: flex;
        margin-left: 5px;

        span {
          background: $black-04;
          border-radius: 100px;
          height: 2px;
          width: 50px;
          display: block;
          margin-right: 7px;

          &:last-child {
            margin-right: 0;
          }
        }

        &.risky {
          span:nth-child(1) {
            background: $status-green;
          }
        }

        &.guessable {
          span:nth-child(1) {
            background: $status-green;
          }

          span:nth-child(2) {
            background: $status-green;
          }
        }

        &.secure {
          span {
            background: $status-green;
          }
        }
      }
    }

    &__meter-desk {
      margin-top: 20px;
      padding-left: 5px;

      h6 {
        margin-top: 0;
        margin-bottom: 8px;
        font-weight: 600;
        font-size: 14px;
        line-height: 130%;
        color: $black-02;
      }

      p {
        margin-top: 0;
        font-size: 14px;
        line-height: 20px;
        color: $black-03;
      }
    }

    &__btn {
      &.q-btn {
        border: 1px solid $light-stroke;
        border-radius: 12px;
        color: $accent-color;
        text-transform: none;
        font-weight: 500;
        font-size: 12px;
      }

      &--flooded {
        &.q-btn {
          border: none;
          background-color: $accent-color;
          color: $light-white;
        }
      }

      &-icon {
        display: none;
      }
    }

    &__input {
      margin-bottom: 25px;
    }

    &__title {
      margin-bottom: 25px;
      margin-top: 0;
      font-weight: 500;
      font-size: 16px;
      line-height: 130%;
      color: $gray-01;
    }
  }

</style>
