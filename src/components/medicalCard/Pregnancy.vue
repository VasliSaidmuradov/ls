<template>
  <div class="pregnancy">
    <h4 class="pregnancy__title medical-card__title">Беременность</h4>
    <div class="pregnancy__header">
      <div class="pregnancy__was-pregnant">
        <label class="form-label">Были ли вы беременны?</label>
        <div class="form-toggle-btn">
          <q-btn-toggle
              name="wasPregnant"
              v-model="wasPregnant"
              padding="13px 25px"
              :options="wasPregnantOptions"
          />
        </div>
      </div>

      <div class="pregnancy__pregnant-count" v-if="iswWasPregnant">
        <div class="form-input">
          <label class="form-label" for="pregnantCount">Количество беременностей</label>
          <q-input
              type="number"
              for="pregnantCount"
              id="pregnantCount"
              :rules="rules"
              ref="pregnantCount"
              @blur="savePregnantCount"
              v-model.number="pregnantCount"
          />
        </div>
      </div>
    </div>

    <template v-if="iswWasPregnant">
      <div class="pregnancy__body">
        <div class="childbirth">
          <div class="childbirth__checkbox">
            <q-checkbox
                class="form-checkbox form-checkbox--with-label"
                label="Все роды прошли удачно"
                v-model="childbirthIsSuccess" />
          </div>

          <div class="childbirth__toggles" v-if="!childbirthIsSuccess">
            <div class="childbirth__toggles-item form-toggle form-toggle--with-label">
              <q-toggle v-model="abortiont" label="Аборты"/>
            </div>
            <div class="childbirth__toggles-item form-toggle form-toggle--with-label">
              <q-toggle v-model="miscarriages" label="Выкидыши"/>
            </div>
            <div class="childbirth__toggles-item form-toggle form-toggle--with-label">
              <q-toggle v-model="nonDeveloping" label="Неразвивающаяся беременность"/>
            </div>
          </div>
        </div>
      </div>

      <div class="pregnancy__footer">
        <div class="pregnancy__footer-checkbox form-checkbox form-checkbox--with-label">
          <q-checkbox label="Я беременна сейчас"
                      v-model="isPregnantNow" />
        </div>

          <div class="pregnancy__footer-content" v-if="isPregnantNow">
            <div class="pregnancy__footer-date">
              <InputDate
                  :value="lastMenstruation"
                  label="Дата последней менструации"
                  placeholder="введие дату"
                  @change-value="lastMenstruationChange"/>
            <div class="pregnancy__footer-desk">
              Эта информация нужна для определения триместров беременности, которые в свою очередь влияют на анализы и референсные зоны
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Vue, } from 'vue-property-decorator';
import BaseFormMixins from '@/mixins/base-form-mixins';
import {QInput} from 'quasar';
import {format} from 'date-fns';
import {serverDateFormat} from '@/interfaces/api.interface';
import InputDate from '@/components/InputDate.vue';

export interface IRefs {
  pregnantCount: QInput;
}

@Component({
  components: {
    InputDate
  }
})
export default class Pregnancy extends BaseFormMixins {
  showPopup = false;
  wasPregnantOptions = [
    {
      label: 'Нет',
      value: false,
    },
    {
      label: 'Беременность была',
      value: true,
    },
  ];

  rules: Function[] = [];

  $refs: IRefs & Vue['$refs'];

  mounted() {
    this.rules.push(this.inputRules.required);
  }

  get wasPregnant(): boolean {
    return this.$store.state.personalArea.medicalCard.is_pregnancies;
  }

  set wasPregnant(value: boolean) {
    this.$store.dispatch('personalArea/updateMedicalCardData', {is_pregnancies: value})
  }

  get pregnantCount(): number {
    return this.$store.state.personalArea.medicalCard.pregnancies_count;
  }

  set pregnantCount(value) {
    this.$store.commit('personalArea/setMedicalCardProperty', {name: 'pregnancies_count', value});
  }

  savePregnantCount() {
    if (!this.$refs.pregnantCount.validate()) return;

    this.$store.dispatch('personalArea/updateMedicalCardData', {pregnancies_count: this.pregnantCount});
  }

  get iswWasPregnant(): boolean {
    return this.wasPregnant;
  }

  get childbirthIsSuccess(): boolean {
    return this.$store.state.personalArea.medicalCard.all_pregnancies_success;
  }

  set childbirthIsSuccess(value: boolean) {
    this.$store.dispatch('personalArea/updateMedicalCardData', {all_pregnancies_success: value});
  }

  get abortiont(): boolean {
    return this.$store.state.personalArea.medicalCard.is_abortion;
  }

  set abortiont(value: boolean) {
    this.$store.dispatch('personalArea/updateMedicalCardData', {is_abortion: value});
  }

  get miscarriages(): boolean {
    return this.$store.state.personalArea.medicalCard.is_miscarriages;
  }

  set miscarriages(value: boolean) {
    this.$store.dispatch('personalArea/updateMedicalCardData', {is_miscarriages: value});
  }

  get nonDeveloping(): boolean {
    return this.$store.state.personalArea.medicalCard.is_undeveloped_pregnancy;
  }

  set nonDeveloping(value: boolean) {
    this.$store.dispatch('personalArea/updateMedicalCardData', {is_undeveloped_pregnancy: value});
  }

  get isPregnantNow(): boolean {
    return this.$store.state.personalArea.medicalCard.is_pregnant_now;
  }

  set isPregnantNow(value: boolean) {
    this.$store.dispatch('personalArea/updateMedicalCardData', {is_pregnant_now: value});
  }

  get lastMenstruation(): string {
    return this.$store.state.personalArea.medicalCard.last_menstruation_date;
  }

  lastMenstruationChange(value: string) {
    this.$store.dispatch('personalArea/updateMedicalCardData', {last_menstruation_date: format(new Date(value), serverDateFormat)})
  }

  onClose() {
      this.showPopup = false;
  }

}
</script>

<style lang="scss">
.pregnancy {

  &__title {
    margin-bottom: 33px;
  }

  &__header {
    display: flex;
    justify-content: flex-start;

    @include media-breakpoint-up($breakpoint-pre-md) {
      flex-direction: column;
    }
  }

  &__was-pregnant {
    display: flex;
    flex-direction: column;
    width: auto;
    min-width: 260px;
  }

  &__pregnant-count {
    display: flex;
    flex-direction: column;
    margin-left: 25px;
    min-width: 180px;

    @include media-breakpoint-up($breakpoint-pre-md) {
      margin-left: 0;
      margin-top: 30px;
    }
  }


  .childbirth {
    margin-bottom: 30px;

    &__checkbox {
      margin-top: 40px;
    }

    &__toggles {
      display: flex;
      margin-top: 30px;

      @include media-breakpoint-up($breakpoint-xs) {
        flex-direction: column;
      }
    }

    &__toggles-item {
      margin-right: 35px;

      &:last-child {
        margin-right: 0;
      }

      @include media-breakpoint-up($breakpoint-xs) {
        margin-right: 0;
        margin-bottom: 18px;

        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }

  &__footer {
    background: #FFFFFF;
    border-radius: 15px;
    padding: 30px;
  }

  &__footer-checkbox {
    margin-bottom: 30px;
  }

  &__footer-desk {
    margin-top: 10px;
    font-size: 14px;
    line-height: 130%;
    color: $black-04;
  }
}
</style>
