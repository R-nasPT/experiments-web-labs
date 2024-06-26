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
  nullified: string;
  repeat_password: string;
};

const schema = z.object({
  name: z
    .string()
    .min(1, { message: "กรุณากรอกชื่อ" })
    .max(30, { message: "เยอะเกินไปแล้ว" }),
  age: z.number().int().positive(), // ต้องเป็นจำนวนเต็ม
  status: z.boolean(),
  universe: z.enum(["Marvel", "DC"]), // ต้องเป็นค่าใน enum Marvel หรือ DC เท่านั้น
  date: z.date().optional(),
  time: z.string(), // Zod ไม่มีชนิดข้อมูลเวลา แต่คุณสามารถใช้ string ได้
  datetime: z.string(), // Zod ไม่มีชนิดข้อมูล datetime-local แต่คุณสามารถใช้ string ได้
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Must be a valid email" }),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    ),
  url: z.string().url("Must be a valid URL").min(1, "URL is required"),
  tel: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(12, "Phone number cannot exceed 12 digits")
    .regex(/^\d+$/, "Phone number must contain only digits")
    .optional(),
  nullified: z
    .string()
    .regex(/^[^0-9]*$/, "Cannot be a number")
    .nullable(),
  repeat_password: z.string()
  // .refine((data) => data === schema.password, {
  //   message: "Passwords do not match",
  //   path: ["repeat_password"],
  // }),
  })
  .refine((data) => data.password === data.repeat_password, {
    message: "Passwords do not match",
    path: ["repeat_password"],
});

type FormData = z.infer<typeof schema>; //<--- สามารถใช้แทน HeroCharacterFormData ได้

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
                  <input
                    placeholder="age"
                    type="number"
                    className="p-2 rounded-md"
                    {...register("age")}
                  />
                  {errors.age?.message && (
                    <p className="text-red-500">{errors.age?.message}</p>
                  )}
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
                    <p className="text-red-500">{errors.date?.message}</p>
                  </div>

                  <input type="time" className="p-2 rounded-md" />
                  <input type="datetime-local" className="p-2 rounded-md" />
                  <input
                    placeholder="Email"
                    type="email"
                    className="p-2 rounded-md"
                    {...register("email")}
                  />
                  {/* <p>{errors.email && errors.email.message}</p> */}
                  {errors.email?.message && (
                    <p className="text-red-500">{errors.email.message}</p>
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
                    placeholder="repeat_password"
                    type="password"
                    className="p-2 rounded-md"
                    {...register("repeat_password")}
                  />
                  {errors.repeat_password?.message && (
                    <p className="text-red-500">
                      {errors.repeat_password?.message}
                    </p>
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
