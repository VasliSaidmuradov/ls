<template>
  <div class="select">
    <q-expansion-item class="select__content" v-model="isHide" @before-hide="onSelect">
      <template v-slot:header>
        <span class="select__value-icon" :class="{'active': checkedArr}">
          {{checkedArr ? `Выбрано: ${checkedArr} категории` : 'Выберите группу'}}
        </span>
      </template>
      <div class="select__options scrollable">
        <div v-for="rubric in analyzeRubrics" :key="rubric.id">
          <div v-if="!rubric.subrubrics.length" class="select__options-list select__options-list-first">
            <CheckboxInput
              :id="rubric.id"
              :value="checkboxValues[rubric.id]"
              :label="`${rubric.id}-${rubric.name}`"
              @change-value="onCheckChange(rubric.id)"
            />
          </div>
          <h5 v-if="rubric.subrubrics.length" class="select__options-title">{{ rubric.name }}</h5>
          <div v-if="rubric.subrubrics.length" class="select__options-list select__options-list-second">
            <CheckboxInput
              v-for="subrubric in rubric.subrubrics"
              :key="subrubric.id"
              :id="subrubric.id"
              :value="checkboxValues[subrubric.id]"
              :label="`${subrubric.id}-${subrubric.name}`"
              @change-value="onCheckChange(subrubric.id)"
            />
          </div>
        </div>
      </div>
      <MainBtn type="small-bg"
               @click-btn="onSelect"
               text="Применить"
               class="select__btn">
        <template v-slot:icon>
          <icon name="check-icon"></icon>
        </template>
      </MainBtn>
    </q-expansion-item>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Emit } from 'vue-property-decorator';
import MainSelect from '@/components/UI/MainSelect.vue';
import CheckboxInput from '@/components/UI/inputs/CheckboxInput.vue';
import MainBtn from '@/components/UI/buttons/MainBtn.vue';

@Component({
  components: {
    MainSelect,
    CheckboxInput,
    MainBtn
  }
})
export default class AnalyzesSelect extends Vue {
  checkboxState: {[key: string]: any} = {};
  isHide: boolean = false;
  filteredRubrics: [] = [];

  async mounted() {}

  get checkboxValues() {
    this.checkboxState = {...this.$store.state.analyzes.checkBoxValues};
    return this.$store.state.analyzes.checkBoxValues;
  }
  get checkedArr(): number {
    return this.$store.getters['analyzes/checkedArr'];
  }
  get analyzeRubrics() {
    const rubrics = [...this.$store.state.analyzes.analyzeRubricsList];
    const withSubrubrics = rubrics.filter(el => el.subrubrics.length);
    const withoutSubrubrics = rubrics.filter(el => !el.subrubrics.length);
    return [...withoutSubrubrics, ...withSubrubrics];
  }
  get getSelectedRubricIds() {
    return this.$store.getters['analyzes/getSelectedRubricIds'];
  }

  onCheckChange(key: number) {
    this.checkboxState[key] = !this.checkboxState[key];
    this.$store.commit('analyzes/setSelectedRubricIds', key);
    this.$store.commit('analyzes/setPropertyInStore', {name: 'checkBoxValues', value: this.checkboxState});
  }

  @Emit('select')
  onSelect() {
    this.isHide = false;
  }

}
</script>

<style lang="scss" scoped>
.select {
  display: flex;
  width: 100%;
  align-items: center;
  border: 1px solid $light-stroke;
  border-radius: 12px;
  margin-right: 55px;

  ::v-deep.q-expansion-item--expanded {
    background-color: $light-white;
    border-radius: 12px 12px 0 0;

    .select__options {
      border-top: none;
    }
  }

  &__checkbox {
    margin-top: 15px;
  }

  &__value-text {
    font-size: 14px;
    line-height: 130%;
    color: $black-03;
  }

  &__content {
    padding: 15px 15px 15px 20px;
    border-radius: 12px;
    width: 100%;

    ::v-deep.q-item {
      padding: 0;
      min-height: auto;
    }

    ::v-deep.q-item__section {
      color: $accent-color;
      margin-left: auto;
      padding: 0;
    }

    ::v-deep.q-expansion-item__content {
      position: absolute;
      z-index: 1;
      width: calc(100% + 37px);
      left: -21px;
      margin-top: 6px;
      background: $light-white;
      box-sizing: border-box;
      border-radius: 0 0 12px 12px;
      border: 1px solid $light-stroke;
      border-top: none;
      padding: 0 32px 32px
    }

    ::v-deep.select__options-title {
      margin: 25px 0;
      font-weight: bold;
      font-size: 12px;
      line-height: 15px;
      color: $black-02;
    }

    ::v-deep.select__options-list {

      .checkbox-wrapper {
        display: flex;
        align-items: flex-start;
        margin-bottom: 15px;

        .label {
          font-size: 12px;
          line-height: 150%;
          color: $black-03;
          margin-left: 12px;
        }
      }

      .checkbox-block {
        min-width: 16px;
      }
    }
  }

  &__options {
    padding: 15px 15px 15px 20px;
    width: 100%;
    max-width: 540px;
    max-height: 300px;
    overflow-y: auto;
  }
  &__btn {
    margin-top: 7px;
    padding: 2px 14px;
    color: #fff;

    svg {
      width: 10px;
    }
  }
}

</style>
