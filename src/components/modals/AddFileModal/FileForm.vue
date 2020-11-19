<template>
  <form
      class="file-form"
      :class="{'file-form-1': type === 1, 'file-form-2': type === 2}"
      ref="file-form"
  >
    <input type="file" id="file" class="file-form__file-input">
    <label
        class="file-form__file-block"
        for="file"
        @click.prevent="clickAddFile"
    >
      <icon :name="countIcon" class="file-form__file-block-icon"/>
      <span class="file-form__file-block-title">{{title}}</span>
      <span class="file-form__file-block-subtitle">Файлы до 3мб</span>
    </label>
  </form>
</template>

<script lang="ts">
  import {Component, Emit, Prop, Vue} from 'vue-property-decorator'

  @Component({})
  export default class FileForm extends Vue {
    @Prop() type: number
    @Prop({default: 'Перетяните или нажмите, чтобы добавить файл'}) title: string

    @Emit('click-add-file')
    clickAddFile() {
      return false
    }

    get countIcon() {
      return this.type === 1 ? 'cloud-icon' : 'add-icon'
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
      margin-top: 4px;
      display: block;
      letter-spacing: 0.45px;
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
      padding: 60px 150px;
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
