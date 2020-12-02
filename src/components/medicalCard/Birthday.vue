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
  import {format} from 'date-fns';
  import {serverDateFormat} from '@/interfaces/api.interface';

  @Component({
    components: {InputDate}
  })
  export default class Birthday extends Vue {

    get birthday(): string {
      return this.$store.state.personalArea.medicalCard.birth_date;
    }

    changeBirthday(value: string) {
      this.$store.dispatch('personalArea/updateMedicalCardData', {birth_date: format(new Date(value), serverDateFormat)})
    }

  }
</script>

<style lang="scss">
  .birthday {
    margin-bottom: 25px;
  }
</style>
