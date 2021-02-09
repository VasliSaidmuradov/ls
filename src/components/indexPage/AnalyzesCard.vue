<template>
  <div class="analyze-card">
    <div class="analyze-card__img">
      <div class="img-wrap">
        <img :src="require(`@/assets/indexPage/${recomendation[recomendationType].image}`)" />
      </div>
    </div>
    <div class="analyze-card__content">
      <h4 class="analyze-card__content-title">{{ recomendation[recomendationType].title }}</h4>
      <div class="analyze-card__content-desk">
        {{ recomendation[recomendationType].text }}
      </div>
      <div class="analyze-card__stat">
        <p v-if="analyzeQuantity" class="analyze-card__stat-score">Всего анализов: {{ analyzeQuantity }}</p>

        <div class="analyze-card__stat-content">
          <div
            class="analyze-card__stat-item"
            v-for="(item, index) in statItems"
            :key="index"
            :style="`color:${item.color}`"
          >
            <div class="analyze-card__stat-item-progress analyze-card__stat-item-progress--mobile">
              <q-linear-progress rounded size="4" :value="(item.value / 100) * 5" />
            </div>
            <div class="analyze-card__stat-item-wrap">
              <span class="analyze-card__stat-item-value">{{ item.value }}</span>
              <div class="analyze-card__stat-item-progress">
                <q-linear-progress rounded size="4" :value="(item.value / 100) * 5" />
              </div>
              <span class="analyze-card__stat-item-text">{{ item.text }}</span>
              <button class="analyze-card__stat-item-btn" v-if="item.status === 'danger'" @click="showFullStatistic">
                <span class="analyze-card__stat-item-btn-icon">
                  <icon name="next-icon"></icon>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <template v-if="fullStatistic">
        <div v-for="item in overview.out_of_norm_results" :key="item.id" class="analyze-card__full-stat">
          <span class="analyze-card__full-stat-icon">
            <icon name="next-icon"></icon>
          </span>
          <span class="analyze-card__full-stat-text">{{ item.biomarker }}</span>
          <span class="analyze-card__full-stat-rate">{{ item.value }} {{ item.unit }}</span>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { IDashBoard } from '@/interfaces/dashboard.interface';

interface IStatItem {
  value: number;
  text: string;
  color: string;
  status: string;
}
interface IrecomendationItem {
  title: string;
  text: string;
  image: string;
}
interface IRecomendation {
  good: IrecomendationItem;
  norm: IrecomendationItem;
  bad: IrecomendationItem;
}

@Component({})
export default class AnalyzesCard extends Vue {
  statItems: IStatItem[] = [];
  fullStatistic = false;
  recomendation: IRecomendation = {
    good: {
      title: 'Ваше здоровье в хорошем сотоянии',
      text: 'Ваши анализы находятся в референсной зоне!',
      image: 'analyz-card-man.svg',
    },
    norm: {
      title: 'Ваше здоровье немного под угрозой',
      text:
        'Стоит обратиться к специалистам, поскольку некоторые ваши анализы находится за пределами референсной зоны!',
      image: 'doctor-woman.svg',
    },
    bad: {
      title: 'Ваше здоровье под угрозой',
      text:
        'Сочно нужно обратиться к специалистам, поскольку ваши анализы находится за пределами референсной зоны!',
      image: 'doctor-man.svg',
    },
  };

  @Watch('overview')
  function(val: IDashBoard.IOverview) {
    this.statItems = [
      {
        value: val.in_norm,
        text: 'В норме',
        color: '#63C58A',
        status: 'ok',
      },
      {
        value: val.border_zone,
        text: 'Пограничные зоны',
        color: '#FFDE79',
        status: 'ok',
      },
      {
        value: val.out_of_norm,
        text: 'Не в норме',
        color: '#FF7C7C',
        status: 'danger',
      },
    ];
  }
  get recomendationType(): string {
    const { out_of_norm } = this.overview;
    const analyzeQuantity = this.analyzeQuantity;
    const result = (out_of_norm / analyzeQuantity) * 100;

    return result === 0 ? 'good' : result <= 20 ? 'norm' : 'bad';
  }
  get overview(): IDashBoard.IOverview {
    return this.$store.state.dashboard.overview;
  }

  get analyzeQuantity(): number {
    return this.overview.in_norm + this.overview.border_zone + this.overview.out_of_norm;
  }

  showFullStatistic() {
    this.fullStatistic = !this.fullStatistic;
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
  .img-wrap {
    width: 150px;
    height: 280px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

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
      width: 55%;
    }

    @include media-breakpoint-up($breakpoint-sm) {
      width: 65%;
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
