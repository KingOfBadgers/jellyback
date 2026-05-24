import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req: Request) {
  try {
    const { image } = await req.json();

    if (!image) {
      return Response.json(
        { error: "No image provided" },
        { status: 400 }
      );
    }

    // strip base64 prefix if present
    const base64Data = image.replace(
      /^data:image\/png;base64,/,
      ""
    );

    const fileName = `poster_${Date.now()}.png`;

    const filePath = path.join(
      process.cwd(),
      "public",
      "generated",
      "posters",
      fileName
    );

    await writeFile(filePath, base64Data, "base64");

    return Response.json({
      url: `/generated/posters/${fileName}`,
    });
  } catch (err) {
    console.error("SAVE POSTER ERROR:", err);

    return Response.json(
      { error: "Failed to save poster" },
      { status: 500 }
    );
  }
}