"use client";
import Image from "next/image";
import React, { useState } from "react";
import BG from "../../assets/BG.png";
import spider from "../../assets/spider-man.png";
import marvel from "../../assets/MARVEL Vector.svg";
import dc_1977 from "../../assets/DC-2005-2012.png";
import logoS from "../../assets/logoSpiN.svg";
import logoH from "../../assets/logoSpiH.svg";
import logoC from "../../assets/logoSpiC.svg";
import Link from "next/link";

export default function Homepage() {
  const [hoveredImage, setHoveredImage] = useState(logoS);
  return (
    <>
      <div className="min-h-screen">
        <Image
          src={BG}
          alt="background"
          layout="fill"
          objectFit="cover"
          quality={100}
          className="z-0"
        />
        <figure className="absolute inset-0 bg-cover bg-no-repeat bg-gray-700 mix-blend-overlay"></figure>
        <main className="absolute inset-0 bg-cover bg-no-repeat">
          <nav className="px-20 py-5 flex items-center gap-10">
            <Image
              src={hoveredImage}
              width={60}
              alt="logo spidy"
              onMouseEnter={() => setHoveredImage(logoH)}
              onMouseLeave={() => setHoveredImage(logoS)}
              onClick={() => setHoveredImage(logoC)}
              className="transition-all duration-300 cursor-pointer"
            />
            <Image src={marvel} alt="logo marvel" />
            <Image src={dc_1977} width={60} alt="logo dc 1977" />
          </nav>
          <section className="flex justify-center items-center">
            <div className="text-white w-3/4 flex flex-col justify-center items-center px-28">
              <h1 className="text-[180px] leading-none font-spider-man">
                SUPERHEROES
              </h1>
              <h1 className="text-9xl font-spider-man">academy</h1>
              <p className="font-Montserrat-Alternates font-semibold text-lg">
                This isn’t the Spider-Man you’ve met or ever seen before. In
                Marvel’s Spider-Man Remastered, we meet an experienced Peter
                Parker who’s more masterful at fighting big crime in New York
                City. At the same time, he’s struggling to balance his chaotic
                personal life and career while the fate of Marvel’s New York
                rests upon his shoulders.
              </p>
              <Link
                href={"/superhero-list"}
                className="bg-[#C3161A] border border-[#C3161A] py-2 px-7 transform -skew-x-12 hover:bg-red-600 hover:border hover:border-white mt-10 transition-colors duration-300"
              >
                SUPERHERO LIST
              </Link>
            </div>
            <Image src={spider} alt="spider man" />
          </section>
        </main>
      </div>
    </>
  );
}
