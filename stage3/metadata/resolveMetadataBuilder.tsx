import DVDStrip from "./builders/dvdStrip";
import MinimalBar from "./builders/minimalBar";
import CinematicBar from "./builders/cinematicBar";
import SteelbookBar from "./builders/steelbookBar";
import CriterionBar from "./builders/criterionBar";
import iconbar from "./builders/iconbar";

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

  case "steelbook":
    return SteelbookBar;

  case "criterion":
    return CriterionBar;

  case "iconbar":
    return iconbar;  

  default:
    return DVDStrip;
}
}