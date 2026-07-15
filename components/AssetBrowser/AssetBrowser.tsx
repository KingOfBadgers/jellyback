"use client";

import {
  useEffect,
  useState,
} from "react";


import type {
  Asset,
  AssetType,
  AssetCategory,
} from "../types";


import Header from "./sections/Header";
import Sidebar from "./sections/Sidebar";
import Gallery from "./sections/Gallery";
import Footer from "./sections/Footer";
import Lightbox from "./sections/Lightbox";


type Props = {

  open: boolean;

  assetType: AssetType;

  onClose: () => void;

  onSelect: (
    asset: Asset
  ) => void;

};



export default function AssetBrowser({

  open,

  assetType,

  onClose,

  onSelect,

}: Props) {



  const [
    assets,
    setAssets
  ] = useState<Asset[]>([]);



  const [
    categories,
    setCategories
  ] = useState<AssetCategory[]>([]);



  const [
    activeCategory,
    setActiveCategory
  ] = useState("all");



  const [
    selected,
    setSelected
  ] = useState<Asset | null>(null);



  const [
    lightboxIndex,
    setLightboxIndex
  ] = useState(-1);

useEffect(() => {

  console.log(
    "[AssetBrowser] lightboxIndex",
    lightboxIndex
  );

}, [lightboxIndex]);



  useEffect(() => {


    if (!open) return;

  console.log(
    "Lightbox index:",
    lightboxIndex
  );

    async function loadAssets() {


      const response =
        await fetch(
          "/api/background-library"
        );


      const data =
        await response.json();



      const loadedAssets: Asset[] =

        data.images.map(
          (image: any) => ({

            id:
              image.id,

            type:
              "background",

            category:
              image.theme,

            title:
              image.title,

            src:
              image.src,

            thumbnail:
              image.thumbnail,

            width:
              image.width,

            height:
              image.height,

          })
        );



      const loadedCategories:

      AssetCategory[] = [

        {
          id:
            "all",

          name:
            "All",

          count:
            loadedAssets.length,

        },

        ...data.themes

      ];



      setAssets(
        loadedAssets
      );


      setCategories(
        loadedCategories
      );


    }



    loadAssets();


  }, [open]);





  const filteredAssets =

    activeCategory === "all"

    ?

    assets

    :

    assets.filter(

      asset =>

        asset.category === activeCategory

    );





  if (!open)
    return null;





  return (

    <div

      className="
        fixed
        inset-6
        z-50
        flex
        flex-col
        overflow-hidden
        rounded-xl
        border
        border-white/10
        bg-neutral-950
        text-white
      "

    >



      <Header

        assetType={assetType}

        onClose={onClose}

      />




      <div

        className="
          flex
          flex-1
          min-h-0
        "

      >



        <Sidebar

          categories={categories}

          activeCategory={
            activeCategory
          }

          onChange={
            setActiveCategory
          }

        />




        <main

          className="
            flex-1
            min-h-0
            overflow-y-auto
            p-6
          "

        >



          <Gallery

            assets={
              filteredAssets
            }

            onSelect={
              setSelected
            }

            onPreview={
              setLightboxIndex
            }

          />



        </main>



      </div>




      <Footer

        selected={selected}

        onSelect={() => {


          if (!selected)
            return;


          onSelect(
            selected
          );


        }}

      />




      <Lightbox

  assets={filteredAssets}

  index={lightboxIndex}

  open={lightboxIndex >= 0}

  onClose={() =>
    setLightboxIndex(-1)
  }

/>



    </div>

  );

}