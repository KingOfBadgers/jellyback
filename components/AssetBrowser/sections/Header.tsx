"use client";

import type {
  AssetType,
} from "../types";


type Props = {

  assetType: AssetType;

  onClose: () => void;

};



export default function Header({

  assetType,

  onClose,

}: Props) {


  return (

    <header

      className="
        flex
        h-16
        items-center
        justify-between
        border-b
        border-white/10
        px-6
      "

    >


      <div>


        <h2
          className="
            text-xl
            font-semibold
          "
        >

          Asset Browser

        </h2>


        <p
          className="
            text-xs
            opacity-50
          "
        >

          {assetType}

        </p>


      </div>



      <button

        onClick={onClose}

        className="
          text-xl
          opacity-70
        "

      >

        ✕

      </button>


    </header>

  );

}