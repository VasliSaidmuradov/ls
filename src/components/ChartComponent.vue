<template>
  <div ref="wrapper">
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import {
    axisBottom as d3AxisBottom,
    axisLeft as d3AxisLeft,
    axisRight as d3AxisRight,
    interpolateRgb as d3InterpolateRgb,
    max as d3Max,
    scaleBand as d3ScaleBand,
    scaleLinear as d3ScaleLinear,
    select as d3Select,
  } from 'd3';

  interface IRefs {
    wrapper: HTMLElement;
  }

  @Component({})
  export default class ChartComponent extends Vue {
    $refs: IRefs & Vue['$refs'];

    @Prop() mainData: Array<any>
    @Prop() xData: Array<any>

    series: Array<any> = [];
    intervalId: any;

    mounted() {
      this.generateData();
      this.updateChart(this.$refs.wrapper, this.series);

      this.intervalId = setInterval(() => {
        this.generateData();
        this.updateChart(this.$refs.wrapper, this.series);
      }, 5000);
    }

    beforeDestroy() {
      clearInterval(this.intervalId);
    }

    updateChart(wrapper: HTMLElement, currentData: any) {
      if (!wrapper) {
        return;
      }

      // КОНСТАНТЫ
      const maxValue = d3Max(currentData);
      const width = 500;
      const height = 500;
      const DURATION = 1000;
      const margin = { top: 50, right: 50, bottom: 50, left: 50 };
      const innerWidth = width - margin.left - margin.right;
      const innerHeight = width - margin.top - margin.bottom;

      // НАЧАЛО
      const svgData = d3Select(wrapper)
        .selectAll('svg')
        .data(['dummy data']);

      const svgEnter = svgData.enter().append('svg');
      svgEnter.attr('width', width);
      svgEnter.attr('height', height);

      const gEnter = svgEnter.append('g').attr('class', 'bars-chart')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

      const svgMerge = svgData.merge(svgEnter); // svg
      const gMerge = svgMerge.select('g.bars-chart');

      // ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
      const indexes: number[] = Array.from({ length: currentData.length }, (el, index) => index);
      const x = d3ScaleBand().range([0, innerWidth]).domain(indexes);
      const y = d3ScaleLinear().range([innerHeight, 0]).domain([0, maxValue]);

      // ПУНКТИРНЫЕ ЛИНИИ
      gEnter.append('g')
        .attr('class', 'y-right')
        .call(d3AxisRight(y).tickSizeOuter(0).tickSizeInner(innerWidth));

      const gY = gMerge.select('g.y-right');

      gY.transition()
        .duration(DURATION)
        .call(d3AxisRight(y).tickSizeOuter(0).tickSizeInner(innerWidth));

      gY.selectAll('line')
        .attr('stroke', '#63C58A')
        .attr('stroke-dasharray', '2, 2');
      gY.selectAll('text').remove();

      // RECT
      const rectData = gMerge.selectAll('rect').data(currentData);

      const rectEnter = rectData.enter()
        .append('rect')
        .attr('fill', '#63C58A')
        .attr('x', (d: any, idx: any) => x(idx))
        .attr('y', (d: any) => y(d))
        .attr('width', innerWidth / currentData.length)
        .attr('height', (d: any) => innerHeight - y(d));

      const rectMerge = rectData.merge(rectEnter); // rect
      rectMerge
        .transition()
        .duration(DURATION)
        .attr('y', (d: any) => y(d))
        .attr('height', (d: any) => innerHeight - y(d));

      // ОСЬ Y
      gEnter.append('g')
        .attr('class', 'y-left')
        .call(d3AxisLeft(y));

      gMerge.select('g.y-left')
        .transition()
        .duration(DURATION)
        .call(d3AxisLeft(y));

      // ОСЬ Х
      gEnter.append('g')
        .attr('class', 'x')
        .call(d3AxisBottom(x));

      gMerge.select('g.x')
        .attr('transform', `translate(0, ${innerHeight})`)
        .transition()
        .duration(DURATION)
        .call(d3AxisBottom(x));

    }

    generateData() {
      this.series = [
        Math.random() * 400,
        Math.random() * 400,
        Math.random() * 400,
        Math.random() * 400,
        Math.random() * 400,
      ];
    }
  }
</script>

<style lang="scss" scoped>

</style>
