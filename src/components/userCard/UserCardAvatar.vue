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

export interface IRefs {
  uploader: HTMLElement;
}

@Component({})
export default class UserCardAvatar extends Vue {
  url: string = 'https://www.vsekastingi.ru/storage/2018/10/29/casting_284261.jpg';

  $refs: IRefs & Vue['$refs'];

  uploadPhoto() {
    this.$refs.uploader.click();
  }

  get avatar(): string {
    return this.$store.state.personalArea.patient.avatar || 'https://www.vsekastingi.ru/storage/2018/10/29/casting_284261.jpg';
  }

  onFileGet(fileList: FileList) {
    const formData = new FormData();
    formData.append('avatar', fileList[0], fileList[0].name);
    this.$store.dispatch('personalArea/changeAvatar', formData);
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
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
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
