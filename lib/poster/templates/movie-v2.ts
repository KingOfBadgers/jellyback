export const movieTemplateV2 = {
  id: "movie-v2",

  zones: [
    {
      id: "header",
      name: "Header",
      x: 80,
      y: 60,
      width: 840,
      height: 220,
      accepts: ["title", "logo", "banner"],
      fallbackPriority: ["title", "logo", "banner"],
    },

    {
      id: "hero",
      name: "Hero",
      x: 80,
      y: 300,
      width: 840,
      height: 600,
      accepts: ["banner"],
      fallbackPriority: ["banner"],
    },

    {
      id: "meta",
      name: "Meta",
      x: 80,
      y: 930,
      width: 840,
      height: 120,
      accepts: ["year", "runtime"],
      fallbackPriority: ["year", "runtime"],
    },

    {
      id: "description",
      name: "Description",
      x: 80,
      y: 1080,
      width: 840,
      height: 280,
      accepts: ["description"],
      fallbackPriority: ["description"],
    },
  ],
};