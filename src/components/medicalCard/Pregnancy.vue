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
              <label class="form-label" @click="showPopup = true">Дата последней менструации</label>
              <q-input class="form-input"
                       @click="showPopup = !showPopup"
                       :class="{'form-input--empty': !lastMenstruation}"
                       :value="lastMenstruation ? $date(new Date(lastMenstruation),'dd MMMM yyyy'): ''"/>
                <q-dialog
                    @keydown.enter="birthdayPopup = false"
                    @hide="onClose"
                    v-model="showPopup"
                    ref="lastMenstruation">
                  <q-date v-model="lastMenstruation"></q-date>
                </q-dialog>
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
import {IMedicalCard} from '@/interfaces/medical-card.interface';

@Component({})
export default class Pregnancy extends Vue {
  showPopup = false;
  wasPregnantOptions = [
    {
      label: 'Нет',
      value: IMedicalCard.WasPregnant.NO,
    },
    {
      label: 'Беременность была',
      value: IMedicalCard.WasPregnant.YES,
    },
  ]

  get wasPregnant(): IMedicalCard.WasPregnant {
    return this.$store.state.medicalCard.wasPregnant;
  }

  set wasPregnant(value: IMedicalCard.WasPregnant) {
    this.$store.commit('medicalCard/setPropertyInStore', {name: 'wasPregnant', value});
  }

  get pregnantCount(): number {
    return this.$store.state.medicalCard.pregnantCount;
  }

  set pregnantCount(value) {
    this.$store.commit('medicalCard/setPropertyInStore', {name: 'pregnantCount', value});
  }

  get iswWasPregnant(): boolean {
    return this.wasPregnant === 1;
  }

  get childbirthIsSuccess(): boolean {
    return this.$store.state.medicalCard.childbirthIsSuccess;
  }

  set childbirthIsSuccess(value: boolean) {
    this.$store.commit('medicalCard/setPropertyInStore', {name: 'childbirthIsSuccess', value})
  }

  get abortiont(): boolean {
    return this.$store.state.medicalCard.abortiont;
  }

  set abortiont(value: boolean) {
    this.$store.commit('medicalCard/setPropertyInStore', {name: 'abortiont', value})
  }

  get miscarriages(): boolean {
    return this.$store.state.medicalCard.miscarriages;
  }

  set miscarriages(value: boolean) {
    this.$store.commit('medicalCard/setPropertyInStore', {name: 'miscarriages', value})
  }

  get nonDeveloping(): boolean {
    return this.$store.state.medicalCard.nonDeveloping;
  }

  set nonDeveloping(value: boolean) {
    this.$store.commit('medicalCard/setPropertyInStore', {name: 'nonDeveloping', value})
  }

  get isPregnantNow(): boolean {
    return this.$store.state.medicalCard.isPregnantNow;
  }

  set isPregnantNow(value: boolean) {
    this.$store.commit('medicalCard/setPropertyInStore', {name: 'isPregnantNow', value})
  }

  get lastMenstruation(): string {
    return this.$store.state.medicalCard.lastMenstruation;
  }

  set lastMenstruation(value: string) {
    this.$store.commit('medicalCard/setPropertyInStore', {name: 'lastMenstruation', value})
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
