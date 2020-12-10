<template>
  <div class="checkbox-wrapper">
    <div
        @click="changeValue"
        class="checkbox-block"
        :style="{
          border: `1px solid ${borderColor}`,
          color: color
        }"
    >
      <icon
          class="checkbox-block__icon"
          name="gull-icon"
          v-if="value"
      />
    </div>

    <label
        class="label"
        :for="id"
        v-if="label"
    >
      {{label}}
    </label>

    <input
        class="checkbox"
        type="checkbox"
        :id="id"
        :value="value"
        :disabled="disabled"
        @change="changeValue"
    >
  </div>
</template>

<script lang="ts">
  import { Component, Emit, Prop, Vue } from 'vue-property-decorator';

  @Component({})
  export default class CheckboxInput extends Vue {
    @Prop({ required: true }) value: boolean;
    @Prop() label: string;
    @Prop() disabled: boolean;
    @Prop({ default: '#7C74E9' }) borderColor: string;
    @Prop({ default: '#7C74E9' }) color: string;

    id = Math.random();

    @Emit('change-value')
    changeValue() {
      return !this.value;
    }
  }
</script>

<style lang="scss" scoped>
  .checkbox-wrapper {
    display: flex;
    align-items: center;

    .label {
      margin-left: 13px;
      user-select: none;
      cursor: pointer;
    }

    .checkbox {
      display: none;
    }

    .checkbox-block {
      cursor: pointer;
      width: 16px;
      height: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 5px;

      &__icon {
        width: 10px;
        height: 12px;
      }
    }
  }
</style>
