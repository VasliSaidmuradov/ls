export namespace IErrorStore {
  export interface IState {
    isVisible: boolean;
    payload: string | null;
    actions: IError.errorActions;
  }
}

export namespace IError {
  export enum errorActions {
    CLOSE = 'close',
    CLOSE_AND_RELOAD = 'closeAndReload',
  }

  export interface IErrorNoticeInputParams {
    message: string;
    closeBtn: boolean | string;
    onDismiss?: Function; // on close cb
  }

  export enum ErrorCodes {
    TOKEN_NOT_VALID = 'token_not_valid'
  }
}
