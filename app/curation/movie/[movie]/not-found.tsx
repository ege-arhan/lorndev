import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <h1>Not Found</h1>
      <p>The movie is not in my list</p>
      <Link href={"/curation"}>Go back</Link>
    </div>
  );
}
