<template>
  <q-select
      class="main-select"
      hide-dropdown-icon
      :value="value"
      :options="options"
      :disable="disabled"
      :style="{
        backgroundColor: bcgColor,
        border: `1px solid ${borderColor}`,
        width: width + 'px',
        height: height + 'px',
        minWidth: minWidth + 'px',
        maxWidth: maxWidth + 'px'
      }"
      @input="inputSelect"
      @popup-show="isIconReverse = true"
      @popup-hide="isIconReverse = false"
  >
    <template v-slot:prepend>
      <slot name="prepend"/>
    </template>

    <template v-slot:append>
      <slot name="append">
        <icon
            name="select-icon"
            class="main-select-append-icon"
            :class="{'main-select-append-icon-reverse': isIconReverse}"
        />
      </slot>
    </template>
  </q-select>
</template>

<script lang="ts">
  import { Component, Emit, Prop, Vue } from 'vue-property-decorator';

  @Component({})
  export default class MainSelect extends Vue {
    @Prop({ required: true }) value: number | string | object;
    @Prop({ required: true }) options: Array<number> | Array<string> | Array<object>;
    @Prop() disabled: boolean;
    @Prop({ default: 'transparent' }) bcgColor: string;
    @Prop({ default: 'none' }) borderColor: string;
    @Prop() width: number;
    @Prop() height: number;
    @Prop() minWidth: number;
    @Prop() maxWidth: number;

    isIconReverse = false;

    @Emit('input-select')
    inputSelect(value: number | string | object) {
      return value;
    }
  }
</script>

<style lang="scss" scoped>
  .main-select {
    border-radius: 18px;

    ::v-deep .q-field__control {
      &:before {
        display: none;
      }

      &:after {
        display: none;
      }
    }

    ::v-deep .q-field__native {
      padding: 0;
      font-size: 14px;
      line-height: 130%;
      color: $black-01;
    }

    ::v-deep .q-field__prepend {
      padding-left: 15px;
      padding-right: 10px;
    }

    ::v-deep .q-field__append {
      padding-right: 20px;
      margin-left: 30px;
    }

    &-append-icon {
      width: 13px;
      height: 10px;
      color: $accent-color;
      margin-top: 5px;
      transition: transform .1s ease;

      &-reverse {
        transform: rotate(180deg);
        margin-bottom: 7px;
      }
    }
  }
</style>
