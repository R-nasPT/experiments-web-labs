"use client";
import Image from "next/image";
import marvel from "../../assets/MARVEL Vector.svg";
import useApi from "../../hooks/useApi";
import true1 from "../../assets/green-lantern.png";
import false1 from "../../assets/captain-america.png";
import DC from "../../assets/DC-2005-2012.png";
import blackspi from "../../assets/hero/black-spi.png";
import IronMan from "../../assets/hero/ironman1.jpg";
import wonder from "../../assets/hero/wonder.jpg";
import BlackPan from "../../assets/hero/Panther-Black.webp";
import Cap from "../../assets/hero/captain-america.jpg";
import thor from "../../assets/hero/thor1.png";
import Strange from "../../assets/hero/dr.st.jpg";
import BlackWidow from "../../assets/hero/BlackWidow1.jpg";
import Deadpool from "../../assets/hero/deadpool1.jpg";
import Link from "next/link";
import Swal from "sweetalert2";
import LoadingAnimation from "@/components/loading/LoadingAnimation";

type heroType = {
  _id: any;
  name: string;
  real_name: string;
  powers: string[];
  affiliation: string;
  age: number;
  status: boolean;
  appearance: {
    height: number;
    weight: number;
  };
  universe: string;
};

export default function SuperheroList() {
  const { getQuery, deleteMutation } = useApi({ baseURL: "http://localhost:2077", url: "heroes" });
  const { data, isLoading, isError, error } = getQuery;
  const { mutate } = deleteMutation;

  const handleDelete = async (itemId: string | number) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to save this hero character?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      confirmButtonColor: "#00d1b2",
      cancelButtonColor: "#f14668",
    });

    if (result.isConfirmed) {
      //react-query
      mutate(itemId)

      Swal.fire('Deleted!', 'Hero character has been deleted.', 'success').then(() => {
        window.location.reload();
      });
    }
  }

  if (isLoading) {
    return <LoadingAnimation />;
  }

  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  const heroImages: Record<string, any> = {
    "Spider-Man": blackspi,
    "Iron Man": IronMan,
    "Wonder Woman": wonder,
    "Black Panther": BlackPan,
    "Captain America": Cap,
    "Thor": thor,
    "Doctor Strange": Strange,
    "Black Widow": BlackWidow,
    "Deadpool": Deadpool,
    // "Batman": Batman,
    // "Superman": Superman,
  };

  return (
    <>
      <div className="bg-[#1B2159] grid gap-10 px-60 pb-20">
        <nav className="pt-10 text-white flex justify-between px-5">
          <Link href={'/homepage'} className="bg-red-500 px-5 py-2 rounded-lg hover:bg-red-600">BACK</Link>
          <Link href={'/form-insert'} className="bg-slate-600 px-5 py-2 rounded-lg hover:bg-slate-700">INSERT</Link>
        </nav>
        {data.map((item: heroType) => (
          <article
            key={item._id}
            className="grid bg-[#121742] p-10 rounded-3xl"
          >
            {item.universe === "Marvel" ? (
              <Image src={marvel} alt="marvel" />
            ) : (
              <Image src={DC} alt="marvel" width={70} />
            )}
            <div className="flex gap-10 px-10">
              <div className="w-1/2 flex flex-col gap-12 items-center pt-12">
                <p className="text-red-500 text-center text-stroke text-9xl font-spider-man">
                  {item.name}
                </p>
                <div className="flex flex-col items-center gap-5">
                  {renderDetail({ label: "REAL NAME", value: item.real_name })}
                  {renderDetail({ label: "POWERS", value: item.powers.join(", ") })}
                  {renderDetail({ label: "AFFILIATION", value: item.affiliation })}
                  {renderDetail({ label: "AGE", value: item.age })}
                  {renderDetail({
                    label: "STATUS",
                    value:
                      item.status === true ? (
                        <Image
                          width={30}
                          src={true1}
                          alt="status"
                          className="pt-3"
                        />
                      ) : (
                        <Image
                          width={30}
                          src={false1}
                          alt="status"
                          className="pt-3"
                        />
                      ),
                  })}
                  <div className="flex flex-col items-center">
                    <p className="text-stroke text-sm font-sans">APPEARANCE</p>
                    <div className="flex gap-3">
                      <span className="text-stroke text-sm font-sans">
                        height :
                      </span>
                      <span className="text-red-400 font-semibold text-sm font-serif italic">
                        {item.appearance.height}
                      </span>
                      <span className="text-stroke text-sm font-sans">
                        weight :
                      </span>
                      <span className="text-red-400 font-semibold text-sm font-serif italic">
                        {item.appearance.weight}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between w-full">
                  <Link 
                    href={`/superhero-list/${item._id}`} 
                    className="italic bg-white px-4 py-2 rounded-3xl font-semibold hover:bg-gray-300"
                  >
                    EDIT
                  </Link>
                  <button 
                    className="italic bg-red-500 text-red-200 px-4 py-2 rounded-3xl font-semibold hover:bg-red-600"
                    onClick={() => handleDelete(item._id)}
                  >
                    DELETE
                  </button>
                </div>
              </div>
              {item.name && heroImages[item.name] && (
                <Image
                  src={heroImages[item.name]}
                  alt="profile"
                  className="w-1/2 h-[700px] rounded-2xl object-cover"
                />
              )}
            </div>
          </article>
        ))}
      </div>
    </>
  );
}

type DetailProps = {
  label: string;
  // value: string | number | boolean;
  value: any;
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
