<template>
  <q-toggle
      class="main-toggle"
      :value="value"
      :label="label"
      @input="changeValue"
  />
</template>

<script lang="ts">
  import { Component, Emit, Prop, Vue } from 'vue-property-decorator';

  @Component({})

  export default class MainToggle extends Vue {
    @Prop({ required: true }) value: boolean;
    @Prop() label: string;

    @Emit('change-value')
    changeValue(val: boolean) {
      return val;
    }
  }
</script>

<style lang="scss" scoped>
  .main-toggle {
    ::v-deep .q-toggle__label {
      margin-left: 9px;
      color: $accent-color;
      font-weight: 500;
      font-size: 14px;
      line-height: 140%;
      user-select: none;
    }

    ::v-deep .q-toggle__inner {
      min-width: 32px !important;
      padding: 5px !important;
      width: 32px !important;
      height: 20px !important;
      border: 1px solid $accent-color;
      border-radius: 15px;
    }

    ::v-deep .q-toggle__track {
      background-color: $light-white;
      height: 10px !important;
    }

    ::v-deep .q-toggle__thumb {
      width: 10px;
      height: 10px;
      left: 5px;
      top: 4px;

      &:after {
        box-shadow: none !important;
        background: $accent-color !important;
        opacity: 0.5 !important;
      }
    }

    ::v-deep.q-toggle__inner--truthy {
      .q-toggle__thumb {
        left: 15px !important;

        &:after {
          background: $accent-color !important;
          opacity: 1 !important;
        }
      }
    }
  }
</style>
