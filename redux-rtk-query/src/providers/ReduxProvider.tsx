'use client'

import { AppStore, makeStore } from "@/redux/store";
import { useRef } from "react";
import { Provider } from "react-redux";

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
    const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    // สร้าง store เมื่อ component ถูกเรนเดอร์ครั้งแรก
    storeRef.current = makeStore();
  }
  return <Provider store={storeRef.current}>{children}</Provider>;
}
