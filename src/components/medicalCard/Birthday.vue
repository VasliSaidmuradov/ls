<template>
  <input-date
      class="birthday"
      :value="birthday"
      :format="'dd MMMM yyyy'"
      :label="'Ваш день рождения'"
      @change-value="changeBirthday"
  />
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import InputDate from "@/components/InputDate.vue";

  @Component({
    components: {InputDate}
  })
  export default class Birthday extends Vue {
    get birthday(): string {
      return this.$store.state.medicalCard.birthday;
    }

    changeBirthday(value: string) {
      this.$store.commit('medicalCard/setPropertyInStore', {name: 'birthday', value});
    }
  }
</script>

<style lang="scss">
  .birthday {
    margin-bottom: 25px;
  }
</style>
