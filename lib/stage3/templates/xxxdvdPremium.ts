import { Slot } from "../engine/compositionTypes";

export const dvdPremiumSlots: Slot[] = [
  {
    id: "logo-slot",
    type: "logoSlot",
    x: 10,
    y: 15,
    width: 30,
    height: 15,
    accepts: ["logo"],
  },
  {
    id: "banner-slot",
    type: "bannerSlot",
    x: 10,
    y: 35,
    width: 60,
    height: 20,
    accepts: ["banner"],
  },
  {
    id: "hero-slot",
    type: "heroSlot",
    x: 40,
    y: 10,
    width: 50,
    height: 60,
    accepts: ["clearart"],
  },
];