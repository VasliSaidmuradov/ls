<template>
  <div class="analyzes-page-info-header">
    <span class="title">Тиреотропный гормон</span>

    <div class="info">
      <div class="info-item">
        <span class="info-item-title">Текущее значение</span>
        <span class="info-item-value">
          {{results[results.length - 1].value}}
          <span class="info-item-value--units">{{results[results.length - 1].laboratory.units}}</span>
        </span>
        <span class="info-item-date">{{$date(new Date(results[results.length - 1].date), 'd MMMM yyyy')}}</span>
      </div>

      <div class="info-item">
        <span class="info-item-title">Предыдущее значение</span>
        <div class="info-item-value-wrapper">
          <span class="info-item-value">
            {{results[results.length - 2].value}}
            <span class="info-item-value--units">{{results[results.length - 2].laboratory.units}}</span>
          </span>
          <div
              class="info-item-icon-value-wrapper"
              v-if="results[results.length - 1].value !== results[results.length - 2].value"
          >
            <icon
                class="info-item-arrow-icon"
                :class="{
                  'info-item-arrow-icon--top': results[results.length - 1].value > results[results.length - 2].value,
                  'info-item-arrow-icon--bottom': results[results.length - 1].value < results[results.length - 2].value
                }"
                name="next-icon"
            />
            <span class="info-item-value-change">{{countChangeValue}}</span>
          </div>
        </div>
        <span class="info-item-date">{{$date(new Date(results[results.length - 2].date), 'd MMMM yyyy')}}</span>
      </div>

      <div class="info-item">
        <span class="info-item-title">Референсные значения</span>
        <span class="info-item-value info-item-value--black">
          {{countRanges}}
        </span>
        <div class="info-item-laboratory-wrapper">
          <span class="info-item-laboratory">ЛабСтори</span>
          <div>
            <icon class="info-item-laboratory-icon" name="doc-question-icon"/>
            <q-tooltip
                content-class="analyzes-tooltip"
                anchor="top right"
                self="top left"
                :max-width="'256px'"
            >
              <span>
                Везде указаны референсные зоны, используемые в ЛабСтори. При добавлении анализа вы можете указывать
              лабораторию и соответствующие референсные зоны, которые мы будем учитывать, чтобы обозначить (цветом),
              в норме показатель или нет.
              </span>
            </q-tooltip>
          </div>
        </div>

        <q-expansion-item
            class="info-item__exp"
            :value="isCommentsShow"
            @input="isCommentsShow = !isCommentsShow"
        >
          <template v-slot:header>
            <div class="info-item__exp-header">
              Комментарий
            </div>
          </template>

          <div class="info-item__exp-body">
            Беременность (30 недель): 15.00-25.00 <br>
            Беременность (31 неделя): 18.00-32.00 <br>
            Курящие: 11.00-18.00
          </div>
        </q-expansion-item>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import { IChart } from '@/interfaces/chart.interface';


  @Component({
    components: {},
  })
  export default class InfoHeader extends Vue {
    @Prop() results: IChart.IChartItem[];

    isCommentsShow = true;

    get countChangeValue(): string {
      const value = this.results[this.results.length - 1].value;
      const prevValue = this.results[this.results.length - 2].value;

      return Math.abs(value - prevValue).toFixed(2);
    }

    get countRanges(): string {
      const labstoryResults = this.results.filter(result => result.laboratory.name === 'ЛабСтори');
      const { ranges } = labstoryResults[0].analyzer;

      return ranges.min !== null && ranges.max !== null
        ? `${ranges.min} - ${ranges.max}`
        : ranges.min !== null
          ? `${ranges.min} >`
          : `< ${ranges.max}`;
    }
  }
</script>

<style lang="scss" scoped>
  .analyzes-page-info-header {
    .title {
      font-weight: 500;
      font-size: 36px;
      line-height: 130%;
      color: $black-01;
      @include media-breakpoint-up($breakpoint-md) {
        font-size: 26px;
        line-height: 124%;
      }
    }

    .info {
      margin-top: 22px;
      display: flex;
      align-items: flex-start;
      flex-wrap: wrap;
      @include media-breakpoint-up($breakpoint-md) {
        margin-top: 80px;
      }

      &-item {
        min-width: 256px;
        margin-right: 20px;
        margin-top: 8px;
        padding: 18px;
        background-color: $light-white;
        border-radius: 15px;
      }

      &-item-title {
        display: block;
        font-weight: normal;
        font-size: 14px;
        line-height: 130%;
        color: $black-04;
      }

      &-item-value-wrapper {
        display: flex;
        align-items: center;
      }

      &-item-value {
        margin-top: 24px;
        display: block;
        font-weight: 500;
        font-size: 36px;
        line-height: 130%;
        color: $status-green;

        &--black {
          color: $black-01;
        }

        &--units {
          font-size: 14px;
        }
      }

      &-item-icon-value-wrapper {
        margin-top: 20px;
        margin-left: 48px;
        display: flex;
        align-items: center;
      }

      &-item-arrow-icon {
        width: 4px;
        height: 8px;
        color: $black-04;

        &--top {
          transform: rotate(90deg);
        }

        &--bottom {
          transform: rotate(-90deg);
        }
      }

      &-item-value-change {
        margin-left: 12px;
        font-weight: normal;
        font-size: 14px;
        line-height: 130%;
        color: $black-04;
      }

      &-item-date {
        margin-top: 7px;
        font-weight: normal;
        font-size: 14px;
        line-height: 130%;
      }

      &-item-laboratory-wrapper {
        margin-top: 7px;
        display: flex;
        align-items: center;
      }

      &-item-laboratory {
        font-weight: normal;
        font-size: 14px;
        line-height: 130%;
        color: $black-02;
      }

      &-item-laboratory-icon {
        margin-left: 11px;
        cursor: pointer;

        ::v-deep circle {
          fill: $accent-color !important;
        }
      }

      &-item__exp {
        margin-top: 30px;

        &-header {
          font-weight: 600;
          font-size: 14px;
          line-height: 130%;
          color: $black-01;
        }

        &-body {
          margin-top: 15px;
          font-weight: normal;
          font-size: 14px;
          line-height: 20px;
          color: $black-03;
        }

        ::v-deep.q-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          min-height: initial;
          padding: 0;
        }

        ::v-deep.q-item__section {
          padding: 0;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid $light-stroke;
          border-radius: 10px;
        }

        ::v-deep i {
          font-size: 12px;
          color: $accent-color;
        }
      }
    }
  }
</style>
