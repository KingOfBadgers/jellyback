"use client";

import {
  RowsPhotoAlbum
} from "react-photo-album";

import "react-photo-album/rows.css";

import type {
  Asset
} from "../types";


type Props = {

  assets: Asset[];

  onSelect: (
    asset: Asset
  ) => void;


  onPreview: (
    index: number
  ) => void;

};



export default function Gallery({

  assets,

  onSelect,

  onPreview,

}: Props) {



  const photos = assets.map(

    asset => ({

      src:
        asset.thumbnail,

      width:
        asset.width,

      height:
        asset.height,

    })

  );



  return (

    <RowsPhotoAlbum

      photos={photos}

      targetRowHeight={150}
 rowConstraints={{
    singleRowMaxHeight: 180,
  }}

      onClick={({ index }) => {


        console.log(
          "[Gallery] clicked",
          index
        );


        const asset =
          assets[index];



        if (!asset)
          return;



        console.log(
          "[Gallery] selected",
          asset
        );



        onSelect(asset);


        onPreview(index);


      }}

    />

  );

}