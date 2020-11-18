<template>
  <div class="suffix" :style="{'left': baseOffset + getTextWidth(inputText, inputFontStyle) + 'px'}">
    {{suffixText ? suffixText : ''}}
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
@Component({})
export default class InputSuffix extends Vue {

  @Prop({default: ''}) suffixText: string;
  @Prop({default: ''}) inputText: string;
  @Prop({default: 0}) baseOffset: number;
  @Prop({default: '14px inter'}) suffixStyle: string;
  @Prop() inputFontStyle?: string;
  @Prop({default: 'left'}) suffixPosition: string;


  getTextWidth(text: string, font: string) {
    const canvas: HTMLCanvasElement = document.createElement("canvas");
    const context: CanvasRenderingContext2D | null = canvas.getContext("2d");
    if (context) {
      context.font = font;
      const metrics = context.measureText(text);
      return metrics.width;
    }
  }

}
</script>

<style lang="scss">
  .suffix {
    position: absolute;
    font-size: 14px;
    line-height: 130%;
    color: $light-stroke;
    left: 30px;
    padding-top: 2px;
    top: 50%;
    transform: translate(0, -50%);
  }
</style>
