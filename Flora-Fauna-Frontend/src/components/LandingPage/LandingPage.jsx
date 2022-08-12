import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchContext } from "../../contexts/search.jsx";
import AboutPage from "../AboutPage/AboutPage.jsx";
import Footer from "../Footer/Footer.jsx";
import "./LandingPage.css"

export default function LandingPage() {
   const [searchInputValue, setSearchInput] = useState("");
   const { searchInput } = useSearchContext(); 
   const navigate = useNavigate(); 
   //Changes the useState to reflect input inside search bar
   function handleOnChange(e){
      setSearchInput(e.target.value);
   }    
    
   //Sends input value to be requested, then navigates to search page, which will display the results
   function handleOnSubmit(){
      //Send search request
      searchInput(searchInputValue)
      navigate("/search");
      
   }
 
   return (
    <div className="landing-page">
        <div className="landing-page-content">
            <div className="search-input">
               <input className="landing-page-input" value={searchInputValue} type="text" placeholder="Search the database for plants or animals in New York" onChange={e => handleOnChange(e)}></input>
                     <div className="search-icon" onClick={handleOnSubmit}>
                        <span class="material-symbols-outlined search-logo">search</span>
                        {/* <svg
                           xmlns="http://www.w3.org/2000/svg"
                           viewBox="0 0 512 512"
                           className="landing-page-search-logo"
                           onClick={handleOnSubmit}>
                              <path d="M500.3 443.7l-119.7-119.7c27.22-40.41 40.65-90.9 33.46-144.7C401.8 87.79 326.8 13.32 235.2 1.723C99.01-15.51-15.51 99.01 1.724 235.2c11.6 91.64 86.08 166.7 177.6 178.9c53.8 7.189 104.3-6.236 144.7-33.46l119.7                   119.7c15.62 15.62 40.95 15.62 56.57 0C515.9 484.7 515.9 459.3 500.3 443.7zM79.1 208c0-70.58 57.42-128 128-128s128 57.42 128 128c0 70.58-57.42 128-128 128S79.1 278.6 7           9.1 208z"/>
                        </svg> */}
                     </div>
            </div>
        </div>
        <AboutPage />
        <Footer />
   </div>
)
}
