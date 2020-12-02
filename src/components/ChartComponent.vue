<template>
  <div ref="wrapper" class="chart__wrapper">
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
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

    @Prop() mainData: Array<any>;
    @Prop() dateRange: Array<any>;

    mounted() {
      this.updateChart(this.$refs.wrapper, this.mainData.results);
    }

    updateChart(wrapper: HTMLElement, currentData: any) {
      if (!wrapper) {
        return;
      }

      this.setLocale();

      // CONSTANTS
      const valueArray: number[] = [];
      currentData.forEach((item: any) => {
        valueArray.push(item.value);
        valueArray.push(item.analyzer.ranges.max);
      });
      const maxValue = d3Max(valueArray);
      const YMaxValue = maxValue + maxValue / 100 * 20;
      const width = 500;
      const height = 500;
      const DURATION = 1000;
      const margin = { top: 50, right: 50, bottom: 50, left: 50 };
      const innerWidth = width - margin.left - margin.right;
      const innerHeight = width - margin.top - margin.bottom;

      // BEGIN
      const svgData = d3Select(wrapper)
        .selectAll('svg')
        .data(['dummy data']);

      const svgEnter = svgData.enter().append('svg');
      svgEnter.attr('width', width);
      svgEnter.attr('height', height);

      const gEnter = svgEnter.append('g')
        .attr('class', 'bars-chart')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

      const svgMerge = svgData.merge(svgEnter);
      const gMerge = svgMerge.select('g.bars-chart');

      // HELP FUNCTIONS
      const x = d3ScaleTime()
        .rangeRound([0, innerWidth])
        .domain(this.dateRange);

      const y = d3ScaleLinear()
        .range([innerHeight, 0])
        .domain([0, YMaxValue]);

      const countColor = function(d: any): string {
        const green = '#63C58A';
        const red = '#FF7C7C';
        const yellow = '#FFDE79';
        const value = d.value;
        const min = d.analyzer.ranges.min;
        const max = d.analyzer.ranges.max;

        if (value < min || value > max) {
          return red;
        } else if (value < (min + (min / 100 * 10)) || value > (max - (max / 100 * 10))) {
          return yellow;
        } else {
          return green;
        }
      };

      const prettyDate = function(date: string): Date {
        return parse(date, 'yyyy-MM-dd', new Date());
      };

      // AXIS Х
      gEnter.append('g')
        .attr('class', 'x')
        .call(d3AxisBottom(x));

      const gX = gMerge.select('g.x')
        .attr('transform', `translate(0, ${innerHeight})`)
        .transition()
        .duration(DURATION)
        .call(d3AxisBottom(x));

      gX.selectAll('line').remove();
      gX.select('.domain').remove();

      // REF ZONES
      // REF MAX
      gEnter.append('g')
        .attr('class', 'y-ref-max');

      const gRefMax = gMerge.select('g.y-ref-max');

      const refLineMax = gRefMax.selectAll('line').data(currentData);

      const countRefX1 = function(idx: number) {
        if (currentData[idx + 1]) {
          return x(prettyDate(currentData[idx + 1].date));
        }
      };

      refLineMax.enter()
        .append('line')
        .attr('x1', (d: any, idx: any) => countRefX1(idx))
        .attr('x2', (d: any) => x(prettyDate(d.date)))
        .attr('y1', (d: any) => y(d.analyzer.ranges.max))
        .attr('y2', (d: any) => y(d.analyzer.ranges.max))
        .attr('stroke', '#63C58A')
        .attr('stroke-dasharray', '2, 2');

      // REF MIN
      gEnter.append('g')
        .attr('class', 'y-ref-min');

      const gRefMin = gMerge.select('g.y-ref-min');

      const refLineMin = gRefMin.selectAll('line').data(currentData);

      refLineMin.enter()
        .append('line')
        .attr('x1', (d: any, idx: any) => countRefX1(idx))
        .attr('x2', (d: any) => x(prettyDate(d.date)))
        .attr('y1', (d: any) => y(d.analyzer.ranges.min))
        .attr('y2', (d: any) => y(d.analyzer.ranges.min))
        .attr('stroke', '#63C58A')
        .attr('stroke-dasharray', '2, 2');

      // HORIZONTAL LINES
      gEnter.append('g')
        .attr('class', 'y-horizontal')
        .call(d3AxisRight(y).tickSizeOuter(0).tickSizeInner(innerWidth));

      const gYGreyHorizontal = gMerge.select('g.y-horizontal');

      gYGreyHorizontal
        .transition()
        .duration(DURATION)
        .call(d3AxisRight(y).ticks(3).tickSizeOuter(0).tickSizeInner(innerWidth));

      gYGreyHorizontal.selectAll('line')
        .attr('stroke', '#E9E8FF');
      gYGreyHorizontal.selectAll('text').remove();
      gYGreyHorizontal.select('.domain').remove();

      // TOOLTIP
      const tooltip = d3Select(wrapper)
        .append('div')
        .attr('class', 'chart-tooltip')
        .style('opacity', 0);

      // RECT
      const rectData = gMerge.selectAll('rect').data(currentData);

      const rectEnter = rectData.enter()
        .append('rect')
        .attr('class', 'rect')
        .attr('fill', (d: any) => countColor(d))
        .attr('x', (d: any) => x(prettyDate(d.date)))
        .attr('y', (d: any) => y(d.value))
        .attr('width', '5')
        .attr('height', (d: any) => innerHeight - y(d.value))
        .attr('rx', 3);


      const rectMerge = rectData.merge(rectEnter);
      rectMerge
        .transition()
        .duration(DURATION)
        .attr('x', (d: any) => x(prettyDate(d.date)))
        .attr('y', (d: any) => y(d.value))
        .attr('height', (d: any) => innerHeight - y(d.value) - 5);

      // RECT INTERACTIVE
      rectEnter
        .on('mouseenter', function(e: any, d: any) {
          d3Select(this)
            .attr('opacity', 0.5)
            .attr('cursor', 'pointer');

          tooltip.transition()
            .duration(200)
            .style('opacity', 0.9);

          tooltip.html(`
                      <span class="tooltip-text">${d.value} ${d.laboratory.units}</span>
                      <span class="tooltip-text">${format(prettyDate(d.date), 'd MMMM yyyy', { locale: RU })}</span>
          `);

          tooltip
            .style('left', +d3Select(this).attr('x') - 20 + 'px')
            .style('top', +d3Select(this).attr('y') + 110 + 'px');
        })
        .on('mouseleave', function() {
          d3Select(this)
            .attr('opacity', 1);

          tooltip.transition()
            .duration(500)
            .style('opacity', 0);
        });

      // CIRCLE ON RECT
      gEnter.append('g')
        .attr('class', 'g-circle');

      const gCircle = gMerge.select('g.g-circle');

      const circle = gCircle.selectAll('circle').data(currentData);

      circle.enter()
        .append('circle')
        .attr('class', 'circle')
        .attr('cx', (d: any) => x(prettyDate(d.date)) + 2.5)
        .attr('cy', (d: any) => y(d.value) - 7)
        .attr('r', '3')
        .attr('fill', (d: any) => countColor(d))
        .attr('opacity', (d: any) => d.laboratory.name === 'ЛабСтори' ? '1' : '0');

      // STAR ON RECT
      gEnter.append('g')
        .attr('class', 'g-star');

      const gStar = gMerge.select('g.g-star');

      const star = gStar.selectAll('path').data(currentData);

      star.enter()
        .append('path')
        .attr('class', 'star')
        .attr('d', () => d3Symbol().type(d3SymbolStar).size(40)())
        .attr('transform', (d: any) => `translate(${x(prettyDate(d.date)) + 2.5}, ${y(d.value) - 7})`)
        .attr('fill', (d: any) => countColor(d))
        .attr('opacity', (d: any) => d.laboratory.name === 'ЛабСтори' ? '0' : '1');

      // TEXT ON RECT
      gEnter.append('g')
        .attr('class', 'g-text');

      const gText = gMerge.select('g.g-text');

      const text = gText.selectAll('text').data(currentData);

      text.enter()
        .append('text')
        .attr('class', 'rect-value')
        .attr('x', (d: any) => x(prettyDate(d.date)) + 2)
        .attr('y', (d: any) => y(d.value) - 20)
        .text((d: any) => d.value)
        .attr('text-anchor', 'middle')
        .attr('fill', (d: any) => countColor(d));
    }

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
  }
</script>

<style lang="scss" scoped>
  .chart__wrapper {
    /* mocks */
    width: fit-content;
    border: 1px solid black;
  }

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
