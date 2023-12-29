import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { fetchDataStart } from "@/redux/slices/apiSlice";
import { useEffect } from "react";

export default function ExampleComponent() {
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector((state) => state.api);

  useEffect(() => {
    dispatch(
      fetchDataStart({ method: "get", url: "http://localhost:2077/heroes" })
    );
  }, [dispatch]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1>Data:</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
