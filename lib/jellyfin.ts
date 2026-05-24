import { getConfig } from "./config";

export type JellyMovie = {
  id: string;
  title: string;
  poster: string | null;
  year?: number;
};

export async function testConnection() {
  const config = await getConfig();

  const res = await fetch(
    `${config.jellyfinUrl}/System/Info`,
    {
      headers: {
        "X-Emby-Token":
          config.apiKey
      }
    }
  );

  if (!res.ok) {
    throw new Error(
      "Failed to connect to Jellyfin"
    );
  }

  return res.json();
}

export async function getMoviesMissingBack(): Promise<JellyMovie[]> {
  const config = await getConfig();

  const url =
    `${config.jellyfinUrl}/Users/` +
    `${config.userId}/Items` +
    `?IncludeItemTypes=Movie` +
    `&Recursive=true` +
    `&Fields=Overview,ProductionYear,ImageTags`;

  const res = await fetch(url, {
    headers: {
      "X-Emby-Token":
        config.apiKey
    }
  });

  if (!res.ok) {
    throw new Error(
      "Failed loading movies"
    );
  }

  const json = await res.json();

  const items =
    json.Items || [];

  return items
    .filter((movie: any) => {
      const imageTags =
        movie.ImageTags || {};

      return !imageTags.Back;
    })
    .map((movie: any) => ({
      id: movie.Id,
      title: movie.Name,
      year:
        movie.ProductionYear,

      poster:
        movie.ImageTags?.Primary
          ? `${config.jellyfinUrl}/Items/${movie.Id}/Images/Primary?api_key=${config.apiKey}`
          : null
    }));
}