<template>
  <div>
    <label
        class="main-select-label"
        v-if="labelTitle"
    >
      {{labelTitle}}
    </label>

    <q-select
        class="main-select"
        hide-dropdown-icon
        :label="selectLabel"
        :option-label="optionLabel"
        :value="value"
        :option-value="optionValue"
        :options="options"
        :multiple="multiple"
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

      <template v-slot:option="{ itemProps, itemEvents, opt, selected, toggleOption }" v-if="multiple">
        <q-item
            v-bind="itemProps"
            v-on="itemEvents"
        >
          <q-item-section>
            <q-item-label v-html="opt.label || opt"></q-item-label>
          </q-item-section>
          <q-item-section side>
            <checkbox-input :value="selected" @change-value="toggleOption(opt)"/>
          </q-item-section>
        </q-item>
      </template>
    </q-select>
  </div>
</template>

<script lang="ts">
  import { Component, Emit, Prop, Vue } from 'vue-property-decorator';
  import CheckboxInput from '@/components/UI/inputs/CheckboxInput.vue';

  @Component({
    components: { CheckboxInput },
  })
  export default class MainSelect extends Vue {
    @Prop({ required: true }) value: number | string | object;
    @Prop({ required: true }) options: Array<number> | Array<string> | Array<object>;
    @Prop() optionValue: string;
    @Prop() optionLabel: string;
    @Prop() multiple: boolean;
    @Prop() labelTitle: string;
    @Prop() selectLabel: string;
    @Prop() disabled: boolean;
    @Prop({ default: 'transparent' }) bcgColor: string;
    @Prop({ default: 'none' }) borderColor: string;
    @Prop() width: number;
    @Prop() height: number;
    @Prop() minWidth: number;
    @Prop() maxWidth: number;
    @Prop({default: ''}) optionsLabel: string | Function;
    // @Prop({default: ''}) optionValue: string | Function;

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

    &-label {
      display: block;
      font-weight: 500;
      font-size: 13px;
      color: $black-02;
      margin-bottom: 8px;
    }

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

  .main-select.q-field--focused {
    ::v-deep .q-field__label {
      color: $accent-color;
    }
  }
</style>
