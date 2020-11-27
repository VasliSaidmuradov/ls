<template>
  <div>

  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';

  @Component({})
  export default class ChartComponent extends Vue {
    @Prop() width: number;
    @Prop() height: number;
    @Prop() minWidth: number;
    @Prop() maxWidth: number;
  }
</script>

<style lang="scss" scoped>

</style>
