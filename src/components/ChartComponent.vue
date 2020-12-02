<template>
  <div ref="wrapper" class="chart__wrapper"
       :style="{maxWidth: width + 'px', border: '1px solid black'}"
  >
    <!--    <div class="chart-tooltip"-->
    <!--         :style="{-->
    <!--            opacity: 1,-->
    <!--            left: +d3Select(this).attr('x') - 20 + 'px',-->
    <!--            top :+d3Select(this).attr('y') + 110 + 'px'-->
    <!--         }"-->
    <!--    >-->
    <!--      <span class="tooltip-text">{{d.value}} {{d.laboratory.units}}</span>-->
    <!--      <span class="tooltip-text">{{format(prettyDate(d.date), 'd MMMM yyyy', { locale: RU })}}</span>-->
    <!--    </div>-->

    <svg
        :viewBox="viewBox"
    >
      <g class="bars-chart" :transform="`translate(${margin.left}, ${margin.top})`">
        <!--HORIZONTAL-LINES-->
        <g class="y-horizontal"></g>

<!--        &lt;!&ndash;REF-ZONE-MAX&ndash;&gt;-->
<!--        <g class="ref-zone-max">-->
<!--          <line-->
<!--              v-for="(d, idx) in data.results"-->
<!--              :key="idx"-->
<!--              :x1="countRefX1(idx)"-->
<!--              :x2="x(prettyDate(d.date))"-->
<!--              :y1="y(d.analyzer.ranges.max)"-->
<!--              :y2="y(d.analyzer.ranges.max)"-->
<!--              stroke="#63C58A"-->
<!--              stroke-dasharray="2, 2"-->
<!--          >-->
<!--          </line>-->
<!--        </g>-->

<!--        &lt;!&ndash;REF-ZONE-MIN&ndash;&gt;-->
<!--        <g class="ref-zone-min">-->
<!--          <line-->
<!--              v-for="(d, idx) in data.results"-->
<!--              :key="idx"-->
<!--              :x1="countRefX1(idx)"-->
<!--              :x2="x(prettyDate(d.date))"-->
<!--              :y1="y(d.analyzer.ranges.min)"-->
<!--              :y2="y(d.analyzer.ranges.min)"-->
<!--              stroke="#63C58A"-->
<!--              stroke-dasharray="2, 2"-->
<!--          >-->
<!--          </line>-->
<!--        </g>-->

        <!--RECT-->
        <rect
            v-for="(d, idx) in data.results"
            :key="idx"
            :x="x(prettyDate(d.date))"
            :y="y(d.value)"
            :fill="countColor(d)"
            :width="5"
            :height="innerHeight - y(d.value) - 5"
            :rx="3"
        ></rect>

        <!--AXIS X-->
        <g class="x" :transform="`translate(0, ${innerHeight})`"></g>

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
  // import format from 'date-fns/format';
  // import RU from 'date-fns/locale/ru';

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
    data: Array<any> = [];

    @Prop() mainData: Array<any>;
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

    get maxValue() {
      return d3Max(this.valueArray);
    }

    get YMaxValue() {
      return this.maxValue + this.maxValue / 100 * 20;
    }

    get rangeX() {
      return [0, this.innerWidth];
    }

    get domainX() {
      return this.dateRange;
    }

    get x() {
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

    countRefX1(idx: number) {
      if (this.data.results[idx + 1]) {
        return this.x(this.prettyDate(this.data.results[idx + 1].date));
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

    @Watch('mainData', { deep: true })
    refreshChart(data: any) {
      this.setLocale();
      this.data = data;
      this.init();
    }

    mounted() {
      this.setLocale();
      this.data = this.mainData;
      this.init();
    }

    // RECT INTERACTIVE
    // rectEnter
    //   .on('mouseenter', function(e: any, d: any) {
    //     d3Select(this)
    //       .attr('opacity', 0.5)
    //       .attr('cursor', 'pointer');
    //
    //     tooltip.transition()
    //       .duration(200)
    //       .style('opacity', 0.9);
    //
    //     tooltip.html(`
    //                 <span class="tooltip-text">${d.value} ${d.laboratory.units}</span>
    //                 <span class="tooltip-text">${format(prettyDate(d.date), 'd MMMM yyyy', { locale: RU })}</span>
    //     `);
    //
    //     tooltip
    //       .style('left', +d3Select(this).attr('x') - 20 + 'px')
    //       .style('top', +d3Select(this).attr('y') + 110 + 'px');
    //   })
    //   .on('mouseleave', function() {
    //     d3Select(this)
    //       .attr('opacity', 1);
    //
    //     tooltip.transition()
    //       .duration(500)
    //       .style('opacity', 0);
    //   });
  }
</script>

<style lang="scss" scoped>
  ::v-deep text {
    font-weight: 500;
    font-size: 12px;
    line-height: 15px;
  }

  ::v-deep div.chart-tooltip {
    position: absolute;
    width: 116px;
    height: 44px;
    padding: 7px 8px;
    font-weight: 500;
    font-size: 12px;
    line-height: 15px;
    color: $light-white;
    background: $accent-color;
    border-radius: 8px;
    pointer-events: none;
  }

  ::v-deep span.tooltip-text {
    display: block;
  }
</style>
