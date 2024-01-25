"use client";
import useApi from "@/hooks/useApi";
import useFetch from "@/hooks/useFetch";
import useRequest from "@/hooks/useRequest";
import useResponse from "@/hooks/useResponse";
import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

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

export default function HomePage() {
  //   const { data, loading, error, fetchData, postData, deleteData } = useApi<heroType[]>(`http://localhost:2077`);
  //   const { data, loading, error, fetchData, postData, deleteData } = useRequest<heroType[]>(`http://localhost:2077`);
  //   const { data, loading, error, fetchData } = useFetch<heroType[]>(`http://localhost:2077`);
  const { data, loading, error, fetchData } = useResponse<heroType[]>(`http://localhost:2077`);
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    fetchData(`heroes`, "get");
  }, []);
  //   console.log(data);

  const onHandleSubmit: SubmitHandler<any> = (data) => {
    // postData("heroes", {
    //   name: data.name,
    //   real_name: data.real_name,
    //   powers: data.powers,
    //   affiliation: data.affiliation,
    //   age: data.age,
    //   status: data.status,
    //   appearance: {
    //     height: data.height,
    //     weight: data.weight,
    //   },
    //   universe: data.universe,
    // });

    fetchData("heroes", "post", {
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

  const handleDelete = (itemId: any) => {
    // deleteData(`heroes/${itemId}`);
    fetchData(`heroes/${itemId}`, "delete");
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <>
      {/* เพิ่มการตรวจสอบ data && และทำให้แน่ใจได้ว่า map จะถูกเรียกเมื่อ data ไม่เป็น null เท่านั้น */}
      {data &&
        data?.map((item: heroType) => (
          <div key={item._id}>
            <div>{item.name}</div>
            <div>{item.real_name}</div>
            <div>{item.powers}</div>
            <div>{item.affiliation}</div>
            <div>{item.age}</div>
            <div>{item.appearance.height}</div>
            <div>{item.appearance.weight}</div>
            <div>{item.universe}</div>
            <button
              className="bg-red-500"
              onClick={() => handleDelete(item._id)}
            >
              delete
            </button>
          </div>
        ))}
      <form onSubmit={handleSubmit(onHandleSubmit)} className="py-10">
        <input
          type="text"
          placeholder="name"
          className="border border-black"
          {...register("name")}
        />
        <input
          type="text"
          placeholder="real_name"
          className="border border-black"
          {...register("real_name")}
        />
        <input
          type="text"
          placeholder="affiliation"
          className="border border-black"
          {...register("affiliation")}
        />
        <input
          type="number"
          placeholder="age"
          className="border border-black"
          {...register("age")}
        />
        <input
          type="text"
          placeholder="powers"
          className="border border-black"
          {...register("powers")}
        />
        <input
          type="text"
          placeholder="universe"
          className="border border-black"
          {...register("universe")}
        />
        <input
          type="number"
          placeholder="height"
          className="border border-black"
          {...register("height")}
        />
        <input
          type="number"
          placeholder="weight"
          className="border border-black"
          {...register("weight")}
        />
        <input
          type="text"
          placeholder="status"
          className="border border-black"
          {...register("status")}
        />
        <button type="submit" className="bg-red-400">
          submit
        </button>
      </form>
    </>
  );
}
