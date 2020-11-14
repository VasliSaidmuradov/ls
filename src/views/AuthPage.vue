<template>
  <div class="auth-page layout">
    <h2 class="auth-page__title">Добро пожаловать!</h2>

    <div class="auth-page__content">
      <div class="auth-page__content-toggles">
        <div class="form-toggle form-toggle--with-label">
          <q-toggle v-model="isLabstoryPatient" label="Я пациент ЛабСтори или ПанорамаМед"/>
        </div>
        <p class="auth-page__content-desk">Вы уже проходили обследования в ЛабСтори или ПанорамаМед</p>
      </div>
      <div class="auth-page__content-form">
        <AuthPageForOtherUser v-if="!isLabstoryPatient"/>
        <AuthForLabstoryPatient v-if="isLabstoryPatient"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AuthPageForOtherUser from '@/components/auth/AuthPageForOtherUser.vue';
import AuthForLabstoryPatient from '@/components/auth/AuthForLabstoryPatient.vue';

@Component({
  components: {
    AuthForLabstoryPatient,
    AuthPageForOtherUser
  }
})

export default class AuthPage extends Vue {


  get isLabstoryPatient(): boolean {
    return this.$store.state.auth.isLabstoryPatient;
  }

  set isLabstoryPatient(value: boolean) {
    this.$store.commit('auth/setPropertyInStore', {name: 'isLabstoryPatient', value});
  }
}
</script>

<style lang="scss" scoped>

.auth-page {

}

</style>
