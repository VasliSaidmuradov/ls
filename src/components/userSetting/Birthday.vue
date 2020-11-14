<template>
  <div class="birthday" id="jopa">
    <label class="form-label" @click="birthdayPopup = !birthdayPopup">Ваш день рождения</label>
    <q-input class="form-input"
             @click="birthdayPopup = !birthdayPopup"
             :value="birthday ? $date(new Date(birthday),'dd MMMM yyyy'): ''"/>
    <q-dialog
        @keydown.enter="birthdayPopup = false"
        @hide="onClose"
        v-model="birthdayPopup"
    >
      <q-date v-model="birthday"></q-date>
    </q-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { format } from 'date-fns'

@Component({})
export default class Birthday extends Vue {
  birthdayPopup = false;
  format = format;

  get birthday(): string {
    return this.$store.state.medicalCard.birthday;
  }

  set birthday(value: string) {
    this.$store.commit('medicalCard/setPropertyInStore', {name: 'birthday', value});
  }

  onClose() {
    this.birthdayPopup = false;
  }

}
</script>

<style lang="scss">
  .birthday {
    margin-bottom: 25px;
  }
</style>
