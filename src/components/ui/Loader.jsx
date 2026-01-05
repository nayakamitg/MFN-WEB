
import React from 'react';
import styled from 'styled-components';
import Loader1 from "react-js-loader";

const Loader = () => {
  // return (
  //   <StyledWrapper>
  //     <div className="loader">
  //       <span>MFN</span>
  //       <span>MFN</span>
  //     </div>
  //   </StyledWrapper>
  // );

return(
  <Loader1 type="default" bgColor={"black"} color={"grey"} title={"Loading..."} size={50}/>
)


}

// const StyledWrapper = styled.div`
//   .loader {
//     position: relative;
//     user-select: none;
//     display:flex;
//     justify-content:center;
//     align-items:center;
//     width: 100%;
//     height: 50vh;
//   }

//   .loader span {
//     position: absolute;
//     color: #fff;
//     top: 50%;
//     left: 50%;
//     transform: translate(-50%, -50%);
//     font-size: 38px;
//     letter-spacing: 5px;
//   }

//   .loader span:nth-child(1) {
//     color: transparent;
//     -webkit-text-stroke: 0.5px rgb(0, 57, 244);
//   }

//   .loader span:nth-child(2) {
//     color: rgb(0, 4, 255);
//     -webkit-text-stroke: 1px rgb(17, 0, 255);
//     animation: uiverse723 3s ease-in-out infinite;
//   }

//   @keyframes uiverse723 {
//     0%, 100% {
//       clip-path: polygon(0% 45%, 15% 44%, 32% 50%, 
//        54% 60%, 70% 61%, 84% 59%, 100% 52%, 100% 100%, 0% 100%);
//     }

//     50% {
//       clip-path: polygon(0% 60%, 16% 65%, 34% 66%, 
//        51% 62%, 67% 50%, 84% 45%, 100% 46%, 100% 100%, 0% 100%);
//     }
//   }`;

export default Loader;
