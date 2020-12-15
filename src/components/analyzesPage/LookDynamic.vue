<template>
  <div class="look-dynamic">
    <span class="look-dynamic__text">
      Вы можете сравнить несколько разных биомаркеров между собой в динамике.
      Для этого нажмите на кнопку «Смотреть динамику»
    </span>

    <main-btn
        class="look-dynamic__btn"
        :text="'Смотреть в динамике'"
        :type="'primary'"
        :width="225"
        :height="56"
        @click-btn="goToDynamicAnalyzesPage"
    >
      <template v-slot:icon>
        <icon name="dynamic-icon" class="look-dynamic__btn-icon"/>
      </template>
    </main-btn>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import MainBtn from '@/components/UI/buttons/MainBtn.vue';
  import { IRouter } from '@/interfaces/router.interface';

  @Component({
    components: { MainBtn },
  })
  export default class LookDynamic extends Vue {
    goToDynamicAnalyzesPage() {
      this.$router.push({ name: IRouter.ROUTE_NAME.DYNAMICS_ANALYZES });
    }
  }
</script>

<style lang="scss" scoped>
  .look-dynamic {
    margin-top: 20px;
    max-width: 722px;
    padding: 0 40px 25px 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    border: 1px solid $light-stroke;
    border-radius: 15px;

    &__btn {
      margin-top: 25px;
    }

    &__text {
      margin-top: 25px;
      max-width: 353px;
      color: $black-01;
      font-weight: normal;
      font-size: 14px;
      line-height: 130%;
    }

    &__btn-icon {
      width: 24px;
      height: 24px;
      color: $accent-color;
    }
  }
</style>
