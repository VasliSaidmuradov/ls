<template>
  <div class="user-card">
    <div class="user-card__header">
      <q-btn v-if="isPopup" @click="popupClose" class="user-card-close" text-color="accent" color="light-white" unelevated>
        <icon name="close-icon"></icon>
      </q-btn>
      <div class="user-card__info">
        <div class="user-card__avatar">
          <q-btn class="user-card__edit">
            <icon name="edit-icon"></icon>
          </q-btn>
          <q-avatar square size="98px" rounded>
            <img src="https://www.vsekastingi.ru/storage/2018/10/29/casting_284261.jpg" alt="avatar">
          </q-avatar>
        </div>

        <div class="user-card__info-name">
          <h6>Роман Филь</h6>
          <p>24 года, 14.02.1996</p>
        </div>
      </div>

      <div class="user-card__header-controls">
        <q-btn unelevated padding="13px 20px" class="button1--accent">Настройки пользователя</q-btn>
        <q-btn unelevated padding="13px 20px" class="button1--accent">Мед.карта</q-btn>
      </div>
    </div>
    <div class="user-card__body">
      <ul class="user-card__body-list">
        <li v-for="index in 3" :key="index">
          <icon name="list-dots"></icon>
          <span>Patient ID: 145681</span>
        </li>
      </ul>

      <div class="user-card__body-chart">
        <vc-donut
            :sections="sections"
            :total="sectionsTotal"
            :size="76">
          {{sectionsTotal}}
        </vc-donut>

        <div class="chart-info">
          <ul class="chart-info__list">
            <li class="chart-info__item" v-for="(item, index) in sections" :key="index">
              <span class="chart-info__item-value" :style="{'color': item.color}">{{item.value}}</span>
              {{item.label}}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="user-card__footer">
      <q-btn unelevated class="button1--accent">
        Выйти из кабинета
      </q-btn>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({})
export default class UserCard extends Vue {
  @Prop() onCLose: Function | undefined;
  @Prop({default: false, type: Boolean}) isPopup: boolean | undefined;

  sections = [
    { label: 'В норме', value: 19, color: '#63C58A' },
    { label: 'Пограничные зоны', value: 5, color: '#FFDE79' },
    { label: 'Не в норме', value: 1, color: '#FF7C7C' }
  ]

  get sectionsTotal(): number {
    return this.sections.map(item => item.value).reduce((acc, val) => acc + val);
  }

  popupClose() {
    if(this.onCLose) this.onCLose();
  }
}
</script>


<style lang="scss">
@import "../styles/vars";

.user-card {
  padding: 18px;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 4px 15px $shadow-color;
  border-radius: 26px;
  background-color: $light-white;

  &__header {
    position: relative;

    .user-card-close {
      &.q-btn {
        position: absolute;
        right: -15px;
        top: -20px;
      }
    }
  }

  &__header-controls {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;

    .button1--accent {
      &.q-btn {
        color: $black-02;
      }
    }

    .q-btn {
      font-weight: 500;
      font-size: 12px;
      line-height: 130%;
      text-align: center;
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
    background: $light-background;
    border-radius: 26px;
  }

  &__info-name {
    margin-left: 24px;

    h6 {
      font-weight: 600;
      font-size: 14px;
      line-height: 130%;
      color: $black-01;
      margin-top: 0;
      margin-bottom: 6px;
    }

    p {
      font-size: 14px;
      line-height: 130%;
      color: $black-01;
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
      color: $light;

      span {
        margin-left: 12px;
        font-size: 14px;
        line-height: 130%;
        color: $black-03;
      }

      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  &__body-chart {
    display: flex;
    margin-top: 25px;
    margin-bottom: 45px;

    .chart-info {
      &__list {
        padding: 0;
        margin: 0 0 0 27px;
        list-style-type: none;
      }

      &__item {
        display: flex;
        align-items: center;
        font-size: 14px;
        line-height: 130%;
        color: $black-03;
      }

      &__item-value {
        font-weight: 600;
        width: 40px;
        display: flex;
      }
    }

    .cdc-text {
      font-size: 12px !important;
      line-height: 15px;
      color: $black-02;
    }
  }

  &__footer {
    padding: 0 18px;

    .q-btn {
      border-radius: 12px;
      width: 100%;
      text-transform: none;
    }
  }

  &__edit {
    &.q-btn {
      position: absolute;
      color: $accent-color;
      z-index: 99;
      background-color: $light-white;
      box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.05);
      border-radius: 10px;
      width: 34px;
      height: 34px;
      bottom: 5px;
      right: 5px;

      .q-btn__wrapper {
        padding: 0;

        &:before {
          display: none;
        }
      }
    }
  }

  &__avatar {
    position: relative;
  }
}
</style>
