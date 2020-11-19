<template>
  <div class="check-user check-user--register">
    <div class="check-user__item check-user__item--input form-input--bordered">
      <Name ref="name" :propRules="rules" disableAcceptField />
    </div>
    <div class="check-user__item check-user__item--input form-input--bordered">
      <Surname  ref="surname" :propRules="rules" disableAcceptField />
    </div>
    <div class="form-input form-input--bordered check-user__input">
      <q-input
          v-model="phone"
          :rules="rules"
          ref="phone"
          placeholder="Введите ваш номер телефона"
          mask="###########"
      />
    </div>

    <div class="check-user__accept form-checkbox form-checkbox--with-label">
      <q-checkbox v-model="acceptCheckbox"></q-checkbox>
      <div class="check-user__accept-label">
        Согласен с <a href="#">Пользовательским соглашением</a>  и <a href="#">Политикой конфиденциальности</a>
      </div>
    </div>

    <q-btn padding="8px" class="check-user__button button1 button1--bordered-with-icon" @click="checkUser">
          <span class="icon">
            <icon name="send-icon"></icon>
          </span>
      <span class="check-user__button-text">Выслать проверочный код</span>
    </q-btn>
  </div>
</template>

<script lang="ts">
import {Component, Vue, Prop, Mixins} from 'vue-property-decorator';
import {IAuthApi, IAuthForOtherUser} from '@/interfaces/auth.interface';
import Surname from '@/components/userSetting/Surname.vue';
import Name from '@/components/userSetting/Name.vue';
import BaseFormMixins from '@/mixins/base-form-mixins';
import AuthMixin from '@/mixins/auth-mixin';
import {QInput} from 'quasar';

@Component({
  components: {
    Name,
    Surname
  }
})
export default class CheckUserRegister extends Mixins(BaseFormMixins, AuthMixin) {
  acceptCheckbox: boolean = false;

  @Prop({required: true}) onCodeSend: Function;

  rules: Function[] = [];

  phone: string = '';

  mounted() {
    this.rules.push(this.inputRules.required)
  }

  validate(): boolean {
    return [
      (this.$refs.surname as Surname).validate(),
      this.acceptCheckbox,
      (this.$refs.name as Name).validate(),
      (this.$refs.phone as QInput).validate(),
    ].includes(false);
  }

  get userAccountInfo(): IAuthApi.ICheckUserResponse {
    return this.$store.state.auth.userAccountInfo;
  }

  checkUser() {
    if (this.validate()) return;

    this.$store.dispatch('auth/checkUser', {value: this.phone, type: IAuthApi.CheckUserParamsType.PHONE})
      .then((status) => {
        if (!status) return;

        if (this.userAccountInfo.user_exist) return this.$store.dispatch('error/showErrorNotice', {message: 'Такой аккаунт уже существует'})

        this.$store.dispatch('auth/sendCheckCode', {value: this.phone, type: IAuthApi.CheckUserParamsType.PHONE})
          .then((res: IAuthApi.ISendCodeResponse) => {
            if (res) {
              this.onCodeSend(this.convertSendData(res, this.phone));
            }
          })
      })
  }
}
</script>

<style lang="scss" scoped>
.check-user {

  &__accept {
    margin-top: 18px;
    display: flex;
  }

  &__accept-label {
    font-size: 12px;
    line-height: 15px;
    color: $black-04;
    margin-top: 5px;

    a {
      color: $black-04;
    }
  }

  &__button {
    margin-top: 24px;
  }

  &__item {
    margin-bottom: 16px;
  }
}

</style>
