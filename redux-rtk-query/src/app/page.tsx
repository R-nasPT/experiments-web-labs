import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Link href={`/users`}>users</Link>
    </div>
  );
}
