import Image from "next/image";
import marvel from "../../assets/MARVEL Vector.svg";
import blackspi from "../../assets/black-spi.png";

export default function SuperheroList() {
  return (
    <>
      <div className="bg-[#1B2159] px-60 py-20">
        <article className="grid bg-[#121742] p-10 rounded-3xl">
          <Image src={marvel} alt="marvel" />
          <div className="flex gap-10 px-10">
            <div className="w-1/2 flex flex-col gap-12 items-center pt-12">
              <p className="text-red-500 text-stroke text-9xl font-spider-man">
                spider-man
              </p>
              <div className="flex flex-col items-center gap-5">
                <div className="flex flex-col items-center">
                  <p className="text-stroke text-sm font-sans">REAL NAME</p>
                  <p className="text-red-400 font-semibold text-sm font-serif italic">
                    Peter Parker
                  </p>
                </div>
                <div className="flex flex-col items-center">
                  <p className="text-stroke text-sm font-sans">POWERS</p>
                  <p className="text-red-400 font-semibold text-sm font-serif italic">
                    Wall-crawling, Super strength, Spider-sense
                  </p>
                </div>
                <div className="flex flex-col items-center">
                  <p className="text-stroke text-sm font-sans">AFFILIATION</p>
                  <p className="text-red-400 font-semibold text-sm font-serif italic">
                    Avengers
                  </p>
                </div>
                <div className="flex flex-col items-center">
                  <p className="text-stroke text-sm font-sans">AGE </p>
                  <p className="text-red-400 font-semibold text-sm font-serif italic">
                    25
                  </p>
                </div>
                <div className="flex flex-col items-center">
                  <p className="text-stroke text-sm font-sans">STATUS</p>
                  <p className="text-red-400 font-semibold text-sm font-serif italic">
                    true
                  </p>
                </div>
                <div className="flex flex-col items-center">
                  <p className="text-stroke text-sm font-sans">APPEARANCE</p>
                  <div className="flex gap-3">
                    <span className="text-stroke text-sm font-sans">
                      height :
                    </span>
                    <span className="text-red-400 font-semibold text-sm font-serif italic">
                      178
                    </span>
                    <span className="text-stroke text-sm font-sans">
                      weight :
                    </span>
                    <span className="text-red-400 font-semibold text-sm font-serif italic">
                      70
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex justify-between w-full">
                <button className="italic bg-white px-4 py-2 rounded-3xl font-semibold hover:bg-gray-300">
                  EDIT
                </button>
                <button className="italic bg-red-500 text-red-200 px-4 py-2 rounded-3xl font-semibold hover:bg-red-600">
                  DELETE
                </button>
              </div>
            </div>
            <Image src={blackspi} alt="profile" className="w-1/2" />
          </div>
        </article>
      </div>
    </>
  );
}

type DetailProps = {
  label: string;
  value: string | number | boolean;
};

function renderDetail({ label, value }: DetailProps) {
  return (
    <div className="flex flex-col items-center">
      <p className="text-stroke text-sm font-sans">{label}</p>
      <p className="text-red-400 font-semibold text-sm font-serif italic">
        {value}
      </p>
    </div>
  );
}
