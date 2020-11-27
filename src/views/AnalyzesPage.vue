<template>
  <div class="analyzes-page layout">
    <chart-component/>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import ChartComponent from '@/components/ChartComponent.vue';

  @Component({
    components: { ChartComponent },
  })
  export default class AnalyzesPage extends Vue {

  }
</script>

<style lang="scss">


</style>
