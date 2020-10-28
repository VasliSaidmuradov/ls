<template>
  <div class="user-card">
    <div class="user-card__header">
      <div class="user-card__info">
        <q-avatar square size="98px" rounded>
          <img src="https://www.vsekastingi.ru/storage/2018/10/29/casting_284261.jpg" alt="avatar">
        </q-avatar>

        <div class="user-card__info-name">
          <h6>Роман Филь</h6>
          <p>24 года, 14.02.1996</p>
        </div>
      </div>

      <div class="user-card__header-controls">
        <q-btn unelevated padding="13px 20px">Настройки пользователя</q-btn>
        <q-btn unelevated padding="13px 20px">Мед.карта</q-btn>
      </div>
    </div>
    <div class="user-card__body">
      <ul class="user-card__body-list">
        <li v-for="index in 3" :key="index">
          <icon name="list-dots"></icon>
          <span>Patient ID: 145681</span>
        </li>
      </ul>

      <vc-donut
          :sections="sections"
          :total="sectionsTotal"
          :size="76">
        {{sectionsTotal}}
      </vc-donut>
    </div>
    <div class="user-card__footer"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';

@Component({})
export default class UserCard extends Vue {
  sections = [
    { label: 'В норме', value: 19, color: '#63C58A' },
    { label: 'Пограничные зоны', value: 5, color: '#FFDE79' },
    { label: 'Не в норме', value: 1, color: '#FF7C7C' }
  ]

  get sectionsTotal(): number {
    return this.sections.map(item => item.value).reduce((acc, val) => acc + val);
  }
}
</script>


<style lang="scss">
.user-card {
  padding: 18px;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 4px 15px rgba(22, 20, 44, 0.06);
  border-radius: 26px;
  background-color: #fff;

  &__header-controls {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;

    .q-btn {
      font-weight: 500;
      font-size: 12px;
      line-height: 130%;
      text-align: center;
      color: #424056;
      background: #F9F9FC;
      border-radius: 12px;
      text-transform: none;
      min-width: 191px;
      margin-left: 5px;
      margin-right: 5px;
    }
  }

  &__info {
    display: flex;
    align-items: center;
    padding: 14px 18px;
    background: #F9F9FC;
    border-radius: 26px;
  }

  &__info-name {
    margin-left: 24px;

    h6 {
      font-weight: 600;
      font-size: 14px;
      line-height: 130%;
      color: #16142C;
      margin-top: 0;
      margin-bottom: 6px;
    }

    p {
      font-size: 14px;
      line-height: 130%;
      color: #16142C;
      margin-bottom: 0;
      margin-top: 0;
    }
  }

  &__body {
    padding: 0 18px;
    margin-top: 27px;
  }

  &__body-list {
    padding: 0;
    margin: 0;
    list-style-type: none;

    li {
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      color: #D4D1FD;

      span {
        margin-left: 12px;
        font-size: 14px;
        line-height: 130%;
        color: #626272;
      }

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}
</style>
