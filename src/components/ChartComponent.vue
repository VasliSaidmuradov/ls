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
  } from 'd3';
  import parse from 'date-fns/parse';

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

      // CONSTANTS
      const valueArray: number[] = [];
      currentData.forEach((item: any) => {
        valueArray.push(item.value);
      });

      const maxValue = d3Max(valueArray);
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

      const gEnter = svgEnter.append('g').attr('class', 'bars-chart')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

      const svgMerge = svgData.merge(svgEnter); // svg
      const gMerge = svgMerge.select('g.bars-chart');

      // HELP FUNCTIONS
      const x = d3ScaleTime()
        .rangeRound([0, innerWidth])
        .domain(this.dateRange);

      const y = d3ScaleLinear()
        .range([innerHeight, 0])
        .domain([0, maxValue]);

      // REF ZONES
      // gEnter.append('g')
      //   .attr('class', 'y-reference')
      //   .call(d3AxisLeft(y));
      //
      // const gYReference = gMerge.select('g.y-reference')
      //   .transition()
      //   .duration(DURATION)
      //   .call(d3AxisLeft(y));
      //
      // gYReference.selectAll('line')
      //   .attr('stroke', '#63C58A')
      //   .attr('stroke-dasharray', '2, 2');
      // gYReference.select('.domain').remove();

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

      // HORIZONTAL LINES
      gEnter.append('g')
        .attr('class', 'y-horizontal')
        .call(d3AxisRight(y).tickSizeOuter(0).tickSizeInner(innerWidth));

      const gYGreyHorizontal = gMerge.select('g.y-horizontal');

      gYGreyHorizontal.transition()
        .duration(DURATION)
        .call(d3AxisRight(y).ticks(3).tickSizeOuter(0).tickSizeInner(innerWidth));

      gYGreyHorizontal.selectAll('line')
        .attr('stroke', '#E9E8FF');
      gYGreyHorizontal.selectAll('text').remove();
      gYGreyHorizontal.select('.domain').remove();

      // RECT
      const rectData = gMerge.selectAll('rect').data(currentData);

      const rectEnter = rectData.enter()
        .append('rect')
        .attr('class', 'rect')
        .attr('fill', '#63C58A')
        .attr('x', (d: any) => x(parse(d.date, 'yyyy-MM-dd', new Date())))
        .attr('y', (d: any) => y(d.value))
        .attr('width', '5')
        .attr('height', (d: any) => innerHeight - y(d.value));

      const rectMerge = rectData.merge(rectEnter); // rect
      rectMerge
        .transition()
        .duration(DURATION)
        .attr('x', (d: any) => x(parse(d.date, 'yyyy-MM-dd', new Date())))
        .attr('y', (d: any) => y(d.value))
        .attr('height', (d: any) => innerHeight - y(d.value));

      // RECT INTERACTIVE
      rectEnter
        .on('mouseenter', function() {
          d3Select(this)
            .attr('opacity', 0.5)
            .attr('cursor', 'pointer');
        })
        .on('mouseleave', function() {
          d3Select(this)
            .attr('opacity', 1);
        });

      // VALUE ON RECT
      gMerge.append('text')
        .attr('class', 'rect-value')
        .attr('x', (d: any) => x(parse(d.date, 'yyyy-MM-dd', new Date())))
        .attr('y', (d: any) => y(d.value))
        .attr('text-anchor', 'middle')
        .attr('fill', '#000')
        .text((d: any) => d.value);
    }
  }
</script>

<style lang="scss" scoped>
  .chart__wrapper {
    /* mocks */
    width: fit-content;
    border: 1px solid black;
  }
</style>
