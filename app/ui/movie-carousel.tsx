import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import { MOVIES } from "@/app/lib/tmdb/catalogue/movie";
import MovieCard from "@/app/ui/movie-card";
import { getMovie } from "@/app/lib/tmdb/getMovie";
import Link from "next/link";

export default async function MovieCarousel() {
  const moviesArr = await Promise.all(
    Object.keys(MOVIES).map(async (query) => {
      const movie = await getMovie(query, "card");
      return (
        <CarouselItem key={movie.title} className="basis-1/2.1">
          <Link href={`/curation/movie/${query}`}>
            <MovieCard movie={movie} />
          </Link>
        </CarouselItem>
      );
    }),
  );

  if (!moviesArr) {
    return <div>Failed to get movies</div>;
  }

  return (
    <>
      <Carousel
        opts={{
          dragFree: true,
        }}
        className="border"
      >
        <CarouselContent>{moviesArr}</CarouselContent>
      </Carousel>
    </>
  );
}
