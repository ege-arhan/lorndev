import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import { TVs } from "@/app/lib/tmdb/catalogue/tv";
import TVCard from "@/app/ui/tv-card";
import { getTV } from "@/app/lib/tmdb/getTV";
import Link from "next/link";

export default async function TVCarousel() {
  const tvArr = await Promise.all(
    Object.keys(TVs).map(async (query) => {
      const tv = await getTV(query, "card");

      return (
        <CarouselItem key={tv.name} className="basis-1/2.1">
          <Link href={`/curation/tv/${query}`}>
            <TVCard tv={tv} />
          </Link>
        </CarouselItem>
      );
    }),
  );

  if (!tvArr) {
    return <div>Failed to get tvs</div>;
  }

  return (
    <>
      <Carousel
        opts={{
          dragFree: true,
        }}
        className="border"
      >
        <CarouselContent>{tvArr}</CarouselContent>
      </Carousel>
    </>
  );
}
