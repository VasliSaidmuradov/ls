<template>
  <div class="analyzes-by-category">
    <div class="analyzes-by-category__header">
      <AnalyzesByCategoryActions />
    </div>

    <div class="analyzes-by-category__content">
      <div class="analyzes-by-category__content-header"
           v-if="!isCategory"
           :class="{'analyzes-by-category__content-header--compare': compareMode}">
        <span class="analyzes-by-category__content-header-item
              analyzes-by-category__content-header-item--value">
          Биомаркер
        </span>
        <span class="analyzes-by-category__content-header-item
               analyzes-by-category__content-header-item--results">
          Значение, ед.и.
        </span>
        <span class="analyzes-by-category__content-header-item
              analyzes-by-category__content-header-item--ranges">
          Реф. значения
        </span>
        <span class="analyzes-by-category__content-header-item
              analyzes-by-category__content-header-item-lab">
          Лаборатория
        </span>
        <span class="analyzes-by-category__content-header-item
              analyzes-by-category__content-header-item--date">
          Дата сдачи
        </span>
      </div>
      <div class="analyzes-by-category__content-value">
        <div class="" v-for="(item, index) in printableData" :key="index">
          <template v-if="isCategory">
            <h4 class="analyzes-by-category__content-value-category">{{item.category}}</h4>
            <div class="analyzes-by-category__content-value-content">
              <AnalyzesBaCategoryCard v-for="(dataItem, index) in item.data" :key="index" :data="dataItem"/>
            </div>
          </template>
          <template v-else>
            <AnalyzesBaCategoryCard :data="item"/>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Tabs from '@/components/Tabs.vue';
import AnalyzesByCategoryActions from '@/components/analyzes/AnalyzesByCategoryActions.vue';
import AnalyzesBaCategoryCard from '@/components/analyzes/AnalyzesBaCategoryCard.vue';
import {bus} from '@/plugins/bus';
import {IAnalyzes} from '@/interfaces/analyzes.interface';

@Component({
  components: {
    AnalyzesByCategoryActions,
    AnalyzesBaCategoryCard
  }
})
export default class AnalyzesByCategory extends Vue {
  data = {
    categoryOne: {
      category: 'Лабораторная диагностика функций репродуктивной системы',
      data: [{
        id: 7,
        name: 'Витамин D',
        unit: 'нмоль/л',
        value: 210.01,
        lab: 'ЛабСтори',
        ranges: {
          min: 73,
          max: null,
        },
        date: new Date(),
        prevCard: {
          value: 210.01,
          unit: 'нмоль/л',
        }
      }, {
        id: 7,
        name: 'Витамин D',
        unit: 'нмоль/л',
        value: 210.01,
        lab: 'ЛабСтори',
        ranges: {
          min: 73,
          max: null,
        },
        date: new Date(),
        prevCard: {
          value: 210.01,
          unit: 'нмоль/л',
        }
      }]
    },
    categoryTwo: {
      category: 'Лабораторная диагностика функций репродуктивной системы',
      data: [{
        id: 7,
        name: 'Витамин D',
        unit: 'нмоль/л',
        value: 210.01,
        lab: 'ЛабСтори',
        ranges: {
          min: 73,
          max: null,
        },
        date: new Date(),
        prevCard: {
          value: 210.01,
          unit: 'нмоль/л',
        }
      }, {
        id: 7,
        name: 'Витамин D',
        unit: 'нмоль/л',
        value: 210.01,
        lab: 'ЛабСтори',
        ranges: {
          min: 73,
          max: null,
        },
        date: new Date(),
        prevCard: {
          value: 210.01,
          unit: 'нмоль/л',
        }
      }]
    }};

  printableData: any = [];
  isCategory: boolean = false;


  mounted() {
    this.setDataWithoutCategory();

    bus.$on(IAnalyzes.BusEvents.SET_CATEGORY, (status: boolean) => status ? this.setDataWithCategory() : this.setDataWithoutCategory())
  }

  setDataWithoutCategory() {
    this.isCategory = false;
    this.printableData = Object.values(this.data).map(item => item.data).flat();
  }

  setDataWithCategory() {
    this.isCategory = true;
    this.printableData = this.data;
  }

  get compareMode(): boolean {
    return this.$store.state.analyzes.compareMode;
  }

  destroyed() {
    bus.$off(IAnalyzes.BusEvents.SET_CATEGORY);
  }
}
</script>

<style lang="scss" scoped>
.analyzes-by-category {

  &__content {
    margin-top: 45px;
  }

  &__content-header {
    margin-bottom: 20px;
    display: flex;
    align-items: center;

    &--compare {
      margin-left: 40px;
    }

    @include media-breakpoint-up($breakpoint-md) {
      display: none;
    }
  }

  &__content-header-item {
    font-size: 14px;
    line-height: 130%;
    color: $black-02;
    display: block;
    opacity: .7;

    &--value {
      min-width: 280px;
      max-width: 280px;
      padding-left: 20px;
      margin-right: 40px;

      @include media-breakpoint-up($breakpoint-lg) {
        min-width: 160px;
        max-width: 160px;
        margin-right: 20px;
      }
    }

    &--results {
      min-width: 170px;
      max-width: 170px;
      margin-right: 65px;

      @include media-breakpoint-up($breakpoint-lg) {
        margin-right: 20px;
        min-width: 120px;
        max-width: 120px;
      }
    }

    &--ranges {
      min-width: 120px;
      max-width: 120px;
      margin-right: 40px;

      @include media-breakpoint-up($breakpoint-lg) {
        margin-right: 20px;
        min-width: 100px;
        max-width: 100px;
      }
    }

    &--date {
      margin-left: auto;
      margin-right: 165px;
    }
  }

  &__content-value-category {
    font-weight: 600;
    font-size: 14px;
    line-height: 130%;
    color: $black-01;
    margin-bottom: 20px;
    margin-top: 0;

    @include media-breakpoint-up($breakpoint-sm) {
      font-weight: 400;
    }
  }

  &__content-value-content {
    margin-bottom: 40px;
  }
}

</style>
