import { MOVIES } from "@/app/lib/tmdb/catalogue/movie";
import { getMovie } from "@/app/lib/tmdb/getMovie";
import Image from "next/image";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return Object.keys(MOVIES).map((query) => ({
    movie: query,
  }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ movie: string }>;
}) {
  const { movie } = await params;
  const reviewObj = await getMovie(decodeURIComponent(movie), "review");
  if (!reviewObj) {
    notFound();
  }
  return (
    <div className="flex">
      <div className="flex w-36 relative aspect-[2/3]">
        <Image
          src={reviewObj.poster_path}
          alt={`Poster art for ${reviewObj.title}`}
          fill={true}
          className="object-cover not-prose"
        />
      </div>
      <p>{reviewObj.review}</p>
    </div>
  );
}
