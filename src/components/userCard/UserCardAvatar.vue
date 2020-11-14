<template>
  <div class="avatar">
      <q-btn class="avatar__edit" @click="uploadPhoto">
        <icon name="edit-icon"></icon>
      </q-btn>
      <q-avatar square size="98px" rounded>
        <img :src="url" alt="avatar">
      </q-avatar>

      <input type="file" class="hidden" ref="uploader" @input="onFileGet($event.target.files)"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class UserCardAvatar extends Vue {
  url: string = 'https://www.vsekastingi.ru/storage/2018/10/29/casting_284261.jpg';

  uploadPhoto() {
    (this.$refs.uploader as HTMLElement).click();
  }

  onFileGet(fileList: FileList) {
    this.url = URL.createObjectURL(fileList[0]);
  }
}
</script>

<style lang="scss">

.avatar {
  position: relative;

  &__edit {
    &.q-btn {
      position: absolute;
      color: $accent-color;
      z-index: 99;
      background-color: $light-white;
      box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.05);
      border-radius: 10px;
      width: 34px;
      height: 34px;
      bottom: 5px;
      right: 5px;

      .q-btn__wrapper {
        padding: 0;

        &:before {
          display: none;
        }
      }
    }
  }

  .q-avatar {
    img {
      object-fit: cover;
    }
  }
}

</style>
