import React, { useEffect, useState } from 'react'
import NavbarComp from './Navbar'
import { useLocation, useParams } from 'react-router'
import '../assets/details.css'
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import toast from 'react-hot-toast';
import Loader from './ui/Loader';

const Details = () => {
const [loading,setLoading]=useState(true)
    const location=useLocation();
    const {id}=useParams();
    console.log("Location",location)
    console.log("Param",id)
    // console.log("Person",)
const [person,setPerson]=useState({images:[]});
const [currimage,setCurrimage]=useState()
console.log(person)
    useEffect(()=>{
        if(location.pathname.toString().includes("/found-person-details")){
            console.log("found")
        }
    },[])

    useEffect(()=>{
      setCurrimage(`https://zipnet.delhipolice.gov.in${person?.images[0]?.imageUrl}`)
    },[person])

const handleImageShow=(e)=>{
setCurrimage(e.target.src)
}
console.log("PERSON=",person)
  const getPersons = async (id) => {
    try {
      setLoading(true)
      const res = await axios.get(
        `https://goplanup.dishaayein.com/api/MissingPersons/${id}`
      );
      setPerson(res.data);
      setLoading(false)
    } catch (error) {
      toast.error("Failed to show details");
    }
  };


  useEffect(() => {
    if (id) {
      getPersons(id);
    }
  }, [id]);

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
                person?.images.map((image,index)=><div key={index} className='smallImage' ><img onClick={(e)=>{handleImageShow(e)}} src={`https://zipnet.delhipolice.gov.in${image.imageUrl}`} alt="" /></div>)
            }

        </div>
    </div>
    <div className="descriptionContainer">
        <h1 className="nameTitle">{person?.name}</h1>
        <p className="descriptions">
          {person?.description}
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
       { person?.birthYear &&<tr>
          <td width={50+"%"}>Age</td>
          <td>{new Date().getFullYear()-(person.birthYear)}</td>
        </tr>}
       { person?.birthYear &&<tr>
          <td width={50+"%"}>Birth Year</td>
          <td>{person.birthYear}</td>
        </tr>}
       { person?.religion &&<tr>
          <td width={50+"%"}>Religion</td>
          <td>{person.religion}</td>
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
       { person?.missingFrom && <tr>
          <td width={50+"%"}>Missing From Place</td>
          <td>{person.missingFrom}</td>
        </tr>}
       { person?.dateFrom && <tr>
          <td width={50+"%"}>Missing Date</td>
          <td>{new Date(person.dateFrom).toLocaleDateString()}</td>
        </tr>}
       { person?.state && <tr>
          <td width={50+"%"}>State</td>
          <td>{person.state}</td>
        </tr>}
       { person?.district && <tr>
          <td width={50+"%"}>District</td>
          <td>{person.district}</td>
        </tr>}
       { person?.policeStation && <tr>
          <td width={50+"%"}>Police Station</td>
          <td>{person.policeStation}</td>
        </tr>}
       { person?.village && <tr>
          <td width={50+"%"}>Village</td>
          <td>{person.village}</td>
        </tr>}
       { person?.pin && <tr>
          <td width={50+"%"}>Pin Code</td>
          <td>{person.pin}</td>
        </tr>}
       { person?.address && <tr>
          <td width={50+"%"}>Address</td>
          <td>{person.address}</td>
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
          <td>Beard</td>
          <td>{person?.beard}</td>
        </tr>}
        {person?.tattoo && <tr>
          <td width={50+"%"}>Tattoo</td>
          <td>{person?.tattoo}</td>
        </tr>}
       
      </tbody>
    </Table>

       <Table striped="columns" bordered hover>
     <thead>
        <tr>
            <th colSpan={2}>Contact Details</th>
        </tr>
     </thead>
      <tbody>
       { person?.guardianName && <tr>
          <td width={50+"%"}>Guardian Name</td>
          <td>{person?.guardianName}</td>
        </tr>}
       { person?.complainantPhoneNo && <tr>
          <td width={50+"%"}>Contact Number</td>
          <td>{person?.complainantPhoneNo}</td>
        </tr>}
       { person?.guardianOccupation && <tr>
          <td width={50+"%"}>Guardian Occupation</td>
          <td>{person?.guardianOccupation}</td>
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

export default Details
