import type {
  AssetCategory
} from "../types";



type Props = {

  categories: AssetCategory[];

  activeCategory: string;

  onChange: (
    id:string
  ) => void;

};



export default function Sidebar({

  categories,

  activeCategory,

  onChange,

}: Props) {



return (

<aside

className="
w-56
border-r
border-white/10
p-5
overflow-y-auto
"

>


<h3

className="
mb-4
font-semibold
"

>

Categories

</h3>



<div

className="
space-y-2
text-sm
"

>


{

categories.map(

category => (


<button

key={
  category.id
}


onClick={() =>
  onChange(
    category.id
  )
}


className={

`
flex
w-full
justify-between
rounded
px-3
py-2
text-left

${
activeCategory === category.id

?

"bg-white/10"

:

"hover:bg-white/5"

}

`

}


>


<span>

{category.name}

</span>


<span

className="
opacity-50
"

>

{category.count}

</span>


</button>


)

)


}



</div>



</aside>


);

}