<template>
  <div class="medical-card" :class="{'medical-card--page layout layout--mobile': isMedicalCardPage}">

    <div class="medical-card__header" v-if="isMedicalCardPage">
      <BasePageHeader title="Медицинская карта"/>
    </div>

    <div class="medical-card__expansion-info">
      <q-expansion-item
          default-opened
          style="border-radius: 30px"
          header-class="medical-card__expansion-header"
          expand-icon-class="text-white"
      >

        <template v-slot:header>
          <div class="medical-card__expansion-info-header">
            <span class="medical-card__expansion-info-header-text">Недавно добавленные документы</span>
          </div>
        </template>
        <q-card>
          <q-card-section class="expansion-info">
            <p>Друзья, помогите нам стать лучше и создать удобный сервис для управления вашим здоровьем! Сейчас мы находимся на этапе разработки второй версии продукта, который станет вашей личной медицинской картой. У вас появится возможность хранить все свое здоровье в одном месте и предоставлять врачам первичную информацию в 2 клика!</p>
            <p>Пока что некоторые данные никак не будут учитываться в приложении, но в ближайшее время все изменится.</p>
            <p>Такие факторы, как пол, раса, национальность, возраст, беременность и менструальные циклы напрямую влияют на анализы и их референсные зоны. В будущем мы будем их учитывать.</p>
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </div>

    <div class="medical-card__form">
      <q-form>
        <Race />
        <Nationality />
        <RegionOfResidence />
        <Height />
        <Weight />
        <Birthday />
        <BloodType />
        <BiologicalSex />
        <Pregnancy />
        <MenstrualCycles />
        <ComponentWithAddReaction :value.sync="hormonalDrugs" :data="hormonalDrugsData"/>
        <ComponentWithAddReaction :value.sync="allergicReactions" :data.sync="allergicReaction"/>
      </q-form>
    </div>
  </div>
</template>


<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import Pregnancy from '@/components/medicalCard/Pregnancy.vue';
import MenstrualCycles from '@/components/medicalCard/MenstrualCycles.vue';
import ComponentWithAddReaction from '@/components/ComponentWithAddReaction.vue';
import BiologicalSex from '@/components/medicalCard/BiologicalSex.vue';
import Race from '@/components/medicalCard/Race.vue';
import Nationality from '@/components/medicalCard/Nationality.vue';
import RegionOfResidence from '@/components/medicalCard/RegionOfResidence.vue';
import Height from '@/components/medicalCard/Height.vue';
import BloodType from '@/components/medicalCard/BloodType.vue';
import Weight from '@/components/medicalCard/Weight.vue';
import Birthday from '@/components/userSetting/Birthday.vue';
import {IMedicalCard} from '@/interfaces/medical-card.interface';
import IAddReactionsFiledData = IMedicalCard.IAddReactionsFiledData;
import IReaction = IMedicalCard.IReaction;
import {IRouter} from '@/interfaces/router.interface';
import ROUTE_NAME = IRouter.ROUTE_NAME;
import BasePageHeader from '@/components/BasePageHeader.vue';

  @Component({
    components: {
      Pregnancy,
      MenstrualCycles,
      ComponentWithAddReaction,
      BiologicalSex,
      Race,
      Nationality,
      RegionOfResidence,
      Height,
      BloodType,
      Weight,
      Birthday,
      BasePageHeader
    }
  })
  export default class MedicalCard extends Vue {
    hormonalDrugsData: IAddReactionsFiledData = {
      title: 'Прием гормональных препаратов',
      inputPlaceholder: 'Какой препарат принимаете?',
      areaPlaceholder: 'Какой препарат принимаете?',
      property: 'hormonalDrugs',
      addFilesBtnText: 'Добавить препарат',
      addReactionBtnText: 'Добавить реакцию',
    };

    allergicReaction: IAddReactionsFiledData = {
      title: 'Аллергические реакции',
      inputPlaceholder: 'Какой препарат принимаете?',
      areaPlaceholder: 'Какой препарат принимаете?',
      property: 'allergicReactions',
      addFilesBtnText: 'Добавить аллергию',
      addReactionBtnText: 'Опишите реакцию',
    }

    get hormonalDrugs(): IReaction[] {
      return this.$store.state.medicalCard.hormonalDrugs
    }

    get allergicReactions(): IReaction[] {
      return this.$store.state.medicalCard.allergicReactions
    }

    get isMedicalCardPage(): boolean {
      return this.$route.name === ROUTE_NAME.MEDICAL_CARD_PAGE;
    }
  }

</script>

<style lang="scss">
@import "../../styles/vars";

.medical-card {
  &__expansion-info {
    margin-bottom: 40px;

    .q-expansion-item--expanded {
      box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.03);

      .medical-card__expansion-header {
        border-radius: 15px 15px 0px 0px;
      }

      .q-card {
        border-radius: 0px 0px 15px 15px;
      }
    }

    .q-item__label {
      font-weight: 500;
      font-size: 14px;
      line-height: 140%;
      color: $black-01;
    }
  }

  &__expansion-info-header {
    display: flex;
    align-items: center;
    margin-right: auto;
    font-weight: 500;
    font-size: 14px;
    line-height: 140%;
    color: $black-01;
  }

  &__expansion-info-header-text {
    font-size: 14px;
    line-height: 130%;
    color: #333333;
  }

  &__expansion-header {
    font-size: 13px;
    line-height: 130%;
    font-weight: 500;
    color: $text-color;
    background-color: $light-white;
    border-radius: 15px;

    .q-expansion-item__toggle-icon {
      color: $light-stroke;
      width: 24px;
      height: 25px;
      display: flex;
      align-items: center;
      border-radius: 8px;
      border: 1px solid $light-stroke;
    }

    q.focus-helper {
      display: none;
    }
  }

  &__toggle-btn {
    .q-btn {
      text-transform: none;
      font-weight: 500;
      font-size: 13px;
      color: #424056;
      border: 1px solid $light-stroke;
      margin: 0 5px;

      &.bg-primary {
        border-radius: 18px !important;
        background-color: $accent-color !important;
        border-color: transparent;
      }
    }

    .q-btn-group {
      box-shadow: unset;
    }
  }

  &__title {
    margin-top: 0;
    font-weight: 500;
    font-size: 20px;
    line-height: 120%;
    color: $gray-01;
  }
}
</style>
