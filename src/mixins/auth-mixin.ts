import { Component, Vue } from 'vue-property-decorator';
import {IAuthApi, IAuthForOtherUser} from '@/interfaces/auth.interface';



@Component({})
export default class AuthMixin extends Vue {

  getFiledType(value: string): IAuthApi.CheckUserParamsType {
    return value.includes('@') ? IAuthApi.CheckUserParamsType.EMAIL : IAuthApi.CheckUserParamsType.PHONE;
  }

  convertSendData(codeData: IAuthApi.ISendCodeResponse, checkedValue: string): {checkedValue: string; codeData: IAuthApi.ISendCodeResponse} {
    return {
      codeData,
      checkedValue
    }
  }

  changeStep(value: IAuthForOtherUser.RegistrationSteps) {
    this.$store.commit('auth/setPropertyInStore', {name: 'currentAuthStep', value})
  }

  get userAccountInfo(): IAuthApi.ICheckUserResponse {
    return this.$store.state.auth.userAccountInfo;
  }
}
