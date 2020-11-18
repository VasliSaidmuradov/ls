<template>
  <div class="single-document-page layout">
    <h2>{{id}}</h2>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';

  @Component({})
  export default class StorageSingleDocumentPage extends Vue {
    id = this.$route.params.id
  }
</script>

<style lang="scss" scoped>

</style>
