import { fetcher } from "@/hooks/useApi";
import { ReactNode } from "react";
import { SWRConfig } from "swr";

export default function SWRProvider({ children }: { children: ReactNode }) {
  return (
    <SWRConfig
      value={{
        // provider: fetcher,
        fetcher,
        // revalidateOnFocus: true, // SWR จะทำการ revalidate เมื่อมีการ focus กลับมาที่หน้าต่าง
        // revalidateOnReconnect: true, // SWR จะทำการ revalidate เมื่อมีการเชื่อมต่อกับเซิร์ฟเวอร์ใหม่
        // revalidateOnMount: true, // SWR จะทำการ revalidate เมื่อ component ถูก mount ลงบนหน้า
        // shouldRetryOnError: true, // SWR จะทำการ retry เมื่อเกิด error ในการ fetch ข้อมูล
        // errorRetryInterval: 5000, // ระยะเวลาที่ SWR จะรอก่อนทำการ retry หากเกิด error
        // dedupingInterval: 2000, // ระยะเวลาที่ SWR จะใช้เพื่อป้องกันการทำ fetch ซ้ำ
      }}
    >
      {children}
    </SWRConfig>
  );
}
