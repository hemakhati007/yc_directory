import Form from "next/form";
import SearchFormReset from "./SearchFormReset";
import { Search } from "lucide-react";
const SearchForm = ({query}:{query?:string|null}) => {
  
    // access query from home
   
  return (
    <Form action="/" scroll={false} className="search-form">
        <input name="query"
               defaultValue=""
               className="search-input"
               placeholder={`${query ? query : "Search Startup"}`}
        />
{/* button */}
        <div className="flex gap-2">
           {query&&(<SearchFormReset/>)}
           <button type="submit" className="search-btn text-white">
            <Search className="size-5"/>
            {/* coming from shadcn or more specific lucide react a dependency of shadcn provide all short of great icons*/}
           </button>
        </div>

      
    </Form>
  )
}

export default SearchForm


//even though form is server component but the button and onClick is still client side
//extract it into a new component SearchFormReset.tsx
//buttom isnt something that is client onclick event is

//the button will modify the query in url and that will cause the home page to rerender with new search params
