<template>
  <div class="login-by-id">
    <template v-if="!notFoundUser">
      <div class="form-input form-input--bordered" v-if="!checkResearchDate">
        <label for="userId" class="form-label">Введите ваш номер ID</label>
        <q-input
            for="userId"
            id="userId"
            :rules="rules"
            ref="userId"
            placeholder="Введите ваш номер ID"
            v-model="userId"
        >

        </q-input>

        <p class="login-by-id__input-desk">
          Авторизуясь, вы принимаете условия <a href="#">«Пользовательского соглашения»</a>
        </p>
      </div>

      <div v-if="checkResearchDate" class="login-by-id__check-research-date">
        <div class="form-input form-input--bordered">
          <label for="fio" class="form-label">Введите ФИО</label>
          <q-input
              for="fio"
              id="fio"
              ref="fio"
              :rules="rules"
              placeholder="Введите ФИО"
              v-model="fio"
          >
          </q-input>
        </div>

        <div class="date-input">
          <InputDate :value="researchDate"
                     ref="inputDate"
                     :propsRules="rules"
                     label="Введите дату сдачи исследования"
                     customClass="form-input--bordered"
                     @change-value="onResearchDateChange"/>
        </div>
      </div>

      <q-btn padding="8px"
             class="button1--bordered-with-icon button1 login-by-id__btn"
             @click="checkResearchDate ? checkUserByResearchDate() : checkUserById()">
        <span class="login-by-id__btn-icon icon">
          <icon name="next-icon"></icon>
        </span>
        <span class="login-by-id__btn-text">
        Продолжить
      </span>
      </q-btn>

      <button class="change-step-btn login-by-id__change-step"
              @click.stop="changeStep(steps.CHECK_USER)" v-if="!checkResearchDate">
        <span class="icon"><icon name="next-icon"></icon></span>
        <span>Войти через телефон/emal</span>
      </button>
    </template>
    <template v-else>
      <div class="not-found-user">
        <div class="not-found-user__desk">
          К сожалению, мы не смогли идентифицировать как пациента ЛабСтори. Чтобы попасть в личный кабинет, свяжитесь с медцентром, где вы оформляли свои данные, либо зарегистрируйтесь как новый пациент.
        </div>

        <div class="not-found-user__actions">
          <q-btn padding="16px 20px" class="not-found-user__actions-contacts button1 button1--flooded">Контакты медцентров</q-btn>
          <q-btn class="not-found-user__actions-register">Зарегистрироваться</q-btn>
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import {Component, Mixins, Prop, Vue} from 'vue-property-decorator';
import AuthMixin from '@/mixins/auth-mixin';
import {IAuthApi, IAuthForOtherUser} from '@/interfaces/auth.interface';
import InputDate from '@/components/InputDate.vue';
import format from 'date-fns/format'
import BaseFormMixins from '@/mixins/base-form-mixins';
import {QInput} from 'quasar';

interface IRefs {
  inputDate: InputDate,
  fio: QInput,
  userId: QInput,
}

@Component({
  components: {
    InputDate
  }
})
export default class LoginById extends Mixins(AuthMixin, BaseFormMixins) {

  @Prop() onLogined: Function;

  userId = '';
  steps = IAuthForOtherUser.RegistrationSteps
  checkResearchDate: boolean = false;
  fio: string = ''
  researchDate: string | Date = new Date();
  rules: Function[] = [];
  notFoundUser = true;

  $refs: IRefs & Vue['$refs'];



  mounted() {
    this.rules.push(this.inputRules.required);
  }

  validate() {
    return [
        this.checkResearchDate ? this.$refs.inputDate.validate() : true,
        this.checkResearchDate ? this.$refs.fio.validate() : true,
        !this.checkResearchDate ? this.$refs.userId.validate() : true,
    ].includes(false);
  }

  async checkUserById() {
    if (this.validate()) return;

    this.$store.dispatch('auth/checkUser', {value: this.userId, type: IAuthApi.CheckUserParamsType.ID})
      .then((status) => {
        if (status) this.afterCheckUser();
      })
  }

  async checkUserByResearchDate() {
    if (this.validate()) return;

    this.$store.dispatch('auth/loginById', this.covertLoginData())
      .then(isSuccess => {
        if (isSuccess) this.onLogined();
      })
  }

  covertLoginData(): any {
    return {
      patient_id: this.userId,
      fio: this.fio,
      research_date: format(new Date(this.researchDate), 'yyyy-MM-dd')
    }
  }

  onResearchDateChange(value: string | Date) {
    this.researchDate = value;
  }

  afterCheckUser() {
    if (this.userAccountInfo.user_exist) {
      this.checkHasLogin();
    } else {
      this.notFoundUser = true;
    }
  }

  checkHasLogin() {
    if (this.userAccountInfo.has_login) {
      this.changeStep(IAuthForOtherUser.RegistrationSteps.CHECK_USER)
    } else {
      this.checkResearchDate = true;
    }
  }
}
</script>

<style lang="scss" scoped>
.login-by-id {

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

  &__btn {
    margin-top: 26px;
  }

  &__btn-icon {
    transform: rotate(180deg);

    svg {
      width: 4px;
      height: 8px;
    }
  }

  &__change-step {
    .icon {
      transform: rotate(180deg);
    }
  }

  &__check-research-date {
    .date-input {
      margin-top: 30px;
    }
  }
}

.not-found-user {

  &__desk {
    font-size: 14px;
    line-height: 20px;
    color: $black-02;
    margin-bottom: 30px;
  }

  &__actions {
    display: flex;

    @include media-breakpoint-up($breakpoint-xs) {
      flex-direction: column;
    }
  }

  &__actions-contacts {
  /deep/ &.q-btn {
      border-radius: 22px;
    }
  }

  &__actions-register {
    margin-left: 15px;

    /deep/ &.q-btn {
      border-radius: 22px;
      text-transform: none;
      background: transparent;

      .q-btn__wrapper {
        background: transparent;
        ont-size: 12px;
        line-height: 150%;
        color: $black-02;
        font-weight: 300;

        &:before {
          display: none;
        }
      }
    }

    @include media-breakpoint-up($breakpoint-xs) {
      margin-left: 0;
      margin-top: 15px;
    }
  }
}

</style>
