import Image from "next/image";
import type { MovieCard } from "@/app/lib/definitions";

export default async function MovieCard({ movie }: { movie: MovieCard }) {
  return (
    <div className="w-24 sm:w-36 relative aspect-[2/3]">
      <Image
        src={movie.poster_path}
        fill={true}
        alt={`Poster art for ${movie.title}`}
        className="object-cover not-prose"
      />
    </div>
  );
}
