import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./RegisterDoctor.css"
import Swal from "sweetalert2";


const RegisterDoctor = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState();
  const [speciality, setSpeciality] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState();
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(false);
  const [specialities, setSpecialities] = useState([]);
  const navigate = useNavigate();

 
  useEffect(() => {
    axios
      .get("http://localhost:5000/specialty")
      .then((result) => {
        setSpecialities(result.data.result);
        console.log(result.data.result);
      })
      .catch((error) => {
        console.error("Error fetching specialties:", error);
        setMessage("Error fetching specialties. Please try again.");
      });
  }, []);

  const addNewDoctor = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        "http://localhost:5000/users/registerDoctor",
        {
          firstName,
          lastName,
          age,
          specialty: speciality,
          address,
          email,
          password,
          phone,
        }
      );
      if (result.data.success) {
        setStatus(true);
        setMessage(result.data.message);
        navigate("/Login");
      } else {
        throw new Error(result.data.message);
      }
    } catch (error) {
      console.error("Error registering doctor:", error);
      setStatus(false);
      setMessage(
        error.message || "Error happened while registering. Please try again."
      );
    }
  };



  return (
    <>
      <div className="Form">
        <p className="Title">Register as a Doctor:</p>
        <form onSubmit={addNewDoctor}>
          <br />
          <div className="input-container">
  <label className="inf" htmlFor="firstName">First Name:</label>
  <input
    type="text"
    id="firstName"
    placeholder="Enter your first name"
    value={firstName}
    onChange={(e) => setFirstName(e.target.value)}
    required
  />
</div>

<div className="input-container">
  <label className="inf" htmlFor="lastName">Last Name:</label>
  <input
    type="text"
    id="lastName"
    placeholder="Enter your last name"
    value={lastName}
    onChange={(e) => setLastName(e.target.value)}
    required
  />
</div>

<div className="input-container">
  <label className="inf" htmlFor="age">Age:</label>
  <input
    type="number"
    id="age"
    placeholder="Enter your age"
    value={age}
    onChange={(e) => setAge(e.target.value)}
    required
  />
</div>

<div className="input-container">
  <label className="inf" htmlFor="speciality">Speciality:</label>
  <select
    id="speciality"
    value={speciality}
    onChange={(e) => {
      setSpeciality(e.target.value);
      console.log(e.target.value);
    }}
    required
  >
    <option> Select Speciality </option>
    {specialities &&
      specialities.map((spe) => (
        <option key={spe.specialty_id} value={spe.specialty_id}>
          {spe.specialty}
        </option>
      ))}
  </select>
</div>

<div className="input-container">
  <label className="inf" htmlFor="address">Address:</label>
  <input
    type="text"
    id="address"
    placeholder="Enter your address"
    value={address}
    onChange={(e) => setAddress(e.target.value)}
    required
  />
</div>

<div className="input-container">
  <label className="inf" htmlFor="phone">Phone number:</label>
  <input
    type="tel"
    id="phone"
    placeholder="Enter your phone number"
    value={phone}
    onChange={(e) => setPhone(e.target.value)}
    required
  />
</div>

<div className="input-container">
  <label className="inf" htmlFor="email">Email:</label>
  <input
    type="email"
    id="email"
    placeholder="Enter your email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    required
  />
</div>

<div className="input-container">
  <label className="inf" htmlFor="password">Password:</label>
  <input
    type="password"
    id="password"
    placeholder="Enter your password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    required
  />
</div>
         
<button 
  className="docRegBut" 
  onClick={(e) => {
    e.preventDefault(); 
    Swal.fire({
      position: "center",
      icon: "success",
      title: "account created successfully",
      showConfirmButton: false,
      timer: 2500
    });
   
    addNewDoctor(e);
  }}
  type="submit"
>
  Register
</button>
        </form>
        {status ? (
          <div className="SuccessMessage">{message}</div>
        ) : (
          <div className="ErrorMessage">{message}</div>
        )}
      </div>

    </>
  );
};

export default RegisterDoctor;
