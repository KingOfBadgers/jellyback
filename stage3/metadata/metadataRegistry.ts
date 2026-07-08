import DVDStrip from "./builders/dvdStrip";
import MinimalBar from "./builders/minimalBar";
import CinematicBar from "./builders/cinematicBar";
import CriterionBar from "./builders/criterionBar";
import SteelbookBar from "./builders/steelbookBar";

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
    builder: CinematicBar,
  },

  {
    id: "steelbook",
    label: "STEELBOOK",
    builder: SteelbookBar,
  },

  {
    id: "criterion",
    label: "CRITERION",
    builder: CriterionBar,
  },
];