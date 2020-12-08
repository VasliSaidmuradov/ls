<template>
  <q-btn
      unelevated
      class="back-btn"
      :class="`back-btn-${type}`"
      :ripple="{ color: 'white' }"
      @click="goBack"
  >
    <div class="back-btn__icon-wrapper">
      <icon name="next-icon" class="back-btn__icon"/>
    </div>
    <span class="back-btn__text">Назад</span>
  </q-btn>
</template>

<script lang="ts">
  import {Component, Emit, Prop, Vue} from 'vue-property-decorator';

  @Component({})
  export default class BackBtn extends Vue {
    @Prop({default: 1}) type: number

    @Emit('go-back')
    goBack() {
      return false
    }
  }
</script>

<style lang="scss" scoped>
  /*
  back-btn
  */
  .back-btn {
    ::v-deep .q-btn__wrapper {
      padding: 0 !important;

      svg {
        width: 4px;
      }
    }

    &__icon-wrapper {
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &__icon {
      width: 4px;
      height: 8px;
      color: $accent-color;
    }

    &__text {
      margin-left: 10px;
      text-transform: none;
      font-weight: 400;
      display: block;
      font-size: 14px;
      color: $gray-01;
    }
  }

  .back-btn:hover {
    .back-btn__text {
      margin-left: 15px;
    }
  }

  /*
  back-btn-1
  */
  .back-btn-1 .back-btn {
    &__icon-wrapper {
      width: 4px;
    }
  }

  .back-btn-1:hover .back-btn {
    &__text {
      color: $accent-color;
    }
  }

  /*
  back-btn-2 (with background)
  */
  .back-btn-2 .back-btn {
    &__icon-wrapper {
      width: 24px;
      border: 1px solid $light-stroke;
      border-radius: 7px;
    }
  }

  .back-btn-2:hover .back-btn {
    &__icon-wrapper {;
      background-color: $accent-color;
    }

    &__icon {
      color: $light-white;
    }

    &__text {
      color: $accent-color;
    }
  }
</style>
