<template>
  <div class="has-login">
    <div class="has-login__desk">
      Вы в платформе «ЛабСтори». Авторизация через ID является не самым безопасным способом, поэтому чтобы иметь возможность авторизоваться более надежным способом, через телефон и код подтверждения, вам необходимо выбрать один из вариантов:
    </div>

    <div class="has-login__content">
      <div class="has-login__content-accept-number has-login__content-card">
        <h4 class="has-login__content-accept-number-title">
          Подтвердить номер телефона
        </h4>

        <div class="has-login__content-accept-number-desk has-login__content-card-desk">
         Для этого вам будет нужен доступ к этой телефону. Если это не ваш номер, то мы настоятельно рекомендуем использовать второй вариант.
        </div>

        <div class="has-login__content-accept-number-content">
          <div class="has-login__content-accept-number-content-value">
            {{patientLogin}}
          </div>

          <q-btn padding="12px 14px" @click="sendCode(patientLogin)" class="has-login__content-accept-number-content-btn button1--flooded">
            <span class="has-login__content-accept-number-content-btn-icon">
              <icon name="next-icon"></icon>
            </span>
            <span>Выслать код</span>
          </q-btn>
        </div>
      </div>
      <div class="has-login__content-change-number has-login__content-card">
        <h4 class="has-login__content-change-number-title">Привязать новый номер</h4>

        <div class="has-login__content-change-number-desk has-login__content-card-desk">
          Введите новый номер телефон, и мы привяжем личный кабинет к нему
        </div>

        <div v-if="showNewPhoneInput" class="form-input form-input--bordered has-login__new-phone">
          <q-input placeholder="введите телефон" mask="###########" :rules="rules" v-model="phone"/>
        </div>

        <q-btn class="has-login__content-change-number-btn button1--border"
               @click="showNewPhoneInput ? sendCode(phone) : setNewPhone()"
               padding="10px 14px">{{showNewPhoneInput ? 'Подтвердить' :'Ввести новый телефон'}}</q-btn>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Mixins, Prop, Vue} from 'vue-property-decorator';
import AuthMixin from '@/mixins/auth-mixin';
import BaseFormMixins from '@/mixins/base-form-mixins';

@Component({})
export default class HasLogin extends Mixins(AuthMixin, BaseFormMixins) {

  phone: string = '';
  showNewPhoneInput: boolean = true;
  rules: Function[] = [];

  @Prop() onCodeSend: Function;

  get patientLogin(): string {
    return this.$store.state.userCard.patient.email || this.$store.state.userCard.patient.phone;
  }

  mounted() {
    this.rules.push(this.inputRules.required)
  }

  sendCode(value: string) {
    this.$store.dispatch('auth/sendCheckCode', {value, type: this.getFiledType(value)})
    .then((res) => {
      if (res) {
        this.onCodeSend(this.convertSendData(res, value), true)
      }
    })
  }

  setNewPhone() {
    this.showNewPhoneInput = true;
  }
}
</script>

<style lang="scss" scoped>

.has-login {
  &__title {
    margin-top: 0;
    font-weight: 500;
    font-size: 36px;
    line-height: 130%;
    color: $gray-01;
    margin-bottom: 50px;
  }

  &__desk {
    font-size: 16px;
    line-height: 22px;
    color: $gray-01;
    margin-bottom: 40px;
    max-width: 600px;
  }

  &__content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;

    @include media-breakpoint-up($breakpoint-xs) {
      grid-template-columns: 1fr;
    }
  }

  &__content-card {
    padding: 22px 30px;
    background: $light-white;
    border-radius: 20px;

    h4 {
      margin-top: 0;
      margin-bottom: 10px;
      font-weight: 600;
      font-size: 14px;
      line-height: 130%;
      color: $black-01;
    }
  }

  &__content-card-desk {
    font-size: 14px;
    line-height: 20px;
    color: $black-03;
    margin-bottom: 25px;
  }

  &__content-accept-number-content {
    display: flex;

    @include media-breakpoint-up($breakpoint-md) {
      flex-direction: column;
    }
  }

  &__content-accept-number-content-value {
    padding: 13px 16px;
    margin-right: 15px;
    font-size: 14px;
    line-height: 130%;
    color: $black-02;
    background: $light-background;
    border-radius: 16px;
    display: flex;
    align-items: center;

    @include media-breakpoint-up($breakpoint-md) {
      margin-bottom: 15px;
      margin-right: 0;
    }
  }

  &__content-accept-number-content-btn-icon {
    margin-right: 14px;
    display: flex;
    align-items: center;

    svg {
      width: 4px;
      height: 8px;
      transform: rotate(180deg);
    }
  }

  &__content-change-number-btn {
    /deep/ &.q-btn {
      border-radius: 16px;
      font-size: 12px;
      line-height: 150%;
      color: $black-01;
      text-transform: none;

      .q-btn__wrapper {
        &:before {
          display: none;
        }
      }
    }
  }

  &__new-phone {
    margin-bottom: 20px;
  }
}

</style>
