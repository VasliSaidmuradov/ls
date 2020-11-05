import Vue from 'vue';
import moment from 'moment';
import vueMoment from 'vue-moment';
import 'moment/locale/ru';
import {VueConstructor} from 'vue/types/vue';
import {Moment} from 'moment/moment';

Vue.use(vueMoment, {
  moment,
});

declare module 'vue/types/vue' {
  interface VueConstructor {
    moment: Moment;
  }
}
