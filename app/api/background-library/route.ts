
import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import sharp from "sharp";

export const runtime = "nodejs";
/**
 * =========================================================
 * STAGE 2 — BACKGROUND LIBRARY API
 * =========================================================
 *
 * RESPONSIBILITIES
 * ----------------
 * - Scan public/background-library
 * - Discover themes (folders)
 * - Return image metadata
 * - Provide thumbnail paths
 *
 * DOES NOT
 * --------
 * - Know about Jellyfin
 * - Modify Stage 2 state
 * - Select backgrounds
 * - Crop images
 *
 * Folder structure:
 *
 * public/
 *   background-library/
 *
 *      Nature/
 *          mountains.webp
 *
 *      Sci-Fi/
 *          galaxy.webp
 *
 *      Horror/
 *          graveyard.webp
 *
 *      .thumbs/
 *          Nature/
 *              mountains.webp
 *
 * =========================================================
 */


type BackgroundTheme = {
  id: string;
  name: string;
  count: number;
};


type BackgroundLibraryAsset = {
  id: string;
  source: "library";
  theme: string;
  title: string;
  src: string;
  thumbnail: string;
  width: number;
  height: number;
};



function slugify(value: string) {

  return value
    .toLowerCase()
    .replace(/\.[^/.]+$/, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

}



function isImage(file: string) {

  return [
    ".jpg",
    ".jpeg",
    ".png",
    ".webp",
  ].includes(
    path.extname(file).toLowerCase()
  );

}



export async function GET() {

  const libraryPath = path.join(
    process.cwd(),
    "public",
    "background-library"
  );


  const themes: BackgroundTheme[] = [];
  const images: BackgroundLibraryAsset[] = [];


  try {

    const folders = await fs.readdir(
      libraryPath,
      {
        withFileTypes: true,
      }
    );


    for (const folder of folders) {


      /**
       * Ignore:
       * - files
       * - hidden folders
       * - thumbnail folder
       */
      if (
        !folder.isDirectory() ||
        folder.name.startsWith(".") ||
        folder.name === ".thumbs"
      ) {
        continue;
      }


      const themeName = folder.name;

      const themeId =
        slugify(themeName);


      const themePath = path.join(
        libraryPath,
        themeName
      );


      const files = await fs.readdir(
        themePath
      );


      const imageFiles =
        files
          .filter(isImage)
          .sort(
            (a,b) =>
              a.localeCompare(b)
          );

      themes.push({

  id: themeId,

  name: themeName,

  count: imageFiles.length,

});


for (const file of imageFiles) {


  const imagePath = path.join(
    themePath,
    file
  );


  const metadata =
    await sharp(imagePath).metadata();


  const baseName =
    path.parse(file).name;


  images.push({
          id:
            `${themeId}-${slugify(file)}`,
          source:
            "library",
          theme:
            themeId,
          title:
            baseName,
          src:
            `/background-library/${encodeURIComponent(themeName)}/${encodeURIComponent(file)}`,
          thumbnail:
            `/background-library/.thumbs/${encodeURIComponent(themeName)}/${encodeURIComponent(baseName)}.webp`,
          width:
            metadata.width ?? 2,
          height:
            metadata.height ?? 3,
          });

      }

    }



    return NextResponse.json({

      themes,

      images,

      total:
        images.length,

    });


  } catch (error) {


    console.error(
      "[BACKGROUND LIBRARY API]",
      error
    );


    return NextResponse.json(

      {
        error:
          "Unable to load background library"
      },

      {
        status:500
      }

    );

  }

}