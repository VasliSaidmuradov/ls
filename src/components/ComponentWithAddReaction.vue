<template>
  <div class="reaction">
    <h4 class="reaction__title">{{data.title}}</h4>
    <div class="" v-for="item in value" :key="item.id">
      <div class="reaction__item">
        <div class="form-input reaction__item-input">
          <q-input v-model="item.name" :class="{'form-input--empty': !item.name}" :placeholder="data.inputPlaceholder">
            <q-btn class="reaction__item-delete" @click="deleteField(item.id)">
              <icon v-slot:prepend name="delete-icon"></icon>
            </q-btn>
          </q-input>
        </div>
        <template v-if="item.reaction.length">
          <div class="reaction__item-area form-input form-input--area" v-for="(reaction, index) in item.reaction" :key="index">
            <q-input type="textarea" v-model="reaction.value" :class="{'form-input--empty': !reaction.value}" :placeholder="data.areaPlaceholder">
              <q-btn class="reaction__item-delete" @click="deleteReactions(item.id, index)">
                <icon name="delete-icon" v-slot:prepend></icon>
              </q-btn>
            </q-input>
          </div>
        </template>
        <q-btn class="reaction__add reaction__add--reaction" @click="addReaction(item.id)">
           <span class="reaction__add-icon">
            <icon name="add-icon"></icon>
          </span>
          <span class="reaction__add-text">{{data.addReactionBtnText}}</span>
        </q-btn>
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
import { Component, Vue, Prop } from 'vue-property-decorator';
import {IMedicalCardStore, IMedicalCard} from '@/interfaces/medical-card.interface';
import IAddReactionsFiledData = IMedicalCard.IAddReactionsFiledData;
import IReaction = IMedicalCard.IReaction;

@Component({})
export default class ComponentWithAddReaction extends Vue {

  @Prop() data: IAddReactionsFiledData;
  @Prop() value: IReaction[];

  addReaction(id: string) {
    this.$store.commit('medicalCard/addReaction', {id, reactionValue: {value: ''}, property: this.data.property})
  }

  addField() {
    const items = this.value;
    items.push({
      id: `f${(~~(Math.random()*1e8)).toString(16)}`,
      name: '',
      reaction: [],
    });

    this.$store.commit('medicalCard/setPropertyInStore', {name: this.data.property, value: items})
  }

  deleteReactions(fieldId: string, index: number) {
    const fieldIndex: number | undefined = this.value.findIndex(item => item.id === fieldId);

    if (fieldIndex !== -1) {
      const items = this.value;
      items[fieldIndex].reaction.splice(index, 1);
      this.$store.commit('medicalCard/setPropertyInStore', {name: this.data.property, value: items})
    }
  }

  deleteField(id: string) {
    const items = this.value.filter(item => item.id !== id);
    this.$store.commit('medicalCard/setPropertyInStore', {name: this.data.property, value: items})
  }
}
</script>

<style lang="scss">
  .reaction {
    &__title {
      font-weight: 500;
      font-size: 20px;
      line-height: 120%;
    }

    &__item-input, &__item-area {
      margin-bottom: 15px;

    }

    &__item-delete {
      &.q-btn {
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

      &.q-btn {
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
