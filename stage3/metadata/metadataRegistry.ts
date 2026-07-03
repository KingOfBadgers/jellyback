import DVDStrip from "./builders/dvdStrip";
import MinimalBar from "./builders/minimalBar";

export const metadataRegistry = [
  {
    id: "dvd",
    label: "DVD",
    builder: DVDStrip,
  },

  {
    id: "minimal",
    label: "MINIMAL",
    builder: MinimalBar,
  },

  {
    id: "cinematic",
    label: "CINEMATIC",
    builder: DVDStrip,
  },

  {
    id: "steelbook",
    label: "STEELBOOK",
    builder: DVDStrip,
  },

  {
    id: "criterion",
    label: "CRITERION",
    builder: DVDStrip,
  },
];