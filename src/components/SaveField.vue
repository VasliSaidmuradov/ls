<template>
  <div class="save-field" :class="`save-field--${position}`" :style="{'color': color}">
      <q-btn @click="save">
        <span class="save-field__icon">
          <icon name="check-icon"></icon>
        </span>
        <span class="save-field__text">Подтвердить</span>
      </q-btn>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({})
export default class SaveFieldBtn extends Vue {

  @Prop() onSave: Function;
  @Prop({default: 'right'}) position: string;
  @Prop({default: '#63C58A'}) color: string;

  save() {
    this.onSave();
  }
}
</script>


<style lang="scss">


.save-field {
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);

  &--right {
    right: 10px;
  }

  &--left {
    left: 10px;
  }

  .q-btn {
    font-size: 12px;
    line-height: 150%;
    text-transform: none;

    .q-btn__wrapper {
      &:before {
        display: none;
      }
    }
  }

  &__text {
    margin-left: 16px;
  }

  &__icon {
    svg {
      width: 8px;
      height: 11px;
    }
  }
}
</style>
