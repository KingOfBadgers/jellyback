"use client";

import BackgroundBrowser
from "@/stage2/components/library/BackgroundBrowser";


export default function TestLibrary(){

 return (
   <div className="h-screen">
     <BackgroundBrowser
       onSelect={(image)=>{
         console.log(
           "SELECTED",
           image
         );
       }}
     />
   </div>
 );

}