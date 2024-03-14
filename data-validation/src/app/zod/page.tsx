"use client";
import Image from "next/image";
import Link from "next/link";
import BG from "@/assets/705204.jpg";
import { useForm } from "react-hook-form";
import InputFloatText from "@/components/input/input-float-text";
import InputFloatNumber from "@/components/input/input-float-number";
import InputSelect from "@/components/input/input-select";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

type HeroCharacterFormData = {
  name: string;
  age: number;
  status: boolean;
  universe: "Marvel" | "DC";
  date: string;
  time: string;
  datetime: string;
  email: string;
  password: string;
  url: string;
  tel: string;
};

const schema = z.object({
  name: z
    .string()
    .min(1, { message: "กรุณากรอกชื่อ" })
    .max(30, { message: "เยอะเกินไปแล้ว" }),
  age: z.number().int().positive(), // ต้องเป็นจำนวนเต็ม
  status: z.boolean(),
  universe: z.enum(["Marvel", "DC"]), // ต้องเป็นค่าใน enum Marvel หรือ DC เท่านั้น
  date: z.date(),
  time: z.string(), // Zod ไม่มีชนิดข้อมูลเวลา แต่คุณสามารถใช้ string ได้
  datetime: z.string(), // Zod ไม่มีชนิดข้อมูล datetime-local แต่คุณสามารถใช้ string ได้
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Must be a valid email" }),
  password: z.string(),
  url: z.string().url(),
  tel: z.string(),
});
export default function Zod() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<HeroCharacterFormData>({
    resolver: zodResolver(schema),
    mode: "all",
  });

  const onHandlerSubmit = (data: HeroCharacterFormData) => {
    console.log(data);
  };

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
            Add New Hero Character
          </h1>
          <section className="bg-gradient-to-r from-red-500 from-10% via-blue-500 via-30% to-yellow-500 to-90% opacity-80 rounded-2xl">
            <article className="bg-black opacity-70 rounded-2xl">
              <form
                className="grid gap-20 p-14"
                onSubmit={handleSubmit(onHandlerSubmit)}
              >
                <section className="grid grid-cols-2 items-center gap-10">
                  <InputFloatText
                    label="name"
                    message="NAME HERO"
                    register={register}
                    errors={errors}
                  />
                  <InputFloatNumber
                    label="age"
                    message="AGE"
                    register={register}
                    errors={errors}
                  />
                  <div className="flex gap-10">
                    <InputSelect
                      label="status"
                      register={register}
                      errors={errors}
                      options={[
                        { value: "true", label: "TRUE" },
                        { value: "false", label: "FALSE" },
                      ]}
                    />
                    <InputSelect
                      label="universe"
                      register={register}
                      errors={errors}
                      options={[
                        { value: "Marvel", label: "Marvel" },
                        { value: "DC", label: "DC" },
                      ]}
                    />
                  </div>
                  <div>
                    <input
                      type="date"
                      className="p-2 rounded-md"
                      {...register("date")}
                    />
                    <p className="text-red-500">{errors.date && "asdasdads"}</p>
                  </div>

                  <input type="time" className="p-2 rounded-md" />
                  <input type="datetime-local" className="p-2 rounded-md" />
                  <input
                    type="email"
                    className="p-2 rounded-md"
                    {...register("email")}
                  />
                  {/* <p>{errors.email && errors.email.message}</p> */}
                  {errors.email?.message && <span>{errors.email.message}</span>}
                  <input type="password" className="p-2 rounded-md" />
                  <input type="url" className="p-2 rounded-md" />
                  <input type="tel" className="p-2 rounded-md" />
                </section>
                <div className="flex justify-center gap-20 pl-3">
                  <Link
                    href={"/homepage"}
                    className="text-center text-red-200 bg-red-700 hover:bg-red-800 w-48 py-3 px-7 rounded-lg"
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
                    Reset
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
