<template>
  <div class="form-input">
    <label class="form-label" v-if="label">{{label}}</label>
    <q-input
        @click="toggleDateModal(true)"
        :value="value ? $date(new Date(value), format): ''"/>
    <q-dialog
        @hide="toggleDateModal(false)"
        v-model="isDateModalOpen"
    >
      <q-date :value="value" @input="changeValue"></q-date>
    </q-dialog>
  </div>
</template>

<script lang="ts">
  import {Component, Emit, Prop, Vue} from 'vue-property-decorator';

  @Component({})
  export default class InputDate extends Vue {
    @Prop({required: true}) value: Date | string
    @Prop({default: 'dd.MM.yyyy' }) format: string
    @Prop() label: string

    isDateModalOpen = false;

    @Emit('change-value')
    changeValue(value: string) {
      return value
    }

    toggleDateModal(val: boolean) {
      this.isDateModalOpen = val
    }
  }
</script>
