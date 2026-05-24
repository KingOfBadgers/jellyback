export type Template = {
  id: string;
  name: string;

  regions: {
    title: { x: number; y: number; fontSize: number };
    year: { x: number; y: number; fontSize: number };

    metaBox: {
      x: number;
      y: number;
      width: number;
      height: number;
    };
  };
};

export const templates: Template[] = [
  {
    id: "cinematic",
    name: "Cinematic",

    regions: {
      title: {
        x: 60,
        y: 100,
        fontSize: 56
      },

      year: {
        x: 60,
        y: 170,
        fontSize: 28
      },

      metaBox: {
        x: 60,
        y: 280,
        width: 420,
        height: 700
      }
    }
  },

  {
    id: "minimal",
    name: "Minimal",

    regions: {
      title: {
        x: 80,
        y: 140,
        fontSize: 48
      },

      year: {
        x: 80,
        y: 200,
        fontSize: 24
      },

      metaBox: {
        x: 80,
        y: 320,
        width: 380,
        height: 600
      }
    }
  }
];