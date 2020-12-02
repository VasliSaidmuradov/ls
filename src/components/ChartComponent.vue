<template>
  <div ref="wrapper" class="chart__wrapper"
       :style="{maxWidth: width + 'px', border: '1px solid black'}"
  >
    <svg :viewBox="viewBox">
      <g class="bars-chart" :transform="`translate(${margin.left}, ${margin.top})`">
        <!--HORIZONTAL-LINES-->
        <g class="y-horizontal"></g>

        <!--REF-ZONE-MAX-->
        <g class="ref-zone-max">
          <line
              v-for="(d, idx) in data.results"
              :key="idx"
              :x1="countRefX1(idx)"
              :x2="x(prettyDate(d.date))"
              :y1="y(d.analyzer.ranges.max)"
              :y2="y(d.analyzer.ranges.max)"
              stroke="#63C58A"
              stroke-dasharray="2, 2"
          >
          </line>
        </g>

        <!--REF-ZONE-MIN-->
        <g class="ref-zone-min">
          <line
              v-for="(d, idx) in data.results"
              :key="idx"
              :x1="countRefX1(idx)"
              :x2="x(prettyDate(d.date))"
              :y1="y(d.analyzer.ranges.min)"
              :y2="y(d.analyzer.ranges.min)"
              stroke="#63C58A"
              stroke-dasharray="2, 2"
          >
          </line>
        </g>

        <!--AXIS X-->
        <g class="x" :transform="`translate(0, ${innerHeight})`"></g>

        <!--FILTER(:HOVER EFFECT)-->
        <filter id="dropshadow" height="120%" width="200%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="1"/> <!-- stdDeviation is how much to blur -->
          <feOffset dx="0" dy="-1" result="offsetblur"/> <!-- how much to offset -->
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.5"/> <!-- slope is the opacity of the shadow -->
          </feComponentTransfer>
          <feMerge>
            <feMergeNode/> <!-- this contains the offset blurred image -->
            <feMergeNode in="SourceGraphic"/> <!-- this contains the element that the filter is applied to -->
          </feMerge>
        </filter>

        <!--RECT-->
        <rect
            class="rect"
            v-for="(d, idx) in data.results"
            :key="idx"
            :x="x(prettyDate(d.date))"
            :y="y(d.value)"
            :fill="countColor(d)"
            :width="5"
            :height="innerHeight - y(d.value) - 5"
            :rx="3"
        >
          <q-tooltip
              content-class="rect-tooltip"
              anchor="center right"
              self="center left"
              :max-width="'116px'"
          >
            <span class="tooltip-text">{{d.value}} {{d.laboratory.units}}</span>
            <span class="tooltip-text">{{countTooltipDate(d)}}</span>
          </q-tooltip>
        </rect>

        <!--CIRCLE ON RECT-->
        <g class="g-circle">
          <circle
              v-for="(d, idx) in data.results"
              :key="idx"
              :cx="x(prettyDate(d.date)) + 2.5"
              :cy="y(d.value) - 7"
              :fill="countColor(d)"
              :opacity="d.laboratory.name === 'ЛабСтори' ? '1' : '0'"
              :r="3"
          ></circle>
        </g>

        <!--STAR ON RECT-->
        <g class="g-star">
          <path
              v-for="(d, idx) in data.results"
              :key="idx"
              :d="countDStar"
              :transform="`translate(${x(prettyDate(d.date)) + 2.5}, ${y(d.value) - 7})`"
              :fill="countColor(d)"
              :opacity="d.laboratory.name === 'ЛабСтори' ? '0' : '1'"
          >
          </path>
        </g>

        <!--TEXT ON RECT-->
        <g class="g-text">
          <text
              v-for="(d, idx) in data.results"
              :key="idx"
              :x="x(prettyDate(d.date)) + 2"
              :y="y(d.value) - 20"
              :fill="countColor(d)"
              text-anchor="middle"
          >
            {{d.value}}
          </text>
        </g>
      </g>
    </svg>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
  import {
    axisBottom as d3AxisBottom,
    axisRight as d3AxisRight,
    max as d3Max,
    scaleLinear as d3ScaleLinear,
    scaleTime as d3ScaleTime,
    select as d3Select,
    symbol as d3Symbol,
    symbolStar as d3SymbolStar,
    timeFormatDefaultLocale as d3TimeFormatDefaultLocale,
  } from 'd3';
  import parse from 'date-fns/parse';
  import format from 'date-fns/format';
  import RU from 'date-fns/locale/ru';

  interface IRefs {
    wrapper: HTMLElement;
  }

  @Component({})
  export default class ChartComponent extends Vue {
    $refs: IRefs & Vue['$refs'];

    margin = {
      left: 30,
      right: 30,
      bottom: 40,
      top: 0,
    };

    @Prop() data: Array<any>;
    @Prop() dateRange: Array<any>;
    @Prop({ default: 722 }) width: number;
    @Prop({ default: 350 }) height: number;

    get viewBox() {
      return `0 0 ${this.width} ${this.height}`;
    }

    get innerWidth() {
      return this.width - this.margin.left - this.margin.right;
    }

    get innerHeight() {
      return this.height - this.margin.top - this.margin.bottom;
    }

    get valueArray() {
      const valueArray: number[] = [];

      this.data.results.forEach((item: any) => {
        valueArray.push(item.value);
        valueArray.push(item.analyzer.ranges.max);
      });

      return valueArray;
    }

    get maxValue(): number {
      return d3Max(this.valueArray) || 0;
    }

    get YMaxValue(): number {
      return this.maxValue + this.maxValue / 100 * 20;
    }

    get rangeX() {
      return [0, this.innerWidth];
    }

    get domainX() {
      return this.dateRange;
    }

    get x() {
      this.setLocale();

      return d3ScaleTime()
        .rangeRound(this.rangeX)
        .domain(this.domainX);
    }

    get rangeY() {
      return [this.innerHeight, 0];
    }

    get domainY() {
      return [0, this.YMaxValue];
    }

    get y() {
      return d3ScaleLinear()
        .range(this.rangeY)
        .domain(this.domainY);
    }

    get countDStar() {
      return d3Symbol().type(d3SymbolStar).size(40)();
    }

    countTooltipDate(d: any): string {
      return format(this.prettyDate(d.date), 'd MMMM yyyy', { locale: RU });
    }

    countRefX1(idx: number) {
      if (this.data.results[idx + 1]) {
        return this.x(this.prettyDate(this.data.results[idx + 1].date));
      } else {
        return this.x(this.prettyDate(this.data.results[idx].date));
      }
    }

    initAxisX() {
      const gX = d3Select('.x')
        .call(d3AxisBottom(this.x));

      gX.selectAll('line').remove();
      gX.select('.domain').remove();
    }

    initHorizontalLines() {
      const gYHorizontal = d3Select('.y-horizontal')
        .call(d3AxisRight(this.y).ticks(3).tickSizeOuter(0).tickSizeInner(this.innerWidth));

      gYHorizontal.selectAll('line')
        .attr('stroke', '#E9E8FF');
      gYHorizontal.selectAll('text').remove();
      gYHorizontal.select('.domain').remove();
    }

    countColor(d: any): string {
      const green = '#63C58A';
      const red = '#FF7C7C';
      const yellow = '#FFDE79';
      const value = d.value;
      const min = d.analyzer.ranges.min;
      const max = d.analyzer.ranges.max;
      let returnColor = '';

      if (value < min || value > max) {
        returnColor = red;
      } else if (value < (min + (min / 100 * 10)) || value > (max - (max / 100 * 10))) {
        returnColor = yellow;
      } else {
        returnColor = green;
      }

      return returnColor;
    }

    prettyDate(date: string): Date {
      return parse(date, 'yyyy-MM-dd', new Date());
    };

    setLocale() {
      d3TimeFormatDefaultLocale({
        'decimal': ',',
        'thousands': '\xa0',
        'grouping': [3],
        'currency': ['', ' руб.'],
        'dateTime': '%A, %e %B %Y г. %X',
        'date': '%d.%m.%Y',
        'time': '%H:%M:%S',
        'periods': ['AM', 'PM'],
        'days': ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
        'shortDays': ['Вс.', 'Пн.', 'Вт.', 'Ср.', 'Чт.', 'Пт.', 'Сб.'],
        'months': ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
        'shortMonths': ['Янв.', 'Фев.', 'Мар.', 'Апр.', 'Май.', 'Июн.', 'Июл.', 'Авг.', 'Сен.', 'Окт.', 'Ноя.', 'Дек.'],
      });
    }

    init() {
      this.initAxisX();
      this.initHorizontalLines();
    }

    @Watch('data', { deep: true })
    refreshChart() {
      this.init();
    }

    @Watch('dateRange', { deep: true })
    updateChart() {
      this.init();
    }

    mounted() {
      this.init();
    }
  }
</script>

<style lang="scss" scoped>
  ::v-deep text {
    font-weight: 500;
    font-size: 12px;
    line-height: 15px;
  }

  .tooltip-text {
    display: block;
    font-weight: 500;
    font-size: 12px;
    line-height: 15px;
    color: $light-white;
  }

  ::v-deep.rect {
    cursor: pointer;

    &:hover {
      transition: all 0.2s ease;
      filter: url(#dropshadow)
    }
  }
</style>
