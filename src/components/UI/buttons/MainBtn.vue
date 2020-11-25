<template>
  <q-btn
      unelevated
      class="main-btn"
      :class="`main-btn-${type}`"
      :style="{
        backgroundColor: bcgColor,
        border: `1px solid ${borderColor}`,
        width: width + 'px',
        height: height + 'px'
      }"
      :disable="disabled"
      @click="clickBtn"
  >
    <div class="main-btn__icon-wrapper">
      <slot name="icon"/>
    </div>
    <span class="main-btn__text">{{text}}</span>
  </q-btn>
</template>

<script lang="ts">
  import {Component, Emit, Prop, Vue} from 'vue-property-decorator';

  @Component({})
  export default class MainBtn extends Vue {
    @Prop({default: 'primary'}) type: string
    @Prop({default: '#7C74E9'}) bcgColor: string
    @Prop({default: 'none'}) borderColor: string
    @Prop() width: number
    @Prop() height: number
    @Prop() text: string
    @Prop() disabled: boolean

    @Emit('click-btn')
    clickBtn() {
      return false
    }
  }
</script>

<style lang="scss" scoped>
  /*
   main-btn
   */

  .main-btn {
    flex-shrink: 0;

    /deep/ .q-btn__wrapper {
      padding: 0 !important;

      svg {
        min-width: 4px;
      }
    }

    &__icon-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &__text {
      text-transform: none;
      display: block;
    }
  }

  .main-btn.q-hoverable:hover {
    /deep/ .q-focus-helper {
      background: $light-white;
    }
  }

  /*
   main-btn-primary
   */

  .main-btn-primary .main-btn, .main-btn-primary {
    border-radius: 22px;

    &__icon-wrapper {
      width: 32px;
      height: 40px;
      background-color: $light-white;
      border-radius: 16px;
    }

    &__text {
      margin-left: 12px;
      font-weight: 500;
      font-size: 14px;
      color: $light-white;
    }
  }

  .main-btn-primary:hover .main-btn, .main-btn-primary:hover {
    background-color: $light-white !important;

    /deep/ svg {
      color: $light-white;
    }

    .main-btn__icon-wrapper {
      background-color: $accent-color;
    }

    .main-btn__text {
      color: $black-02;
    }
  }

  /*
   main-btn-secondary
   */

  .main-btn-secondary .main-btn, .main-btn-secondary {
    &__icon-wrapper {
      width: 42px;
      height: 32px;
      background-color: $accent-color;
      border-radius: 16px;
    }

    &__text {
      margin-left: 12px;
      color: $black-02;
      font-weight: 400;
      font-size: 12px;
      line-height: 150%;
    }
  }

  .main-btn-secondary:hover .main-btn, .main-btn-secondary:hover {

    /deep/ svg {
      color: $accent-color;
    }

    .main-btn__icon-wrapper {
      box-shadow: 0 4px 15px $shadow-color;
      background-color: $light-white;
    }

    .main-btn__text {
      color: $accent-color;
    }
  }

  /*
   main-btn-small
   */

  .main-btn-small .main-btn, .main-btn-small {
    &__text {
      margin-left: 7px;
      color: $black-02;
      font-weight: 400;
      font-size: 12px;
      line-height: 150%;
    }
  }

  /*
   main-btn-small-bg
   */

  .main-btn-small-bg .main-btn, .main-btn-small-bg {
    border-radius: 16px;

    &__text {
      margin-left: 7px;
      color: $light-white;
      font-weight: 400;
      font-size: 12px;
      line-height: 150%;
    }
  }

  .main-btn-small-bg:hover .main-btn, .main-btn-small-bg:hover {
    background-color: transparent !important;

    /deep/ svg {
      color: $accent-color;
    }

    .main-btn__text {
      color: $black-02;
    }
  }

  /*
   main-btn-only-icon
   */

  .main-btn-only-icon .main-btn, .main-btn-only-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
  }

  .main-btn-only-icon:hover .main-btn, .main-btn-only-icon:hover {
    background-color: $accent-color !important;
    border: 1px solid $accent-color !important;

    /deep/ svg {
      color: $light-white;
    }
  }

  .main-btn-only-icon:disabled .main-btn, .main-btn-only-icon:disabled {
    background-color: $light-white !important;
    border: 1px solid $light-stroke !important;

    /deep/ svg {
      color: $light;
    }
  }
</style>
