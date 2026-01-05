import { useEffect, useRef, useState } from "react";
import { Container, Navbar, Nav, Button, Form } from "react-bootstrap";
import { StateSelect } from "react-country-state-city";
import { useNavigate, Outlet, NavLink } from "react-router-dom";
import "../assets/navbar.css";
import { Grip, SearchIcon } from "lucide-react";
import Home from "./Home";
import MissingPerson from "./MissingPerson";
import FoundPerson from "./FoundPerson";
import UnidentifiedBodies from "./UnidentifiedBodies";
import ComingSoon from "./ComingSoon";
import { useDispatch, useSelector } from "react-redux";
import { getState } from "@/services/Redux/stateAndCitySlice";
import { setFilter } from "@/services/Redux/filterSlice";
import Offcanvas from "react-bootstrap/Offcanvas";
import toast from "react-hot-toast";
import Login from "./Login";
import Register from "./Register";

// Remove component imports as they shouldn't be rendered here

const debounce = (fn, delay) => {
  let timerId;
  return (...args) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};

const NavbarComp = () => {
  const menuRef = useRef(null);
  const [show, setShow] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();
  const { STATE, loading, error } = useSelector((state) => state.stateCity);
  const filter = useSelector((state) => state.filter);
  const dispatchStateCity = useDispatch();
  const dispatchFilter = useDispatch();
  // const [showPage,setShowPage]=useState("all")

  useEffect(() => {
    dispatchStateCity(getState());
  }, [dispatchStateCity]);

  const handleDebluncedFilter = debounce((e) => {
    dispatchFilter(setFilter({ [e.target.name]: e.target.value }));
  }, 1000);

  const setShowPage = (e) => {
    if (e.target.value === "missing") {
      navigate("/missing-person");
    } else if (e.target.value === "found") {
      navigate("/found-person");
    } else if (e.target.value === "") {
      navigate("/");
    } else if (e.target.value === "bodies") {
      navigate("/unidentified-bodies");
    } else {
      navigate("/coming-soon");
    }
  };

  console.log(name);
  const [showOption, setShowOption] = useState(false);
  const handleShowOptions = () => {
    setShowOption((pre) => !pre);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowOption(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (error) {
      toast.error("Failed to getting State");
    }
  }, [error]);

  console.log("STATE", STATE);
  return (
    <>
      <div className="NavContainer" ref={menuRef}>
        <Navbar
          expanded={expanded}
          bg="light"
          expand="md"
          style={{ zIndex: 1000, borderBottom: "2px solid grey" }}
        >
          <Container fluid>
            <Navbar.Brand href="/">
              <img src="/mfn-logo.png" width={100} alt="" />
            </Navbar.Brand>

            <div className="navSearchContainer mx-2">
              <Form.Control
                type="search"
                name="name"
                placeholder="Search..."
                onChange={(e) => handleDebluncedFilter(e)}
                className="me-2"
                aria-label="Search"
              />
              <div className="SearchIcon">
                <SearchIcon />
              </div>
            </div>

            <Navbar.Collapse id="navbarScroll">
              <Nav className="me-auto my-2 my-lg-0" navbarScroll>
                <select
                  name="state"
                  id=""
                  className="LangaugeSelect"
                  onChange={(e) => {
                    handleDebluncedFilter(e);
                  }}
                >
                  <option value="" disabled selected hidden>
                    By State
                  </option>

                  {!loading &&
                    STATE?.map((STAT) => (
                      <option value={STAT?.stateId}>{STAT?.stateName}</option>
                    ))}
                </select>
              </Nav>

              <select name="" id="" className="LangaugeSelect">
                <option value="">English</option>
                <option value="hindi">Hindi</option>
              </select>
            </Navbar.Collapse>

            <Button
              className="OptionBtn mx-1"
              variant="primary text-white"
              onClick={() => handleShowOptions()}
            >
              <Grip />
            </Button>
            <div
              className={`GridCards position-absolute top-100 end-0 p-2 user-select-none border border-black border-1 rounded-3 bg-white ${
                showOption ? "" : "d-none"
              }`}
            >
              <li
                onClick={() => navigate("/profile")}
                className="border-bottom border-1 list list-unstyled px-4 py-1 cursor-pointer icon-link-hover"
              >
                Profile
              </li>
              <li
                onClick={() => navigate("/add-person")}
                className="border-bottom border-1 list list-unstyled px-4 py-1 cursor-pointer icon-link-hover"
              >
                Add Missing Person
              </li>
              <li
                onClick={() => {
                  navigate("/report-found-person");
                }}
                className="border-bottom border-1 list list-unstyled px-4 py-1 cursor-pointer"
              >
                Report Found Person
              </li>
              <li
                onClick={() => navigate("/report-dead-bodies")}
                className="border-bottom border-1 list list-unstyled px-4 py-1 cursor-pointer icon-link-hover"
              >
                Report Found DeadBody
              </li>
              <li
                onClick={() => navigate("/disclaimer")}
                className="border-bottom border-1 list list-unstyled px-4 py-1 cursor-pointer"
              >
                Legal Disclaimer
              </li>
              <li
                onClick={() => navigate("/data-usage-policy")}
                className="border-bottom border-1 list list-unstyled px-4 py-1 cursor-pointer"
              >
                Data Usage Policy
              </li>
              <li
                onClick={() => navigate("/terms-and-conditions")}
                className="border-bottom border-1 list list-unstyled px-4 py-1 cursor-pointer"
              >
                Terms & Conditions
              </li>
              <li
                onClick={() => navigate("/user-content-policy")}
                className="list list-unstyled px-4 py-1 cursor-pointer"
              >
                User Content Policy
              </li>
            </div>
          </Container>
        </Navbar>
        <div className="HomeNav">
          {/* <select name="catagories" onChange={(e)=>handleCategoriesChange(e)} id=""> */}
          <select name="catagories" onChange={(e) => setShowPage(e)} id="">
            <option value="">All Categories</option>
            <option value="missing">Missing Persons</option>
            <option value="found">Found Persons</option>
            <option value="bodies">UnIdentified DeadBodies</option>
            <option value="pets">Missing Pets</option>
            <option value="things">Missing Things</option>
            <option value="vehicle">Missing Vehicle</option>
          </select>
          <NavLink
            className="text-dark text-decoration-none"
            to="/missing-person"
          >
            {({ isActive }) => (
              <p style={{ fontWeight: isActive ? "bold" : "normal" }}>
                Missing Persons
              </p>
            )}
          </NavLink>

          <NavLink
            className="text-dark text-decoration-none"
            to="/found-person"
          >
            {({ isActive }) => (
              <p style={{ fontWeight: isActive ? "bold" : "normal" }}>
                Found Persons
              </p>
            )}
          </NavLink>

          <NavLink
            className="text-dark text-decoration-none"
            to="/unidentified-bodies"
          >
            {({ isActive }) => (
              <p style={{ fontWeight: isActive ? "bold" : "normal" }}>
                UnIdentified DeadBodies
              </p>
            )}
          </NavLink>
        </div>
      </div>
      {/* {
      showPage==="all"? <Home setShowPage={setShowPage}/>:showPage==="missing"? <MissingPerson/>:showPage==="found"?<FoundPerson/>: showPage==="bodies" &&<UnidentifiedBodies/>
    } */}

      <>
        <Offcanvas placement="end" show={show} onHide={() => setShow(false)}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Add Person</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body></Offcanvas.Body>
        </Offcanvas>
      </>
      {/* {
  showLogin && <Login setShowLogin={setShowLogin}/>
} */}
    </>
  );
};

export default NavbarComp;
