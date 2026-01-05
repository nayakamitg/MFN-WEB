import React, { useEffect, useState } from 'react'
import NavbarComp from './Navbar'
import { useLocation, useParams } from 'react-router'
import '../assets/details.css'
import Table from 'react-bootstrap/Table';
import toast from 'react-hot-toast';
import axios from 'axios';
import Loader from './ui/Loader';

const FoundPersonDetails = () => {
    const [loading,setLoading]=useState(true)
    const location=useLocation();
    const [currimage,setCurrimage]=useState()
     const {id}=useParams();
    console.log("Location",location)
    // console.log("Person",)

const [person,setPerson]=useState({images:[]});
console.log(person)
    useEffect(()=>{
        if(location.pathname.toString().includes("/found-person-details")){
            console.log("found")
        }
    },[])

  useEffect(()=>{
      setCurrimage(`https://zipnet.delhipolice.gov.in${person?.images[0]?.imageUrl}`)
    },[person])

  const getPersons = async (id) => {
    try {
      setLoading(true)
      const res = await axios.get(
        `https://goplanup.dishaayein.com/api/FoundPersons/${id}`
      );
      setPerson(res.data);
      setLoading(false)
    } catch (error) {
      toast.error("Failed to show details");
    }
     finally{
      setLoading(false)
    }
  };


  useEffect(() => {
    if (id) {
      getPersons(id);
    }
  }, [id]);



const handleImageShow=(e)=>{
setCurrimage(e.target.src)
}

if(loading){
  return <Loader/>
}
  return (
    <>
      <div className="mainDetailContainer">
    <div className="detailsContainer">
    <div className="imageContainer">
        <img className='bigImage' src={currimage} onError={(e)=>e.target.src="/not-available.webp"} alt="" />
        <div className="images">
            {
                person?.images.map((image,index)=><div key={index} className='smallImage' ><img onClick={(e)=>{handleImageShow(e)}} src={`https://zipnet.delhipolice.gov.in${image?.imageUrl}`} alt="" /></div>)
            }

        </div>
    </div>
    <div className="descriptionContainer">
        <h1 className="nameTitle">{person?.name}</h1>
        <p className="descriptions">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint sunt quis necessitatibus esse maxime, nesciunt voluptate iste voluptatem nemo. Error libero obcaecati in ipsa iusto provident eligendi nobis, quos totam?
        </p>

       <Table striped="columns" bordered hover>
     <thead>
        <tr>
            <th colSpan={2}>Persnal Details</th>
        </tr>
     </thead>
      <tbody>
        {person?.sex && <tr>
          <td width={50+"%"}>Gender</td>
          <td>{person.sex}</td>
        </tr>}
       { person?.height &&<tr>
          <td width={50+"%"}>Height</td>
          <td>{person.height}</td>
        </tr>}
       { (person?.ageFrom || person.ageTo) && <tr>
          <td width={50+"%"}>Age</td>
          <td>{(person?.ageFrom && person?.ageTo)?`${person?.ageFrom} - ${person?.ageTo}`:person?.ageFrom || person?.ageTo}</td>
        </tr>}
       { person?.religion &&<tr>
          <td width={50+"%"}>Religion</td>
          <td>{person.religion}</td>
        </tr>}
       { person?.parentage &&<tr>
          <td>Parent Name</td>
          <td>{person.parentage}</td>
        </tr>}
         { person?.category &&<tr>
          <td>Category</td>
          <td>{person.category}</td>
        </tr>}
      </tbody>
    </Table>

       <Table striped="columns" bordered hover>
     <thead>
        <tr>
            <th colSpan={2}>Address Details</th>
        </tr>
     </thead>
      <tbody>
       { person?.state && <tr>
          <td width={50+"%"}>State</td>
          <td>{person.state}</td>
        </tr>}
      
       { person?.district && <tr>
          <td width={50+"%"}>District</td>
          <td>{person.district}</td>
        </tr>}
       { person?.policeStation && <tr>
          <td>Police Station</td>
          <td>{person.policeStation}</td>
        </tr>}
       { person?.address && <tr>
          <td>Address</td>
          <td>{person.address}</td>
        </tr>}
      
       { person?.keptPlaceAddress && <tr>
          <td width={50+"%"}>Kept Place Address</td>
          <td>{person.keptPlaceAddress}</td>
        </tr>}
        
      </tbody>
    </Table>

  <Table striped="columns" bordered hover>
     <thead>
        <tr>
            <th colSpan={2}>Found Details</th>
        </tr>
     </thead>
      <tbody>
       { person?.foundPlace && <tr>
          <td width={50+"%"}>Found Place</td>
          <td>{person?.foundPlace}</td>
        </tr>}
       { person?.foundDateTime && <tr>
          <td width={50+"%"}>Found Date</td>
          <td>{person?.foundDateTime}</td>
        </tr>}
       { person?.motherName && <tr>
          <td width={50+"%"}>Mother Name</td>
          <td>{person?.motherName}</td>
        </tr>}
      
       
      </tbody>
    </Table>

       <Table striped="columns" bordered hover>
     <thead>
        <tr>
            <th colSpan={2}>Physical Details</th>
        </tr>
     </thead>
      <tbody>
        {person?.height && <tr>
          <td width={50+"%"}>Height</td>
          <td>{person?.height}</td>
        </tr>}
        {person?.eyes && <tr>
          <td width={50+"%"}>Eyes</td>
          <td>{person?.eyes}</td>
        </tr>}
        {person?.face && <tr>
          <td width={50+"%"}>Face</td>
          <td>{person?.face}</td>
        </tr>}

        {person?.hair && <tr>
          <td width={50+"%"}>Hair</td>
          <td>{person?.hair}</td>
        </tr>}

        {person?.mustaches && <tr>
          <td width={50+"%"}>Mustaches</td>
          <td>{person?.mustaches}</td>
        </tr>}
        {person?.beard && <tr>
          <td width={50+"%"}>Beard</td>
          <td>{person?.beard}</td>
        </tr>}
        {person?.tattoo && <tr>
          <td width={50+"%"}>Tattoo</td>
          <td>{person?.tattoo}</td>
        </tr>}
        {person?.complexion && <tr>
          <td width={50+"%"}>Complexion</td>
          <td>{person?.complexion}</td>
        </tr>}
       
      </tbody>
    </Table>
     
       <Table striped="columns" bordered hover>
     <thead>
        <tr>
            <th colSpan={2}>Additional Details</th>
        </tr>
     </thead>
      <tbody>
       { person?.dressUpper && <tr>
          <td width={50+"%"}>Upper Dress</td>
          <td>{person?.dressUpper}</td>
        </tr>}
       { person?.dressUpperColor && <tr>
          <td width={50+"%"}>Upper Dress Color</td>
          <td>{person?.dressUpperColor}</td>
        </tr>}
       { person?.dressLower && <tr>
          <td width={50+"%"}>Lower Dress</td>
          <td>{person?.dressLower}</td>
        </tr>}
       { person?.dressLowerColor && <tr>
          <td width={50+"%"}>Lower Dress Color</td>
          <td>{person?.dressLowerColor}</td>
        </tr>}
       
      </tbody>
    </Table>
    </div>

</div>
</div>
    </>
  )
}

export default FoundPersonDetails
