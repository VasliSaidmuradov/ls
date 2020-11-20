<template>
  <div class="status-indicator" :class="{'status-indicator--error': isError}">
    <div class="icon">
      <icon :name="isError ? 'close-icon' : 'check-icon'"></icon>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({})
export default class StatusIndicator extends Vue {
  @Prop({default: false, type: Boolean}) isError: boolean;
}
</script>

<style lang="scss" scoped>
.status-indicator {
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: $status-green;
  border-radius: 10px;


  .icon {
    width: 5px;
    color: $light-white;
    height: 5px;
    box-shadow: 0px 4px 15px $shadow-color;
    margin-top: -24px;

    svg {
      width: 5px;
      height: 5px;
    }
  }


  &--error {
    background-color: $status-red;
  }
}
</style>
