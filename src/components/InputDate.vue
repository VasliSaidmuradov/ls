<template>
  <div class="form-input" :class="customClass">
    <label class="form-label" v-if="label">{{label}}</label>
    <q-input
        @click="toggleDateModal(true)"
        :rules="propRules"
        ref="dateInput"
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
  import BaseFormMixins from '@/mixins/base-form-mixins';
  import {QInput} from 'quasar';

  @Component({})
  export default class InputDate extends BaseFormMixins {
    @Prop({required: true}) value: Date | string
    @Prop({default: 'dd.MM.yyyy' }) format: string
    @Prop() label: string;
    @Prop({default: 'input-date'}) customClass: string;
    @Prop({default: () => []}) propRules: Function[];

    isDateModalOpen = false;

    @Emit('change-value')
    changeValue(value: string) {
      return value
    }

    toggleDateModal(val: boolean) {
      this.isDateModalOpen = val
    }

    validate(): Promise<boolean> | boolean {
      return (this.$refs.dateInput as QInput).validate();
    }
  }
</script>
