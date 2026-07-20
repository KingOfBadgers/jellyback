"use client";

/**
 * =========================================================
 * JELLYBACK STAGE 3 — COMPOSITION STORE
 * CLEAN FRAME MIGRATION
 * =========================================================
 *
 * PURPOSE
 * ---------------------------------------------------------
 *
 * Central state container for Stage 3 composition.
 *
 *
 * RESPONSIBILITIES:
 *
 * - remember user selections
 * - preserve choices during seed refresh
 * - store treatments
 * - store frame selections
 * - store metadata preferences
 *
 *
 * DOES NOT:
 *
 * - choose designs
 * - perform intelligence
 * - render anything
 * - query Jellyfin
 *
 * =========================================================
 */


import { create } from "zustand";

import {
  variantRegistry,
} from "@/stage3/variants/variantRegistry";


import {
  MetadataBarStyle,
} from "@/stage3/metadata/metadataRegistry";



/**
 * =========================================================
 * BASIC TYPES
 * =========================================================
 */


export type FrameSelection =
  string | null;


export type VariantSelection =
  string | null;



export type TreatmentCategory =
  | "edges"
  | "depth"
  | "contrast"
  | "field"
  | "spacing";




/**
 * =========================================================
 * TREATMENT STATE
 * =========================================================
 */


export type LayerTreatmentState = {

  edges?: string | null;

  depth?: string | null;

  contrast?: string | null;

  field?: string | null;

  spacing?: string | null;

};





/**
 * =========================================================
 * VALID VARIANT LAYERS
 * =========================================================
 */


export type VariantLayer =
  | "actors"
  | "collage"
  | "logo"
  | "banner";





/**
 * =========================================================
 * COMPOSITION STORE CONTRACT
 * =========================================================
 */


export type CompositionStore = {


  /**
   * =======================================================
   * ACTIVE SEED
   * =======================================================
   */

  seed:any | null;




  /**
   * =======================================================
   * USER SELECTIONS
   * =======================================================
   *
   * Variants and frames are separate systems.
   *
   * Variants:
   *   actor layouts
   *   collage layouts
   *
   * Frames:
   *   visual PNG overlays
   *
   * =======================================================
   */


  selected:{

    actors: VariantSelection;

    collage: VariantSelection;

    logo: VariantSelection;

    banner: VariantSelection;


    /**
     * NEW FRAME MODEL
     *
     * Allows:
     *
     * actor frame
     * +
     * backdrop frame
     *
     * simultaneously
     */

    actorFrame: FrameSelection;

    backdropFrame: FrameSelection;

  };





  /**
   * =======================================================
   * METADATA BAR
   * =======================================================
   */


  metadataBarStyle:
    MetadataBarStyle;



  setMetadataBarStyle:
  (
    style:MetadataBarStyle
  ) => void;





  /**
   * =======================================================
   * TREATMENTS
   * =======================================================
   */


  treatments:{

    actors:
      LayerTreatmentState;

    collage:
      LayerTreatmentState;

    logo:
      LayerTreatmentState;

    banner:
      LayerTreatmentState;

  };





  /**
   * =======================================================
   * SEED
   * =======================================================
   */


  setSeed:
  (
    seed:any
  ) => void;





  /**
   * =======================================================
   * VARIANT CONTROL
   * =======================================================
   */


  selectVariant:
  (
    layer:
      keyof CompositionStore["selected"],

    variantId:
      VariantSelection

  ) => void;



  cycleVariant:
  (
    layer:
      keyof CompositionStore["selected"],

    options:
      string[]

  ) => void;





  /**
   * =======================================================
   * FRAME CONTROL
   * =======================================================
   */


  selectActorFrame:
  (
    frameId:FrameSelection
  ) => void;



  selectBackdropFrame:
  (
    frameId:FrameSelection
  ) => void;





  /**
   * =======================================================
   * TREATMENT CONTROL
   * =======================================================
   */


  selectTreatment:
  (
    layer:
      keyof CompositionStore["treatments"],

    category:
      TreatmentCategory,

    treatmentId:
      string | null

  ) => void;





  /**
   * =======================================================
   * RESET
   * =======================================================
   */


  reset:
  () => void;


};





/**
 * =========================================================
 * TRACE HELPERS
 * =========================================================
 */


function traceState(
  label:string,
  state:any
){


console.log(

`[STAGE3 STORE TRACE][${label}]`,

{

seed:
 state?.seed?.movieId,


selected:
 state?.selected,


treatments:
 state?.treatments,


metadataBarStyle:
 state?.metadataBarStyle,


}

);


}






/**
 * =========================================================
 * VARIANT VALIDATION
 * =========================================================
 *
 * Prevents invalid variant assignment.
 *
 * Frames are NOT validated here.
 *
 * =========================================================
 */


function isValidVariant(

  layer:VariantLayer,

  variant:VariantSelection

){


if(
  variant === null
){

return true;

}



const def =
variantRegistry[
  variant as keyof typeof variantRegistry
];



if(!def){

return false;

}



return def.layer === layer;


}






/**
 * =========================================================
 * ZUSTAND STORE
 * =========================================================
 */


export const useCompositionStore =

create<CompositionStore>(

(set,get)=>(

{


seed:null,



metadataBarStyle:
"dvd",




selected:{

actors:null,

collage:null,

logo:null,

banner:null,


actorFrame:null,

backdropFrame:null,

},




treatments:{


actors:{

edges:null,

depth:null,

contrast:null,

spacing:null,

},



collage:{

edges:null,

depth:null,

contrast:null,

field:null,

spacing:null,

},



logo:{

edges:null,

depth:null,

contrast:null,

},



banner:{

edges:null,

depth:null,

contrast:null,

},


},
/**
 * =======================================================
 * SEED HYDRATION
 * =======================================================
 *
 * Called when Stage 2.5 supplies a new composition seed.
 *
 * Rules:
 *
 * - preserve user choices
 * - validate variants
 * - never auto-select frames
 *
 * =======================================================
 */


setSeed:(seed)=>{


console.log(
"[STAGE3 STORE][setSeed]",
{

movieId:
seed?.movieId,

logoExists:
Boolean(seed?.assets?.logo),

bannerExists:
Boolean(seed?.assets?.banner),

actorCount:
seed?.assets?.actors?.length,

backdropCount:
seed?.assets?.backdrops?.length,

}
);



const state =
get();



/**
 * =======================================================
 * DEFAULT ACTOR VARIANT
 * =======================================================
 */


const actorCount =
seed?.assets?.actors?.length ?? 0;



const defaultActorsVariant =

actorCount >= 5

? "ACTOR_5_ROW"


: actorCount >= 3

? "ACTOR_3_CENTER_FOCUS"


: actorCount >= 1

? "ACTOR_1_CENTER"


: "NONE";






/**
 * =======================================================
 * PRESERVE USER STATE
 * =======================================================
 */


const nextSelected = {


actors:

isValidVariant(
"actors",
state.selected.actors
)

?

state.selected.actors

:

defaultActorsVariant,




collage:

isValidVariant(
"collage",
state.selected.collage
)

?

state.selected.collage

:

null,




logo:

isValidVariant(
"logo",
state.selected.logo
)

?

state.selected.logo

:

null,




banner:

isValidVariant(
"banner",
state.selected.banner
)

?

state.selected.banner

:

null,





/**
 * FRAMES ARE INDEPENDENT
 *
 * Never automatically changed.
 */


actorFrame:
state.selected.actorFrame,


backdropFrame:
state.selected.backdropFrame,



};





const nextState = {


seed,


selected:
nextSelected,


treatments:
state.treatments,


metadataBarStyle:
state.metadataBarStyle,


};



traceState(
"BEFORE_SET",
state
);



set(nextState);



traceState(
"AFTER_SET",
get()
);



},





/**
 * =======================================================
 * VARIANT SELECTION
 * =======================================================
 */


selectVariant:(layer,variantId)=>{


const state =
get();



console.log(
"[STAGE3 STORE][selectVariant]",
{

layer,

from:
state.selected[layer],

to:
variantId,

}
);




if(

!isValidVariant(

layer as VariantLayer,

variantId

)

){

console.warn(
"[STAGE3 STORE][INVALID VARIANT]",
{
layer,
variantId
}
);


return;

}




set({

selected:{

...state.selected,

[layer]:
variantId,

},


});



},






/**
 * =======================================================
 * VARIANT CYCLING
 * =======================================================
 */


cycleVariant:(layer,options)=>{


const state =
get();


const current =
state.selected[layer];



const index =
options.findIndex(
(v)=>v===current
);



const next =

options.length === 0

?

null

:

options[
(index + 1)
%
options.length
];




if(

!isValidVariant(

layer as VariantLayer,

next

)

){

return;

}




set({

selected:{

...state.selected,

[layer]:
next,

},

});



},







/**
 * =======================================================
 * FRAME CONTROL
 * =======================================================
 *
 * Frames are pure user selections.
 *
 * No intelligence.
 * No eligibility.
 *
 * =======================================================
 */


selectActorFrame:(frameId)=>{


console.log(
"[STAGE3 STORE][ACTOR FRAME]",
frameId
);



set({

selected:{

...get().selected,

actorFrame:
frameId,

},


});



},




selectBackdropFrame:(frameId)=>{


console.log(
"[STAGE3 STORE][BACKDROP FRAME]",
frameId
);



set({

selected:{

...get().selected,

backdropFrame:
frameId,

},


});



},






/**
 * =======================================================
 * TREATMENT CONTROL
 * =======================================================
 */


selectTreatment:(
layer,
category,
treatmentId
)=>{


const state =
get();



set({

treatments:{


...state.treatments,


[layer]:{


...state.treatments[layer],


[category]:
treatmentId,


},


},


});



},







/**
 * =======================================================
 * METADATA BAR
 * =======================================================
 */


setMetadataBarStyle:(style)=>{


console.log(
"[STAGE3 STORE][METADATA STYLE]",
{

from:
get().metadataBarStyle,

to:
style,

}
);



set({

metadataBarStyle:
style,

});


},







/**
 * =======================================================
 * RESET
 * =======================================================
 */


reset:()=>{


console.log(
"[STAGE3 STORE][RESET]"
);



set({


seed:null,



selected:{


actors:null,

collage:null,

logo:null,

banner:null,


actorFrame:null,

backdropFrame:null,


},




treatments:{


actors:{

edges:null,

depth:null,

contrast:null,

spacing:null,

},



collage:{

edges:null,

depth:null,

contrast:null,

field:null,

spacing:null,

},



logo:{

edges:null,

depth:null,

contrast:null,

},



banner:{

edges:null,

depth:null,

contrast:null,

},


},




metadataBarStyle:
"dvd",



});



},





})

);



export default useCompositionStore;