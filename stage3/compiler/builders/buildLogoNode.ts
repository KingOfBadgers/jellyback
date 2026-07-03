"use client";

export function buildLogoNode(
  logo: string | null,
  logoBlueprint: any,
  logoTreatments: string[]
) {
  if (!logo) {
    return null;
  }

  if (!logoBlueprint) {
    return null;
  }

  return {
    id: "logo",
    layer: "logo",
    src: logo,
    visible:logoBlueprint.type !== "none",
    style: {...logoBlueprint.style,
      width: "800px",
      height: "150px",
    },

    treatments: logoTreatments,
  };
}