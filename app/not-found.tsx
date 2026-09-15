import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <h1>Not Found</h1>
      <p>What you requested doesn&apos;t exist on my web site</p>
      <Link href={"/curation"}>Return home</Link>
    </div>
  );
}
