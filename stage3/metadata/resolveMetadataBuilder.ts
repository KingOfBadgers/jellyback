import DVDStrip from "./builders/dvdStrip";
import MinimalBar from "./builders/minimalBar";
import CinematicBar from "./builders/cinematicBar";

export function resolveMetadataBuilder(
  style: string
) {
  switch (style) {
    case "dvd":
      return DVDStrip;

    case "minimal":
      return MinimalBar;

    case "cinematic":
      return CinematicBar;

    default:
      return DVDStrip;
  }
}