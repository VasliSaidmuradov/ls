import { Component, Vue } from 'vue-property-decorator';
import {QInput, QSelect} from 'quasar';
import {IMedicalCard} from '@/interfaces/medical-card.interface';
import IRulesValue = IMedicalCard.IRulesValue;


@Component({})
export default class BaseFormMixins extends Vue {
  onlyLetters = /[a-zA-ZА-Яа-я ]*/
  onlyNumber = /[0-9]*/;


  public inputRules = {
    maxMinlength: (val: IRulesValue) => val[0].length > 2 && val[0].length <= 20 || 'Please type something',
    required: (val: IRulesValue) => val[0].length || 'обязательно к заполнению',
  };

  checkError(ref: any): boolean {
    if (ref) return ref.hasError
    else return false;
  }

  showSelectOptions(ref: QSelect) {
    ref.showPopup();
  }

  checkInputValueByRegExp(regexp: RegExp, value: string) {
    return value.match(regexp)
  }
}
