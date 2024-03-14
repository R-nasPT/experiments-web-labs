import Link from "next/link";
import React from "react";

export default function Homepage() {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen w-full gap-5">
        <div className="text-5xl text-orange-600 font-serif">Homepage</div>
        <div className="flex gap-5">
          <Link
            href="/zod"
            className="bg-blue-500 p-2 rounded-lg text-white text-center font-mono w-20"
          >
            ZOD
          </Link>
          <Link
            href="/yup"
            className="bg-red-500 p-2 rounded-lg text-white text-center font-mono w-20"
          >
            YUP
          </Link>
        </div>
      </div>
    </>
  );
}
