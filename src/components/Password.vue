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
      <PasswordChange />
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import PasswordChange from '@/components/PasswordChange.vue';

@Component({
  components: {
    PasswordChange
  }
})
export default class Password extends Vue {

  isShowPasswordChange = false;

  showPasswordChangeBlock() {
    this.isShowPasswordChange = !this.isShowPasswordChange;
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
}
</style>
