<template>
  <div class="slide-card">
    <div class="slide-card__left">
      <div class="slide-card__left-desk">
        {{ slideInfo.name }}
      </div>
      <div class="slide-card__left-date-wrap">
        <span class="slide-card__left-date">
          Загружено {{ $date(new Date(slideInfo.created_at), 'dd.MM.yyyy') || '-' }}
        </span>
        <MainBtn
          text="Отвязать документ"
          type="btn-small"
          class="slide-card__left-btn"
          bcg-color="transparent"
          @click-btn="unlinkDocument(slideInfo.id)"
        >
          <template v-slot:icon>
            <icon name="close-icon"></icon>
          </template>
        </MainBtn>
      </div>
    </div>
    <div class="slide-card__right scrollable">
      <div class="slide-card__right-card" v-for="file in slideInfo.files" :key="file.id">
        <div class="slide-card__right-card-img">
          <img :src="file.file_link" />
          <icon name="download-icon"></icon>
        </div>
        <span class="slide-card__right-card-text">{{ fileLength }} </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import MainBtn from '@/components/UI/buttons/MainBtn.vue';
import { Documents } from '@/interfaces/documents.interface';

@Component({
  components: {
    MainBtn,
  },
})
export default class SlideCard extends Vue {
  @Prop({ required: true }) slideInfo: Documents.IDocument;

  get orderedService() {
    return this.$store.state.orders.orderedService;
  }
  get fileLength(): string {
    const len = this.slideInfo.files.length;
    const analyzes: { [key: string]: string } = {
      '0': 'анализов',
      '1': 'анализ',
      '2': 'анализа',
      '3': 'анализа',
      '4': 'анализа',
    };
    return `${len} ${analyzes[len] || `анализов`}`;
  }

  unlinkDocument(docId: number) {
    try {
      const { id, document_ids } = this.orderedService;
      const docIds = document_ids.filter((id: number) => id !== docId);
      this.$store.dispatch('orders/changeOrderedService', { id, documentIds: docIds });
    } catch (error) {
      console.log('Error: ', error);
    }
  }
}
</script>

<style lang="scss" scoped>
.slide-card {
  display: flex;
  padding: 24px;

  &__left {
    width: 35%;
    margin-right: 15px;

    @include media-breakpoint-up($breakpoint-lg) {
      width: 100%;
      margin-bottom: 20px;
    }
  }

  &__left-desk {
    font-size: 14px;
    line-height: 130%;
    color: $black-02;
    margin-bottom: 10px;
  }

  &__left-date {
    font-size: 12px;
    line-height: 15px;
    color: $black-04;
    margin-bottom: 20px;

    @include media-breakpoint-up($breakpoint-lg) {
      margin-bottom: 0;
      margin-right: 20px;
    }

    @include media-breakpoint-up($breakpoint-pre-md) {
      margin-bottom: 10px;
    }
  }

  &__left-date-wrap {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    @include media-breakpoint-up($breakpoint-lg) {
      flex-direction: row;
      margin: 20px 0;
      align-items: center;
    }

    @include media-breakpoint-up($breakpoint-pre-md) {
      flex-direction: column;
      align-items: flex-start;
    }
  }

  &__right {
    display: flex;
    width: 65%;
    overflow-x: auto;
    padding-bottom: 20px;

    @include media-breakpoint-up($breakpoint-lg) {
      width: 100%;
    }
  }

  &__left-btn {
    color: $accent-color;
    display: flex;

    ::v-deep.main-btn__icon-wrapper {
      margin-right: 13px;

      svg {
        width: 8px;
        height: 8px;
      }
    }
  }

  &__right-card {
    margin-right: 25px;
    min-width: 90px;
    max-width: 90px;

    &:last-child {
      margin-right: 0;
    }
  }

  &__right-card-text {
    margin-top: 12px;
    font-size: 12px;
    line-height: 15px;
    color: $black-02;
  }

  &__right-card-img {
    width: 60px;
    height: 90px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      margin-right: 5px;
    }
  }

  @include media-breakpoint-up($breakpoint-lg) {
    flex-direction: column;
  }
}
</style>
