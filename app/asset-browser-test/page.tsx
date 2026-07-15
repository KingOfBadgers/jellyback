"use client";

import { useState } from "react";

import AssetBrowser from "@/components/AssetBrowser/AssetBrowser";


export default function AssetBrowserTestPage() {

  const [
    open,
    setOpen
  ] = useState(true);


  return (

    <>

      <button
        onClick={() => setOpen(true)}
        className="
          m-10
          rounded
          bg-white
          px-4
          py-2
          text-black
        "
      >
        Open Asset Browser
      </button>


      <AssetBrowser

        open={open}

        assetType="background"

        onClose={() =>
          setOpen(false)
        }

        onSelect={(asset) => {

          console.log(
            "Selected asset",
            asset
          );

        }}

      />

    </>

  );

}

