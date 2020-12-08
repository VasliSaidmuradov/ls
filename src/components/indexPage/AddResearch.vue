<template>
  <div class="add-research">
    <h2 class="add-research__title">Добавить исследование</h2>
    <div class="add-research__desk">
      Вы можете добавлять разные документы, а также сканировать анализы и результаты приемов.
    </div>
    <div class="add-research__actions">
      <q-expansion-item
          class="add-research__actions-exp"
          style="border-radius: 22px"
          icon="explore"
      >
        <template v-slot:header>
          <div class="add-research__actions-exp-header">
            <span class="add-research__actions-exp-header-left">
              <icon name="analyzes-icon"></icon>
            </span>
            <span class="add-research__actions-exp-header-text">Загрузить анализ</span>
          </div>
        </template>

        <ul class="add-research__actions-exp-list">
          <li class="add-research__actions-exp-item">Документ</li>
          <li class="add-research__actions-exp-item" @click="openAddAnalyzesModal">Вручную</li>
        </ul>
      </q-expansion-item>

      <q-btn class="add-research__actions-btn button1--bordered-with-icon">
        <span class="icon add-research__actions-btn-icon">
          <icon name="paper-icon"></icon>
        </span>
        <span class="add-research__actions-btn-text">Другой документ</span>
      </q-btn>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AnalyzesCard from '@/components/indexPage/AnalyzesCard.vue';
import {bus} from '@/plugins/bus';
import {IAnalyzes} from '@/interfaces/analyzes.interface';

@Component({
  components: {
    AnalyzesCard
  }
})
export default class AddResearch extends Vue {
  openAddAnalyzesModal() {
    bus.$emit(IAnalyzes.BusEvents.OPEN_ADD_ANALYZES_MODAL);
  }
}
</script>

<style lang="scss" scoped>
.add-research {
  background: $light-white;
  padding: 30px 40px;
  box-shadow: 0px 4px 15px $shadow-color;
  border-radius: 25px;
  border-radius: 25px;

  &__title {
    font-weight: 500;
    font-size: 16px;
    line-height: 130%;
    color: $accent-orange;
    margin-bottom: 10px;
    margin-top: 0;
  }

  &__desk {
    font-size: 14px;
    line-height: 130%;
    color: $black-02;
  }

  &__actions {
    margin-top: 35px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;

    .icon {
      background: $accent-orange;
    }

    @include media-breakpoint-up($breakpoint-pre-md) {
      margin: 20px 40px 0 40px;
    }
  }

  &__actions-btn {
    display: flex;
    align-items: center;
    justify-content: center;

    ::v-deep.q-btn__wrapper {
      padding: 8px;
    }

    &::v-deep.q-btn {
      border: none;
      background: $light-white;
      box-shadow: 0px 4px 15px $shadow-color;
      border-radius: 22px;
    }
  }

  &__actions-exp {
    background: $light-white;
    box-shadow: 0px 4px 15px $shadow-color;
    border-radius: 22px;


    ::v-deep.q-focus-helper {
      display: none;
    }

    ::v-deep.q-item__section {
      color: $accent-orange;
      padding: 0;
      margin-left: 15px;

      i {
        font-size: 12px;
      }
    }

    ::v-deep.q-item {
      padding: 8px;
    }


    ::v-deep.q-expansion-item__content {
      position: absolute;
      z-index: 1;
      width: 100%;
      background-color: $light-white;
    }

    &::v-deep.q-expansion-item--expanded {
      border-radius: 22px 22px 0px 0px !important;
    }
  }

  &__actions-exp-header {
    display: flex;
    align-items: center;
  }

  &__actions-exp-header-left {
    width: 32px;
    height: 40px;
    background: $accent-orange;
    border-radius: 16px;
    color: $light-white;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 12px;
  }

  &__actions-exp-header-left-text {
    font-weight: 500;
    font-size: 14px;
    line-height: 140%;
    color: $black-02;
  }

  &__actions-exp-list {
    list-style-type: none;
    padding: 0 15px 11px 15px;
    margin-top: 11px;
    margin-bottom: 0;
  }

  &__actions-exp-item {
    padding: 11px 20px;
    border-radius: 10px;
    font-size: 12px;
    line-height: 150%;
    color: $black-03;

    &:hover {
      background-color: $light-background;
    }
  }
}

</style>
