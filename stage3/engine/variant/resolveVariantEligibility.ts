"use client";

/**
 * =========================================================
 * JELLYBACK STAGE 3 — VARIANT ELIGIBILITY ENGINE
 * =========================================================
 *
 * CHANGE:
 * ---------------------------------------------------------
 * Date: 2026-06-22
 *
 * CHANGE SUMMARY
 * ---------------------------------------------------------
 * Added collage eligibility filtering.
 *
 * REASON
 * ---------------------------------------------------------
 * Collage variants now follow identical deterministic
 * asset-capacity rules as actor variants.
 *
 * RULE
 * ---------------------------------------------------------
 * Variant eligible when:
 *
 *      maxAssets <= available asset count
 *
 * Applied independently to:
 *
 * - actors      → seed.assets.actors
 * - collage     → seed.assets.backdrops
 *
 * =========================================================
 */

import { variantRegistry } from "@/stage3/variants/variantRegistry";
import { frameRegistry } from "@/stage3/frames/frameRegistry";
/**
 * =========================================================
 * TYPES
 * =========================================================
 */

export type EligibleVariant = {
  id: string;
  displayName: string;
};

export type EligibilityContract = {
  actors: EligibleVariant[];
  collage: EligibleVariant[];
  logo: EligibleVariant[];
  banner: EligibleVariant[];

  actorFrames: EligibleVariant[];
  backdropFrames: EligibleVariant[];
};

/**
 * =========================================================
 * HELPERS
 * =========================================================
 */

function isLogoSeedValid(seed: any) {
  return Boolean(
    seed?.assets?.logo?.src ??
    seed?.footer?.logo
  );
}

function isBannerSeedValid(seed: any) {
  return Boolean(seed?.assets?.banner);
}

/**
 * =========================================================
 * MAIN ENGINE
 * =========================================================
 */

export function resolveVariantEligibility(seed: any): EligibilityContract {
  const actorsCount = seed?.assets?.actors?.length ?? 0;
  const backdropCount = seed?.assets?.backdrops?.length ?? 0;

  console.log("[STAGE3][ELIGIBILITY][INPUT]", {
    actorsCount,
    backdropCount,
    hasLogo: isLogoSeedValid(seed),
    hasBanner: Boolean(seed?.assets?.banner),
  });


  /**
   * =========================================================
   * ACTORS
   * =========================================================
   */

  const actors: EligibleVariant[] = Object.values(variantRegistry)
    .filter((v: any) => v.layer === "actors")
    .filter((v: any) => {
      const max = v.maxAssets ?? 0;
      const isEligible = max > 0 && max <= actorsCount;

      if (!isEligible) {
        console.log("[STAGE3][ELIGIBILITY][REJECT ACTOR VARIANT]", {
          variant: v.id,
          maxAssets: max,
          actorsCount,
        });
      }

      return isEligible;
    })
    .map((v: any) => ({
      id: v.id,
      displayName: v.displayName,
    }));

  /**
   * =========================================================
   * COLLAGE
   * =========================================================
   *
   * CHANGE: 2026-06-22
   *
   * Mirrors actor eligibility pipeline.
   *
   * Collage variants are constrained by available
   * backdrop asset count.
   */

  const collage: EligibleVariant[] = Object.values(variantRegistry)
    .filter((v: any) => v.layer === "collage")
    .filter((v: any) => {
      const max = v.maxAssets ?? 0;
      const isEligible = max > 0 && max <= backdropCount;

      if (!isEligible) {
        console.log("[STAGE3][ELIGIBILITY][REJECT COLLAGE VARIANT]", {
          variant: v.id,
          maxAssets: max,
          backdropCount,
        });
      }

      return isEligible;
    })
    .map((v: any) => ({
      id: v.id,
      displayName: v.displayName,
    }));

 /**
 * =========================================================
 * LOGO
 * =========================================================
 */

function isLogoVariantEligible(
  variant:any,
  seed:any
){

  const hint =
    seed?.assets?.logo?.analysis?.presentationHint;


  if(!hint){
    return true;
  }


  return (
    variant?.eligibility
      ?.presentationHints
      ?.includes(hint)
  );
}


const logo: EligibleVariant[] = [];


/**
 * ALWAYS PROVIDE NONE
 */

const noneVariant =
  (variantRegistry as any).NONE;


if (noneVariant) {

  logo.push({
    id: noneVariant.id,
    displayName: noneVariant.displayName,
  });

}


/**
 * =========================================================
 * LOGO VARIANTS
 * =========================================================
 */

if (isLogoSeedValid(seed)) {

  Object.values(variantRegistry)
    .filter((v: any) => v.layer === "logo")
    .filter((v: any) => {

      const eligible =
        isLogoVariantEligible(
          v,
          seed
        );


      if (!eligible) {

        console.log(
          "[STAGE3][ELIGIBILITY][REJECT LOGO VARIANT]",
          {
            variant: v.id,

            requiredHints:
              v?.eligibility?.presentationHints,

            logoHint:
              seed?.assets?.logo?.analysis?.presentationHint,

          }
        );

      }


      return eligible;

    })
    .forEach((v: any) => {

      logo.push({
        id: v.id,
        displayName: v.displayName,
      });

    });

}

/**
 * =========================================================
 * Banner
 * =========================================================
 */

const banner: EligibleVariant[] = Object.values(variantRegistry)
    .filter((v: any) => v.layer === "banner")
    
    .map((v: any) => ({
      id: v.id,
      displayName: v.displayName,
    }));
  
    /**
   * =========================================================
   * FRAMES
   * =========================================================
   *
   * Frames are NOT variants.
   *
   * They are user-selectable overlays.
   *
   * Eligibility is based only on
   * available asset capacity.
   *
   * =========================================================
   */

  const actorFrames: EligibleVariant[] =
  frameRegistry
    .filter(frame => frame.imageSource === "actors")
    .filter(frame => actorsCount >= frame.maxAssets)
    .map(frame => ({
      id: frame.id,
      displayName: frame.displayName,
    }));


const backdropFrames: EligibleVariant[] =
  frameRegistry
    .filter(frame => frame.imageSource === "backdrops")
    .filter(frame => backdropCount >= frame.maxAssets)
    .map(frame => ({
      id: frame.id,
      displayName: frame.displayName,
    }));
  
  
    /**
   * ALWAYS PROVIDE NONE
   */



  /**
   * FINAL TRACE
   */

  const result = {
  actors,
  collage,
  logo,
  banner,

  actorFrames,
  backdropFrames,
};

  console.log("[STAGE3][ELIGIBILITY][RESULT]", {
    actors: actors.map((v) => v.id),
    collage: collage.map((v) => v.id),
    logo: logo.map((v) => v.id),
    banner: banner.map((v) => v.id),
    actorFrames: actorFrames.map(v => v.id),

backdropFrames: backdropFrames.map(v => v.id),
  });

  console.log("[STAGE3][ELIGIBILITY][FINAL RETURN OBJECT]", result);

  return result;
}