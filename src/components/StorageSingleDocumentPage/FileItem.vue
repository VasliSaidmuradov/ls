<template>
  <div class="file">
    <div class="file__wrapper">
      <div class="file__img-wrapper">
        <img src="@/assets/Doc.jpg" width="60px" height="88px" alt="" class="file__img">
        <icon name="process-icon"  class="file__img-wrapper-icon"/>
      </div>

      <div class="file__actions">
        <icon name="delete-icon" class="file__delete-icon"/>
        <icon name="download-icon" class="file__download-icon"/>
      </div>
    </div>

    <span class="file__count-text">7 анализов</span>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';

  @Component({})
  export default class FileItem extends Vue {

  }
</script>

<style lang="scss" scoped>
  .file {
    &__wrapper {
      display: flex;
    }

    &__img-wrapper {
      height: 88px;
      position: relative;
    }

    &__img-wrapper-icon {
      width: 18px;
      height: 18px;
      left: -5px;
      top: -5px;
      position: absolute;
    }

    &__actions {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
    }

    &__delete-icon {
      width: 12px;
      height: 14px;
      cursor: pointer;
      color: $black-05;
    }

    &__download-icon {
      width: 24px;
      height: 24px;
      margin-top: 30px;
      cursor: pointer;
      color: $black-05;
    }

    &__count-text {
      margin-top: 12px;
      display: block;
      color: $black-02;
      font-size: 12px;
      line-height: 15px;
    }
  }
</style>
