"use client";

import React from "react";
import { useCompositionStore } from "@/stage3/store/compositionStore";
import { resolveVariantContract } from "@/stage3/engine/variant/resolveVariantContract";

/**
 * =========================================================
 * JELLYBACK STAGE 3 — ASSET LAYERS (CONTRACT-ONLY FIX)
 * =========================================================
 *
 * FIX:
 * ---------------------------------------------------------
 * - Removed ALL seed-based render gating
 * - Contracts are now sole source of truth
 * - Eliminates "ghost rendering" when NONE is selected
 *
 * DATE: 2026-06-19
 * =========================================================
 */

export default function AssetLayers() {
  const seed = useCompositionStore((s) => s.seed);
  const selected = useCompositionStore((s) => s.selected);

  if (!seed) return null;

  const actors = seed?.assets?.actors ?? [];

  const actorContract = resolveVariantContract(selected.actors);
  const logoContract = resolveVariantContract(selected.logo);
  const collageContract = resolveVariantContract(selected.collage);

  console.log("[STAGE3 ASSET LAYERS][CONTRACTS]", {
    actors: actorContract,
    logo: logoContract,
    collage: collageContract,
  });

  const backdrop =
    seed?.background?.src ??
    seed?.assets?.backdrops?.[0] ??
    null;

  return (
    <>
      {/* ===================================================== */}
      {/* BACKDROP (ALWAYS RENDERS - NOT CONTRACT CONTROLLED) */}
      {/* ===================================================== */}
      {backdrop && (
        <img
          src={backdrop}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: 0,
          }}
        />
      )}

      {/* ===================================================== */}
      {/* ACTORS (CONTRACT ONLY) */}
      {/* ===================================================== */}
      {actorContract.visibility === "show" &&
        actors.map((actor: any, index: number) => {
          let left = 20 + index * 120;

          if (actorContract.layout === "w-overlap") {
            left = 60 + index * 80;
          }

          if (actorContract.layout === "center-focus") {
            left = 120 + index * 140;
          }

          if (actorContract.layout === "row") {
            left = 40 + index * 160;
          }

          return (
            <img
              key={actor.id ?? index}
              src={actor.image}
              style={{
                position: "absolute",
                width: 140,
                height: 200,
                objectFit: "cover",
                bottom: 160,
                left: `${left}px`,
                zIndex: 10,
              }}
            />
          );
        })}

      {/* ===================================================== */}
      {/* LOGO (CONTRACT ONLY — FIXED) */}
      {/* ===================================================== */}
      {logoContract.visibility === "show" &&
        seed?.assets?.logo && (
          <img
            src={seed.assets.logo}
            style={{
              position: "absolute",
              width: 180,
              top: 40,
              left: 40,
              objectFit: "contain",
              zIndex: 20,
            }}
          />
        )}

      {/* ===================================================== */}
      {/* COLLAGE (CONTRACT ONLY) */}
      {/* ===================================================== */}
      {collageContract.visibility === "show" && (
        <div
          style={{
            position: "absolute",
            bottom: 300,
            right: 40,
            zIndex: 15,
            color: "white",
          }}
        >
          collage layer ready
        </div>
      )}
    </>
  );
}