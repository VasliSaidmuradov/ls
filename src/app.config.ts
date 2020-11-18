export interface IAppConfig {
  apiUrl: string;
}

function getConfig(env: any): IAppConfig {
  return {
    apiUrl: process.env['VUE_APP_API']
  };
}


export const AppConfig = Object.freeze(getConfig(process.env));
