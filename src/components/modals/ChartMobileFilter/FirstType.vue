<template>
  <div class="first-type">
    <back-btn
        class="back-btn"
        @go-back="changeType"
    />

    <span class="title">Выберите лабораторию</span>

    <checkbox-input
        class="checkbox"
        v-for="(checkbox, index) in laboratoryList"
        :key="index"
        :value="true"
        :label="checkbox"
    />

    <main-btn
        class="btn-accept"
        type="small-bg"
        width="122"
        height="42"
        text="Применить"
    >
      <template v-slot:icon>
        <icon name="gull-icon" class="btn-accept-icon"/>
      </template>
    </main-btn>
  </div>
</template>

<script lang="ts">
  import { Component, Emit, Prop, Vue } from 'vue-property-decorator';
  import CheckboxInput from '@/components/UI/inputs/CheckboxInput.vue';
  import MainBtn from '@/components/UI/buttons/MainBtn.vue';
  import BackBtn from '@/components/UI/buttons/BackBtn.vue';

  @Component({
    components: { BackBtn, MainBtn, CheckboxInput },
  })
  export default class FirstType extends Vue {

    @Prop() laboratoryList: Array<string>;

    @Emit('change-type')
    changeType() {
      return 0
    }
  }
</script>

<style lang="scss" scoped>
  .first-type {
    .title {
      display: block;
      color: $black-02;
      font-weight: 600;
      font-size: 14px;
      line-height: 130%;
    }

    .checkbox {
      margin-top: 12px;
    }

    .back-btn {
      margin-bottom: 35px;
    }

    .btn-accept {
      margin-top: 35px;

      &-icon {
        width: 12px;
        height: 12px;
        color: $light-white;
      }
    }
  }
</style>
