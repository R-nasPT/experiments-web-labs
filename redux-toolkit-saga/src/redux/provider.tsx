import { Provider } from "react-redux";
import { makeStore, AppStore } from "./store";
import { ReactNode, useRef } from "react";
import store from "./store";

type providerProps = {
  children: ReactNode;
};

export default function ReduxProvider({ children }: providerProps) {
  //   const storeRef = useRef<AppStore | null>(null);
  //   if (!storeRef.current) {
  //     storeRef.current = makeStore();
  //   }
  return <Provider store={store}>{children}</Provider>;
}
