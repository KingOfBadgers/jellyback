export function resolveJellyfinAssets(movie: any, config: any) {
  if (!movie?.id || !config?.jellyfinUrl || !config?.apiKey) {
    return {
      ready: false,
      assets: null,
      availability: {
        hasPoster: false,
        hasBackdrops: false,
        hasBanner: false,
        hasLogo: false,
      },
    };
  }

  const base = `${config.jellyfinUrl}/Items/${movie.id}/Images`;

  const poster = movie?.ImageTags?.Primary
    ? `${base}/Primary?api_key=${config.apiKey}`
    : null;

  const backdrops =
    Array.isArray(movie?.BackdropImageTags) &&
    movie.BackdropImageTags.length > 0
      ? movie.BackdropImageTags.map(
          (_: any, i: number) =>
            `${base}/Backdrop/${i}?api_key=${config.apiKey}`
        )
      : [];

  const banner = movie?.ImageTags?.Banner
    ? `${base}/Banner?api_key=${config.apiKey}`
    : null;

  const logo = movie?.ImageTags?.Logo
    ? `${base}/Logo?api_key=${config.apiKey}`
    : null;

  return {
    ready: true,

    assets: {
      poster,
      backdrops,
      banner,
      logo,
    },

    availability: {
      hasPoster: !!poster,
      hasBackdrops: backdrops.length > 0,
      hasBanner: !!banner,
      hasLogo: !!logo,
    },
  };
}