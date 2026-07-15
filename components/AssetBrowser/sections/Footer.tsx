import type {
  Asset
} from "../types";


type Props = {

  selected: Asset | null;

  onSelect: () => void;

};


export default function Footer({

  selected,

  onSelect,

}: Props){


return (

<footer
className="
flex
h-20
items-center
justify-between
border-t
border-white/10
px-6
"
>


<div>

{
selected
?
`Selected: ${selected.title}`
:
"No asset selected"
}

</div>


<button

disabled={!selected}

onClick={onSelect}

className="
rounded
bg-white
px-4
py-2
text-black
disabled:opacity-30
"

>

Use Background

</button>


</footer>

);

}