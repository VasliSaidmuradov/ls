<template>
  <div class="reaction">
    <h4 class="reaction__title">{{data.title}}</h4>
    <div class="" v-for="item in value" :key="item.id">
      <div class="reaction__item">
        <div class="form-input reaction__item-input">
          <q-input v-model="item.title" :class="{'form-input--empty': !item.name}" :placeholder="data.inputPlaceholder">
            <q-btn class="reaction__item-delete" @click="deleteField(item.id)">
              <icon v-slot:prepend name="delete-icon"></icon>
            </q-btn>

            <SaveFieldBtn v-if="item.title && item.reaction && checkOldValue(item.id, item.title, item.reaction)" v-slot:append @save="save(item.id)"/>
          </q-input>
        </div>
          <div class="reaction__item-area form-input form-input--area">
            <q-input :rules="rules"
                     type="textarea"
                     v-model="item.reaction"
                     :class="{'form-input--empty': !item.reaction}"
                     ref="reaction"
                     :placeholder="data.areaPlaceholder" />
          </div>
      </div>
    </div>
    <q-btn class="reaction__add reaction__add--drug" @click="addField">
      <span class="reaction__add-icon">
        <icon name="add-icon"></icon>
      </span>
      <span class="reaction__add-text">{{data.addFilesBtnText}}</span>
    </q-btn>
  </div>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator';
import {IMedicalCard} from '@/interfaces/personal-area.interface';
import SaveFieldBtn from '@/components/SaveField.vue';
import BaseFormMixins from '@/mixins/base-form-mixins';

@Component({
  components: {
    SaveFieldBtn
  }
})
export default class ComponentWithAddReaction extends BaseFormMixins {

  @Prop() data: IMedicalCard.IAddReactionsFiledData;
  @Prop() value: IMedicalCard.IReaction[];

  rules: Function[] = [];

  oldValue: IMedicalCard.IReaction[] = [];

  checkOldValue(id: string, title: string, reaction: string) {
    const data = this.oldValue.find((item: IMedicalCard.IReaction) => item.id === id)
    return data?.title !== title || data?.reaction !== reaction;
  }

  mounted() {
    this.rules.push(this.inputRules.required);
    this.oldValue = this.value.map((item: IMedicalCard.IReaction) => Object.assign({}, item));
  }

  addField() {
    this.$store.dispatch('personalArea/addReactionItem', {endpoint: this.data.endPoint, reactionsData: this.getReactionsData()})
  }

  getReactionsData(): {title: string; reaction: string} {
    return {
      title: '',
      reaction: '',
    }
  }

  save(id: string) {
    this.$store.dispatch('personalArea/updateReactionsItem', {id, endpoint: this.data.endPoint, item: this.getItemById(id)})
  }

  getItemById(id: string): IMedicalCard.IReaction | undefined {
    return this.value.find((item: IMedicalCard.IReaction) => item.id === id);
  }

  deleteField(id: string) {
    this.$store.dispatch('personalArea/deleteReactionItem', {id, endpoint: this.data.endPoint})
  }
}
</script>

<style lang="scss" scoped>
  .reaction {
    &__title {
      font-weight: 500;
      font-size: 20px;
      line-height: 120%;
    }

    &__item-input, &__item-area {
      margin-bottom: 15px;
    }

    &__item-input {
      ::v-deep.save-field {
        right: 40px !important;
      }
    }

    &__item-delete {
      &::v-deep.q-btn {
        background-color: transparent;
        color: #FBD4D6;
        height: 20px;
        margin: auto 0 auto 16px !important;

        .q-btn__wrapper {
          width: 20px;
          height: 20px;
          padding: 0;
          min-height: 20px;

          &:before {
            display: none;
          }
        }

        .q-focus-helper {
          display: none;
        }
      }
    }

    &__add {
      margin-top: 15px;

      &::v-deep.q-btn {
        background-color: transparent;
        color: $accent-color;
        display: flex;
        align-items: center;

        .q-btn__wrapper {
          padding: 0;

          &:before {
            display: none;
          }
        }

        .q-focus-helper {
          display: none;
        }
      }


      &--drug {
        margin-left: -10px;

        .reaction__add-icon {
          width: 34px;
          height: 34px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
          background-color: $light-white;
          border-radius: 15px;
        }
      }

      &:hover {
        opacity: .8;
      }
    }

    &__add-icon {
      display: flex;
      align-items: center;

      svg {
        width: 10px;
        height: 10px;
      }
    }

    &__add-text {
      text-transform: none;
      font-weight: 500;
      font-size: 14px;
      line-height: 140%;
      margin-left: 10px;
    }
  }
</style>
