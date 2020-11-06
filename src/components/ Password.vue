<template>
  <div class="password">
    <h4 class="password__title">
      Пароль от кабинета
    </h4>
    <template v-if="!isShowPasswordChange">
      <q-btn
          class="password__btn"
          unelevated
          @click="showPasswordChangeBlock()"
          padding="13px 8px">
          <span>
            <icon name="password"></icon>
          </span>
        Изменить пароль
      </q-btn>
    </template>
    <template v-else>
      <div class="password__content">
        <div
            class="user-settings__input form-input"
            :class="{'form-input--empty': !password}"
        >
          <q-input
              rounded
              v-model="password"
              :type="pwdObject.oldPassword ? 'password': 'text'"
              :borderless="false"
          >
            <q-icon
                :name="pwdObject.oldPassword ? 'visibility_off' : 'visibility'"
                class="cursor-pointer pwd-icon"
                @click="changePwd('oldPassword')" />
          </q-input>
        </div>

        <div
            class="user-settings__input form-input"
            :class="{'form-input--empty': !newPassword}"
        >
          <q-input
              rounded
              v-model="newPassword"
              :type="pwdObject.newPassword ? 'password': 'text'"
              :borderless="false"
          >
            <q-icon
                :name="pwdObject.newPassword ? 'visibility_off' : 'visibility'"
                class="cursor-pointer pwd-icon"
                @click="changePwd('newPassword')" />
          </q-input>

            <div class="password__meter">
              <passwordMeter @score="onScore" :password="newPassword"></passwordMeter>
              <div class="password__strength" :class="newPassword ? passwordStrength: ''">
                <span v-for="index in 3" :key="index"></span>
              </div>

              <div class="password__meter-desk"
                   v-if="passwordStrengthText[passwordStrength] && newPassword"
                   v-html="passwordStrengthText[passwordStrength]"></div>
            </div>
        </div>

        <div
            class="user-settings__input form-input"
            :class="{'form-input--empty': !repeatPassword}"
        >
          <q-input
              rounded
              v-model="repeatPassword"
              :type="pwdObject.repeatPassword ? 'password': 'text'"
              :borderless="false"
          >
            <q-icon
                :name="pwdObject.repeatPassword ? 'visibility_off' : 'visibility'"
                class="cursor-pointer pwd-icon"
                @click="changePwd('repeatPassword')" />
          </q-input>
        </div>

        <q-btn padding="14px 13px"
               unelevated
               class="password__btn password__btn--flooded">
          Сохранить новый пароль</q-btn>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {IUserCard} from '@/interfaces/user-card.interface';
import passwordMeter from "vue-simple-password-meter";
@Component({
  components: {
    passwordMeter
  }
})
export default class Password extends Vue {

  isShowPasswordChange = false;

  pwdObject = {
    oldPassword: false,
    newPassword: false,
    repeatPassword: false,
  };

  newPassword = '';
  repeatPassword = '';
  passwordStrength = '';

  passwordStrengthStatus = IUserCard.PasswordStrength;

  passwordStrengthText = {
    [IUserCard.PasswordStrength.RISKY]: `<h6>Слабый пароль</h6><p>Пароль должен быть не менее 8 символов и содержать заглавные и строчные буквы, цифры и специальные символы</p>`,
    [IUserCard.PasswordStrength.QUESSABLE]: `<h6>Средний пароль</h6><p>Пароль должен быть не менее 8 символов и содержать заглавные и строчные буквы, цифры и специальные символы</p>`,
    [IUserCard.PasswordStrength.SECURE]: `<h6>Надежный пароль</h6><p>Пароль должен быть не менее 8 символов и содержать заглавные и строчные буквы, цифры и специальные символы</p>`,
  }

  get password(): string {
    return this.$store.state.userCard.password;
  }

  set password(value: string) {
    this.$store.commit('userCard/setPropertyInStore', {name: 'password', value})
  }

  showPasswordChangeBlock() {
    this.isShowPasswordChange = !this.isShowPasswordChange;
  }

  onScore({ score, strength }: {score: number; strength: string}) {
    if (Object.keys(this.passwordStrengthText).includes(strength)) this.passwordStrength = strength;
  }

  changePwd(pwd: keyof {oldPassword: boolean; newPassword: boolean; repeatPassword: boolean}) {
    this.pwdObject[pwd] = !this.pwdObject[pwd];
  }

}
</script>


<style lang="scss">
@import "../styles/vars";
.password {
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
  }

  &__content {

    .pwd-icon {
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translate(0, -50%);
      color: $accent-color;
      font-size: 20px;
    }


    .user-settings__input {
      .q-field__append {
        right: 40px;
      }
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
          background:  $status-green;
        }
      }

      &.guessable {
        span:nth-child(1) {
          background:  $status-green;
        }

        span:nth-child(2) {
          background:  $status-green;
        }
      }

      &.secure {
        span {
          background: $status-green;
        }
      }
    }
  }

  &__btn {
    span {
      padding-left: 8px;
      padding-right: 14px;
    }
  }

  &__title {
    font-weight: 500;
    font-size: 12px;
    line-height: 15px;
    color: $black-02;
    margin-bottom: 25px;
    margin-top: 0;
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
}
</style>
