import Image from "next/image";
import React from "react";

export default function Homepage() {
  return (
    <>
      <div>Homepage555</div>
      <Image
      src={'/batman.png'}
        alt="Picture of the author"
        width={500}
        height={500}
      />
    </>
  );
}
