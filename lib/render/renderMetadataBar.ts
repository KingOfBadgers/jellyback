/**
 * JellyBack — Stage 3 Metadata Bar Renderer
 * ------------------------------------------
 * Responsibility:
 * - Takes a deterministic render plan (NO Jellyfin access)
 * - Produces a 1000x100 PNG metadata bar
 * - Uses Canvas API only (no DOM / CSS / layout engine)
 *
 * Architectural guarantees:
 * - Fully deterministic output
 * - No layout decisions in this layer
 * - No data normalization in this layer
 * - No external state dependency
 *
 * Logging:
 * - Layered logs for traceability
 * - Compatible with JellyBack debug pipeline
 */

import { createCanvas, loadImage } from "canvas";

/**
 * Fixed canonical dimensions (DO NOT MODIFY)
 */
const BAR_WIDTH = 1000;
const BAR_HEIGHT = 100;

/**
 * Vertical layout constants (print strip model)
 */
const CENTER_Y = BAR_HEIGHT / 2;
const ICON_MAX_SIZE = 64;

/**
 * Logging helper (Stage 3 standard format)
 */
function log(scope: string, message: string, data?: any) {
  console.log(`[METADATA BAR][${scope}] ${message}`, data ?? "");
}

/**
 * Slot types (must match render plan output)
 */
type SlotType =
  | "LOGO"
  | "RATING"
  | "RESOLUTION"
  | "CC"
  | "RUNTIME"
  | "BARCODE"
  | "JB";

/**
 * Single render slot instruction
 */
export type MetadataSlot = {
  type: SlotType;
  value: any;
  width: number;
};

/**
 * Full render plan consumed by this renderer
 */
export type MetadataRenderPlan = {
  width: 1000;
  height: 100;
  background: "polished-steel";
  slots: MetadataSlot[];
};

/**
 * MAIN ENTRYPOINT
 * ----------------
 * Converts render plan → PNG buffer
 */
export async function renderMetadataBar(
  plan: MetadataRenderPlan
): Promise<Buffer> {
  log("INIT", "Starting metadata bar render", {
    slotCount: plan.slots.length,
    width: plan.width,
    height: plan.height,
  });

  const canvas = createCanvas(BAR_WIDTH, BAR_HEIGHT);
  const ctx = canvas.getContext("2d");

  /**
   * -----------------------------
   * 1. BACKGROUND RENDER (STEEL)
   * -----------------------------
   * Purpose:
   * - Provide reflective industrial substrate
   * - Ensure contrast for translucent MPAA assets
   */
  log("BACKGROUND", "Rendering polished steel background");

  const gradient = ctx.createLinearGradient(0, 0, 0, BAR_HEIGHT);

  gradient.addColorStop(0.0, "rgba(245,245,245,0.18)");
  gradient.addColorStop(0.5, "rgba(210,210,210,0.10)");
  gradient.addColorStop(1.0, "rgba(180,180,180,0.14)");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, BAR_WIDTH, BAR_HEIGHT);

  // subtle depth pass (prevents flat UI look)
  ctx.fillStyle = "rgba(120,120,120,0.06)";
  ctx.fillRect(0, 0, BAR_WIDTH, BAR_HEIGHT);

  /**
   * -----------------------------
   * 2. SLOT RENDER LOOP
   * -----------------------------
   * Purpose:
   * - Absolute deterministic layout
   * - No spacing logic here (already precomputed in plan)
   */
  let x = 0;

  for (let i = 0; i < plan.slots.length; i++) {
    const slot = plan.slots[i];

    log("SLOT", `Rendering slot ${i}`, {
      type: slot.type,
      width: slot.width,
      value: slot.value,
      x,
    });

    await renderSlot(ctx, slot, x);

    x += slot.width;
  }

  log("COMPLETE", "Metadata bar render complete");

  return canvas.toBuffer("image/png");
}

/**
 * SLOT RENDERER
 * --------------
 * Pure rendering logic per slot type.
 * No layout decisions allowed here.
 */
async function renderSlot(
  ctx: any,
  slot: MetadataSlot,
  x: number
): Promise<void> {
  const y = 0;
  const w = slot.width;
  const h = BAR_HEIGHT;

  switch (slot.type) {
    /**
     * -------------------------
     * RATING (MPAA / BBFC)
     * -------------------------
     */
    case "RATING": {
      ctx.font = "900 34px Inter";
      ctx.fillStyle = "rgba(10,10,10,0.92)";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      ctx.fillText(String(slot.value ?? ""), x + w / 2, CENTER_Y);

      log("DRAW", "Rendered rating", slot.value);
      break;
    }

    /**
     * -------------------------
     * RUNTIME
     * -------------------------
     */
    case "RUNTIME": {
      ctx.font = "900 38px Inter";
      ctx.fillStyle = "rgba(10,10,10,0.92)";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      ctx.fillText(String(slot.value ?? ""), x + w / 2, CENTER_Y);

      log("DRAW", "Rendered runtime", slot.value);
      break;
    }

    /**
     * -------------------------
     * RESOLUTION
     * -------------------------
     */
    case "RESOLUTION": {
      ctx.font = "800 30px Inter";
      ctx.fillStyle = "rgba(20,20,20,0.9)";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      ctx.fillText(String(slot.value ?? ""), x + w / 2, CENTER_Y);

      log("DRAW", "Rendered resolution", slot.value);
      break;
    }

    /**
     * -------------------------
     * CC ICON
     * -------------------------
     */
    case "CC": {
      try {
        const img = await loadImage(
          "/assets/meta/subtitles/cc.png"
        );

        const size = ICON_MAX_SIZE;

        ctx.drawImage(
          img,
          x + (w - size) / 2,
          (h - size) / 2,
          size,
          size
        );

        log("DRAW", "Rendered CC icon");
      } catch (err) {
        log("ERROR", "Failed to render CC icon", err);
      }
      break;
    }

    /**
     * -------------------------
     * LOGO
     * -------------------------
     */
    case "LOGO": {
      try {
        const img = await loadImage(
          "/assets/meta/jb/logo.png"
        );

        const maxH = 64;
        const ratio = img.width / img.height;

        const drawH = maxH;
        const drawW = drawH * ratio;

        ctx.drawImage(
          img,
          x + (w - drawW) / 2,
          (h - drawH) / 2,
          drawW,
          drawH
        );

        log("DRAW", "Rendered logo");
      } catch (err) {
        log("ERROR", "Failed to render logo", err);
      }
      break;
    }

    /**
     * -------------------------
     * BARCODE
     * -------------------------
     */
    case "BARCODE": {
      try {
        const img = await loadImage(
          "/assets/meta/barcode/placeholder.png"
        );

        ctx.drawImage(img, x, 18, w, 64);

        log("DRAW", "Rendered barcode");
      } catch (err) {
        log("ERROR", "Failed to render barcode", err);
      }
      break;
    }

    /**
     * -------------------------
     * JB MARK
     * -------------------------
     */
    case "JB": {
      ctx.font = "900 22px Inter";
      ctx.fillStyle = "rgba(30,30,30,0.9)";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      ctx.fillText("JB", x + w / 2, CENTER_Y);

      log("DRAW", "Rendered JB mark");
      break;
    }

    /**
     * -------------------------
     * FALLBACK SAFETY
     * -------------------------
     */
    default: {
      log("WARN", "Unknown slot type", slot);
      break;
    }
  }
}