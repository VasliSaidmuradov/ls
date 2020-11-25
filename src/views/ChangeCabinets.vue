<template>
  <div class="change-cabinets auth-layout ">
    <div class="change-cabinets__content">
      <h4 class="change-cabinets__title">Добро пожаловать</h4>
      <div class="change-cabinets__desk">
        <div class="change-cabinets__desk-text" :class="{'change-cabinets__desk-text--active': showAllText}">
          К вашему e-mail привязано несколько кабинетоа.
          Если вы хотите привязать mail@gmail.com только к одному из этих профилей, то авторизуйтесь в нужном кабинете через ID и привяжите к нему новый e-mail Это необязательно, но такая возможность есть :)
          Если вы хотите привязать mail@gmail.com только к одному из этих профилей, то авторизуйтесь в нужном кабинете через ID и привяжите к нему новый e-mail Это необязательно, но такая возможность есть :)
          Если вы хотите привязать mail@gmail.com только к одному из этих профилей, то авторизуйтесь в нужном кабинете через ID и привяжите к нему новый e-mail Это необязательно, но такая возможность есть :)
        </div>
        <button class="change-cabinets__desk-btn button1--simple-with-icon">
        <span class="change-cabinets__desk-btn-icon icon">
          <icon name="next-icon"></icon>
        </span>
          <span class="change-cabinets__desk-btn-text"
                @click="showAllText = !showAllText">
            Читать подробнее
          </span>
        </button>
      </div>

      <div class="change-cabinets__list">
        <CabinetsCard v-for="(cabinet, index) in cabinetsData" :cabinet="cabinet" :key="index"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CabinetsCard from '@/components/auth/CabinetsCard.vue';
import {IAuth} from '@/interfaces/auth.interface';

@Component({
  components: {
    CabinetsCard,
  }
})
export default class ChangeCabinets extends Vue {
  showAllText = false;

  get cabinetsData(): IAuth.IUserCabinet[] {
    return this.$store.state.auth.cabinets;
  }
}
</script>

<style lang="scss" scoped>
.change-cabinets {

  &__content {
    width: 600px;
  }

  &__title {
    font-weight: 500;
    font-size: 36px;
    line-height: 130%;
    color: $gray-01;
  }

  &__desk-text {
    height: 80px;
    font-size: 14px;
    line-height: 20px;
    color: $gray-01;
    overflow: hidden;

    &--active {
      height: 100%;
    }
  }

  &__desk-btn {
    margin-top: 20px;
  }

  &__list {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
    margin-top: 80px;
  }

  @include media-breakpoint-up($breakpoint-md) {
    &__list {
      grid-template-columns: 1fr;
    }

    &__content {
      width: 100%;
    }
  }
}

</style>
