import { IAppState } from '@/interfaces/app-state.interface';
import {ActionContext} from 'vuex';
import {IMedicalCard, IMedicalCardStore} from '@/interfaces/medical-card.interface';
import Vue from 'vue';
import IReaction = IMedicalCard.IReaction;
import IReactionItem = IMedicalCard.IReactionItem;
type MedicalCardStore = ActionContext<IMedicalCardStore.IState, IAppState>;

export default {
  namespaced: true,

  state: {
    wasPregnant: 1,
    pregnantCount: 0,
    childbirthIsSuccess: true,
    abortiont: false,
    miscarriages: false,
    nonDeveloping: false,
    isPregnantNow: false,
    lastMenstruation: null,
    firstMenstruation: IMedicalCard.FirstMenstruation.TEN,
    durationMenstruation: IMedicalCard.DurationMenstruation.TEN,
    cycleDuration: IMedicalCard.CycleDuration.TEN,
    hormonalDrugs: [],
    allergicReactions: [],
    biologicalSex: 'man',
    bloodType: 'I положительная',
    race: 'Европеоидная',
    nationality: 'Беларусь',
    regionOfResidence: 'urban',
    height: 0,
    weight: 0,
    birthday: new Date(),
  },

  mutations: {
    addReaction(state: IMedicalCardStore.IState, {id, reactionValue, property}:
      {id: string; reactionValue: IReactionItem; property: keyof {hormonalDrugs: IReaction[]; allergicReactions: IReaction[]}}) {
      if (!state[property]) return;

      const index = state[property].findIndex((drug: IReaction) => drug.id === id);
      if (index !== -1) {
        const reaction = state[property][index].reaction;
        reaction.push(reactionValue);
        state[property][index].reaction = reaction;
      }
    },

    setPropertyInStore(state: IMedicalCardStore.IState, { name, value }: { name: string; value: any}) {
      Vue.set(state, name, value);
    },
  },

  actions: {}
};
