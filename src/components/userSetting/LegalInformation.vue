<template>
  <div class="legal-info">
    <h4 class="legal-info__title">Правовая информация</h4>

    <ul class="legal-info__list">
      <li v-for="(item, index) in legalInfoList" :key="index" class="legal-info__item">
        <span class="legal-info__item-text">{{item.label}}</span>
        <span class="legal-info__item-icon">
          <icon name="next-icon"></icon>
        </span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class LegalInformation extends Vue {
  legalInfoList = [{
      label: 'Как мы защищаем ваши данные',
      link: ''
    }, {
      label: 'Политика конфиденциальности',
      link: ''
    }, {
      label: 'Правила оцифровки документов',
      link: ''
    }, {
      label: 'Условия предоставления услуг',
      link: ''
    },{
      label: 'Как это работает',
      link: ''
    }]
}
</script>

<style lang="scss" scoped>

.legal-info {

  &__title {
    font-weight: 500;
    font-size: 16px;
    line-height: 130%;
    color: $black-01;
    margin-bottom: 32px;
  }

  &__list {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }

  &__item {
    margin-bottom: 12px;
    padding: 18px;
    background-color: $light-white;
    display: flex;
    align-items: center;
    border-radius: 16px;
    cursor: pointer;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__item-icon {
    margin-right: 10px;
    color: $accent-color;
    transform: rotate(180deg);
    display: block;
    margin-left: auto;

    svg {
      width: 4px;
      height: 8px;
    }
  }

  &__item-text {
    font-weight: 500;
    font-size: 14px;
    line-height: 140%;
    color: $black-02;
    display: block;
  }
}

</style>
