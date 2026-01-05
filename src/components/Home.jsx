import "../assets/home.css";
// import NavbarComp from "../components/Navbar";
import { NavLink, useNavigate } from "react-router-dom";
import Card from "./ui/Card";
import { useEffect } from "react";
import { getFoundPersons, getMissingPersons,getUnidentifiedBodies} from "@/services/Redux/missingSlice";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./ui/Loader";
import toast from "react-hot-toast";
import Footer from "./Footer";
import NavbarComp from "./Navbar";

const Home = ({setShowPage}) => {
const Founddispatch=useDispatch();
const Missdispatch=useDispatch();
const Bodiesdispatch=useDispatch();
const navigate=useNavigate();
let data=[];

  const {missingPersons,foundPersons,unidentifiedBodies,missingloading,missingerror,foundloading,founderror,unidentifiedloading,unidentifiederror}=useSelector((state)=>state.missing)
  useEffect(() => {
  if (!missingPersons || !missingPersons.data || missingPersons.data.length === 0) {
    console.log("Fetching the from api")
    Missdispatch(getMissingPersons({ page: 1, size: 8 }));
  }
}, [Missdispatch, missingPersons]);

useEffect(() => {
  if (!foundPersons || !foundPersons.data || foundPersons.data.length === 0) {
    Founddispatch(getFoundPersons({ page: 1, size: 8 }));
  }
}, [Founddispatch, foundPersons]);

useEffect(() => {
  if (!unidentifiedBodies || !unidentifiedBodies.data || unidentifiedBodies.data.length === 0) {
    Bodiesdispatch(getUnidentifiedBodies({ page: 1, size: 8 }));
  }
}, [Bodiesdispatch, unidentifiedBodies]);


 console.log("Missing",missingPersons)
 console.log("Found",foundPersons)
 console.log("UnIdentified",unidentifiedBodies)

 useEffect(()=>{
  if(unidentifiederror){
    toast.error("Error to fetch UnIdentified Bodies")
  }
  if(founderror){
    toast.error("Error to fetch Found Persons")
  }
  if(missingerror){
    toast.error("Error to fetch Missing Persons")
  }
 },[founderror,missingerror,unidentifiederror])
  return (
    <>
     <NavbarComp />
    {/* <Carosel/> */}
    <div className="body">
     
      <div className="mainHomeContainer">
   
    
      <div className="space"></div>

      <div className="CaroselTitleContainer">
        <h1 className="CaroselTitle">Missing Persons</h1>
        <button className="text-white" onClick={()=>navigate("/missing-person")}>Show All</button>
      </div>

      <div className="CaroselContainer">
         {
         
          missingloading?<Loader/>:

          missingPersons?.data?.slice(0,8).map((person,index)=>{
          
          return<Card personType={"missing"} key={person.unIdentifiedPersonId} person={person}/>
        
        })
        }
     
      </div>

<div className="space"></div>

  <div className="CaroselTitleContainer">
        <h1 className="CaroselTitle">Found Persons</h1>
        <button className="text-white" onClick={()=>navigate("/found-person")}>Show All</button>
      </div>
      <div className="CaroselContainer">
        {
          foundloading?<Loader/>:
          foundPersons?.data?.slice(0,8).map((person)=><Card personType={"found"} key={person.unIdentifiedPersonId} person={person}/>)
        }
     
      </div>


 <div className="CaroselTitleContainer">
        <h1 className="CaroselTitle">Unidentified Bodies</h1>
        <button className="text-white" onClick={()=>navigate("/unidentified-bodies")}>Show All</button>
      </div>

      <div className="CaroselContainer">
        {
          unidentifiedloading?<Loader/>:
          unidentifiedBodies?.data?.slice(0,8).map((person)=><Card personType={"deadBodies"} key={person.unIdentifiedDeadBodyId} person={person}/>)
        }
      </div>

</div>
    </div>
    <Footer/>
    </>
  );
};
export default Home;
