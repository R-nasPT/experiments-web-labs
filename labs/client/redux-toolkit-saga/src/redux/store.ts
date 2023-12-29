import { configureStore, Middleware } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import apiReducer from "./slices/apiSlice";
import rootSaga from "@/sagas/rootSaga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    api: apiReducer,
  },
  //   middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

export const makeStore = () => {
  return configureStore({
    reducer: { api: apiReducer },
  });
};

sagaMiddleware.run(rootSaga);

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export default store;
