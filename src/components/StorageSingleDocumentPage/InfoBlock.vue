<template>
  <div class="info-block">
    <div class="info-block__date">
      <icon name="calendar-icon" class="info-block__date-icon"/>
      <span class="info-block__date-text">11.03.2020</span>
    </div>

    <div class="info-block__wrapper">
      <div class="info-block__left">
        <span class="info-block__title">Длинное название документа в две строки</span>
        <span class="info-block__subtitle">Всего загружено: 3 страницы, 17 анализов</span>

        <div class="info-block__status-wrapper">
          <div class="info-block__status-item">
            <div class="info-block__status-circle">15</div>
            <span class="info-block__status-text">Распознано и добавлено</span>
          </div>
        </div>
      </div>

      <div class="info-block__right">
        <icon name="delete-icon" class="info-block__delete-icon"/>
        <icon name="edit-icon" class="info-block__edit-icon"/>
        <icon name="download-icon" class="info-block__download-icon"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';

  @Component({})
  export default class InfoBlock extends Vue {

  }
</script>

<style lang="scss" scoped>
  .info-block {
    max-width: 838px;
    margin-top: 20px;
    background-color: $light-white;
    padding: 43px 44px;
    border-radius: 25px;
    box-shadow: 0 4px 15px 0 $shadow-color;

    &__date {
      display: flex;
      align-items: center;
    }

    &__date-icon {
      width: 30px;
      height: 30px;
    }

    &__date-text {
      margin-top: 4px;
      color: $accent-color;
      font-weight: 500;
      font-size: 12px;
      line-height: 15px;
    }

    &__wrapper {
      display: flex;
      align-items: center;
    }

    &__left {
      width: 719px;
    }

    &__title {
      margin-top: 20px;
      display: block;
      color: $black-01;
      font-size: 20px;
      line-height: 24px;
      font-weight: 500;
    }

    &__subtitle {
      margin-top: 20px;
      display: block;
      font-size: 12px;
      line-height: 14.52px;
    }

    &__status {
      &-wrapper {
        margin-top: 20px;
        display: flex;
        align-items: center;
      }

      &-item {
        display: flex;
        align-items: center;
      }

      &-circle {
        width: 38px;
        height: 38px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        background-color: $status-green;
        font-size: 12px;
        line-height: 14.52px;
        font-weight: 700;
        color: $light-white;
      }

      &-text {
        max-width: 123px;
        margin-left: 14px;
        letter-spacing: 0.6px;
        color: $gray-01;
        font-size: 14px;
        line-height: 130%;
      }
    }

    &__right {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    &__delete-icon {
      width: 12px;
      height: 14px;
      cursor: pointer;
      color: $black-05;
    }

    &__edit-icon {
      width: 11px;
      height: 11px;
      margin-top: 30px;
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
  }
</style>
