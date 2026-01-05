import React from 'react';
import { Heart } from 'lucide-react';

import { FaLocationDot } from "react-icons/fa6";
import { useNavigate } from 'react-router';

const PropertyCard = ({person,key,personType}) => {
  const navigate= useNavigate();
// console.log(key)
// console.log(person.missingPersonId)
// console.log(person)
// console.log(personType)

const DateValidate=()=>{
  const newdate=new Date(person?.reportingDate).toLocaleDateString()
  if(newdate!="Invalid Date")
  {
  return newdate
  }
  else{
    return new Date(person.createdOn).toLocaleDateString()
  }

}


  return (
    <div className="property-card" onClick={()=>{
      if(personType=="missing")
      {
      navigate(`/missing-person-details/${person.missingPersonId}`)
    }
      if(personType=="found")
      {
      navigate(`/found-person-details/${person?.unIdentifiedPersonId}`)
    }
      if(personType=="deadBodies")
      {
      navigate(`/unidentified-bodies-details/${person?.unIdentifiedDeadBodyId}`)
    }
      }}>
      <div className="card-image-container">
        
        <img src={`https://zipnet.delhipolice.gov.in${person?.images[0]?.imageUrl}`
} onError={(e) => (e.target.src = "not-available.webp")} className="card-image" style={{filter:personType==="deadBodies"?"blur(7px)":"blur(0px)"}} />
        <button className="heart-button">
          <FaLocationDot className='FaLocationPin'/>
        </button>
        {person?.state && (
          <div className="featured-badge">
            {person?.state}
          </div>
        )}
      </div>
      
      <div className="card-content">
        <div className="price">
          {person?.name}
        </div>
        <div className="">
          {person?.ageFrom && person?.ageTo ? `Age: ${person?.ageFrom} - ${person?.ageTo}` : person?.ageFrom ? `Age: ${person?.ageFrom}` : person?.ageTo ? `Age: ${person?.ageTo}` : personType==="missing"?`Age: ${(new Date().getFullYear() -person?.birthYear)}`:"NA"}
          
        </div>
        <div className="">
          {person?.sex}
        </div>
        <div className="card-footer">
          <span className="location">{person?.district}</span>
          <span className="time-ago">{DateValidate()}</span>
          {/* <span className="time-ago">{(person?.reportingDate && (new Date(person?.reportingDate).toLocaleDateString())) || (person?.createdOn && (new Date(person?.createdOn).toLocaleDateString()))}</span> */}
        </div>
      </div>
    </div>
  );
};

const Card = ({key,person,personType}) => {


  return (
    <div className="cards-container">
     
        <PropertyCard
          key={key}
          person={person}
          personType={personType}
        />
     
      
      <style jsx>{`
        .cards-container {
          display: flex;
          gap: 10px;
          padding: 10px;
          flex-wrap: wrap;
          max-Width:360px;
        }

        .property-card {
          max-width: 300px;
          width: 250px;
          min-width: 170px;
          background: white;
          border-radius: 3px;
          border: 1px solid #8e8e8eff;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          cursor: pointer;
        }

        .property-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
        }

        .card-image-container {
          position: relative;
          height: 170px;
          width:100%;
          overflow: hidden;
          display:flex;
          justify-content:center;
          padding-top:5px;

        }

        .card-image {
          width: 96%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .property-card:hover .card-image {
          transform: scale(1.05);
        }

        .heart-button {
          position: absolute;
          top: 12px;
          right: 12px;
          background: rgba(255, 255, 255, 0.9);
          border: none;
          border-radius: 50%;
          width: 36px;
          height: 36px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .heart-button:hover {
          background: white;
          transform: scale(1.1);
        }

        .FaLocationPin {
          width: 18px;
          height: 18px;
          color: #000000ff;
          transition: color 0.2s ease;
          position:absolute;
          top:10px;
          right:10px;
        }
       
        .heart-button:hover .heart-icon {
          color: #ff4757;
        }

        .featured-badge {
          position: absolute;
          top: 12px;
          left: 12px;
          background: #ffa502;
          color: white;
          padding: 4px 8px;
          font-size: 11px;
          font-weight: bold;
          border-radius: 4px;
          letter-spacing: 0.5px;
        }

        .card-content {
          padding: 16px;
        }

        .price {
          font-size: 24px;
          font-weight: bold;
          color: #2c3e50;
          margin-bottom: 8px;
        }

        .title {
          font-size: 16px;
          font-weight: 500;
          color: #34495e;
          margin-bottom: 12px;
          line-height: 1.3;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }

        .card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 12px;
          color: #7f8c8d;
        }

        .location {
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.3px;
        }

        .time-ago {
          font-weight: 400;
        }

        @media (max-width: 768px) {
          .cards-container {
         
          }

          .property-card {
            width: 100%;
            max-width: 350px;
          }
        }
      `}</style>
    </div>
  );
};

export default Card;











































































// import React from 'react';

// const Card = ({person}) => {
//   return (
//     <div className="relative w-60 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md card1">
//       <div className="relative mx-4 -mt-6 h-30 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40 bg-gradient-to-r from-blue-500 to-blue-600">
//         <img src={`https://goplanup.dishaayein.com${person?.images[0]?.imageUrl}` || "https://imgs.search.brave.com/QrrF8yctvnxGKn5UBvuEt1XL7Pv04zXmzQ0y50RN5cY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA3LzkxLzIyLzU5/LzM2MF9GXzc5MTIy/NTkyN19jYVJQUEg5/OUQ2RDFpRm9ua0NS/bUNHemtKUGYzNlFE/dy5qcGc"} alt="profile-picture" className="h-full w-full object-cover" />
//       </div>
//       <div className="p-3">
//         <h5 className="">
//          {person.name}
//         </h5>
//         <p className="block font-sans text-base leading-relaxed text-inherit antialiased">
//           {
//           (person.ageFrom || person.ageTo)?(person.ageFrom && person.ageTo)?`Age: ${person.ageFrom} - ${person.ageTo}`:`Age: ${person.ageFrom || person.ageTo}`:null
//           } 
//           <br />
//           {
//             person?.sex!=="" && person?.sex!==null ?(`Gender: ${person.sex}`):null

//           }
//          <br />
//          State: {person.state} <br />
//          District: {person.district} <br />
//         </p>
//       </div>
//       <div className="p-6 pt-0">
//         <button  type="button" className="readMoreButton" style={{padding: '0.2rem 0.7rem', color: 'white', borderRadius: '7px'}}>
//           Read More
//         </button>
//       </div>
//     </div>
//   );
// }

// export default Card;




