import { Component, Vue } from 'vue-property-decorator';
import {QSelect} from 'quasar';


@Component({})
export default class BaseFormMixins extends Vue {

  checkError(ref: any): boolean {
    if (ref) return ref.hasError
    else return false;
  }

  showSelectOptions(ref: QSelect) {
    ref.showPopup();
  }
}
