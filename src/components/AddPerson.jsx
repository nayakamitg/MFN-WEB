import React, { useState, useRef } from "react";
import { Button, Col, Form, Row, Spinner } from "react-bootstrap";
import "../assets/addForm.css";
import { X } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { State, City } from "country-state-city";

const AddPerson = () => {
  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [stateCode, setStateCode] = useState("");
  const [loading, setLoading] = useState("");
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    missingPersonId: 0,
    state: "",
    district: "",
    policeStation: "",
    missingFrom: "",
    dateFrom: "",
    name: "",
    sex: "",
    birthYear: "",
    address: "",
    guardianName: "",
    religion: "",
    height: "",
    face: "",
    eyes: "",
    hair: "",
    beard: "",
    mustaches: "",
    dressUpper: "",
    dressUpperColor: "",
    dressLower: "",
    dressLowerColor: "",
    rewardAmount: "",
    remarks: "",
    description: "",
    pinCode: "",
    missingDate: "",
    complainantPhoneNo: "",
    contactPerson: "",
    upperDress: "",
    upperDressColor: "",
    lowerDress: "",
    lowerDressColor: "",
    face: "",
    mustaches: "",
        createdOn:"",
        reportingDate:"",
    photo: null,
    imageUrls: []
  });

  const handleAddingData = async ({ data }) => {
    try {
      setLoading(true)
        console.log("🚀 Payload to API:", JSON.stringify(data, null, 2));

      const res = await axios.post(
        "https://goplanup.dishaayein.com/api/MissingPersons",
        data
      );
      toast.success("Successfully Added");
      return true;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to Add");
      console.log(error);
      return false;
    }
    finally{
      setLoading(false)
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setErrors((prev) => ({ ...prev, [name]: "" }));

    if (name === "state") {
      // save isoCode separately
      setStateCode(value);

      // save state name in formData
      const stateName = State.getStateByCodeAndCountry(value, "IN").name || "";

      setFormData((prev) => ({
        ...prev,
        state: stateName,
      }));
    } else {
      // normal fields
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  console.log("Data=", formData);

  const handleFiles = (e) => {
    let files = Array.from(e.target.files);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = () => {
        console.log("Base64:", reader.result);

        setFormData((prev) => ({
          ...prev,
          imageUrls: [...(prev.imageUrls || []), reader.result], // ✅ append correctly
        }));
      };
    });

    const previews = files.map((file) => URL.createObjectURL(file));
    setPreview(previews);

    console.log("IMAGE FILES =", files);
  };

  const handleImgRemove = (index) => {
    setPreview((pre) => pre.filter((prev, i) => i !== index));
    setFormData((prev) => ({
      ...prev,
      imageUrls: prev.imageUrls.filter((_, i) => i !== index),
    }));
  };

  const validateForm = () => {
    let newErrors = {};

    // Required field validations
    if (!formData.name.trim()) newErrors.name = "Full Name is required";
    if (!formData.sex) newErrors.sex = "Gender is required";
    if (!stateCode) newErrors.state = "State is required";
    if (!formData.district) newErrors.district = "District is required";
    if (!formData.missingDate)
      newErrors.missingDate = "Missing date is required";
    if (!formData.complainantPhoneNo.trim()) {
      newErrors.complainantPhoneNo = "Contact number is required";
    } else if (!/^[0-9]{10}$/.test(formData.complainantPhoneNo.trim())) {
      newErrors.complainantPhoneNo = "Enter a valid 10-digit number";
    }
    if (
      !formData.imageUrls ||
      (Array.isArray(formData.imageUrls) && formData.imageUrls.length === 0)
    ) {
      newErrors.imageUrls = "At least one photo is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const scrollToFirstError = () => {
    setTimeout(() => {
      const firstErrorField = formRef.current?.querySelector(".error-border");
      if (firstErrorField) {
        firstErrorField.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        firstErrorField.focus();
      }
    }, 100);
  };
  

const setMax=()=>{
      var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1; //January is 0!
var yyyy = today.getFullYear();
if (dd < 10) {
  dd = '0' + dd
}
if (mm < 10) {
  mm = '0' + mm
}

today = yyyy + '-' + mm + '-' + dd;    
return today   

}


  const formatDateForApi = (dateStr) => {
  if (!dateStr) return "";
  // handle both yyyy-MM-dd and dd/MM/yyyy
  if (dateStr.includes("/")) {
    const [day, month, year] = dateStr.split("/");
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  }
  return dateStr; // already yyyy-MM-dd
};



const handleSubmit = async (e) => {
  e.preventDefault();
  if (validateForm()) {
    console.log("✅ Form Submitted:", formData);

    const payload = {
      ...formData,
      missingPersonId:
        Math.floor(Math.random() * (999999999 - 10000000)) + 10000000,
      missingDate: new Date(formData.missingDate),
      dateFrom: new Date(formData.missingDate).toLocaleDateString(),
        createdOn: new Date().toLocaleDateString(),
        reportingDate: new Date().toLocaleDateString(),
    };

    const added = await handleAddingData({ data: payload });

    if (added) {
      setFormData({
        missingPersonId: 0,
        state: "",
        district: "",
        policeStation: "",
        missingFrom: "",
        dateFrom: "",
        name: "",
        sex: "",
        birthYear: "",
        address: "",
        guardianName: "",
        religion: "",
        height: "",
        face: "",
        eyes: "",
        hair: "",
        beard: "",
        mustaches: "",
        dressUpper: "",
        dressUpperColor: "",
        dressLower: "",
        dressLowerColor: "",
        rewardAmount: "",
        remarks: "",
        description: "",
        pinCode: "",
        missingDate: "",
        complainantPhoneNo: "",
        contactPerson: "",
        upperDress: "",
        upperDressColor: "",
        lowerDress: "",
        lowerDressColor: "",
        face: "",
        mustaches: "",
        createdOn:"",
        reportingDate:"",
        photo: null,
        imageUrls: [],
      });
      setPreview(null);
    }
  } else {
    console.log("❌ Validation Failed");
    scrollToFirstError();
  }
};

  // Helper function to get input classes
  const getInputClasses = (fieldName) => {
    return errors[fieldName] ? "error-border" : "";
  };

  // console.log("sdjfnbhdjk",State.getStateByCodeAndCountry(,"IN").name)
  const STATE = State.getStatesOfCountry("IN");
  const CITY = City.getCitiesOfState("IN", stateCode);

  return (
    <div className="container-fluid m-auto">
      <Form ref={formRef} onSubmit={(e) => handleSubmit(e)}>
        <h2 className="text-center py-4">Add Missing Person</h2>

        {/* Missing Person Details */}
        <Row>
          <Col md={1}></Col>
          <Col md={10} className="border-dark border-bottom border-2">
            <h4>Missing Person Details</h4>
          </Col>
          <Col md={1}></Col>
        </Row>

        <Row className="my-2">
          <Col md={1}></Col>
          <Col md={5}>
            <label>
              Full Name <span style={{ color: "red" }}>*</span>
            </label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              type="text"
              placeholder="Enter Name"
              className={getInputClasses("name")}
            />
            {errors.name && (
              <p
                className="error-text"
                style={{ color: "red", fontSize: "12px", margin: "2px 0" }}
              >
                {errors.name}
              </p>
            )}
          </Col>
          <Col md={5}>
            <label>
              Gender <span style={{ color: "red" }}>*</span>
            </label>
            <select
              name="sex"
              onChange={handleChange}
              value={formData.sex}
              className={getInputClasses("sex")}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.sex && (
              <p
                className="error-text"
                style={{ color: "red", fontSize: "12px", margin: "2px 0" }}
              >
                {errors.sex}
              </p>
            )}
          </Col>
          <Col md={1}></Col>
        </Row>

        <Row className="my-2">
          <Col md={1}></Col>
          <Col md={5}>
            <label>Religion</label>
            <input
              name="religion"
              value={formData.religion}
              onChange={handleChange}
              type="text"
              placeholder="Example- Hindu"
            />
          </Col>
          <Col md={5}>
            <label>Birth Year</label>
            <input
              name="birthYear"
              value={formData.birthYear}
              onChange={handleChange}
              maxLength={4}
              min={1960}
              max={new Date().getFullYear()}
              type="number"
              placeholder="Example- 2001"
            />
          </Col>
          <Col md={1}></Col>
        </Row>

        <Row className="my-2">
          <Col md={1}></Col>
          <Col md={5}>
            <label>
              State <span style={{ color: "red" }}>*</span>
            </label>

            <input
              type="text"
              name="state"
              list="state"
              onChange={handleChange}
              value={stateCode}
              placeholder="State"
              className={getInputClasses("state")}
            />
            <datalist id="state">
              {STATE.map((state) => (
                <option key={state.isoCode} value={state.isoCode}>
                  {state.name}
                </option>
              ))}
            </datalist>
            {/* 
            <select 
              name="state" 
              onChange={handleChange} 
              value={stateCode}
              className={getInputClasses('state')}
            >
              <option value="">Select State</option>
              {
                STATE.map((state)=><option key={state.isoCode} value={state.isoCode}>{state.name}</option>)
              }
            </select> */}
            {errors.state && (
              <p
                className="error-text"
                style={{ color: "red", fontSize: "12px", margin: "2px 0" }}
              >
                {errors.state}
              </p>
            )}
          </Col>
          <Col md={5}>
            <label>
              District <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              name="district"
              list="district"
              placeholder="District"
              onChange={handleChange}
              value={formData.district}
              className={getInputClasses("district")}
            />
            <datalist id="district">
              {CITY.map((city) => (
                <option value={city.name}>{city.name}</option>
              ))}
            </datalist>

            {/* 
            <select 
              name="district" 
              onChange={handleChange} 
              value={formData.district}
              className={getInputClasses('district')}
            >
              <option value="">Select District</option>
             {
                CITY.map((city)=><option value={city.name}>{city.name}</option>)
             }
            </select> */}

            {errors.district && (
              <p
                className="error-text"
                style={{ color: "red", fontSize: "12px", margin: "2px 0" }}
              >
                {errors.district}
              </p>
            )}
          </Col>
          <Col md={1}></Col>
        </Row>

        <Row className="my-2">
          <Col md={1}></Col>
          <Col md={5}>
            <label>Address</label>
            <input
              name="address"
              value={formData.address}
              onChange={handleChange}
              type="text"
              placeholder="Address"
            />
          </Col>
          <Col md={5}>
            <label>Police Station</label>
            <input
              name="policeStation"
              value={formData.policeStation}
              onChange={handleChange}
              type="text"
              placeholder="Police Station"
            />
          </Col>
          <Col md={1}></Col>
        </Row>

        <Row className="my-2">
          <Col md={1}></Col>
          <Col md={5}>
            <label>Pin Code</label>
            <input
              name="pinCode"
              value={formData.pinCode}
              onChange={handleChange}
              type="number"
              placeholder="Example- 212645"
            />
          </Col>
          <Col md={5}></Col>
          <Col md={1}></Col>
        </Row>

        {/* Missing Details */}
        <Row>
          <Col md={1}></Col>
          <Col md={10} className="border-dark border-bottom border-2">
            <h4>Missing Details</h4>
          </Col>
          <Col md={1}></Col>
        </Row>

        <Row className="my-2">
          <Col md={1}></Col>
          <Col md={5}>
            <label>
              Missing Date <span style={{ color: "red" }}>*</span>
            </label>
            <input
              name="missingDate"
              value={formData.missingDate}
              onChange={handleChange}
              type="date"
              max={setMax()}
              className={getInputClasses("missingDate")}
            />
            {errors.missingDate && (
              <p
                className="error-text"
                style={{ color: "red", fontSize: "12px", margin: "2px 0" }}
              >
                {errors.missingDate}
              </p>
            )}
          </Col>
          <Col md={5}>
            <label>Missing From</label>
            <input
              name="missingFrom"
              value={formData.missingFrom}
              onChange={handleChange}
              type="text"
              placeholder="Example- Home"
            />
          </Col>
          <Col md={1}></Col>
        </Row>

        <Row className="my-2">
          <Col md={1}></Col>
          <Col md={5}>
            <label>
              Contact Number <span style={{ color: "red" }}>*</span>
            </label>
            <input
              name="complainantPhoneNo"
              value={formData.complainantPhoneNo}
              onChange={handleChange}
              type="number"
              placeholder="+91"
              className={getInputClasses("complainantPhoneNo")}
            />
            {errors.complainantPhoneNo && (
              <p
                className="error-text"
                style={{ color: "red", fontSize: "12px", margin: "2px 0" }}
              >
                {errors.complainantPhoneNo}
              </p>
            )}
          </Col>
          <Col md={5}>
            <label>Contact person or Parent</label>
            <input
              name="contactPerson"
              value={formData.contactPerson}
              onChange={handleChange}
              type="text"
              placeholder="Name"
            />
          </Col>
          <Col md={1}></Col>
        </Row>

        {/* Identification Details */}
        <Row>
          <Col md={1}></Col>
          <Col md={10} className="border-dark border-bottom border-2">
            <h4>Identification Details</h4>
          </Col>
          <Col md={1}></Col>
        </Row>

        <Row className="my-2">
          <Col md={1}></Col>
          <Col md={5}>
            <label>Height</label>
            <input
              name="height"
              value={formData.height}
              onChange={handleChange}
              type="text"
              placeholder="Example- 156cm or 5.4feet"
            />
          </Col>
          <Col md={5}>
            <label>Upper Dress</label>
            <input
              name="dressUpper"
              value={formData.dressUpper}
              onChange={handleChange}
              type="text"
              placeholder="Example- Shirt"
            />
          </Col>
          <Col md={1}></Col>
        </Row>

        <Row className="my-2">
          <Col md={1}></Col>
          <Col md={5}>
            <label>Upper Dress Color</label>
            <input
              name="dressUpperColor"
              value={formData.dressUpperColor}
              onChange={handleChange}
              type="text"
              placeholder="Example- Blue"
            />
          </Col>
          <Col md={5}>
            <label>Lower Dress</label>
            <input
              name="dressLower"
              value={formData.dressLower}
              onChange={handleChange}
              type="text"
              placeholder="Example- Pant"
            />
          </Col>
          <Col md={1}></Col>
        </Row>

        <Row className="my-2">
          <Col md={1}></Col>
          <Col md={5}>
            <label>Lower Dress Color</label>
            <input
              name="dressLowerColor"
              value={formData.dressLowerColor}
              onChange={handleChange}
              type="text"
              placeholder="Example- Black"
            />
          </Col>
          <Col md={5}>
            <label>Remarks</label>
            <input
              name="remarks"
              value={formData.remarks}
              onChange={handleChange}
              type="text"
              placeholder="Example- mole on the face"
            />
          </Col>
          <Col md={1}></Col>
        </Row>

        <Row className="my-2">
          <Col md={1}></Col>
          <Col md={5}>
            <label>Hair</label>
            <input
              name="hair"
              value={formData.hair}
              onChange={handleChange}
              type="text"
              placeholder="Hair"
            />
          </Col>
          <Col md={5}>
            <label>Face Structure</label>
            <input
              name="face"
              value={formData.face}
              onChange={handleChange}
              type="text"
              placeholder="Example- Oval"
            />
          </Col>
          <Col md={1}></Col>
        </Row>

        <Row className="my-2">
          <Col md={1}></Col>
          <Col md={5}>
            <label>Mustaches</label>
            <input
              name="mustaches"
              value={formData.mustaches}
              onChange={handleChange}
              type="text"
              placeholder="Mustaches"
            />
          </Col>
          <Col md={5}>
            <label>Beard</label>
            <input
              name="beard"
              value={formData.beard}
              onChange={handleChange}
              type="text"
              placeholder="Beard"
            />
          </Col>
          <Col md={1}></Col>
        </Row>

        {/* Additional Details */}
        <Row>
          <Col md={1}></Col>
          <Col md={10} className="border-dark border-bottom border-2">
            <h4>Additional Details</h4>
          </Col>
          <Col md={1}></Col>
        </Row>

        <Row className="my-2">
          <Col md={1}></Col>
          <Col md={5}>
            <label>Reward Amount</label>
            <input
              name="rewardAmount"
              value={formData.rewardAmount}
              onChange={handleChange}
              type="text"
              placeholder="Reward in Rs."
            />
          </Col>
          <Col md={5}>
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Other Details"
            />
          </Col>
          <Col md={1}></Col>
        </Row>

        {/* Upload Photo */}
        <Row className="mb-5">
          <Col md={1}></Col>
          <Col md={10} className="text-center">
            <Button
              variant="outline-success"
              className={`uploadBtn ${getInputClasses("photo")}`}
            >
              Upload Photo <span style={{ color: "red" }}>*</span>
              <input
                name="photo"
                type="file"
                accept="image/*"
                multiple
                onChange={handleFiles}
              />
            </Button>
            {errors.imageUrls && (
              <p
                className="error-text"
                style={{ color: "red", fontSize: "12px", margin: "5px 0" }}
              >
                {errors.imageUrls}
              </p>
            )}
          </Col>
          <Col md={1}></Col>
        </Row>

        {preview?.length > 0 && (
          <div className="images">
            {preview?.map((pre, index) => (
              <div key={index} className="image">
                <img src={pre} alt="" />
                <X
                  color="white"
                  size={15}
                  className="X"
                  onClick={() => handleImgRemove(index)}
                />
              </div>
            ))}
          </div>
        )}

        <Row className="my-5">
          <Col md={1}></Col>
          <Col md={10} className="text-center">
            <Button
              variant="primary text-white mx-3"
              className="px-5"
              type="submit"
              disabled={loading}
            >
             {loading &&<Spinner as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"/>} Submit
            </Button>
            <Button
              variant="danger text-white mx-3"
              className="px-5"
              type="reset"
              onClick={() => {
                setFormData({
                 missingPersonId: 0,
    state: "",
    district: "",
    policeStation: "",
    missingFrom: "",
    dateFrom: "",
    name: "",
    sex: "",
    birthYear: "",
    address: "",
    guardianName: "",
    religion: "",
    height: "",
    face: "",
    eyes: "",
    hair: "",
    beard: "",
    mustaches: "",
    dressUpper: "",
    dressUpperColor: "",
    dressLower: "",
    dressLowerColor: "",
    rewardAmount: "",
    remarks: "",
    description: "",
    pinCode: "",
    missingDate: "",
    complainantPhoneNo: "",
    contactPerson: "",
    upperDress: "",
    upperDressColor: "",
    lowerDress: "",
    lowerDressColor: "",
        createdOn:"",
        reportingDate:"",
    face: "",
    mustaches: "",
    photo: null,
    imageUrls: []
                });
                setErrors({});
                setPreview(null);
              }}
            >
              Reset
            </Button>
          </Col>
          <Col md={1}></Col>
        </Row>
      </Form>

      <style jsx>{`
        .error-border {
          border: 2px solid #dc3545 !important;
          border-radius: 4px;
        }

        .error-border:focus {
          outline: none;
          box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);
        }

        .uploadBtn.error-border {
          border: 2px solid #dc3545 !important;
        }
      `}</style>
    </div>
  );
};

export default AddPerson;
