import { create } from "zustand";

type DesignState = {
  movie: any | null;

  template: string;
  setTemplate: (t: string) => void;

  collageStyle: string;
  collageCount: number;

  setMovie: (m: any) => void;
};

export const useDesignStore = create<DesignState>((set) => ({
  movie: null,

  template: "cinematic",
  setTemplate: (t) => set({ template: t }),

  collageStyle: "grid",
  collageCount: 6,

  setMovie: (m) => set({ movie: m })
}));