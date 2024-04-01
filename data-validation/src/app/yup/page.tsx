"use client";
import Image from "next/image";
import Link from "next/link";
import BG from "@/assets/437561.jpg";
import { SubmitHandler, useForm } from "react-hook-form";
import InputFloatText from "@/components/input/input-float-text";
import InputFloatNumber from "@/components/input/input-float-number";
import InputSelect from "@/components/input/input-select";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

type HeroCharacterFormData = {
  name: string;
  age: number;
  status: boolean;
  universe: "Marvel" | "DC";
  date?: Date | undefined;
  email?: string | undefined;
  // time: string;
  // datetime: string;
  password: string;
  url: string;
  tel: string;
  nullified?: string | null | undefined;
};

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  age: yup
    .number()
    .typeError("Age must be a number")
    .positive("Age must be a positive number")
    .integer("Age must be an integer")
    .required("Age is required"),
  status: yup.boolean().required("Status is required"),
  universe: yup
    .string()
    .oneOf(["Marvel", "DC"], "Universe must be either 'Marvel' or 'DC'")
    .required("Universe is required"),
  date: yup.date().typeError("Date must be a date"),
  email: yup.string().email("Must be a valid email"),
  password: yup
    .string()
    .required("Password is required")
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
      "Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, and one number"
    ),
  url: yup.string().url("Must be a valid URL").required("URL is required"),
  tel: yup
    .string()
    .matches(/^\d+$/, "Phone number must contain only digits")
    .min(10, "Phone number must be at least 10 digits")
    .max(12, "Phone number cannot exceed 12 digits")
    .required("Phone number is required"),
  nullified: yup
    .string()
    .nullable()
    .matches(/^[^0-9]*$/, {
      message: "Cannot be a number",
      excludeEmptyString: true, //ใช้เพื่อให้การตรวจสอบไม่รวมค่าว่างด้วย
    }),
});
type FormData = yup.InferType<typeof schema>; //<--- สามารถใช้แทน HeroCharacterFormData ได้

export default function Yup() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<HeroCharacterFormData>({
    resolver: yupResolver(schema),
    mode: "all",
  });

  const onHandlerSubmit: SubmitHandler<HeroCharacterFormData> = (data) => {
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
                  {errors.email?.message && (
                    <span className="text-red-500">{errors.email.message}</span>
                  )}
                  <input
                    placeholder="Password"
                    type="password"
                    className="p-2 rounded-md"
                    {...register("password")}
                  />
                  {errors.password?.message && (
                    <p className="text-red-500">{errors.password?.message}</p>
                  )}
                  <input
                    placeholder="URL"
                    type="url"
                    className="p-2 rounded-md"
                    {...register("url")}
                  />
                  {errors.url?.message && (
                    <p className="text-red-500">{errors.url?.message}</p>
                  )}
                  <input
                    placeholder="Phone Number"
                    type="tel"
                    className="p-2 rounded-md"
                    {...register("tel")}
                  />
                  {errors.tel?.message && (
                    <p className="text-red-500">{errors.tel?.message}</p>
                  )}
                  <input
                    placeholder="nullified"
                    type="text"
                    className="p-2 rounded-md"
                    {...register("nullified")}
                  />
                  {errors.nullified?.message && (
                    <p className="text-red-500">{errors.nullified?.message}</p>
                  )}
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
