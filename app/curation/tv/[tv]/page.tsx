import { TVs } from "@/app/lib/tmdb/catalogue/tv";
import { getTV } from "@/app/lib/tmdb/getTV";
import Image from "next/image";

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(TVs).map((query) => ({
    tv: query,
  }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ tv: string }>;
}) {
  const { tv } = await params;
  const reviewObj = await getTV(decodeURIComponent(tv), "review");
  return (
    <div className="flex">
      <div className="flex w-36 relative aspect-[2/3]">
        <Image
          src={reviewObj.poster_path}
          alt={`Poster art for ${reviewObj.name}`}
          fill={true}
          className="object-cover not-prose"
        />
      </div>
      <p>{reviewObj.review}</p>
    </div>
  );
}
