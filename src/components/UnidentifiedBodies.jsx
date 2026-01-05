import React, { useEffect, useState } from "react";
import Loader from "./ui/Loader";
import "../assets/missingPerson.css";
import Card from "./ui/card";
import { useDispatch, useSelector } from "react-redux";
import {
  getUnidentifiedBodies,
  setDataZero,
} from "@/services/Redux/missingSlice";
import { setFilter, resetFilter } from "../services/Redux/filterSlice";
import toast from "react-hot-toast";
import { StateSelect, CitySelect } from "react-country-state-city";

import { Check, ChevronUp, FilterIcon, ListFilter, X } from "lucide-react";

import {
  CButton,
  CCloseButton,
  COffcanvas,
  COffcanvasBody,
  COffcanvasHeader,
  COffcanvasTitle,
} from "@coreui/react";
import NavbarComp from "./Navbar";
import { Button } from "react-bootstrap";
import { getCity, getState } from "@/services/Redux/stateAndCitySlice";

const debounce = (fn, delay) => {
  let timerId;
  return (...args) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};

function formatDate(date) {
  const d = date.getDate().toString().padStart(2, "0");   // day
  const m = (date.getMonth() + 1).toString().padStart(2, "0"); // month
  const y = date.getFullYear();
  return `${d}/${m}/${y}`;
}



const UnidentifiedBodies = () => {
  const [FilterShow, setFilterShow] = useState(false);
  const [visible, setVisible] = useState(false);
  const filter = useSelector((state) => state.filter);
  const [mobile, setMobile] = useState(false);

  const { STATE, CITY } = useSelector(
    (state) => state.stateCity
  );

  const [page, setPage] = useState(1);
  const { unidentifiedBodies, unidentifiederror, unidentifiedloading } =
    useSelector((state) => state.missing);
  const dispatch = useDispatch();
  const dispatchStateCity = useDispatch();
  console.log("Pages=", page);

  useEffect(() => {
    if (page > 1) {
      dispatch(getUnidentifiedBodies({ page, size: 20, data: filter }));
    }
  }, [page, filter]);

  useEffect(() => {
    setPage(1);
    dispatch(setDataZero("bodies"));
    dispatch(getUnidentifiedBodies({ page: 1, size: 20, data: filter }));
  }, [filter]);

   useEffect(() => {
      dispatchStateCity(getState());
      dispatchStateCity(getCity());
    }, [dispatchStateCity]);
  

  const dispatchFilter = useDispatch();
  const debouncedFilter = debounce((e) => {
    const { name, value } = e.target;
    dispatchFilter(setFilter({ [name]: value }));
  }, 1000);

  const handleReset = () => {
    dispatchFilter(resetFilter());
    setPage(1);

    // Reset form elements
    const formElements = document.querySelectorAll(
      'input[type="text"], input[type="date"], select'
    );
    formElements.forEach((element) => {
      element.value = "";
    });


    dispatch(setDataZero("mising"));
    // Fetch initial data
    toast.success("Filters have been reset");
    dispatch(getMissingPersons({ page: 1, size: 20, data: {} }));
  };


  const checkMobile=()=>{
        if(window.innerWidth<=666){
          setMobile(true)
        }
        else{
           setMobile(false)
        }
      }
      useEffect(()=>{
  checkMobile()
      },[])


  useEffect(() => {
    if (unidentifiederror) {
      toast.error("Failed to Fetch data");
    }
  }, [unidentifiederror]);

  useEffect(() => {
    const handleScrollLoad = () => {
     
      if (window.innerHeight <= document.documentElement.scrollTop + 200) {
        setFilterShow(true);
      } else {
        setFilterShow(false);
      }
    };

    window.addEventListener("scroll", handleScrollLoad);

    return () => {
      window.removeEventListener("scroll", handleScrollLoad);
    };
  }, [unidentifiedloading]);

  const goTop = () => {
    document.documentElement.scrollTop = 0;
  };

  return (
    <>
      <NavbarComp />
      <div className="MissingPersonContainer">
        <>
          <COffcanvas
            placement="end"
            visible={visible}
            onHide={() => setVisible(false)}
          >
            <COffcanvasHeader>
              <COffcanvasTitle>Filters</COffcanvasTitle>
              <CCloseButton
                className="text-reset"
                onClick={() => setVisible(false)}
              />
            </COffcanvasHeader>
            <COffcanvasBody>
              <div className="NameFilter">
                <label htmlFor="">Gender</label>

                <div className="FilterOne">
                  <p
                    className={`FilterTitle ${
                      filter.gender === "male" ? "selected" : ""
                    }`}
                    onClick={() => {
                      dispatchFilter(setFilter({ gender: "male" }));
                    }}
                    style={
                      filter.gender === "male"
                        ? {
                            backgroundColor: "#2563eb",
                            color: "white",
                            border: "none",
                          }
                        : {}
                    }
                  >
                    Male {filter.gender === "male" && <Check size={16} />}
                  </p>
                  <p
                    className={`FilterTitle ${
                      filter.gender === "female" ? "selected" : ""
                    }`}
                    onClick={() => {
                      dispatchFilter(setFilter({ gender: "female" }));
                    }}
                    style={
                      filter.gender === "female"
                        ? {
                            backgroundColor: "#2563eb",
                            color: "white",
                            border: "none",
                          }
                        : {}
                    }
                  >
                    Female {filter.gender === "female" && <Check size={16} />}
                  </p>
                  <p
                    className={`FilterTitle ${
                      filter.gender === "other" ? "selected" : ""
                    }`}
                    onClick={() => {
                      dispatchFilter(setFilter({ gender: "other" }));
                    }}
                    style={
                      filter.gender === "other"
                        ? {
                            backgroundColor: "#2563eb",
                            color: "white",
                            border: "none",
                          }
                        : {}
                    }
                  >
                    Others {filter.gender === "other" && <Check size={16} />}
                  </p>
                  {filter.gender && (
                    <p
                      className="FilterTitle"
                      style={{
                        backgroundColor: "#fee2e2",
                        color: "#dc2626",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        dispatchFilter(setFilter({ gender: "" }));
                      }}
                    >
                      Clear <X size={13} />
                    </p>
                  )}
                </div>

                <label htmlFor="">Age Group</label>

                <div className="FilterOne">
                  <p
                    className={`FilterTitle ${
                      filter.ageGroup === "child" ? "selected" : ""
                    }`}
                    onClick={() => {
                      dispatchFilter(
                        setFilter({
                          ageGroup: "child",
                          AgeFrom: 0,
                          AgeTo: 12,
                        })
                      );
                    }}
                    style={
                      filter.ageGroup === "child"
                        ? {
                            backgroundColor: "#2563eb",
                            color: "white",
                            border: "none",
                          }
                        : {}
                    }
                  >
                    Child (0-12){" "}
                    {filter.ageGroup === "child" && <Check size={16} />}
                  </p>
                  <p
                    className={`FilterTitle ${
                      filter.ageGroup === "teen" ? "selected" : ""
                    }`}
                    onClick={() => {
                      dispatchFilter(
                        setFilter({
                          ageGroup: "teen",
                          AgeFrom: 13,
                          AgeTo: 19,
                        })
                      );
                    }}
                    style={
                      filter.ageGroup === "teen"
                        ? {
                            backgroundColor: "#2563eb",
                            color: "white",
                            border: "none",
                          }
                        : {}
                    }
                  >
                    Teen (13-19){" "}
                    {filter.ageGroup === "teen" && <Check size={16} />}
                  </p>
                  <p
                    className={`FilterTitle ${
                      filter.ageGroup === "adult" ? "selected" : ""
                    }`}
                    onClick={() => {
                      dispatchFilter(
                        setFilter({
                          ageGroup: "adult",
                          AgeFrom: 20,
                          AgeTo: 59,
                        })
                      );
                    }}
                    style={
                      filter.ageGroup === "adult"
                        ? {
                            backgroundColor: "#2563eb",
                            color: "white",
                            border: "none",
                          }
                        : {}
                    }
                  >
                    Adult (20-59){" "}
                    {filter.ageGroup === "adult" && <Check size={16} />}
                  </p>
                  <p
                    className={`FilterTitle ${
                      filter.ageGroup === "senior" ? "selected" : ""
                    }`}
                    onClick={() => {
                      dispatchFilter(
                        setFilter({
                          ageGroup: "senior",
                          AgeFrom: 60,
                        })
                      );
                    }}
                    style={
                      filter.ageGroup === "senior"
                        ? {
                            backgroundColor: "#2563eb",
                            color: "white",
                            border: "none",
                          }
                        : {}
                    }
                  >
                    Senior (60+){" "}
                    {filter.ageGroup === "senior" && <Check size={16} />}
                  </p>
                  {filter.ageGroup && (
                    <p
                      className="FilterTitle"
                      style={{
                        backgroundColor: "#fee2e2",
                        color: "#dc2626",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        dispatchFilter(
                          setFilter({
                            ageGroup: "",
                            AgeFrom: "",
                            AgeTo: "",
                          })
                        );
                      }}
                    >
                      Clear <X size={16} />
                    </p>
                  )}
                </div>

                <label htmlFor="">Time Period</label>

                <div className="FilterOne">
                  <p
                    className={`FilterTitle ${
                      filter.timePeriod === "week" ? "selected" : ""
                    }`}
                    onClick={() => {
                      const today = new Date();
                      const weekAgo = new Date(
                        today.getTime() - 7 * 24 * 60 * 60 * 1000
                      );
                      dispatchFilter(
                        setFilter({
                          DateFromStart: formatDate(weekAgo),
                          DateFromEnd: formatDate(today),
                          timePeriod: "week",
                        })
                      );
                    }}
                    style={
                      filter.timePeriod === "week"
                        ? {
                            backgroundColor: "#2563eb",
                            color: "white",
                            border: "none",
                          }
                        : {}
                    }
                  >
                    This Week{" "}
                    {filter.timePeriod === "week" && <Check size={16} />}
                  </p>
                  <p
                    className={`FilterTitle ${
                      filter.timePeriod === "month" ? "selected" : ""
                    }`}
                    onClick={() => {
                      const today = new Date();
                      const monthAgo = new Date(
                        today.getFullYear(),
                        today.getMonth() - 1,
                        today.getDate()
                      );
                      dispatchFilter(
                        setFilter({
                          DateFromStart: formatDate(monthAgo),
                          DateFromEnd: formatDate(today),
                          timePeriod: "month",
                        })
                      );
                    }}
                    style={
                      filter.timePeriod === "month"
                        ? {
                            backgroundColor: "#2563eb",
                            color: "white",
                            border: "none",
                          }
                        : {}
                    }
                  >
                    This Month{" "}
                    {filter.timePeriod === "month" && <Check size={16} />}
                  </p>
                  <p
                    className={`FilterTitle ${
                      filter.timePeriod === "year" ? "selected" : ""
                    }`}
                    onClick={() => {
                      const today = new Date();
                      const yearAgo = new Date(
                        today.getFullYear() - 1,
                        today.getMonth(),
                        today.getDate()
                      );
                      dispatchFilter(
                        setFilter({
                          DateFromStart: formatDate(yearAgo),
                          DateFromEnd: formatDate(today),
                          timePeriod: "year",
                        })
                      );
                    }}
                    style={
                      filter.timePeriod === "year"
                        ? {
                            backgroundColor: "#2563eb",
                            color: "white",
                            border: "none",
                          }
                        : {}
                    }
                  >
                    This Year{" "}
                    {filter.timePeriod === "year" && <Check size={16} />}
                  </p>

                  {filter.timePeriod && (
                    <p
                      className="FilterTitle"
                      style={{
                        backgroundColor: "#fee2e2",
                        color: "#dc2626",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        dispatchFilter(
                          setFilter({
                            DateFromStart: "",
                            DateFromEnd: "",
                            timePeriod: "",
                          })
                        );
                      }}
                    >
                      Clear <X size={16} />
                    </p>
                  )}
                </div>

                <label htmlFor="">Location</label>
                <div className="State">
                  <select
                    name="state"
                    id=""
                    className="cityStateFilter py-2"
                    value={filter.state}
                    onChange={(e) => {
                      dispatchFilter(setFilter({ state: e.target.value }));
                    }}
                  >
                    <option value="" disabled selected hidden>
                      By State
                    </option>
                    {STATE?.map((STATE) => (
                      <option value={STATE.stateId}>{STATE.stateName}</option>
                    ))}
                  </select>

                  <select
                    className="cityStateFilter py-2"
                    name="city"
                    id=""
                    onChange={(e) => debouncedFilter(e)}
                  >
                    <option value="" disabled selected hidden>
                      By City
                    </option>
                    {CITY?.map((CITY) => (
                      <option value={CITY.cityId}>{CITY.cityName}</option>
                    ))}
                  </select>
                </div>
                <br />
                <div className="NameFilter" style={{ paddingLeft: 0 }}>
                  <label htmlFor="">Name</label>
                  <br />

                  <input
                    type="text"
                    className="NameSearch"
                    name="name"
                    placeholder="Name"
                    onChange={(e) => debouncedFilter(e)}
                  />
                </div>
              </div>
            </COffcanvasBody>
            <div className="OffcanvasButtom">
              <button
                className="filterButton bg-success text-white"
                onClick={() => {
                  dispatch(
                    getMissingPersons({ page: 1, size: 20, data: filter })
                  );
                  setVisible(false);
                }}
              >
                Apply Filter
              </button>
              <button
                className="filterButton reset bg-danger text-white"
                onClick={() => {
                 handleReset()
                }}
              >
                Reset Filter
              </button>
            </div>
          </COffcanvas>
        </>

        <div className="missingPersonFilter">
          <div className="searchContainer">
            <div className="SearchFilter">
              <select
                name="state"
                id=""
                className="cityStateFilter py-2"
                onChange={(e) => {
                  debouncedFilter(e);
                }}
              >
                <option value="" disabled selected hidden>
                  By State
                </option>
                {STATE?.map((STATE) => (
                  <option value={STATE.stateId}>{STATE.stateName}</option>
                ))}
              </select>
              <select
                className="cityStateFilter py-2"
                name="city"
                id=""
                onChange={(e) => debouncedFilter(e)}
              >
                <option value="" disabled selected hidden>
                  By City
                </option>
                {CITY?.map((CITY) => (
                  <option value={CITY.cityId}>{CITY.cityName}</option>
                ))}
              </select>

              {/* <CitySelect className="genderFilter" placeHolder='By City' name='city' countryid={101} stateid={state} onChange={(e)=>setCity(e.name)} /> */}
              <select
                name="gender"
                className="genderFilter"
                onChange={(e) => debouncedFilter(e)}
              >
                <option value="">By Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
             <Button 
                variant="outline-success"
                
                onClick={() => setVisible(true)}
              >
                  <ListFilter size={18} /> {!mobile && "More Filter"}
              </Button>
              <Button 
                                        variant="outline-danger"
                                          onClick={handleReset}
                                        >
                                          {!mobile?"Reset":<X/>}
                                        </Button>
            </div>
          </div>
        </div>

        <div className="missingPersonCards">
          {unidentifiedBodies?.data?.length > 0
            ? unidentifiedBodies?.data?.map((person, index) => (
                <Card
                  key={person.unIdentifiedPersonId || index}
                  personType="deadBodies"
                  person={person}
                />
              ))
            : !unidentifiedloading && (
                <h2 style={{ color: "grey", textAlign: "center" }}>
                  No Data Found
                </h2>
              )}
          {unidentifiedloading && <Loader />}
        </div>


{
  !unidentifiedloading &&
<Button variant="outline-primary" className="my-4  border-primary border-2" onClick={()=>setPage(page+1)}>Load More</Button>
}


        {/* 
<div className="Pagination">
    <button disabled={!unidentifiedBodies.hasPreviousPage} onClick={()=>{setPage(page-1)}} className="prev"><ArrowLeft/></button>
    <span style={{color:"black"}}>{page}</span>
    <span>...</span>
    <span>{unidentifiedBodies.totalPages}</span>
    <button disabled={!unidentifiedBodies.hasNextPage} onClick={()=>{setPage(page+1)}} className="next"><ArrowRight/></button>
</div> */}
      </div>

      <button
        style={{ visibility: FilterShow ? "visible" : "hidden" }}
        onClick={() => goTop()}
        className="TopButton FilterButton search-button bg-success text-white"
      >
        <ChevronUp />
      </button>
       <button
        style={{ visibility: FilterShow ? "visible" : "hidden" }}
        onClick={() => setVisible(true)}
        className="FilterButton search-button bg-success text-white text-center"
      >
        <ListFilter size={18} /> Filter
      </button>

      <div className="container-fluid py-4 bg-primary text-white text-center ">
 @copyright
</div>
    </>
  );
};

export default UnidentifiedBodies;
