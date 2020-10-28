<template>
  <div class="user-settings">
    <q-form @submit="onSubmit" ref="form">
      <div class="user-settings__base-field">
        <div
            class="user-settings__input"
            v-for="(item, index) in formGroup.baseField"
            :key="index"
            :class="{'user-settings__input--empty': !item.value}"
        >
          <q-input
              rounded
              v-model="item.value"
              :rules="item.rules"
              :borderless="false"
              :ref="index"
          >
            <template v-slot:append>
              <div class="save-field" v-if="item.oldValue && item.oldValue !== item.value && !$refs[index][0].hasError">
                <q-btn>save</q-btn>
              </div>
            </template>
          </q-input>
          <span class="user-settings__description" v-if="item.description">{{item.description}}</span>
        </div>
      </div>

      <div class="user-settings__password">
        <h4 class="user-settings__password-title">
          Пароль от кабинета
        </h4>
        <template v-if="!isShowPasswordChange">
          <q-btn
              class="user-settings__password-btn"
              unelevated
              @click="showPasswordChangeBlock()"
              padding="13px 8px">
          <span>
            <icon name="password"></icon>
          </span>
            Изменить пароль
          </q-btn>
        </template>
        <template v-else>
          <div class="user-settings__password-content">
            <div
                class="user-settings__input"
                v-for="(item, index) in formGroup.password"
                :key="index"
                :class="{'user-settings__input--empty': !item.value}"
            >
              <q-input
                  rounded
                  :id="index"
                  v-model="item.value"
                  :type="item.isPwd ? 'password': 'text'"
                  :rules="item.rules ? item.rules : []"
                  :borderless="false"
                  :placeholder="item.placeholder ? item.placeholder : ''"
              >
                <q-icon
                    :name="item.isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer pwd-icon"
                    @click="item.isPwd = !item.isPwd" />
              </q-input>

              <template v-if="item.passwordMeter">
                <div class="user-settings__password-meter">
                  <passwordMeter @score="onScore" :password="item.value"></passwordMeter>
                  <div class="password-strength" :class="item.value ? passwordStrength: ''">
                    <span v-for="index in 3" :key="index"></span>
                  </div>

                  <div class="" v-if="passwordStrengthText[passwordStrength] && item.value">
                    {{passwordStrengthText[passwordStrength]}}
                  </div>
                </div>
              </template>
            </div>

            <q-btn padding="14px 13px"
                   unelevated
                   class="user-settings__password-btn user-settings__password-btn--flooded">
              Сохранить новый пароль</q-btn>
          </div>
        </template>
      </div>
      <div class="user-settings__insurance">
        <h4 class="user-settings__insurance-title">Страховые полисы</h4>
        <div
            class="user-settings__input"
            v-for="(item, index) in formGroup.insurancePolicies"
            :key="index"
            :class="{'user-settings__input--empty': !item.value}"
        >
          <label v-if="item.label" :for="index">{{item.label}}</label>
          <q-input
              rounded
              :id="index"
              v-model="item.value"
              :rules="item.rules ? item.rules : []"
              :borderless="false"
          />
        </div>
      </div>
      <q-btn label="Submit" @click="cl" color="primary"/>
    </q-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import passwordMeter from "vue-simple-password-meter";
import {IPersonalArea} from '@/interfaces/personal-area.interface';


  @Component({
    components: {
      passwordMeter
    }
  })

  export default class UserSettings extends Vue {
    formGroup = {
      baseField: {
        name: {
          value: '13',
          oldValue: '13',
          rules: [
            (val: string) => val.length > 2 && val.length <= 20 || 'Please type something',
          ],
        }, surname: {
          value: '12',
          oldValue: '12',
          rules: [
            (val: string) => val.length > 2 && val.length <= 20 || 'Please type something',
          ],
        }, patronym: {
          value: '12',
          oldValue: '12',
          rules: [
            (val: string) => val.length > 2 && val.length <= 20 || 'Please type something',
          ],
        }, mail: {
          value: '1@mail.ru',
          oldValue: '1@mail.ru',
          description: 'На эту почту будут присылаться результаты анализов.',
          rules: [
            (val: string) => this.isValidEmail(val),
          ],
        }
      },
      insurancePolicies: {
        OMS: {
          value: '14',
          oldValue: '14',
          label: 'ОМС'
        },
        DMS: {
          value: '',
          oldValue: '',
          label: 'ДМС'
        }
      },

      password: {
        oldPassword: {
          value: '12',
          isPwd: true,
          placeholder: 'dada',
          rules: [
            (val: string) => !!val || 'empty',
          ]
        },
        newPassword: {
          value: '',
          isPwd: true,
          placeholder: 'dada',
          passwordMeter: true,
          rules: [
            (val: string) => !!val || 'empty',
          ]
        },
        newPasswordRepeat: {
          value: '',
          isPwd: true,
          placeholder: 'dada',
          rules: [
            (val: string) => !!val || 'empty',
            (val: string): boolean | string => val === this.formGroup.password.newPassword.value || 'incorrect',
          ]
        }
      }
    };

    passwordStrengthStatus = IPersonalArea.PasswordStrength;

    passwordStrengthText = {
      [IPersonalArea.PasswordStrength.RISKY]: 'RIS',
      [IPersonalArea.PasswordStrength.QUESSABLE]: 'WEEK',
      [IPersonalArea.PasswordStrength.SECURE]: 'SECURE',
    }

    isShowPasswordChange = false;
    passwordStrength = '';

    onScore({ score, strength }: {score: number; strength: string}) {
      if (Object.keys(this.passwordStrengthText).includes(strength)) this.passwordStrength = strength;
    }


    isValidEmail (val: string): boolean | string {
      const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
      return emailPattern.test(val) || 'Invalid email';
    }

    onSubmit(e: any) {
      console.log(e)
    }

    showPasswordChangeBlock() {
      this.isShowPasswordChange = !this.isShowPasswordChange;
    }

    cl() {
      (this.$refs['form'] as any).validate().then((res: boolean) => console.log(res))
    }
  }
</script>


<style lang="scss">
@import '../styles/vars';

  .user-settings {

    &__input {
      margin-bottom: 25px;

      input {
        height: 58px;
        padding-left: 20px;
        font-size: 14px;
        font-weight: 400;
        color: #424056;
        background: #FFFFFF;
        border-radius: 18px;

        &:focus {
          box-shadow: 0px 4px 15px rgba(22, 20, 44, 0.06);
          border-radius: 18px;
          border: 1px solid #E9E8FF;
        }
      }

      .q-field__append {
        position: absolute;
        right: 10px;
      }

      .q-field__control {
        &:before {
          display: none;
        }

        &:after {
          display: none;
        }
      }

      &--empty {
        input {
          border: 1px solid #E9E8FF;
          background-color: transparent;
          border-radius: 18px;
        }
      }
    }

    &__description {
      color: #C9C9D0;
      font-size: 14px;
    }

    &__password-btn {
      &.q-btn {
        color: #7C74E9;
        border: 1px solid #E9E8FF;
        border-radius: 12px;
        text-transform: none;
        font-weight: 500;
        font-size: 12px;
      }

      &--flooded {
        &.q-btn {
          color: #fff;
          border: none;
          background: #7C74E9;
        }
      }
    }

    &__password-content {

      .pwd-icon {
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translate(0, -50%);
        color: #7C74E9;
        font-size: 20px;
      }


      .user-settings__input {
        .q-field__append {
          right: 40px;
        }
      }
    }

    &__password-meter {
      .po-password-strength-bar {
        opacity: 0;
        position: absolute;
      }

      .password-strength {
        display: flex;
        margin-top: 20px;

        span {
          background: #C9C9D0;
          border-radius: 100px;
          height: 2px;
          width: 50px;
          display: block;
          margin-right: 7px;

          &:last-child {
            margin-right: 0;
          }
        }

        &.risky {
          span:nth-child(1) {
            background: #63C58A;
          }
        }

        &.guessable {
          span:nth-child(1) {
            background: #63C58A;
          }

          span:nth-child(2) {
            background: #63C58A;
          }
        }

        &.secure {
          span {
            background: #63C58A;
          }
        }
      }
    }

    &__password-btn {
      span {
        padding-left: 8px;
        padding-right: 14px;
      }
    }
  }
</style>
