<template>
  <div class="add-analyzes" :class="{ 'add-analyzes--popup': isPopup }">
    <h4 class="add-analyzes__title">Добавить анализ</h4>
    <div class="add-analyzes__content">
      <div class="add-analyzes__content-input form-input form-input--bordered">
        <q-input color="purple-12" v-model="searchedValue" debounce="500" @input="searchAnalyzes">
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>
        <div class="add-analyzes__content-input-list" v-if="searchedValue">
          <div class="add-analyzes__content-input-list-content">
            <template v-if="searchedList.length">
              <div class="add-analyzes__content-input-list-item" v-for="(item, index) in searchedList" :key="index">
                <span class="add-analyzes__content-input-list-item-title">{{ item.name }}</span>
                <MainBtn
                  type="main-btn-small"
                  bcg-color="transparent"
                  text="Добавить анализ"
                  @click-btn="addAnalyzes(item)"
                >
                  <template v-slot:icon>
                    <icon name="add-icon"></icon>
                  </template>
                </MainBtn>
              </div>
            </template>
            <div v-else>empty</div>
          </div>
        </div>
      </div>
      <div class="add-analyzes__content-added" v-if="addedAnalyzes.length">
        <h5 class="add-analyzes__content-added-title">Выбрано {{ addedAnalyzes.length }} анализов:</h5>
        <ul class="add-analyzes__content-added-list">
          <li class="add-analyzes__content-added-item">
            <AnalyzesCard v-for="item in addedAnalyzes" :data="item" :key="item.id" />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator';
import { IAnalyzes } from '@/interfaces/analyzes.interface';
import MainBtn from '@/components/UI/buttons/MainBtn.vue';
import AnalyzesCard from '@/components/analyzes/AnalyzesCard.vue';
import { mapGetters } from 'vuex';

@Component({
  components: {
    MainBtn,
    AnalyzesCard,
  },
  computed: mapGetters({
    addedAnalyzes: 'analyzes/getAddedAnalyzes',
  }),
})
export default class AddAnalyzes extends Vue {
  @Prop({ default: false, type: Boolean }) isPopup: boolean;

  searchedValue = '';
  searchedList: IAnalyzes.IAnalyzesForAddItem[] = [];

  get laboratoriesList(): IAnalyzes.ILaboratories[] {
    return this.$store.state.analyzes.laboratoriesList;
  }

  get biomarkersList(): IAnalyzes.IBiomarker[] {
    return this.$store.state.analyzes.biomarkersList;
  }

  async mounted() {
    if (this.laboratoriesList.length && this.biomarkersList.length) return;

    await this.$store.dispatch('analyzes/init');
  }

  addAnalyzes(item: IAnalyzes.IBiomarker) {
    this.$store.commit('analyzes/addAnalyzes', this.generateItemForAnalyzes(item));
    this.searchedValue = '';
  }

  generateItemForAnalyzes(item: IAnalyzes.IBiomarker) {
    return {
      biomarker: item.name,
      available_units: item.available_units,
      biomarker_id: item.id,
      id: Math.random().toString(36).substr(2, 9),
      laboratory: '',
      value: '',
      date: new Date(),
      comment: null,
      unit: item.unit,
      unit_id: item.unit_id,
      ranges: item.ranges,
    };
  }

  searchAnalyzes() {
    this.searchedList = this.biomarkersList.filter((item: IAnalyzes.IAnalyzesForAddItem) => {
      if (item?.name) {
        return item.name.toLowerCase().search(this.searchedValue.toLowerCase()) !== -1;
      }
    });
  }

  @Emit('close')
  onClose() {
    return false;
  }
}
</script>

<style lang="scss" scoped>
.add-analyzes {
  max-width: 100% !important;
  width: 100% !important;
  height: 100%;
  background: $light-background;
  border-radius: 8px;

  &__title {
    font-weight: 500;
    font-size: 16px;
    line-height: 130%;
    color: $black-01;
    margin-top: 0;
    margin-bottom: 40px;
  }

  &__content-input {
    position: relative;

    ::v-deep input {
      padding-left: 40px;
      background-color: transparent;
    }

    ::v-deep.q-field__prepend {
      position: absolute;
      left: 20px;
      z-index: 1;

      i {
        font-size: 14px;
        color: $accent-color;
      }
    }
  }

  &__content-input-list {
    position: absolute;
    width: 100%;
    background: $light-white;
    border-radius: 16px;
    top: 60px;
    padding: 60px 150px 60px 150px;
    height: 50vh;
    overflow-y: auto;
    z-index: 1;

    @include media-breakpoint-up($breakpoint-pre-md) {
      padding: 30px 50px 30px 50px;
    }

    @include media-breakpoint-up($breakpoint-sm) {
      padding: 12px;
    }
  }

  &__content-input-list-content {
    height: 100%;
    width: 100%;
  }

  &__content-input-list-item {
    display: flex;
    padding: 20px;
    background: $light-background;
    border-radius: 24px;
    justify-content: space-between;
    margin-bottom: 10px;
    transition: 0.5s;

    ::v-deep.main-btn__icon-wrapper {
      color: $accent-color;
      margin-right: 13px;

      svg {
        width: 8px;
        height: 8px;
      }
    }

    ::v-deep.main-btn__text {
      font-size: 12px;
      line-height: 150%;
      color: $black-02;
    }

    &:hover {
      background-color: $light-white;
    }

    @include media-breakpoint-up($breakpoint-sm) {
      flex-direction: column;
      align-items: flex-start;
    }
  }

  &__content-input-list-item-title {
    font-size: 14px;
    line-height: 130%;
    color: $black-02;
    margin-right: 20px;

    @include media-breakpoint-up($breakpoint-sm) {
      margin-right: 0;
      margin-bottom: 20px;
    }
  }

  &__content-added {
    margin-top: 40px;
  }

  &__content-added-title {
    font-size: 14px;
    line-height: 130%;
    color: $black-01;
    margin-bottom: 20px;
    margin-top: 0;
  }

  &__content-added-list {
    padding: 0;
    margin: 0;
    list-style-type: none;
    display: flex;
    flex-direction: column;
  }

  &__content-added-item {
    list-style-type: none;
  }

  &--popup {
    padding: 60px;
  }
}
</style>
