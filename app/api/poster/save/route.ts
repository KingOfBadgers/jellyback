import { writeFile, mkdir } from "fs/promises";
import path from "path";

/**
 * POST /api/poster/save
 *
 * Responsibility:
 * - save Stage 2 generated poster-safe background
 * - persist using deterministic movieId filename
 * - overwrite previous save for same movie
 *
 * Output:
 * /public/generated/posters/poster_<movieId>.png
 */

export async function POST(req: Request) {
  try {
    console.log("[POSTER SAVE] Incoming request");

    const { image, movieId } = await req.json();

    console.log("[POSTER SAVE] Payload:", {
      movieId,
      hasImage: Boolean(image),
    });

    // =========================
    // VALIDATION
    // =========================
    if (!image) {
      console.error("[POSTER SAVE] Missing image");

      return Response.json(
        { error: "No image provided" },
        { status: 400 }
      );
    }

    if (!movieId) {
      console.error("[POSTER SAVE] Missing movieId");

      return Response.json(
        { error: "No movieId provided" },
        { status: 400 }
      );
    }

    // =========================
    // STRIP BASE64 PREFIX
    // =========================
    const base64Data = image.replace(
      /^data:image\/png;base64,/,
      ""
    );

    // =========================
    // CANONICAL FILE NAME
    // =========================
    const fileName = `poster_${movieId}.png`;

    // =========================
    // TARGET DIRECTORY
    // =========================
    const outputDir = path.join(
      process.cwd(),
      "public",
      "generated",
      "posters"
    );

    // Ensure directory exists
    await mkdir(outputDir, {
      recursive: true,
    });

    const filePath = path.join(
      outputDir,
      fileName
    );

    console.log(
      "[POSTER SAVE] Writing file:",
      filePath
    );

    // =========================
    // WRITE FILE
    // =========================
    await writeFile(
      filePath,
      base64Data,
      "base64"
    );

    const publicUrl =
      `/generated/posters/${fileName}`;

    console.log(
      "[POSTER SAVE] Success:",
      publicUrl
    );

    // =========================
    // RESPONSE
    // =========================
    return Response.json({
      success: true,
      movieId,
      url: publicUrl,
    });
  } catch (err) {
    console.error(
      "[POSTER SAVE] ERROR:",
      err
    );

    return Response.json(
      {
        error:
          "Failed to save poster",
      },
      {
        status: 500,
      }
    );
  }
}