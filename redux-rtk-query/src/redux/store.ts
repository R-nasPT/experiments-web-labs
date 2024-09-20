import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api";
import favoritesReducer from './slices/favoritesSlice';

export const makeStore = () =>
  configureStore({
    reducer: {
      [api.reducerPath]: api.reducer,
      favorites: favoritesReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware),
  });

  // ประกาศ AppStore type
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

// ฟังก์ชั่นนี้จะช่วยให้เราสามารถใช้ store ได้ทั้งฝั่ง client และ server
// export function useStore() {
//     const store = makeStore();
//     if (typeof window === 'undefined') return store;
//     // Create the store once in the client
//     if (!window.store) window.store = store;
//     return window.store;
//   }

//   // เพิ่ม type สำหรับ window object
// declare global {
//     interface Window {
//       store: AppStore;
//     }
//   }

//  ============= อันนี้แบบสั้น ============
  // ฟังก์ชั่นนี้จะช่วยให้เราสามารถใช้ store ได้ทั้งฝั่ง client และ server
let store: AppStore | undefined;

export function getStore(): AppStore {
  if (typeof window === 'undefined') return makeStore();
  if (!store) store = makeStore();
  return store;
}