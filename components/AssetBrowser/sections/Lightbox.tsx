"use client";

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import type {
  Asset
} from "../types";


type Props = {

  assets: Asset[];

  index: number;

  open: boolean;

  onClose: () => void;

};



export default function AssetLightbox({

  assets,

  index,

  open,

  onClose,

}: Props) {


  console.log(
    "[AssetLightbox]",
    {
      open,
      index,
      assets
    }
  );



  if (!open)
    return null;



  if (!assets.length)
    return null;



  return (

    <Lightbox

  className="z-[99999]"

      index={index}

      slides={

        assets.map(asset => ({

          src:
            asset.src,

          width:
            asset.width,

          height:
            asset.height,

        }))

      }


      open={open}


      close={
        onClose
      }

    />

  );

}