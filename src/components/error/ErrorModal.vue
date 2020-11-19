<template>
  <q-dialog no-route-dismiss
            :value="isVisible">
    <div class="error">
      <div class="error__header">

      </div>
      <div class="error__body">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto beatae, cupiditate deleniti deserunt ea ex labore numquam omnis optio perspiciatis quis quo soluta sunt! Alias assumenda autem blanditiis consequatur dicta dignissimos ea est incidunt iste itaque iure molestias numquam pariatur, possimus voluptatem. A animi asperiores, delectus dolorum et exercitationem expedita id laboriosam laudantium magnam magni minima mollitia nam natus necessitatibus nihil nisi nobis optio perferendis placeat quae quam quidem reiciendis rerum sit unde ut veritatis voluptas voluptatibus voluptatum! Accusamus adipisci aliquam, cumque deleniti doloremque doloribus facere facilis fugit ipsa minima molestias officia possimus, rem repudiandae sunt? Alias aperiam dolores magni molestiae totam veniam voluptate! Deleniti dolore est impedit incidunt labore laborum libero mollitia nam natus obcaecati officia omnis perspiciatis possimus, quis reiciendis sed ut velit. Accusantium culpa eos sunt vel voluptatem! Accusamus amet animi beatae consectetur dicta dolor, doloremque ducimus harum labore magni quaerat quia quisquam sunt suscipit velit. A, animi, aperiam beatae consectetur dignissimos dolor eaque eius eveniet fugiat itaque, mollitia nemo provident quos ratione reiciendis repellat repellendus totam vel veniam vitae! Ab aperiam iure pariatur quae qui quidem reiciendis repellendus tenetur? Blanditiis excepturi magnam magni repellat veritatis. Animi cupiditate delectus est non quaerat reprehenderit saepe sed tempora voluptas.
      </div>
      <div class="error__footer">

      </div>
    </div>
  </q-dialog>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class ErrorModal extends Vue {

  get isVisible(): boolean {
    return this.$store.state.error.isVisible;
  }

  onClose() {
    this.$store.dispatch('error/close')
  }

}
</script>

<style lang="scss">
.error {
  background-color: $light-white;
  box-shadow: 0px 4px 15px $shadow-color;
  max-width: 800px;

}

</style>
