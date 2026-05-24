export const movieTemplateV1 = {
  id: "movie-v1",

  zones: [
    {
      id: "header",
      name: "Header",
      x: 80,
      y: 60,
      width: 840,
      height: 200,
      accepts: ["title", "logo", "banner"],
      fallbackPriority: ["title", "logo", "banner"],
    },

    {
      id: "hero",
      name: "Hero",
      x: 80,
      y: 280,
      width: 840,
      height: 600,
      accepts: ["banner"],
      fallbackPriority: ["banner"],
    },

    {
      id: "meta",
      name: "Metadata",
      x: 80,
      y: 900,
      width: 840,
      height: 120,
      accepts: ["year", "runtime"],
      fallbackPriority: ["year", "runtime"],
    },

    {
      id: "description",
      name: "Description",
      x: 80,
      y: 1040,
      width: 840,
      height: 300,
      accepts: ["text"],
      fallbackPriority: ["description"],
    },

    {
      id: "footer",
      name: "Footer",
      x: 80,
      y: 1350,
      width: 840,
      height: 120,
      accepts: ["logo"],
      fallbackPriority: ["logo"],
    },
  ],
};