<template>
  <div class="auth-page layout">
    <h2 class="auth-page__title">Добро пожаловать!</h2>

    <div class="auth-page__content">
      <div class="auth-page__content-toggles">
        <div class="form-toggle form-toggle--with-label">
          <q-toggle v-model="isLabstoryPatient" @input="onModeChange" label="Я пациент ЛабСтори или ПанорамаМед"/>
        </div>
        <p class="auth-page__content-toggles-desk">Вы уже проходили обследования в ЛабСтори или ПанорамаМед</p>
      </div>

      <div class="auth-page__content-page-mode" v-if="!isLabstoryPatient">
        <q-btn-toggle :value="pageMode"
                      rounded
                      class="auth-page__content-page-mode-btn"
                      :options="changeModeOptions"
                      @input="onModeChange"/>
      </div>

      <div class="auth-page__content-form">
        <AuthForm />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {IAuth, IAuthForOtherUser} from '@/interfaces/auth.interface';
import {IRouter} from '@/interfaces/router.interface';
import ROUTE_NAME = IRouter.ROUTE_NAME;
import AuthForm from '@/components/auth/AuthForm.vue';
import AuthMixin from '@/mixins/auth-mixin';
import IAppRoute = IRouter.IAppRoute;

@Component({
  components: {
    AuthForm
  }
})

export default class AuthPage extends AuthMixin {

  changeModeOptions = [
    {
      label: 'Регистрация',
      value: IAuth.AuthMode.REGISTRATION
    }, {
      label: 'Войти',
      value: IAuth.AuthMode.LOGIN
    }
  ]

  $route: IAppRoute<{pageMode: IAuth.AuthMode}>;

  mounted() {
    this.pageMode ? void 0 : this.$router.replace({name: ROUTE_NAME.AUTH_PAGE, query: {pageMode: IAuth.AuthMode.REGISTRATION}});
  }


  get isLabstoryPatient(): boolean {
    return this.$store.state.auth.isLabstoryPatient;
  }

  set isLabstoryPatient(value: boolean) {
    this.$store.commit('auth/setPropertyInStore', {name: 'isLabstoryPatient', value});
  }

  onModeChange(value: boolean | string) {
    this.setPageMode(value);
    this.clearStore();
  }

  clearStore() {
    this.$store.commit('auth/setPropertyInStore', {name: 'currentAuthStep', value: IAuthForOtherUser.RegistrationSteps.CHECK_USER});
    this.$store.commit('auth/setPropertyInStore', {name: 'userAccountInfo', value: null});
  }

  get pageMode(): IAuth.AuthMode {
    return this.$route.query.pageMode;
  }

  setPageMode(value: boolean | string) {
    if (typeof value === 'string') {
      this.$router.replace({name: ROUTE_NAME.AUTH_PAGE, query: {pageMode: value}});
      return;
    }

    if (this.pageMode === IAuth.AuthMode.REGISTRATION && value) {
      this.$router.replace({name: ROUTE_NAME.AUTH_PAGE, query: {pageMode: IAuth.AuthMode.LOGIN}})
    }
  }
}
</script>

<style lang="scss" scoped>

.auth-page {
  padding: 130px 300px;

  &__title {
    font-weight: 500;
    font-size: 36px;
    line-height: 130%;
    color: $gray-01;
    margin-top: 0;
    margin-bottom: 30px;

    @include media-breakpoint-up($breakpoint-xs) {
      font-size: 30px;
    }
  }

  &__content-toggles {
    margin-bottom: 30px;
  }

  &__content-toggles-desk {
    margin-top: 17px;
    margin-bottom: 0;
    font-size: 14px;
    line-height: 130%;
    color: $gray-01;
  }

  &__content-page-mode {
    margin-bottom: 35px;
    padding: 6px 8px;
    border: 1px solid #E9E8FF;
    border-radius: 22px;
    width: fit-content;
  }

  &__content-page-mode-btn {
    box-shadow: unset;

    ::v-deep .q-btn {
      text-transform: none !important;
      font-weight: 500;
      font-size: 14px;
      line-height: 140%;
      border-radius: 18px !important;

      .q-btn__wrapper {
        padding: 12px 24px;
        box-shadow: unset;

        &:before {
          display: none;
        }
      }

      &.bg-primary {
        background: $accent-color !important;
      }
    }
  }

  @include media-breakpoint-up($breakpoint-lg) {
    padding-left: 150px;
    padding-right: 150px;
  }

  @include media-breakpoint-up($breakpoint-md) {
    padding-left: 50px;
    padding-right: 50px;
  }

  @include media-breakpoint-up($breakpoint-xs) {
    padding-left: 20px;
    padding-right: 20px;
  }
}

</style>
