/**
 * =========================================================
 * JELLYBACK STAGE 2.5 — LOGO ANALYSIS
 * SPRINT 1
 * =========================================================
 *
 * Adds:
 * - intrinsic dimensions
 * - aspect ratio
 * - transparency ratio
 *
 * Does NOT:
 * - classify presentation
 * - modify images
 * - crop assets
 *
 * =========================================================
 */

export type LogoShape =
  | "very-wide"
  | "wide"
  | "landscape"
  | "square"
  | "portrait"
  | "unknown";


export interface LogoAnalysis {

  width:number;

  height:number;

  aspectRatio:number;

  transparencyRatio:number;

  boundingBox:{
    x:number;
    y:number;
    width:number;
    height:number;
  };

  coverage:number;

  shape: LogoShape;

}



function classifyShape(
  aspectRatio:number
):LogoShape {

  if (aspectRatio >= 5)
    return "very-wide";

  if (aspectRatio >= 3)
    return "wide";

  if (aspectRatio >= 1.3)
    return "landscape";

  if (aspectRatio >= 0.8)
    return "square";

  return "portrait";
}



async function analyseTransparency(
  img:HTMLImageElement
):Promise<number>{

  return new Promise((resolve)=>{

    const canvas =
      document.createElement("canvas");

    canvas.width =
      img.naturalWidth;

    canvas.height =
      img.naturalHeight;

    const ctx =
      canvas.getContext("2d");

    if(!ctx){

      resolve(0);

      return;

    }

    ctx.drawImage(
      img,
      0,
      0
    );

    const pixels =
      ctx.getImageData(
        0,
        0,
        canvas.width,
        canvas.height
      )
      .data;

    let transparent = 0;

    let total =
      canvas.width *
      canvas.height;

    for(
      let i = 3;
      i < pixels.length;
      i += 4
    ){

      const alpha =
        pixels[i];

      if(alpha < 10){

        transparent++;
      }

    }

    resolve(
      transparent / total
    );
  });
}

function analyseBoundingBox(
  img:HTMLImageElement
) {

  const canvas =
    document.createElement("canvas");


  canvas.width =
    img.naturalWidth;


  canvas.height =
    img.naturalHeight;


  const ctx =
    canvas.getContext("2d");


  if(!ctx){

    return {
      x:0,
      y:0,
      width:0,
      height:0,
    };

  }


  ctx.drawImage(
    img,
    0,
    0
  );


  const pixels =
    ctx.getImageData(
      0,
      0,
      canvas.width,
      canvas.height
    )
    .data;



  let minX = canvas.width;
  let minY = canvas.height;

  let maxX = 0;
  let maxY = 0;



  for(
    let y = 0;
    y < canvas.height;
    y++
  ){

    for(
      let x = 0;
      x < canvas.width;
      x++
    ){

      const alpha =
        pixels[
          (y * canvas.width + x) * 4 + 3
        ];


      /**
       * Pixel considered artwork
       *
       * Ignore almost transparent pixels
       */
      if(alpha > 20){

        if(x < minX)
          minX = x;

        if(y < minY)
          minY = y;

        if(x > maxX)
          maxX = x;

        if(y > maxY)
          maxY = y;

      }

    }

  }


  if(maxX === 0 && maxY === 0){

    return {
      x:0,
      y:0,
      width:0,
      height:0,
    };

  }


  return {

    x:minX,

    y:minY,

    width:
      maxX - minX,

    height:
      maxY - minY,

  };

}

export async function analyseLogo(
  src:string
):Promise<LogoAnalysis>{

  return new Promise((resolve)=>{

    const img =
      new Image();

    img.crossOrigin =
      "anonymous";

    img.onload =
      async()=>{

        const width =
          img.naturalWidth;

        const height =
          img.naturalHeight;

        const aspectRatio =
          width / height;

        const transparencyRatio =
          await analyseTransparency(img);

        const boundingBox =
          analyseBoundingBox(img);

        const coverage =(
          boundingBox.width *
          boundingBox.height
        ) /
        (
          width *
          height
        );

        resolve({

  width,

  height,

  aspectRatio,

  transparencyRatio,

  boundingBox,

  coverage,

  shape:
    classifyShape(
      aspectRatio
    ),

});
      };

        img.onerror = ()=>{
        resolve({
          width:0,
          height:0,
          aspectRatio:0,
          transparencyRatio:0,
          boundingBox:{
            x:0,
            y:0,
            width:0,
            height:0,
          },
          coverage:0,
          shape:"unknown",
        });
      };

    img.src =
      src;
  });
}