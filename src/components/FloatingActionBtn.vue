<template>
  <q-page-sticky position="bottom-right" :offset="[18, 18]">
    <div class="actions-btn">
      <div v-if="showActions" class="actions-btn__actions">
        <ul class="actions-btn__actions-list">
          <li class="actions-btn__actions-item"
              :class="`actions-btn__actions-item--${item.name}`"
              v-for="(item, index) of actions"
              :key="index"
              @click="item.handler">
            <span class="actions-btn__actions-item-icon">
              <icon :name="item.icon"></icon>
            </span>
            <span class="actions-btn__actions-item-text">
              {{item.text}}
            </span>
          </li>
        </ul>
        <span class="actions-btn__actions-icon">
          <icon name="triangle-icon"></icon>
        </span>
      </div>
      <q-fab class="actions-btn__fab-btn" @click="toggleActions" direction="left" icon="add"/>
    </div>
  </q-page-sticky>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class FloatingActionBtn extends Vue {
  showActions = false;
  actions = [{
      icon: 'cloud-icon',
      text: 'Загрузить файл',
      handler: this.uploadFile,
      name: 'upload'
    }, {
      icon: 'finger-icon',
      text: 'Добавить вручную',
      handler: this.addFile,
      name: 'add'
    }
  ]

  uploadFile() {
    console.log('upload')
  }

  addFile() {
    console.log('add')
  }

  toggleActions() {
    this.showActions = !this.showActions
  }
}
</script>

<style lang="scss">

.actions-btn {
  display: flex;
  align-items: flex-end;

  &__fab-btn {
    &.q-fab {
      box-shadow: 0px 4px 15px $shadow-color;
      border-radius: 10px;
      background-color: $accent-orange;
      color: $light-white;

      .q-btn__wrapper {
        &:before {
          display: none;
        }
      }
    }
  }

  &__actions {
    background: $light-white;
    box-shadow: 0px 4px 15px $shadow-color;
    border-radius: 16px;
    min-width: 200px;
    margin-right: 10px;
    position: relative;
  }

  &__actions-icon {
    position: absolute;
    bottom: 0;
    right: -5px;
    color: $light-white;
    z-index: 999;
  }

  &__actions-list {
    margin: 0;
    padding: 8px 18px;
    list-style-type: none;
  }

  &__actions-item {
    display: flex;
    align-items: center;
    padding: 12px 10px;
    border-bottom: 1px solid $light-stroke;

    &:last-child {
      border: none;
    }

    &--upload {
      .actions-btn__actions-item-icon {
        margin-top: -10px;

        svg {
          height: 20px;
        }
      }
     }
  }

  &__actions-item-text {
    font-size: 12px;
    line-height: 150%;
    color: $black-02;
    margin-left: 10px;
  }

  &__actions-item-icon {
    color: $accent-orange;
    margin-top: -15px;

    width: 16px;
    height: 11px;

    svg {
      width: 16px;
      height: 11px;
    }
  }
}
</style>
