<template>
  <div class="check-phone">
    <p class="check-phone__desk">Введите код, который мы выслали на номер телефона:</p>

    <div class="check-phone__content">
     <div class="check-phone__content-codes">
       <div class="check-phone__code-item" v-for="(char, index) in code" :key="index">
         <q-input :autofocus="index === 0"
                  @focus="onFocus(index)"
                  mask="#"
                  placeholder="-"
                  maxlength="1" @keyup="codeInput(index, char.value)"
                  v-model="char.value" :ref="`input${index}`">

         </q-input>
       </div>

       <StatusIndicator v-if="showError" isError/>
     </div>
      <div class="check-phone__content-desk">
        <p>Отправим следующий код через {{codeTime}} секунд</p>
        <a href="">Код не приходит.</a>
      </div>
      <div class="check-phone__content-change-step">
        <button @click.prevent.stop="changeStep(steps.CHECK_USER)" class="check-phone__content-change-step-btn">
          <span class="icon">
            <icon name="next-icon"></icon>
          </span>
          <span>
            {{
              (userAccountInfo.has_password && authType === authTypes.LOGIN)
                ? 'Войти с помощью пароля'
                : 'Ввести другой номер телефона'
            }}
          </span>
        </button>

        <button class="check-phone__content-change-step-btn check-phone__content-change-step-btn--login"
                v-if="authType === authTypes.LOGIN && userAccountInfo.has_password"
                @click="changeStep(steps.CHECK_USER)">
          Ввести другой номер телефона
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import {QInput} from 'quasar';
import {IAuth, IAuthApi, IAuthForOtherUser} from '@/interfaces/auth.interface';
import AuthMixin from '@/mixins/auth-mixin';
import StatusIndicator from '@/components/StatusIndicator.vue';

@Component({
  components: {
    StatusIndicator
  }
})
export default class CheckAcceptCode extends AuthMixin {

  @Prop({required: true}) codeData: IAuthApi.ISendCodeResponse;
  @Prop({required: true}) checkedValue: string;
  @Prop({default: false}) isLoginedById: boolean;

  authTypes = IAuth.AuthMode;
  showError: boolean = false;

  steps =  IAuthForOtherUser.RegistrationSteps;

  codeTime: number = 0;

  code: {value: string}[] = [{
        value: '',
      }, {
        value: '',
      }, {
        value: '',
      }, {
        value: '',
      }];

  mounted() {
    if (this.codeData?.ttl) {
      this.startCodeTimer(this.codeData.ttl)
    }
  }

  get authType(): IAuth.AuthMode {
    return (this.$route.query.pageMode as IAuth.AuthMode)
  }

  get userAccountInfo(): IAuthApi.ICheckUserResponse {
    return this.$store.state.auth.userAccountInfo;
  }

  codeInput(index: number, value: string) {
    if (value && this.code[index + 1]) {
      (this.$refs[`input${index + 1}`] as QInput[])[0].focus();
    }

    if (!(index === this.code.length - 1)) {
      this.showError = false;
    }

    if ((index === this.code.length - 1) && value && !this.showError) {
      this.isLoginedById ? this.confirmCode() :this.authUser(this.authType);
    }
  }

  confirmCode() {
    this.$store.dispatch('auth/confirmCode', this.setConfirmData())
      .then((status: boolean) => this.afterCodeConfirm(status))
  }

  onFocus(index: number) {
    (this.$refs[`input${index}`] as QInput[])[0].select();
  }

  startCodeTimer(time: number) {
    this.codeTime = time;

    const intervalId = setInterval(() => {
      if (this.codeTime !== 0) {
        this.codeTime = --this.codeTime;
      } else {
        clearInterval(intervalId);
      }
    }, 1000)
  }


  authUser(authType: IAuth.AuthMode) {
    this.$store.dispatch('auth/authUser', {authData: this.setAuthData(), authType})
      .then((status: boolean) => this.afterCodeConfirm(status))
  }

  afterCodeConfirm(status: boolean) {
    if (status) this.changeStep(this.steps.SET_PASSWORD);
    else this.showError = true;
  }

  setAuthData(): IAuthApi.IRegisterUserInputData | IAuthApi.ILoginUserInputData {
    const data = {
      code: this.convertCode(),
      [this.getFiledType(this.checkedValue)]: this.checkedValue,
    }

    if (this.authType === IAuth.AuthMode.REGISTRATION) {
      data.name = this.$store.state.personalArea.patient.name;
      data.surname = this.$store.state.personalArea.patient.surname;
    }

    return data;
  }

  setConfirmData(): IAuthApi.ILoginUserInputData {
    return {
      code: this.convertCode(),
      [this.getFiledType(this.checkedValue)]: this.checkedValue,
    }
  }

  convertCode(): string {
    return this.code.map(item => item.value).join('');
  }

  destroy() {
    this.codeTime = 0;
  }
}
</script>

<style lang="scss" scoped>
.check-phone {
  &__desk {
    font-weight: 500;
    font-size: 13px;
    line-height: 130%;
    color: $black-02;
    margin: 0;
  }

  &__content {
    margin-top: 22px;
    display: flex;
    flex-direction: column;
  }

  &__content-desk {
    margin-top: 22px;
    font-size: 14px;
    line-height: 20px;
    color: $black-02;
    margin-bottom: 70px;

    a {
      color: $black-02;
      text-decoration-line: underline;
    }
  }

  &__content-codes {
    display: flex;
    align-items: center;
  }

  &__code-item {
    margin-right: 18px;

   ::v-deep .q-input {
      background: $light-background;
      border-radius: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 56px;
      height: 56px;
      padding: 0 23px;

      .q-field__control {
        &:before, &:after {
          display: none;
        }
      }

      @include media-breakpoint-up($breakpoint-xs) {
        height: 50px;
        width: 50px;
        padding: 0 20px;
      }
    }

    &:last-child {
      margin-right: 0;
    }

    @include media-breakpoint-up($breakpoint-xs) {
      margin-right: 5px;
    }
  }

  &__content-change-step {
    background-color: transparent;
    display: flex;
    justify-content: space-between;
  }

  &__content-change-step-btn {
    background-color: transparent;
    border: none;
    display: flex;
    align-items: center;
    cursor: pointer;
    outline: none;
    font-size: 12px;
    color: $black-02;

    .icon {
      margin-right: 16px;
      color: $accent-color;
      display: flex;
      align-items: center;

      svg {
        width: 4px;
        height: 8px;
      }
    }

    &--login {
      color: $black-04;

      @include media-breakpoint-up($breakpoint-xs) {
        display: none;
      }
    }
  }
}

</style>
