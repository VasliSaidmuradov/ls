<template>
  <div class="cabinets-card">
    <h6 class="cabinets-card__title">{{cabinet.fio}}</h6>
    <span class="cabinets-card__date">
      {{cabinet.birth_date}}
    </span>

    <q-btn class="cabinets-card__btn button1--bordered-with-icon">
      <span class="cabinets-card__btn-icon icon">
        <icon name="exit-icon"></icon>
      </span>
      <span class="cabinets-card__btn-text" @click="checkCabinet(cabinet.patient_id)">Войти</span>
    </q-btn>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import {IAuth} from '@/interfaces/auth.interface';

@Component({})
export default class CabinetsCard extends Vue {

  @Prop() cabinet: IAuth.IUserCabinet;

  get currentUserId(): string {
    return this.$store.state.userCard.patient.id;
  }

  checkCabinet(id: string) {
    if (id !== this.currentUserId) {
      this.$store.dispatch('auth/changeCabinet', id);
    }
  }
}
</script>

<style lang="scss" scoped>

.cabinets-card {
  padding: 22px 30px;
  background: $light-white;
  border-radius: 20px;
  height: max-content;

  &__title {
    font-weight: 600;
    font-size: 14px;
    line-height: 130%;
    color: $black-01;
    margin-top: 0;
    margin-bottom: 10px;
  }

  &__date {
    margin-bottom: 25px;
    font-size: 14px;
    line-height: 20px;
    color: $black-03;
    display: flex;
  }
}

</style>
