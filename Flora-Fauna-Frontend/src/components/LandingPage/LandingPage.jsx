import { useState } from "react"
import "./LandingPage.css"

export default function LandingPage() {
   const [searchInput, setSearchInput] = useState("");
   function handleOnChange(e){
      setSearchInput(e.target.value);
   }    

 console.log(searchInput)
   return (
    <div className="landing-page">
        <div className="content">
            <input className="landing-page-input" value={searchInput} type="text" placeholder="Search" onChange={e => handleOnChange(e)}></input>
      </div>
   </div>
)
}
