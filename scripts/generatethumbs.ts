import fs from "fs/promises";
import path from "path";
import sharp from "sharp";


const ROOT = path.join(
  process.cwd(),
  "public",
  "background-library"
);


const THUMB_WIDTH = 400;


const EXTENSIONS = [
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
];


function isImage(file:string) {

  return EXTENSIONS.includes(
    path.extname(file).toLowerCase()
  );

}



async function processFolder(folder:string) {


  const sourceFolder =
    path.join(
      ROOT,
      folder
    );


  const thumbFolder =
    path.join(
      ROOT,
      ".thumbs",
      folder
    );


  await fs.mkdir(
    thumbFolder,
    {
      recursive:true,
    }
  );


  const files =
    await fs.readdir(
      sourceFolder
    );


  for(const file of files) {


    if(!isImage(file))
      continue;


    const input =
      path.join(
        sourceFolder,
        file
      );


    const output =
      path.join(
        thumbFolder,
        file.replace(
          path.extname(file),
          ".webp"
        )
      );


    console.log(
      "Creating thumbnail:",
      output
    );


    await sharp(input)
      .resize(
        {
          width: THUMB_WIDTH,
          withoutEnlargement:true,
        }
      )
      .webp(
        {
          quality:80,
        }
      )
      .toFile(output);

  }

}



async function main() {


  const folders =
    await fs.readdir(
      ROOT,
      {
        withFileTypes:true,
      }
    );


  for(const folder of folders) {

    if(!folder.isDirectory())
      continue;


    if(folder.name === ".thumbs")
      continue;


    await processFolder(
      folder.name
    );

  }


}


main()
  .catch(console.error);