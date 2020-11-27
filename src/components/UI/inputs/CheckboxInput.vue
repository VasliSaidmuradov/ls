<template>
  <q-checkbox
      class="checkbox-input"
      :label="label"
      :value="value"
      :disable="disabled"
      @input="changeValue"
  />
</template>

<script lang="ts">
  import { Component, Emit, Prop, Vue } from 'vue-property-decorator';

  @Component({})
  export default class CheckboxInput extends Vue {
    @Prop({ required: true }) value: boolean;
    @Prop() label: string;
    @Prop() disabled: boolean;

    @Emit('change-value')
    changeValue() {
      return false;
    }
  }
</script>

<style lang="scss" scoped>
  .checkbox-input {
    ::v-deep .q-checkbox__label {
      user-select: none;
      display: block;
      font-weight: 500;
      font-size: 13px;
      color: $black-02;
    }

    ::v-deep .q-checkbox__bg {
      color: $light-white;
      width: 16px;
      height: 16px;
      border-radius: 5px;
      border: 1px solid $accent-color;

      svg {
        color: $accent-color;
        width: 12px !important;
        height: 12px !important;
        left: 0;
        margin: 0 auto;
        top: 50%;
        transform: translate(0, -50%);
      }
    }

    ::v-deep .q-checkbox__inner {
      font-size: 32px;
    }
  }
</style>
