
// to turn this small part of ui to client side
'use client'

import { X } from "lucide-react";
import Link from "next/link";

const SearchFormReset = () => {
     const reset=()=>{
        //get form by query selector
        const form = document.querySelector('.search-form') as HTMLFormElement;
        // typesecript so definde as htmlformelement
        //if form exists reset it
        if(form){
            form.reset();
        }
    }
  return (
   
        <button type="reset" onClick={reset}>
             <Link href="/" className="search-btn text-white">
              <X className="size-5"/>
              {/* X icon from lucide-react or shadcn*/}
             </Link>
        </button>
  
  )
}

export default SearchFormReset
