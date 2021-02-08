<template>
  <div class="form-input" :class="customClass">
    <label class="form-label" v-if="label">{{label}}</label>
    <q-input
        @click="toggleDateModal(true)"
        :rules="propRules"
        ref="dateInput"
        :value="date ? $date(new Date(date), format): ''"
        :placeholder="placeholder"
    />

    <q-dialog
        @hide="toggleDateModal(false)"
        v-model="isDateModalOpen"
    >
      <q-date :value="date ? $date(new Date(date), 'yyyy/MM/dd') : ''" @input="changeValue"></q-date>
    </q-dialog>
  </div>
</template>

<script lang="ts">
  import {Component, Emit, Prop, Vue} from 'vue-property-decorator';
  import BaseFormMixins from '@/mixins/base-form-mixins';
  import {QInput} from 'quasar';

  export interface IRefs {
    dateInput: QInput;
  }

  @Component({})
  export default class InputDate extends BaseFormMixins {
    @Prop({required: false, default: ''}) value: Date | string
    @Prop({default: 'dd.MM.yyyy'}) format: string
    @Prop() label: string
    @Prop({default: 'Введите значение'}) placeholder: string
    @Prop({default: 'input-date'}) customClass: string;
    @Prop({default: () => []}) propRules: Function[];

    date: Date | string = '' || this.value;

    isDateModalOpen = false;

    $refs: IRefs & Vue['$refs'];

    @Emit('change-value')
    changeValue(value: string) {
      this.date = value;
      return value
    }

    toggleDateModal(val: boolean) {
      this.isDateModalOpen = val
    }

    validate(): Promise<boolean> | boolean {
      return this.$refs.dateInput.validate();
    }
  }
</script>
