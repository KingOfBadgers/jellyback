export type MetadataProjection = {
  rating: string | null;

  runtime: number | null;

  resolution: string | null;

  cc: boolean | null;

  qi: {
    imdbUrl: string | null;
    tmdbUrl: string | null;
  };

  logo: string | null;

  jbIcon: string | null;
};

export type MetadataStyle =
  | "dvdStrip"
  | "minimal"
  | "steelBar"
  | "criterion"
  | "collectorEdition"
  | "retroVHS";