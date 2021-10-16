import { serverEnv } from "src/constants/system";

export const currentEnv = (): serverEnv => {
  switch (process.env.NEXT_PUBLIC_SERVER_ENV) {
    case serverEnv.development:
      return serverEnv.development;
    case serverEnv.test:
      return serverEnv.test;
    case serverEnv.staging:
      return serverEnv.staging;
    case serverEnv.production:
      return serverEnv.production;
    default:
      return serverEnv.development;
  }
};

export const isDevEnv = () => currentEnv() === serverEnv.development;
export const isTestEnv = () => currentEnv() === serverEnv.test;
export const isStgEnv = () => currentEnv() === serverEnv.staging;
export const isProdEnv = () => currentEnv() === serverEnv.production;
