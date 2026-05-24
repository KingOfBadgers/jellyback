export const ZONE_REGISTRY: Record<string, any> = {
  title: {
    type: "text",
    label: "Title / Logo",
    controls: ["text", "mode"],
    modes: ["text", "image"],
  },

  cast: {
    type: "list",
    label: "Cast Strip",
    controls: ["layout"],
    modes: ["text"],
  },

  synopsis: {
    type: "text",
    label: "Synopsis",
    controls: ["fontSize"],
    modes: ["text"],
  },

  metadata: {
    type: "text",
    label: "Metadata",
    controls: ["format"],
    modes: ["text"],
  },

  bottom: {
    type: "hybrid",
    label: "Bottom Banner",
    controls: [],
    modes: ["text", "image"],
  },
};