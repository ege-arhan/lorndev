import { z } from "zod";

import searchTV from "@/app/lib/tmdb/searchTV";
const baseUrl = "https://api.themoviedb.org/3/tv";
const posterUrl = "https://image.tmdb.org/t/p";
import { TVs } from "@/app/lib/tmdb/catalogue/tv";
import type { MediaObj, TVCard, TVReview } from "@/app/lib/definitions";

const TVCard = z.object({
  name: z.string(),
  poster_path: z.string(),
});

export function getTV(query: string, type: "card"): Promise<TVCard>;

export function getTV(query: string, type: "review"): Promise<TVReview>;

export async function getTV(query: string, type: MediaObj) {
  const id = await searchTV(query);
  const url = `${baseUrl}/${id}`;

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
      },
    });

    if (!res.ok) {
      throw new Error(`TMDB fetch failed with code ${res.status}`);
    }

    const rawData = await res.json();
    const data = TVCard.parse(rawData);
    data.poster_path = `${posterUrl}/original${data.poster_path}`;
    if (type === "card") {
      return data;
    }

    return { ...data, review: TVs[query] };
  } catch (e) {
    console.error(e);
    throw new Error("Failed to fetch TV");
  }
}
