<template>
  <img
      class="preview-img"
      :src="imgSrc || pdfSvg"
      alt=""
  >
</template>

<script lang="ts">
  import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

  @Component({})
  export default class PreviewImg extends Vue {
    @Prop() file: File;

    imgSrc: string | ArrayBuffer | null = '';
    pdfSvg = require('@/assets/Pdf.svg');

    @Watch('file')
    fileChanged() {
      this.file.type !== 'application/pdf' && this.readFile();
    }

    mounted() {
      this.file.type !== 'application/pdf' && this.readFile();
    }

    readFile() {
      const reader = new FileReader();

      reader.onload = () => {
        this.imgSrc = reader.result;
      };

      reader.readAsDataURL(this.file);
    }
  }
</script>

<style lang="scss" scoped>
  .preview-img {
    width: 86px;
    height: 126px;
  }
</style>
