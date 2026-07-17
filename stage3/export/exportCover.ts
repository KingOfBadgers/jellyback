"use client";

import { toPng } from "html-to-image";


export async function exportCover() {

  const element =
    document.getElementById(
      "jellyback-export"
    );


  if (!element) {
    console.error(
      "[EXPORT] Missing jellyback-export"
    );
    return;
  }


  console.log(
    "[EXPORT RECT]",
    element.getBoundingClientRect()
  );


  const dataUrl = await toPng(
    element,
    {
      width: 1000,
      height: 1500,

      canvasWidth: 1000,
      canvasHeight: 1500,

      pixelRatio: 2,

      cacheBust: true,

      backgroundColor:
        "#000000",

      style: {
        transform: "none",
        margin: "0",
      }
    }
  );


  const link =
    document.createElement("a");


  link.download =
    "jellyback-cover.png";


  link.href =
    dataUrl;


  link.click();

}