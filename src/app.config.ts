export interface IAppConfig {
  apiUrl: string;
}

function getConfig(env: any): IAppConfig {
  const config: IAppConfig = {
    apiUrl: process.env['VUE_APP_API']
  };

  return config;
}


export const AppConfig = Object.freeze(getConfig(process.env));
