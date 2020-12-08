import { Component, Vue } from 'vue-property-decorator';
import {QInput, QSelect} from 'quasar';


@Component({})
export default class BaseFormMixins extends Vue {
  onlyLetters = /[a-zA-ZА-Яа-я ]*/
  onlyNumber = /[0-9]*/;
  emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;


  public inputRules = {
    maxMinlength: (val: string) => val.length > 2 && val.length <= 20 || 'Please type something',
    required: (val: string) => val?.toString()?.length || 'обязательно к заполнению',
    validEmail: (val: string) => this.emailPattern.test(val) || 'Invalid email',
  };

  checkError(ref: any): boolean {
    if (ref) return ref.hasError
    else return false;
  }

  showSelectOptions(ref: QSelect) {
    ref.showPopup();
  }

  checkInputValueByRegExp(regexp: RegExp, value: string): string | undefined{
    return (value.match(regexp) as RegExpMatchArray).input
  }
}
