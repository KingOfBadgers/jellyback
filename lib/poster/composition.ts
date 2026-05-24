export type CompositionPayload = {
  movieId: string;

  backdrop: string;

  crop: {
    x: number;
    y: number;
    scale: number;
  };

  createdAt: number;
};