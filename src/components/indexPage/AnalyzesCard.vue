<template>
  <div class="analyze-card">
    <div class="analyze-card__img">
      <div class="img-wrap">
        <img src="../../assets/indexPage/analyz-card-man.svg">
      </div>
    </div>
    <div class="analyze-card__content">
      <h4 class="analyze-card__content-title">Ваше здоровье немного под угрозой</h4>
      <div class="analyze-card__content-desk">
        Стоит обратиться к специалистам, поскольку некоторые ваши анализы находится за пределами референсной зоны!
      </div>
      <div class="analyze-card__stat">
        <p class="analyze-card__stat-score">Всего анализов: 25</p>

        <div class="analyze-card__stat-content">
          <div class="analyze-card__stat-item" v-for="(item, index) in statItems" :key="index" :style="`color:${item.color}`">
            <div class="analyze-card__stat-item-progress analyze-card__stat-item-progress--mobile">
              <q-linear-progress rounded size="4" :value="(item.value / 100) * 5"/>
            </div>
            <div class="analyze-card__stat-item-wrap">
              <span class="analyze-card__stat-item-value">{{item.value}}</span>
              <div class="analyze-card__stat-item-progress">
                <q-linear-progress rounded size="4" :value="(item.value / 100) * 5"/>
              </div>
              <span class="analyze-card__stat-item-text">{{item.text}}</span>
              <button class="analyze-card__stat-item-btn" v-if="item.status === 'danger'" @click="showFullStatistic">
              <span class="analyze-card__stat-item-btn-icon">
                <icon name="next-icon"></icon>
              </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div v-if="fullStatistic" class="analyze-card__full-stat">
        <span class="analyze-card__full-stat-icon">
          <icon name="next-icon"></icon>
        </span>
        <span class="analyze-card__full-stat-text">Соотношение своб. ПСА к общему</span>
        <span class="analyze-card__full-stat-rate">21,42, %</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class AnalyzesCard extends Vue {

  statItems = [
    {
      value: 19,
      text: 'В норме',
      color: '#63C58A',
      status: 'ok'
    }, {
      value: 5,
      text: 'Пограничные зоны',
      color: '#FFDE79',
      status: 'ok'
    }, {
      value: 1,
      text: 'Не в норме',
      color: '#FF7C7C',
      status: 'danger'
    },
  ]

  fullStatistic = false;

  showFullStatistic() {
    this.fullStatistic = !this.fullStatistic
  }

}
</script>

<style lang="scss" scoped>
.analyze-card {
  display: flex;
  padding: 30px 22px 40px 22px;
  background: $light-white;
  box-shadow: 0px 4px 15px $shadow-color;
  border-radius: 25px;

  &__img {
    margin-right: 45px;

    @include media-breakpoint-up($breakpoint-lg) {
      display: none;
    }

    @include media-breakpoint-up($breakpoint-pre-md) {
      display: flex;
    }

    @include media-breakpoint-up($breakpoint-sm) {
      margin-right: 0;
      position: relative;

      &:before {
        content: '';
        display: block;
        width: 170px;
        height: 250px;
        background-image: url('../../assets/indexPage/analyz-card-man.svg');
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        position: absolute;
        top: -130px;
      }

      .img-wrap {
        display: none;
      }
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    margin-top: 10px;

    @include media-breakpoint-up($breakpoint-sm) {
      padding: 30px 22px 40px 22px;
      background-color: $light-white;
      border-radius: 25px;
      margin-top: 0;
      position: relative;
    }
  }

  &__content-title {
    font-weight: 500;
    font-size: 16px;
    line-height: 130%;
    color: $black-06;
    margin-right: 0;
    margin-bottom: 10px;
  }

  &__content-desk {
    font-size: 14px;
    line-height: 17px;
    color: $black-03;
  }

  &__stat {
    display: flex;
    flex-direction: column;
  }

  &__stat-score {
    margin-top: 25px;
    margin-bottom: 10px;
    font-size: 14px;
    line-height: 130%;
    color: $black-06;
  }

  &__stat-content {
    display: flex;
    flex-direction: column;
  }

  &__stat-item {
    width: 100%;
  }

  &__stat-item-wrap {
    display: flex;
    align-items: center;
    margin-top: 12px;

    &:last-child {
      margin-top: 35px;
    }

    &:first-child {
      margin-top: 0;
    }

    @include media-breakpoint-up($breakpoint-xs) {
      align-items: center;
      margin-bottom: 12px;
      margin-top: 8px;

      &:last-child {
        margin-top: 8px;
      }
    }
  }

  &__stat-item-value {
    color: currentColor;
    font-size: 12px;
    line-height: 15px;
    font-weight: 700;
    margin-right: 5px;
    width: 20px;
  }

  &__stat-item-progress {
    width: 60%;
    margin-right: 27px;

    ::v-deep .q-linear-progress {
      color: currentColor;
    }

    &--mobile {
      display: none;
    }

    @include media-breakpoint-up($breakpoint-pre-md) {
      width: 55%
    }

    @include media-breakpoint-up($breakpoint-sm) {
      width: 65%
    }

    @include media-breakpoint-up($breakpoint-xs) {
      display: none;

      &--mobile {
        display: block;
        width: 100%;
      }
    }
  }

  &__stat-item-text {
    display: block;
    font-size: 14px;
    line-height: 130%;
    color: $black-04;

    @include media-breakpoint-up($breakpoint-xs) {
      margin-left: auto;
    }
  }

  &__stat-item-btn {
    width: 24px;
    height: 24px;
    background-color: $status-red;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    border-radius: 8px;
    outline: none;
    padding: 0;
    cursor: pointer;
    margin-left: 20px;

    @include media-breakpoint-up($breakpoint-xs) {
      display: flex;
      width: auto;
      height: auto;
      background-color: transparent;
      margin-left: 18px;

      .analyze-card__stat-item-btn-icon {
        color: $status-red;
        transform: rotate(-90deg);
      }
    }
  }

  &__stat-item-btn-icon {
    color: $light-white;
    transform: rotate(180deg);
    display: flex;
    align-items: center;

    svg {
      width: 4px;
      height: 8px;
    }
  }

  &__full-stat {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 40px;
  }

  &__full-stat-icon {
    transform: rotate(180deg);
    color: $accent-color;
    margin-right: 9px;
    display: flex;
    align-items: center;

    svg {
      width: 4px;
      height: 8px;
    }
  }

  &__full-stat-text {
    font-weight: 500;
    font-size: 14px;
    line-height: 140%;
    color: $black;

    @include media-breakpoint-up($breakpoint-xs) {
      font-size: 13px;
    }
  }

  &__full-stat-rate {
    color: $status-red;
    margin-left: 35px;
    font-weight: 600;
    font-size: 14px;
    line-height: 17px;
    display: block;

    @include media-breakpoint-up($breakpoint-xs) {
      font-size: 10px;
      margin-left: 15px;
    }
  }

  @include media-breakpoint-up($breakpoint-sm) {
    margin-top: 140px;
    padding: 0;
  }
}

</style>
