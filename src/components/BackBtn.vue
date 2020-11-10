<template>
  <div class="back-btn">
    <q-btn unelevated class="button1--border" padding="8px 10px" @click="back()">
      <icon name="next-icon"></icon>
    </q-btn>
    <span class="header__content-back-text">Назад</span>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class BackBtn extends Vue {
  back() {
    window.history.back();
  }
}
</script>

<style lang="scss">
@import "../styles/vars";

.back-btn {
  display: flex;
  align-items: center;

  .q-btn {
    width: 24px;
    height: 24px;
    border-radius: 8px;

    .q-btn__wrapper {
      padding: 0 !important;

      svg {
        width: 4px;
      }
    }
  }
}

</style>
