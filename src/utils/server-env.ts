export enum serverEnv {
  development = "development",
  test = "test",
  staging = "staging",
  production = "production",
}

export const currentEnv = (): serverEnv => {
  const env = process.env.NEXT_PUBLIC_SERVER_ENV;
  switch (env) {
    case serverEnv.development:
      return serverEnv.development;
    case serverEnv.test:
      return serverEnv.test;
    case serverEnv.staging:
      return serverEnv.staging;
    case serverEnv.production:
      return serverEnv.production;
    default:
      throw Error(`Invalid value of NEXT_PUBLIC_SERVER_ENV: ${env}`);
  }
};

export const isDevEnv = () => currentEnv() === serverEnv.development;
export const isTestEnv = () => currentEnv() === serverEnv.test;
export const isStgEnv = () => currentEnv() === serverEnv.staging;
export const isProdEnv = () => currentEnv() === serverEnv.production;
