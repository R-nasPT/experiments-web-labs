"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import InputFloatText from "../../components/input/input-float-text";
import { Fragment } from "react";
import InputFloatNumber from "@/components/input/input-float-number";
import Image from "next/image";
import BG from "../../assets/hero/705204.jpg";
import InputSelect from "@/components/input/input-select";
import useApi from "@/hooks/useApi";
import Link from "next/link";

type HeroCharacterFormData = {
  name: string;
  real_name: string;
  powers: string[];
  affiliation: string;
  age: number;
  status: boolean;
  height: number;
  weight: number;
  universe: string;
};

export default function FormInsert() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<HeroCharacterFormData>({ mode: "all" });

  const { createMutation } = useApi({ baseURL: "http://localhost:2077", url: "heroes" });

  const onHandlerSubmit: SubmitHandler<HeroCharacterFormData> = (data) => {
    createMutation.mutate({
      name: data.name,
      real_name: data.real_name,
      powers: data.powers,
      affiliation: data.affiliation,
      age: data.age,
      status: data.status,
      appearance: {
        height: data.height,
        weight: data.weight,
      },
      universe: data.universe,
    });
    console.log(data);
  };

  return (
    <Fragment>
      <div className="min-h-screen flex flex-col justify-center items-center">
        <Image
          src={BG}
          alt="background"
          layout="fill"
          objectFit="cover"
          quality={100}
          className="-z-10"
        />
        <main>
          <h1 className="font-spider-man text-5xl pl-5 bg-clip-text text-transparent bg-gradient-to-r from-red-500 from-10% via-blue-500 via-30% to-yellow-500 to-90%">
            Add New Hero Character
          </h1>
          <section className="bg-gradient-to-r from-red-500 from-10% via-blue-500 via-30% to-yellow-500 to-90% opacity-80 rounded-2xl">
            <article className="bg-black opacity-70 rounded-2xl">
              <form
                className="grid gap-20 p-14"
                onSubmit={handleSubmit(onHandlerSubmit)}
              >
                <section className="grid grid-cols-2 items-center gap-10">
                  <InputFloatText label="name" message="NAME HERO" register={register} errors={errors} required={true} />
                  <InputFloatText label="real_name" message="REAL NAME" register={register} errors={errors} required={true} />
                  <InputFloatText label="powers" message="POWERS" register={register} errors={errors} required={true} />
                  <InputFloatText label="affiliation" message="AFFILIATION" register={register} errors={errors} required={false} />
                  <InputFloatNumber label="age" message="AGE" register={register} errors={errors} required={true} />
                  <div className="flex gap-10">
                    <InputSelect label="status" register={register} errors={errors} required={true}
                      options={[
                        { value: "true", label: "TRUE" },
                        { value: "false", label: "FALSE" },
                      ]}
                    />
                    <InputSelect label="universe" register={register} errors={errors} required={true}
                      options={[
                        { value: "Marvel", label: "Marvel" },
                        { value: "DC", label: "DC" },
                      ]}
                    />
                  </div>
                  <div>
                    <p className="text-white uppercase pl-3 pb-5">appearance</p>
                    <div className="flex gap-2">
                      <InputFloatNumber label="height" message="HEIGHT" register={register} errors={errors} required={true} />
                      <InputFloatNumber label="weight" message="WEIGHT" register={register} errors={errors} required={true} />
                    </div>
                  </div>
                </section>
                <div className="flex justify-center gap-20 pl-3">
                  <Link
                    href={"/superhero-list"}
                    className="text-center text-red-200 bg-red-700 hover:bg-red-800 w-48 py-3 px-7 rounded-lg"
                    type="submit"
                  >
                    Back
                  </Link>
                  <button
                    className="text-green-200 bg-green-700 hover:bg-green-800 w-48 py-3 px-7 rounded-lg"
                    type="submit"
                  >
                    Submit
                  </button>
                  <button
                    className="text-white bg-slate-500 hover:bg-slate-600 w-48 py-3 px-7 rounded-lg"
                    type="reset"
                  >
                    Reset Standard
                  </button>
                  <button
                    className="text-white bg-slate-500 hover:bg-slate-600 w-48 py-3 px-7 rounded-lg"
                    type="button"
                    onClick={() =>
                      reset({
                        name: "Green Lantern",
                        real_name: "Hal Jordan",
                        powers: ["Green Power Ring","Flight","Construct Creation"],
                        affiliation: "Green Lantern Corps",
                        age: 32,
                        status: true,
                        height: 186,
                        weight: 90,
                        universe: "DC",
                      })
                    }
                  >
                    Custom Reset
                  </button>
                </div>
              </form>
            </article>
          </section>
        </main>
      </div>
    </Fragment>
  );
}
