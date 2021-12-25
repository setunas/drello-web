import {
  configureStore,
  EnhancedStore,
  ThunkDispatch,
  Action,
} from "@reduxjs/toolkit";
import { rootReducer } from "src/utils/redux/root";
import { currentEnv } from "src/utils/server-env";
import { serverEnv } from "src/utils/server-env";

export const makeConfiguredStore = (
  preloadedState?: Record<string, object>
): EnhancedStore => {
  return configureStore({
    reducer: rootReducer,
    preloadedState: preloadedState,
    devTools: currentEnv() !== serverEnv.production,
  });
};

export const store = makeConfiguredStore();
export type AppDispatch = typeof store.dispatch;
export type AppThunkDispatch = ThunkDispatch<
  void,
  typeof rootReducer,
  Action<string>
>;
