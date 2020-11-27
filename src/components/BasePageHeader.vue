<template>
  <div class="base-page-header">
    <div class="base-page-header__back">
      <BackBtn :type="2" @go-back="goBack"/>
    </div>

    <h4 class="base-page-header__title">{{title}}</h4>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import BackBtn from '@/components/UI/buttons/BackBtn.vue';

@Component({
  components: {
    BackBtn
  }
})
export default class BasePageHeader extends Vue {
@Prop() title: string;

  goBack() {
    this.$router.go(-1)
  }

}
</script>

<style lang="scss">


.base-page-header {
  margin-bottom: 25px;
  padding-top: 12px;

  &__back {
    color: $accent-color;
  }

  &__title {
    font-weight: 500;
    font-size: 20px;
    line-height: 120%;
    color: $black-02;
    margin-bottom: 0;
    margin-top: 15px;
  }
}

</style>
