import { Component, Vue } from 'vue-property-decorator';
import {QSelect} from 'quasar';


@Component({})
export default class BaseFormMixins extends Vue {

  public inputRules = {
    maxMinlength: (val: string) => val.length > 2 && val.length <= 20 || 'Please type something',
    required: (val: number) => val.toString().length || 'обязательно к заполнению',
  };

  checkError(ref: any): boolean {
    if (ref) return ref.hasError
    else return false;
  }

  showSelectOptions(ref: QSelect) {
    ref.showPopup();
  }
}
