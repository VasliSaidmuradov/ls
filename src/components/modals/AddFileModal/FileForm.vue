<template>
  <form
      class="file-form"
      :class="`file-form-${type}`"
      ref="file-form"
  >
    <input
        type="file"
        multiple
        id="file"
        ref="file"
        class="file-form__file-input"
        @change="handleFileUpload"

    >
    <label
        class="file-form__file-block"
        for="file"
        @dragenter.prevent.stop
        @dragover.prevent.stop
        @drop.prevent.stop="handleFileDrop"
    >
      <icon :name="countIcon" class="file-form__file-block-icon"/>
      <span class="file-form__file-block-title">{{title}}</span>
      <span class="file-form__file-block-subtitle">Файлы до 3мб</span>
    </label>
  </form>
</template>

<script lang="ts">
  import {Component, Emit, Prop, Vue} from 'vue-property-decorator'

  interface IRefs {
    file: HTMLInputElement;
  }

  @Component({})
  export default class FileForm extends Vue {
    @Prop() type: number
    @Prop({default: 'Перетяните или нажмите, чтобы добавить файл'}) title: string

    $refs: IRefs & Vue['$refs'];

    get countIcon() {
      return this.type === 1 ? 'cloud-icon' : 'add-icon'
    }

    @Emit('add-files')
    handleFileUpload() {
      return this.$refs.file.files && this.$refs.file.files
    }

    handleFileDrop(e: DataTransfer) {
      // const dt = e.dataTransfer;
      // const files = dt.files;
    }
  }
</script>

<style lang="scss" scoped>
  .file-form {
    border: 1px dashed $black-04;
    border-radius: 26px;

    &__file-input {
      display: none;
    }

    &__file-block {
      display: flex;
      flex-direction: column;
      cursor: pointer;
    }

    &__file-block-title {
      text-align: center;
      margin-top: 4px;
      display: block;
      font-weight: 500;
      font-size: 14px;
      line-height: 140%;
    }

    &__file-block-subtitle {
      align-self: center;
      margin-top: 4px;
      display: block;
      font-weight: 500;
      font-size: 12px;
      line-height: 15px;
      color: $black-04;
    }

    &__file-block-icon {
      align-self: center;
      color: $accent-color;
    }
  }

  .file-form-1 .file-form {
    &__file-block {
      padding: 60px 140px;

      @include media-breakpoint-up($breakpoint-md) {
        padding: 30px 30px;
      }
    }

    &__file-block-icon {
      width: 24px;
      height: 24px;
    }

    &__file-block-title {
      color: $accent-color;
    }
  }

  .file-form-2 .file-form {
    &__file-block {
      padding: 29px 25px;

      @include media-breakpoint-up($breakpoint-md) {
        padding: 30px 34px;
      }
    }

    &__file-block-icon {
      width: 10px;
      height: 10px;
    }

    &__file-block-title {
      color: $black-01;
    }
  }
</style>
