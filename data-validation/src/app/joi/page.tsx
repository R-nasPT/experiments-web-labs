"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import Image from "next/image";
import BG from "@/assets/JD35FuU2.jpg";
import Link from "next/link";
import InputSelect from "@/components/input/input-select";

type IFormInput = {
  name: string;
  age: number;
  // status: boolean;
  universe: "Marvel" | "DC";
  // date?: Date | undefined;
  // email?: string | undefined;
  password: string;
  repeat_password: string;
  url: string;
  tel: string;
  nullified?: string | null | undefined;
};

const schema = Joi.object({
  name: Joi.string().required().messages({
    "string.base": `"Name" should be a type of 'text'`,
    "string.empty": `"Name" cannot be an empty field`,
    "any.required": "Name is required 555",
  }),
  age: Joi.number().required().positive().integer().messages({
    "number.base": "Age must be a number",
    "number.positive": "Age must be a positive number",
    "number.integer": "Age must be an integer",
    "any.required": "Age is required",
  }),
  // status: Joi.boolean().required().messages({
  //   "any.required": "Status is required",
  // }),
  universe: Joi.string().valid("Marvel", "DC").required().messages({
    "any.only": 'Universe must be either "Marvel" or "DC"',
    "any.required": "Universe is required",
  }),
  // email: Joi.string().email().messages({
  //   "string.email": "Must be a valid email",
  // }),
  password: Joi.string()
    .required()
    .pattern(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
      "Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, and one number555"
    )
    .messages({
      "string.pattern.base":
        "Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, and one number6666",
      "any.required": "Password is required",
    }),
  repeat_password: Joi.ref("password"),
  url: Joi.string().uri().required().messages({
    "string.uri": "Must be a valid URL",
    "any.required": "URL is required",
  }),
  tel: Joi.string().pattern(/^\d+$/).min(10).max(12).required().messages({
    "string.pattern.base": "Phone number must contain only digits",
    "string.min": "Phone number must be at least 10 digits",
    "string.max": "Phone number cannot exceed 12 digits",
    "any.required": "Phone number is required",
  }),
  nullified: Joi.string()
    .allow(null, "")
    .pattern(/^[^0-9]*$/, "Cannot be a number"),
});

export default function JOI() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: joiResolver(schema),
    mode: "all",
  });

  const onHandlerSubmit: SubmitHandler<IFormInput> = (data) =>
    console.log(data);

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
            Add New
          </h1>
          <section className="bg-gradient-to-r from-red-500 from-10% via-blue-500 via-30% to-yellow-500 to-90% opacity-80 rounded-2xl">
            <article className="bg-black opacity-70 rounded-2xl">
              <form
                className="grid gap-20 p-14"
                onSubmit={handleSubmit(onHandlerSubmit)}
              >
                <section className="grid grid-cols-2 items-center gap-10">
                  <div>
                    <input
                      placeholder="Name"
                      type="text"
                      className="p-2 rounded-md"
                      {...register("name")}
                    />
                    <p className="text-red-500">{errors.name?.message}</p>
                  </div>
                  <input
                    placeholder="age"
                    type="number"
                    className="p-2 rounded-md"
                    {...register("age")}
                  />
                  {errors.age?.message && (
                    <p className="text-red-500">{errors.age?.message}</p>
                  )}
                  <InputSelect
                    label="universe"
                    register={register}
                    errors={errors}
                    options={[
                      { value: "Marvel", label: "Marvel" },
                      { value: "DC", label: "DC" },
                    ]}
                  />
                  {/* <input
                    placeholder="Email"
                    type="email"
                    className="p-2 rounded-md"
                    {...register("email")}
                  />
                  {errors.email?.message && (
                    <p className="text-red-500">{errors.email.message}</p>
                  )} */}
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
