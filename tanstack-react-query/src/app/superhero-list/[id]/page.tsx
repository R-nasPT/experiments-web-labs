"use client";

import InputFloatNumber from "@/components/input/input-float-number";
import InputFloatText from "@/components/input/input-float-text";
import InputSelect from "@/components/input/input-select";
import Image from "next/image";
import Link from "next/link";
import BG from "../../../assets/hero/af5uskv42v3z.jpg";
import { SubmitHandler, useForm } from "react-hook-form";
import useApi from "@/hooks/useApi";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

type HeroFormDataUpdate = {
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

  type Props = {
    params: {
      id: number | string
    }
  }

export default function FormUpdate({ params }: Props ) {
  const { id } = params
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<HeroFormDataUpdate>({ mode: "all" });
  const { getQuery, updateMutation } = useApi({ baseURL: "http://localhost:2077", url: `heroes/${id}` });
  const { data, isLoading, isError, error} = getQuery;
  const { mutateAsync } = updateMutation;
  const router = useRouter();

  const onHandlerSubmit: SubmitHandler<HeroFormDataUpdate> = async (data) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to edit this hero character?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Update',
      cancelButtonText: 'Cancel',
      confirmButtonColor: "#00d1b2",
      cancelButtonColor: "#f14668",
    });

    if (result.isConfirmed) {
      Swal.fire({
        icon: "success",
        title: "Update!",
        text: "Hero character has been update.",
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        router.refresh();
      });
      // -- react-query --
      await mutateAsync({
        newData: {
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
        },
      });
      console.log(data);

    } else {
      Swal.fire({
        icon: "info",
        title: "Cancelled!",
        text: "Hero character was not update.",
        showConfirmButton: false,
        timer: 1000
      });
    }

  };

    useEffect(() => {
      if (data) {
        setValue("name", data.name)
        setValue("real_name", data.real_name);
        // setValue("powers", data.powers.join(', ')); // array
        setValue("powers", data.powers); // array
        setValue("affiliation", data.affiliation);
        setValue("age", data.age);
        setValue("status", data.status?.toString()); // boolean
        setValue("height", data.appearance?.height);
        setValue("weight", data.appearance?.weight);
        setValue("universe", data.universe);
      }
    }, [data, setValue])

    if (isLoading) {
      return <p>Loading...</p>;
    }
  
    if (isError) {
      return <p>Error: {error.message}</p>;
    }  

  return (
    <>
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
            Edit Hero Character
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
                        name: data.name,
                        real_name: data.real_name,
                        powers: data.powers,
                        affiliation: data.affiliation,
                        age: data.age,
                        status: data.status?.toString(),
                        height: data.appearance?.height,
                        weight: data.appearance?.weight,
                        universe: data.universe,
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
    </>
  );
}
