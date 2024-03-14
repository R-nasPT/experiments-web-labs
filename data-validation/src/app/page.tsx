import { redirect } from "next/navigation";

export default function Home() {
  redirect("/homepage");
  return <main></main>;
}
